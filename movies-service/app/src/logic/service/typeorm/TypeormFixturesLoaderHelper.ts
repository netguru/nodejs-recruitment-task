// Code in this file is responsible for loading fixtures from yaml files
// I know this might be hard to believe, but I wrote this whole class because
// there were some bugs and slowdowns in typeorm fixtures package
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { Repository, getRepository } from "typeorm";
import YAML from "yaml";

import { FunctionCallParamsNotArrayException } from "@app/logic/service/typeorm/exception/FunctionCallParamsNotArrayException";
import { InvalidCastTargetException } from "@app/logic/service/typeorm/exception/InvalidCastTargetException";
import { NameNotFoundException } from "@app/logic/service/typeorm/exception/NameNotFoundException";
import { UnexpectedCurrentException } from "@app/logic/service/typeorm/exception/UnexpectedCurrentException";

// public types

export interface FixtureEntity {
  [key: string]: any; // eslint-disable-line
}
export type LoadedFixtures = Record<string, FixtureEntity>;

// private types

interface FixtureEntityCreateData {
  rangeIterator: number;
  rangeUsed: boolean;
  entityClass: string;
  rawData: Record<string, string | string[] | boolean | number | object | { [key: string]: string[] }>;
  saved: boolean;
  savedObject?: FixtureEntity;
  itemName: string;
}

type EntityNameMap = Record<string, FixtureEntityCreateData>;
type RepositoryMap = Record<string, Repository<any>>; // eslint-disable-line

// interfaces for loading context

interface LoadingContext {
  loadedFixtures: LoadedFixtures;
  nameMap: EntityNameMap;
  repositoryMap: RepositoryMap;
}

interface EntityLoadingContext extends LoadingContext {
  createData: FixtureEntityCreateData;
  entity: FixtureEntity;
}

// Note that this class is completely static
export class TypeormFixturesLoaderHelper {
  // The entry point where loading starts
  public static async load(dirPath: string): Promise<LoadedFixtures> {
    const loadedFixtures: LoadedFixtures = {};
    // Recursively find all yaml files, note that yaml file names are afterwards ignored
    const files = TypeormFixturesLoaderHelper.recursiveFileScan(dirPath).filter((a) =>
      [".yml", ".yaml"].includes(path.extname(a))
    );

    const nameMap: EntityNameMap = {};
    const repositoryMap: RepositoryMap = {};

    const context = {
      loadedFixtures,
      nameMap,
      repositoryMap,
    };

    // every yaml file consists of 2 fields: "entity" string field naming entity class, for example VideoEntity
    // and items field which is an array of instances of the entity

    for (const file of files) {
      const ymlContent = YAML.parse(fs.readFileSync(file, "utf8"));
      const entity = ymlContent["entity"];
      if (!repositoryMap[entity]) {
        // caching repositories is good for performance
        repositoryMap[entity] = await getRepository(entity);
      }
      const items = ymlContent["items"];
      for (const item in items) {
        // range parsing is done here, before other processing starts.
        // if range is found in the name of the item, it is extracted from the name,
        // then range is expanded and item data is saved as many times into name map,
        // and range definition in item name is replaced by iteration value.
        // Range value is saved to a wrapping object to avoid reading range value from name itself
        if (TypeormFixturesLoaderHelper.hasRange(item)) {
          const range = TypeormFixturesLoaderHelper.readRange(item);
          for (let i = range.start; i <= range.end; i++) {
            const newName = TypeormFixturesLoaderHelper.replaceRange(item, i.toString());
            nameMap[newName] = {
              rangeIterator: i,
              rangeUsed: true,
              entityClass: entity,
              rawData: items[item],
              saved: false,
              itemName: newName,
            };
          }
        } else {
          // Obviously if range is not found data is saved as is and range is not being used
          nameMap[item] = {
            rangeIterator: 0,
            rangeUsed: false,
            entityClass: entity,
            rawData: items[item],
            saved: false,
            itemName: item,
          };
        }
      }
    }

    for (const name in nameMap) {
      // load all found items
      await TypeormFixturesLoaderHelper.resolveAndSaveName(name, context);
    }

    return loadedFixtures;
  }

  /////

