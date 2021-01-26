const expect = require("chai").expect;
const server = require("../../src/server");
const request = require("supertest")(server);
const pick = require("lodash/pick");
const users = require("../fixtures/users");
const faker = require("faker");
const errorResponses = require('../fixtures/errorResponses');

describe("authorization API", () => {
  const premiumUser = pick(users[1], ["username", "password"]);
  const basicUser = pick(users[0], ["username", "password"]);
  const userWithWrongPassword = {
    username: basicUser.username,
    password: basicUser.password + faker.random.number(),
  };
  it("empty request should respond with 404 code", (done) => {
    request.post("/auth").end((err, response) => {
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.deep.equal(errorResponses.invalidPayload);
    });
    done();
  });

  it("basic user", (done) => {
    request
      .post("/auth")
      .set("Accept", "application/json")
      .send(basicUser)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property("token");
      });
    done();
  });

  it("premium user user", (done) => {
    request
      .post("/auth")
      .set("Accept", "application/json")
      .send(premiumUser)
      .end((err, response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property("token");
      });
    done();
  });

  it("wrong password", (done) => {
    request
      .post("/auth")
      .set("Accept", "application/json")
      .send(userWithWrongPassword)
      .end((err, response) => {
        expect(response.statusCode).to.equal(401);
        expect(response.body).to.deep.equal(errorResponses.invalidCredentials);
      });
    done();
  });

  it("empty credentials", (done) => {
    request
      .post("/auth")
      .set("Accept", "application/json")
      .send({username: "", password: ""})
      .end((err, response) => {
        expect(response.statusCode).to.equal(400);
        expect(response.body).to.deep.equal(errorResponses.invalidPayload);
      });
    done();
  });
});
