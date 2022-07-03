import healthcheckUseCases from "@app/logic/use-case/healthcheck";
import userUseCases from "@app/logic/use-case/user";

export default [...healthcheckUseCases, ...userUseCases];