  private static async resolveAndSaveName(name: string, context: LoadingContext): Promise<FixtureEntity> {
    // This method loads one "item"
    const data = context.nameMap[name];
    if (data.saved) {
      // if the item was already saved, for example because other entity referenced it, it is immediately returned
      return data.savedObject as FixtureEntity;
    }
    const repo = context.repositoryMap[data.entityClass];
    const entity: FixtureEntity = repo.create();

    // entity loading context holding useful stuff which is passed down the line
    const entityLoadingContext = { ...context, entity, createData: data };

    // Iterate over items fields
    for (const fieldName in data.rawData) {
      const fieldValue = data.rawData[fieldName];
      if (fieldName === "__call") {
        // Handle function calling
        await TypeormFixturesLoaderHelper.resolveFunctionsCalls(
          fieldValue as unknown as { [key: string]: string[] },
          entityLoadingContext
        );
      } else if ("boolean" === typeof fieldValue || "number" === typeof fieldValue || fieldValue === null) {
        // Handle basic types
        entity[fieldName] = fieldValue;
      } else if (Array.isArray(fieldValue)) {
        // handle an array
        await TypeormFixturesLoaderHelper.resolveArray(fieldName, fieldValue, entityLoadingContext);
      } else if ("object" === typeof fieldValue) {
        // handle an object
        await TypeormFixturesLoaderHelper.resolveObject(
          fieldName,
          fieldValue as { [key: string]: string },
          entityLoadingContext
        );
      } else {
        // and finally handle string
        await TypeormFixturesLoaderHelper.resolveString(fieldName, fieldValue, entityLoadingContext);
      }
    }

    // finally save the entity and update loaded fixture data
    await repo.save(entity, { transaction: false, reload: true, listeners: false });
    data.saved = true;
    data.savedObject = entity;
    context.loadedFixtures[name] = entity;
    // Returning is important because this function result is saved into entities in case of references
    return entity;
  }

  private static async resolveFunctionsCalls(
    calls: { [key: string]: string[] },
    context: EntityLoadingContext
  ): Promise<void> {
    // call all defined calls
    for (const functionName in calls) {
      await TypeormFixturesLoaderHelper.resolveFunctionCall(functionName, calls[functionName], context);
    }
  }

  private static async resolveFunctionCall(
    functionName: string,
    paramsRaw: string[],
    context: EntityLoadingContext
  ): Promise<void> {
    const params: unknown[] = [];
    if (!Array.isArray(paramsRaw)) {
      throw new FunctionCallParamsNotArrayException(context.createData.itemName, context.createData.entityClass);
    }
    // Iterate over params so some processing can be applied
    for (const v of paramsRaw) {
      params.push(await TypeormFixturesLoaderHelper.resolveOneStringField(v, context));
    }
    // and call, await to ensure async methods work as well, awaiting non-promise works as well
    await context.entity[functionName](...params);
  }

  private static async resolveArray(
    fieldName: string,
    fieldValue: string[],
    context: EntityLoadingContext
  ): Promise<void> {
    // just resolve all values of an array
    const fieldData: unknown[] = [];
    for (const v of fieldValue) {
      fieldData.push(await TypeormFixturesLoaderHelper.resolveOneStringField(v, context));
    }
    // set it
    context.entity[fieldName] = fieldData;
  }

  private static async resolveObject(
    fieldName: string,
    fieldValue: { [key: string]: string },
    context: EntityLoadingContext
  ): Promise<void> {
    // just resolve all values in an object
    const fieldData: { [key: string]: unknown } = {};
    for (const fieldValueKey in fieldValue) {
      const v = (fieldValue as { [key: string]: string })[fieldValueKey];
      fieldData[fieldValueKey] = await TypeormFixturesLoaderHelper.resolveOneStringField(v, context);
    }
    // set it
    context.entity[fieldName] = fieldData;
  }

  private static async resolveString(
    fieldName: string,
    inFieldValue: string,
    context: EntityLoadingContext
  ): Promise<void> {
    // resolve just simple string value and set it
    context.entity[fieldName] = await TypeormFixturesLoaderHelper.resolveOneStringField(inFieldValue, context);
  }

