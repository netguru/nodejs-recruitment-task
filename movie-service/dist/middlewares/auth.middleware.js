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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = require("../exceptions/HttpException");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.header('Authorization')) {
            next(new HttpException_1.HttpException(401, "no Authorization header"));
        }
        const Authorization = req.header('Authorization').split('Bearer ')[1] || null;
        if (Authorization) {
            const secretKey = process.env.secret;
            const verificationResponse = yield jsonwebtoken_1.default.verify(Authorization, secretKey);
            if (verificationResponse) {
                req.user = verificationResponse;
                next();
            }
            else {
                next(new HttpException_1.HttpException(401, 'invalid token'));
            }
        }
        else {
            next(new HttpException_1.HttpException(401, 'Authentication token missing'));
        }
    }
    catch (error) {
        // console.log(error)
        next(new HttpException_1.HttpException(401, 'Wrong authentication token'));
    }
});
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map