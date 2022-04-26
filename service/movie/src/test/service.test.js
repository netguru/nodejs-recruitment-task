const path = require('path');
require("dotenv").config({path: path.resolve(__dirname, '../../.env')});
const mongoose = require("mongoose");
const dbURL = process.env.MONGODB_URL_TEST;
const movieService = require("../service/movie-service");
const Movie = require("../model/movie");
const errors = require('../error/movie-error')

describe("movie service tests", () => {
    const basicUser = {
        userId: 123,
        role: "basic",
        name: "Basic Thomas",
        username: "basic-thomas",
        password: "sR-_pcoow-27-6PAwCD8",
    };
    const premiumUser = {
        userId: 434,
        role: "premium",
        name: "Premium Jim",
        username: "premium-jim",
        password: "GBLtTyq3E_UNjFnpo9m6",
    }
    let connection;

    const movies = [{title: "mad max"}, {title: "batman"},
        {title: "spider-man"}, {title: "harry potter"},
        {title: "blade"}, {title: "star-wars"}];

    beforeAll(async () => {
        try {
            mongoose.connect(dbURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        } catch (e) {
            console.log(e)
        }
    });

    afterAll(async () => {
        connection.close();
    });

    beforeEach(async () => {
        await Movie.deleteMany({userId: basicUser.userId});
        await Movie.deleteMany({userId: premiumUser.userId});
    });

    afterEach(async () => {
    });

    it("should create new movie and save it to db", async () => {
        await movieService.create(movies[0].title, basicUser);

        let createdMovies = await Movie.find({userId: basicUser.userId})
        expect(createdMovies.length).toEqual(1);

        await movieService.create(movies[1].title, basicUser);
        createdMovies = await Movie.find({userId: basicUser.userId})
        expect(createdMovies.length).toEqual(2);
    });
    it("should return error for not found movie", async () => {
        try {
            const mockMovie = {title: "madmax"};
            await movieService.create(mockMovie.title, basicUser);
        } catch (e) {
            expect(e).toEqual(errors.detailsError);
        }
    });
    it("when creating should return error for basic user with 5 movie in current month", async () => {
        try {
            await createMovies(basicUser);
        } catch (e) {
            expect(e).toEqual(errors.privilegeError);
        }
    });
    it("when creating should not return error for premium user with 5 movie in current month", async () => {
        try {
            await createMovies(premiumUser);
            await movieService.create({title: "birdcage", basicUser})
        } catch (e) {
            console.log(e)
        }
    });

    it("should return error when creating movie that already exists", async () => {
        try {
            await movieService.create(movies[0].title, basicUser);
            await movieService.create(movies[0].title, basicUser);
        } catch (e) {
            expect(e).toEqual(errors.collisionError);
        }
    });

    async function createMovies(user) {
        await movieService.create(movies[0].title, user)
        await movieService.create(movies[1].title, user)
        await movieService.create(movies[2].title, user)
        await movieService.create(movies[3].title, user)
        await movieService.create(movies[4].title, user)
        await movieService.create(movies[5].title, user)
    }
    //TODO: rework helper function
});



