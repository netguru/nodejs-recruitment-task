const Movie = require("../model/movie")
const movieErrors = require("../error/movie-error")

const movieDao = {
    getMoviesByUser:  function (userId) {
        // return Movie.find({userId});
        return Movie.aggregate([
            {$match: {userId}},
            {$project:{_id: 0, __v: 0}}
        ])
    },
    create: async function (movie) {
        return Movie.create(movie);
    },
    getMoviesInCurrentMonth: async function (userId) {
        const date = new Date();
        try {
            const result = await Movie.aggregate([
                {
                    $match: {userId}
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
            return result[0]?.count || 0;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    collisionCheck: async function (userId, title, released) {
        const movie = await Movie.findOne({userId, title, released});
        if (movie) throw movieErrors.collisionError;
    }
}

module.exports = movieDao;
