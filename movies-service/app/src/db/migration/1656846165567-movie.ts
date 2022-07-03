import { MigrationInterface, QueryRunner } from "typeorm";

export class movie1656846165567 implements MigrationInterface {
  name = "movie1656846165567";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "released_at" TIMESTAMP NOT NULL, "genre" character varying NOT NULL, "director" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "created_by" integer NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movie"`);
  }
}
