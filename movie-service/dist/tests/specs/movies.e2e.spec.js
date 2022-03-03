"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const app_js_1 = __importDefault(require("../../../../auth-service/src/app.js"));
const mongoose = require("mongoose");
const databaseName = "test-movies";
const movies_seed_1 = require("../seed/movies.seed");
const request = (0, supertest_1.default)(app_1.app);
const authAppRequest = (0, supertest_1.default)(app_js_1.default);
describe('E2E Tests (Global)', () => {
    let basicUserToken;
    let premiumUserToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const url = `mongodb://127.0.0.1/${databaseName}`;
        yield mongoose.connect(url, { useNewUrlParser: true });
        let basicToken = yield authAppRequest.post('/auth').send({
            username: "basic-thomas",
            password: "sR-_pcoow-27-6PAwCD8",
        });
        let premiumToken = yield authAppRequest.post('/auth').send({
            username: "premium-jim",
            password: "GBLtTyq3E_UNjFnpo9m6",
        });
        basicUserToken = JSON.parse(basicToken.text).token;
        premiumUserToken = JSON.parse(premiumToken.text).token;
    }));
    beforeEach(() => {
        jest.setTimeout(30000);
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose.connection.db.dropCollection('movies');
        yield mongoose.disconnect();
    }));
    test('should return 401 if no Authorization header is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/movies');
        expect(res.status).toBe(401);
        const { message } = JSON.parse(res.text);
        expect(message).toBe('no Authorization header');
    }));
    test('should return 401 if no Authorization header is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/api/movies');
        expect(res.status).toBe(401);
        const { message } = JSON.parse(res.text);
        expect(message).toBe('no Authorization header');
    }));
    test('should not allow basic users create more than 5 movies', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, movies_seed_1.add5Movies)(request, basicUserToken);
        const res = yield request.post('/api/movies').set('Authorization', 'Bearer ' + basicUserToken).send({
            title: "titanic"
        });
        const response = JSON.parse(res.text);
        expect(res.status).toBe(401);
        expect(response).toHaveProperty('message');
        expect(response.message).toEqual("exceeded monthly movie creation for basic role");
    }));
    test('should allow premium users create more than 5 movies', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, movies_seed_1.add5Movies)(request, premiumUserToken);
        const res = yield request.post('/api/movies').set('Authorization', 'Bearer ' + premiumUserToken).send({
            title: "titanic"
        });
        const response = JSON.parse(res.text);
        expect(res.status).toBe(201);
    }));
    test('should return 200 and Array of user movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/movies').set('Authorization', 'Bearer ' + basicUserToken);
        expect(res.status).toBe(200);
        const message = JSON.parse(res.text);
        expect(message).toHaveProperty("movies");
        expect(message.movies).toBeInstanceOf(Array);
    }));
});
//# sourceMappingURL=movies.e2e.spec.js.map