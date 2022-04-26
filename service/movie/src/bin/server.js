
const app = require("../app");
const path = require('path');

require("dotenv").config({ path: path.resolve(__dirname, '../../.env') });
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;
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
