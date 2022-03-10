const supertest = require('supertest')
const { app } = require('../server')
const requestWithSupertest = supertest(app);
const { Movies } = require("../models/movies")

describe('Movies Endpoints', () => {
    it('GET /movies should get movies details', async () => {
        const movies = await Movies.find();
        const res = await requestWithSupertest.get('/movies');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(JSON.parse(res.text).data[0].title).toBe(movies[0].title);
        expect(JSON.parse(res.text).data[0].genre).toBe(movies[0].genre);
    });
});
