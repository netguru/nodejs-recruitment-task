import { default as configurationServices } from "@app/logic/service/configuration";
import { default as loggerServices } from "@app/logic/service/logger";
import { default as typeormServices } from "@app/logic/service/typeorm";
import { default as authServices } from "@app/logic/service/auth";

export default [
  ...configurationServices,
  ...loggerServices,
  ...typeormServices,
  ...authServices
];
