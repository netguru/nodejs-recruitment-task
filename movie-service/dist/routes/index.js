"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const movie_route_1 = __importDefault(require("./movie.route"));
const routes = (0, express_1.Router)();
routes.use([
    movie_route_1.default,
]);
module.exports = routes;
//# sourceMappingURL=index.js.map