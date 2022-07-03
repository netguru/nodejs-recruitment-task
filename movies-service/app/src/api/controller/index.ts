import authControllers from "@app/api/controller/auth";
import meControllers from "@app/api/controller/me";
import movieControllers from "@app/api/controller/movie";
import publicControllers from "@app/api/controller/public";

export default [...authControllers, ...meControllers, ...publicControllers, ...movieControllers];
