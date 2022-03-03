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
// const userDao = require("../../DAO/daos/user");
const movie_dao_1 = __importDefault(require("../DAO/daos/movie.dao"));
class MovieController {
}
_a = MovieController;
MovieController.movieDao = movie_dao_1.default;
MovieController.create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMovie = yield MovieController.movieDao.create(req.user, req.body);
        return res.status(201).json({ data: newMovie });
    }
    catch (error) {
        next(error);
    }
});
MovieController.find = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield MovieController.movieDao.find(req.user);
        return res.json({ movies });
    }
    catch (error) {
        next(error);
    }
});
exports.default = MovieController;
//# sourceMappingURL=movie.controller.js.map