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
Object.defineProperty(exports, "__esModule", { value: true });
exports.add5Movies = void 0;
const movies_titles_1 = require("../movies-titles");
const add5Movies = (supertest, userToken) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < movies_titles_1.moviesTitles.length; i++) {
        console.log(userToken);
        yield supertest.post('/api/movies').set('Authorization', 'Bearer ' + userToken).send({
            title: movies_titles_1.moviesTitles[i].title
        });
    }
});
exports.add5Movies = add5Movies;
//# sourceMappingURL=movies.seed.js.map