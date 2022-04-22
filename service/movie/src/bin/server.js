
const app = require("../app");
const Path = require("path");
require("dotenv").config({ path: Path.resolve(__dirname + "/../.env") });
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const dbURL = process.env.MONGODB_URL;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

async function startServer() {
    try {
        await mongoose.connect(dbURL, options);
        await app.listen(PORT);
        console.log(`Server successfully running on http://localhost:${PORT}/`);
    } catch (e) {
        throw new Error(e);
    }
}

startServer();
