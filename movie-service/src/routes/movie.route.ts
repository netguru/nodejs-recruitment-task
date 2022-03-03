/* eslint-disable prettier/prettier */
import {CreateMovieDto} from "../dto/movie.dto";
import MovieController from "../controller/movie.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {Router} from 'express';
import authMiddleware from "../middlewares/auth.middleware";
const movieRouter = Router();
const path = '/movies';
const controller =  MovieController;

movieRouter.get(`${path}`, [authMiddleware], controller.find)

movieRouter.post(`${path}`, [authMiddleware, validationMiddleware(CreateMovieDto, 'body')], controller.create)

export default movieRouter;