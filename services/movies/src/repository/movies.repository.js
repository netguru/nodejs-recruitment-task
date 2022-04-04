// const moviesModel = require('../models/movies.model');
const Movies = require('../models/movies.model');

class MoviesRepository {
    static async findAll(filter) {
        try {
            const res = await Movies.find(filter).select('-__v');
            return res;
        } catch (error) {
            return error;
        }
    }

    static async findAllWithAggregate(filter) {
        try {
            const res = await Movies.aggregate([{ $match: { user: filter.user } }, { $project: { name: 1, month: { $month: '$createdAt' } } }, { $match: { month: filter.month } }]);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async findOne(filter) {
        try {
            const res = await Movies.findOne(filter);
            return res;
        } catch (error) {
            return error;
        }
    }

    static async create(data) {
        try {
            const res = await Movies.create(data);
            return res;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async deleteMany(data) {
        try {
            const res = await Movies.deleteMany({ user: data.userId });
            return res;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

module.exports = MoviesRepository;
