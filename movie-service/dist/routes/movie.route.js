"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const movie_dto_1 = require("../dto/movie.dto");
const movie_controller_1 = __importDefault(require("../controller/movie.controller"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const movieRouter = (0, express_1.Router)();
const path = '/movies';
const controller = movie_controller_1.default;
movieRouter.get(`${path}`, [auth_middleware_1.default], controller.find);
movieRouter.post(`${path}`, [auth_middleware_1.default, (0, validation_middleware_1.default)(movie_dto_1.CreateMovieDto, 'body')], controller.create);
exports.default = movieRouter;
//# sourceMappingURL=movie.route.js.map