import { default as configurationServices } from "@app/logic/service/configuration";
import { default as loggerServices } from "@app/logic/service/logger";
import { default as typeormServices } from "@app/logic/service/typeorm";

export default [
  ...configurationServices,
  ...loggerServices,
  ...typeormServices,
];
