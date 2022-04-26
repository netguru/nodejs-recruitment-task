const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const mongoose = require("mongoose");
const axios = require("axios")
const Movie = require("../model/movie");
const path = require("path");

require("dotenv").config({path: path.resolve(__dirname, '../../.env')});
const dbURL = process.env.MONGODB_URL_TEST;

const user = {
    username: "basic-thomas",
    password: "sR-_pcoow-27-6PAwCD8"
};

chai.use(chaiHttp);

let token;
const notoken = '';
describe('app endpoints', () => {
    beforeAll(async () => {
        try {
            await mongoose.connect(dbURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            const data = await axios.post("http://localhost:3000/auth", user);
            token = data.data.token;
        } catch (e) {
            console.log(e)
        }
    });

    afterAll(async () => {
        await mongoose.connection.close()
    });

    beforeEach(async () => {
    });

    afterEach(async () => {
        await Movie.deleteMany({userId: 123});
    });
    it('should create movie for authenticated user', (done) => {
        chai.request(app)
            .post('/movie/create')
            .auth(token, {type: 'bearer'})
            .set({
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            })
            .send({
                title: 'batman'
            })
            .end((err, res) => {
                expect(res.status).to.eq(201);
                expect(res.body).to.have.keys(["Released", "Director", "Title", "Released", "userId"])
                done();
            });
    });

    it('should not create movie for un-authenticated', (done) => {
        chai.request(app)
            .post('/movie/create')
            .auth(token, {type: 'bearer'})
            .set({
                'content-type': 'application/json',
                Authorization: `Bearer ${notoken}`
            })
            .send({
                title: 'batman'
            })
            .end((err, res) => {
                expect(res.status).to.eq(401);
                done();
            });
    });
});
