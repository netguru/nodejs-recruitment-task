"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
// import morgan from 'morgan';
// import logger  from './config/winston'
const path_1 = require("path");
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: (0, path_1.dirname)(module.paths[1]) + "/.env" });
}
exports.app = (0, express_1.default)();
exports.port = process.env.PORT || 4000;
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use(express_1.default.json());
exports.app.use((0, helmet_1.default)());
exports.app.use((0, cors_1.default)({
    origin: '*'
}));
// dynamically prepends "/api" to your routes.
exports.app.get('/', (req, res) => {
    res.send('Welcome to movies API');
});
exports.app.use('/api', routes_1.default);
exports.app.use((req, res, next) => {
    const error = new Error('resource not found');
    error.status = 404;
    next(error);
});
exports.app.use(error_middleware_1.default);
// app.use(morgan('combined', { stream: logger.stream }));
//# sourceMappingURL=app.js.map