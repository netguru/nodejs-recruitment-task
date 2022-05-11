import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { Movie } from "../models/MoviesModel";

@Service()
@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {}
