import movieModel from "../../../models/movie.model";
// import { ICreateMovie } from "../../../interfaces/movie.interface";
import {CreateMovieDto} from "../../../dto/movie.dto";
import axios from 'axios';
import {HttpException} from "../../../exceptions/HttpException";
import {IUserToken} from "../../../interfaces/user";
import MovieDAO from "../../daos/movie.dao";
import moment from "moment";

class MovieDAOImpl {


    private static omdb = 'https://www.omdbapi.com'
    static movieModel = movieModel

    static create = async(user: IUserToken, payload: CreateMovieDto, apiKey)=>{
        const {title} =  payload;
        const result = await axios.get(`${MovieDAOImpl.omdb}/?t=${title}&apikey=${apiKey}`);
        if(result.data.Response == "False"){
            throw new HttpException(404, "Movie not found")
        }
        const {Title, Released, Genre, Director} = result.data
        console.log(user)
        if (user.role === "basic"){
            console.log("in here!")
            await MovieDAOImpl.userCreateRestrictionCheck(user.userId)
        }
        await movieModel.create({
            title: Title,
            released: Released,
            genre: Genre,
            director: Director,
            userId: user.userId
        })
        return {Title, Released, Genre, Director}
    }

    static find = async(user, apiKey)=>{
        return await movieModel.find({userId: user.userId}, {userId: 0})
    }


    private static  userCreateRestrictionCheck = async (userId)=> {
        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
        console.log(startOfMonth, endOfMonth)
        const moviesCount = await movieModel.count({userId, createdAt: {$gte: startOfMonth, $lte: endOfMonth}})
        if(moviesCount >= 5){
            throw new HttpException(401, "exceeded monthly movie creation for basic role")
        }
    }


}


export default MovieDAOImpl