import { default as userPresenters } from "@app/api/presenter/user";
import { default as moviePresenters } from "@app/api/presenter/movie";

export default [...userPresenters, ...moviePresenters];
