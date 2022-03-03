import MovieDAOImpl from "../impl/mongoDB/movie-dao.impl"
import { NextFunction, Request, Response } from 'express';

class MovieDAO {

    static implService =  MovieDAOImpl;

    static create = async(user, payload)=>{
        return MovieDAO.implService.create(user, payload, process.env.IMDB_API_KEY)
    }


    static find = async(user)=>{
        return MovieDAO.implService.find(user, process.env.IMDB_API_KEY)
    }

}

export default MovieDAO