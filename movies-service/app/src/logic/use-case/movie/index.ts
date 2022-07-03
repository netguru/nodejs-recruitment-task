import {CreateMovie} from "@app/logic/use-case/movie/CreateMovie";
import {VerifyUserMovieQuota} from "@app/logic/use-case/movie/VerifyUserMovieQuota";
import {ListUserMovies} from "@app/logic/use-case/movie/ListUserMovies";

export default [CreateMovie, VerifyUserMovieQuota, ListUserMovies];
