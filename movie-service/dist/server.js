"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
// mongoDB server connection
mongoose_1.default.connect(process.env.databaseUrl);
const db = mongoose_1.default.connection;
db.on("open", () => {
    console.log("mongodb connected");
});
app_1.app.listen(app_1.port, () => {
    console.log(`listening on port ${app_1.port}`);
});
//# sourceMappingURL=server.js.map