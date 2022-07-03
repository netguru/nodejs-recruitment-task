import healthcheckUseCases from "@app/logic/use-case/healthcheck";
import movieUseCases from "@app/logic/use-case/movie";

export default [...healthcheckUseCases, ...movieUseCases];
