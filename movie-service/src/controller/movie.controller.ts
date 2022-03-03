// const userDao = require("../../DAO/daos/user");
import MovieDAO from '../DAO/daos/movie.dao'
import { NextFunction, Request, Response } from 'express';
import {IRequestWithUser} from "../interfaces/auth.interface";
import {IUserToken} from "../interfaces/user";


class MovieController{
    static movieDao = MovieDAO;

    static create = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
        try {
            const newMovie = await MovieController.movieDao.create(req.user, req.body);
            return res.status(201).json({data: newMovie})
        }catch (error) {
            next(error)
        }
    }
    static find = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
        try {
            const movies = await MovieController.movieDao.find(req.user)
            return res.json({movies});
        }catch (error) {
            next(error)
        }
    }
}

export default MovieController;