  /////

  private static async resolveOneStringField(
    fieldValue: string,
    context: EntityLoadingContext
  ): Promise<FixtureEntity | string | number | Date> {
    // Resolve current
    if (TypeormFixturesLoaderHelper.hasCurrent(fieldValue)) {
      if (!context.createData.rangeUsed) {
        throw new UnexpectedCurrentException(context.createData.itemName, context.createData.entityClass);
      }
      fieldValue = TypeormFixturesLoaderHelper.replaceCurrent(fieldValue, context.createData.rangeIterator.toString());
    }
    // Resolve reference
    if (TypeormFixturesLoaderHelper.isReference(fieldValue)) {
      // If is a reference
      const refName = TypeormFixturesLoaderHelper.readReference(fieldValue);
      if (!context.nameMap[refName]) {
        throw new NameNotFoundException(refName, context.createData.itemName, context.createData.entityClass);
      }
      return await TypeormFixturesLoaderHelper.resolveAndSaveName(refName, context);
    } else {
      // If not a reference, for basic string fields, faker and casting are also resolved
      if (TypeormFixturesLoaderHelper.hasFakerCalls(fieldValue)) {
        fieldValue = TypeormFixturesLoaderHelper.resolveFaker(fieldValue);
      }
      // If a cast, then cast and return new value
      if (TypeormFixturesLoaderHelper.hasCast(fieldValue)) {
        const castTo = TypeormFixturesLoaderHelper.readCast(fieldValue);
        fieldValue = TypeormFixturesLoaderHelper.removeCast(fieldValue);
        if (castTo === "date") {
          return new Date(fieldValue);
        } else if (castTo === "integer") {
          return parseInt(fieldValue);
        } else if (castTo === "float") {
          return parseFloat(fieldValue);
        } else {
          throw new InvalidCastTargetException(context.createData.itemName, context.createData.entityClass);
        }
      }
      // else just return
      return fieldValue;
    }
  }

  /////

  private static hasRange(name: string): boolean {
    return /{(\d+)\.\.(\d+)}/.test(name);
  }

  private static readRange(name: string): { start: number; end: number } {
    const match = /{(\d+)\.\.(\d+)}/.exec(name);
    if (!match) {
      throw new Error(`Cannot read range from name: ${name}`);
    }
    return { start: parseInt(match[1]), end: parseInt(match[2]) };
  }

  private static replaceRange(name: string, replacement: string): string {
    return name.replace(/{(\d+)\.\.(\d+)}/, replacement);
  }

  /////

  private static hasCurrent(value: string): boolean {
    return /\(\$current\)/.test(value);
  }

  private static replaceCurrent(value: string, replacement: string): string {
    return value.replace(/\(\$current\)/, replacement);
  }

  /////

  private static hasCast(value: string): boolean {
    return / @as (date|integer|float)$/.test(value);
  }

  private static readCast(value: string): string {
    const match = / @as (date|integer|float)$/.exec(value);
    if (!match) {
      throw new Error(`Cannot read range from name: ${name}`);
    }
    return match[1];
  }

  private static removeCast(value: string): string {
    return value.replace(/ @as (date|integer|float)$/, "");
  }

  /////

  private static isReference(value: string): boolean {
    return /^@(.*)$/.test(value);
  }

  private static readReference(value: string): string {
    const match = /^@(.*)$/.exec(value);
    if (!match) {
      throw new Error(`Cannot read reference from value: ${value}`);
    }
    return match[1];
  }

  /////

  private static hasFakerCalls(value: string): boolean {
    return /{{(.+)}}/.test(value);
  }

  private static resolveFaker(value: string): string {
    return faker.fake(value);
  }

  /////

  private static recursiveFileScan(dir: string): string[] {
    const result: string[] = [];
    const dirContent = fs.readdirSync(dir, { withFileTypes: true });
    for (const dirElement of dirContent) {
      if (dirElement.isFile()) {
        result.push(path.join(dir, dirElement.name));
      }
      if (dirElement.isDirectory()) {
        result.push(...TypeormFixturesLoaderHelper.recursiveFileScan(path.join(dir, dirElement.name)));
      }
    }
    return result;
  }
}
