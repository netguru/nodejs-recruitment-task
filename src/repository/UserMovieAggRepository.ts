import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { UserMovieAgg } from "../models/UserMovieAgg";

@Service()
@EntityRepository(UserMovieAgg)
export class UserMovieAggRepository extends Repository<UserMovieAgg> {}
