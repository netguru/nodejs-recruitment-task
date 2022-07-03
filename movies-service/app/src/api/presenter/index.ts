import { default as moviePresenters } from "@app/api/presenter/movie";
import { default as userPresenters } from "@app/api/presenter/user";

export default [...userPresenters, ...moviePresenters];
