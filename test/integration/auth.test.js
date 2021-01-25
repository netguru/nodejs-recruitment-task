const expect = require("chai").expect;
const server = require("../../src/server");
const request = require("supertest")(server); // 

describe("authorization API", () => {
  it("empty request should respond with 404 code", (done) => {
      request.post('/api/auth').end((err,response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.empty;
      })
    done();
  });
});
