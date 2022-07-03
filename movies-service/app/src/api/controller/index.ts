import authControllers from "@app/api/controller/auth";
import meControllers from "@app/api/controller/me";
import publicControllers from "@app/api/controller/public";

export default [...authControllers, ...meControllers, ...publicControllers];
