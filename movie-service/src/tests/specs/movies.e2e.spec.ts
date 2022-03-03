import supertest from 'supertest'
import {app} from "../../app";
import authApp from "../../../../auth-service/src/app.js"
const mongoose = require("mongoose");
const databaseName = "test-movies";
import {add5Movies} from "../seed/movies.seed";

const request = supertest(app)
const authAppRequest = supertest(authApp)
describe('E2E Tests (Global)', () => {
    let basicUserToken;
    let premiumUserToken;
    beforeAll(async()=>{
        const url = `mongodb://127.0.0.1/${databaseName}`;
        await mongoose.connect(url, { useNewUrlParser: true });
        let basicToken = await authAppRequest.post('/auth').send({
            username: "basic-thomas",
            password: "sR-_pcoow-27-6PAwCD8",
        })
        let premiumToken = await authAppRequest.post('/auth').send({
            username: "premium-jim",
            password: "GBLtTyq3E_UNjFnpo9m6",
        })

        basicUserToken = JSON.parse(basicToken.text).token
        premiumUserToken = JSON.parse(premiumToken.text).token
    })

    beforeEach(()=>{
        jest.setTimeout(30000)
    })

    afterAll(async ()=>{
        await  mongoose.connection.db.dropCollection('movies')
        await mongoose.disconnect()
    })

    test('should return 401 if no Authorization header is provided', async () => {
        const res = await request.get('/api/movies')
        expect(res.status).toBe(401)
        const {message} = JSON.parse(res.text)
        expect(message).toBe('no Authorization header')
    })

    test('should return 401 if no Authorization header is provided', async () => {
        const res = await request.post('/api/movies')
        expect(res.status).toBe(401)
        const {message} = JSON.parse(res.text)
        expect(message).toBe('no Authorization header')
    })

    test('should not allow basic users create more than 5 movies', async () => {
        await add5Movies(request, basicUserToken)
        const res = await request.post('/api/movies').set('Authorization', 'Bearer ' + basicUserToken).send({
            title: "titanic"
        })
        const response = JSON.parse(res.text)
        expect(res.status).toBe(401)
        expect(response).toHaveProperty('message')
        expect(response.message).toEqual("exceeded monthly movie creation for basic role")
    })

    test('should allow premium users create more than 5 movies', async () => {
        await add5Movies(request, premiumUserToken)
        const res = await request.post('/api/movies').set('Authorization', 'Bearer ' + premiumUserToken).send({
            title: "titanic"
        })
        const response = JSON.parse(res.text)
        expect(res.status).toBe(201)
    })

    test('should return 200 and Array of user movies', async () => {
        const res = await request.get('/api/movies').set('Authorization', 'Bearer ' + basicUserToken)
        expect(res.status).toBe(200)
        const message = JSON.parse(res.text)
        expect(message).toHaveProperty("movies")
        expect(message.movies).toBeInstanceOf(Array)
    })
})


