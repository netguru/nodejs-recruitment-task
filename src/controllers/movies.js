var mongoose = require('mongoose')
const Movie  = require('../models/movieModel.js')
const movieRequestDetails = require('../utils/movieRequest.js')

/**
     * Create a movie
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
*/
exports.createMovie = async(req,res)=>{

  let {Title, Released, Genre, Director} = await movieRequestDetails(req.body.Title,res);

  const user = req.user;
  const currentDate = new Date();
  const date = new Date();
          
        try {
          /**
           * Find all the movies created by a user in the current month
           *
           * @param userId
           */
            const result = await Movie.aggregate([
                {
                    $match: {userId:user.userId}
                },
                {
                    $project: {_id: 0, added: 1}
                },
                {
                    $group: {
                        _id: {
                            month: {$month: "$added"},
                            year: {$year: "$added"}
                        },
                        count: {$sum: 1}
                    },
                },
                {
                    $match:
                        {
                            "_id.month": date.getMonth() + 1,
                            "_id.year": date.getFullYear()
                        }
                }
            ]);
            
            let count  = result[0]?.count || 0

            if(user.role === "basic" && count >= 5){

              return res.status(401).json({error:"The user is not allowed to create more than 5 movies per month."})
            }
         }catch (e) {
            throw new Error(e.message);
        }
        
        try{
            const movie = {
              title: Title,
              released: Released,
              genre: Genre,
              director: Director,
              userId: user.userId,
              added: currentDate
          };
            await Movie.create(movie);
            res.status(201).json({Title, Released, Genre, Director, userId: user.userId})
          
         }catch(error){
          res.status(401).json({error:error.message});
        }        
      
}

/**
     * Get all the movies for a specific user
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
 */
exports.getMovie = async (req, res,next) => {

    try {

      const movies = await Movie.find({userId:req.user.userId }).select({ _id: 0, __v: 0 }).exec();;
      res.status(200).send(movies);

    } catch (e) {

      next(e, req, res);
      
    }
}
