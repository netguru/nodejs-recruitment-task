import request from "supertest";
import app from "../src/server.js";

describe("/auth POST test", () => {

    it("should work for a basic user", (done) => {
        request(app)
            .post("/auth")
            .send({
                username: "basic-thomas",
                password: "sR-_pcoow-27-6PAwCD8"
            })
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

    it("should work for a premium user", (done) => {
        request(app)
            .post("/auth")
            .send({
                username: "premium-jim",
                password: "GBLtTyq3E_UNjFnpo9m6"
            })
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

    it("should correctly not work for an existing user with a bad password", (done) => {
        request(app)
            .post("/auth")
            .send({
                username: "premium-jim",
                password: "badpassword"
            })
            .expect("Content-Type", /json/)
            .expect(401, done);
    });

    it("should correctly not work for an existing user with no password", (done) => {
        request(app)
            .post("/auth")
            .send({
                username: "basic-thomas"
            })
            .expect("Content-Type", /json/)
            .expect(400, done);
    });

    it("should correctly not work for a non-existing user", (done) => {
        request(app)
            .post("/auth")
            .send({
                username: "iDontExist",
                password: "jesuis"
            })
            .expect("Content-Type", /json/)
            .expect(401, done);
    });

    it("should correctly not work for user without username and password", (done) => {
        request(app)
            .post("/auth")
            .send({})
            .expect("Content-Type", /json/)
            .expect(400, done);
    });
});