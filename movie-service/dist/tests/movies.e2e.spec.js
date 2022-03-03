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
const app_1 = require("../app");
const mongoose = require("mongoose");
const databaseName = "test-movies";
const request = (0, supertest_1.default)(app_1.app);
describe('E2E Tests (Global)', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const url = `mongodb://127.0.0.1/${databaseName}`;
        yield mongoose.connect(url, { useNewUrlParser: true });
    }));
    test('should return 401 if no token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/api/movies');
        expect(res.status).toBe(401);
    }));
});
//# sourceMappingURL=movies.e2e.spec.js.map