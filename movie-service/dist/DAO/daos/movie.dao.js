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
const movie_dao_impl_1 = __importDefault(require("../impl/mongoDB/movie-dao.impl"));
class MovieDAO {
}
_a = MovieDAO;
MovieDAO.implService = movie_dao_impl_1.default;
MovieDAO.create = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return MovieDAO.implService.create(user, payload, process.env.IMDB_API_KEY);
});
MovieDAO.find = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return MovieDAO.implService.find(user, process.env.IMDB_API_KEY);
});
exports.default = MovieDAO;
//# sourceMappingURL=movie.dao.js.map