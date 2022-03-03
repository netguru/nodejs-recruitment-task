"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    released: {
        type: Date
    },
    genre: {
        type: String
    },
    userId: {
        type: Number,
        required: true
    },
    director: {
        type: String
    }
}, {
    timestamps: true
});
const movieModel = (0, mongoose_1.model)("Movie", movieSchema);
exports.default = movieModel;
//# sourceMappingURL=movie.model.js.map