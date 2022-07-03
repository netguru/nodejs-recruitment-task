import { CreateMovie } from "@app/logic/use-case/movie/CreateMovie";
import { ListUserMovies } from "@app/logic/use-case/movie/ListUserMovies";
import { VerifyUserMovieQuota } from "@app/logic/use-case/movie/VerifyUserMovieQuota";

export default [CreateMovie, VerifyUserMovieQuota, ListUserMovies];
