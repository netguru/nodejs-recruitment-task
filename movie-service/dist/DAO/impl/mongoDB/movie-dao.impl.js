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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const movie_model_1 = __importDefault(require("../../../models/movie.model"));
const axios_1 = __importDefault(require("axios"));
const HttpException_1 = require("../../../exceptions/HttpException");
const moment_1 = __importDefault(require("moment"));
class MovieDAOImpl {
}
_a = MovieDAOImpl;
MovieDAOImpl.omdb = 'https://www.omdbapi.com';
MovieDAOImpl.movieModel = movie_model_1.default;
MovieDAOImpl.create = (user, payload, apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = payload;
    const result = yield axios_1.default.get(`${MovieDAOImpl.omdb}/?t=${title}&apikey=${apiKey}`);
    if (result.data.Response == "False") {
        throw new HttpException_1.HttpException(404, "Movie not found");
    }
    const { Title, Released, Genre, Director } = result.data;
    console.log(user);
    if (user.role === "basic") {
        console.log("in here!");
        yield MovieDAOImpl.userCreateRestrictionCheck(user.userId);
    }
    yield movie_model_1.default.create({
        title: Title,
        released: Released,
        genre: Genre,
        director: Director,
        userId: user.userId
    });
    return { Title, Released, Genre, Director };
});
MovieDAOImpl.find = (user, apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    return yield movie_model_1.default.find({ userId: user.userId }, { userId: 0 });
});
MovieDAOImpl.userCreateRestrictionCheck = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const startOfMonth = (0, moment_1.default)().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = (0, moment_1.default)().endOf('month').format('YYYY-MM-DD');
    console.log(startOfMonth, endOfMonth);
    const moviesCount = yield movie_model_1.default.count({ userId, createdAt: { $gte: startOfMonth, $lte: endOfMonth } });
    if (moviesCount >= 5) {
        throw new HttpException_1.HttpException(401, "exceeded monthly movie creation for basic role");
    }
});
exports.default = MovieDAOImpl;
//# sourceMappingURL=movie-dao.impl.js.map