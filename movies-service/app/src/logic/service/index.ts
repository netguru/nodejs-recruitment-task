import { default as configurationServices } from "@app/logic/service/configuration";
import { default as loggerServices } from "@app/logic/service/logger";
import { default as typeormServices } from "@app/logic/service/typeorm";
import { default as authServices } from "@app/logic/service/auth";
import { default as omdbServices } from "@app/logic/service/omdb";

export default [
  ...configurationServices,
  ...loggerServices,
  ...typeormServices,
  ...authServices,
  ...omdbServices
];