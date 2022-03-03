const express = require("express");
const bodyParser = require("body-parser");
const { authFactory, AuthError } = require("./auth");
const path = require('path');

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: path.dirname( module.paths[1] ) + "/.env" });
}

const { JWT_SECRET } = process.env;
const auth = authFactory(JWT_SECRET);
const authApp = express();

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}
authApp.use(bodyParser.json());

authApp.post("/auth", (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "invalid payload" });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "invalid payload" });
    }

    try {
        const token = auth(username, password);

        return res.status(200).json({ token });
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(401).json({ error: error.message });
        }
        next(error);
    }
});

authApp.use((error, _, res, __) => {
    console.error(
        `Error processing request ${error}. See next message for details`
    );
    console.error(error);

    return res.status(500).json({ error: "internal server error" });
});

module.exports = authApp