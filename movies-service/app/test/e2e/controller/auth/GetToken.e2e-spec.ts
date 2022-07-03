import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { loadFixtures } from "@test/loadFixtures";
import { getTestApp } from "@test/testModuleBuilder";
import { expect } from "chai";
import { createSandbox } from "sinon";
import request from "supertest";

import { AuthServiceApiClient } from "@app/logic/service/auth/AuthServiceApiClient";

describe("Get a token (e2e)", () => {
  let app: INestApplication;
  let authServiceApiClient: AuthServiceApiClient;
  const sandbox = createSandbox();
  //let fixtures: CreatedFixtures;

  before(async () => {
    await loadFixtures();
    app = await getTestApp();
    authServiceApiClient = app.get(AuthServiceApiClient);
  });

  after(async () => {
    await app.close();
  });

  afterEach(async () => {
    sandbox.restore();
  });

  it("Get a token", async () => {
    const authStub = sandbox.stub(authServiceApiClient, "getToken");
    const authTokenResponse = {
      token: "token",
    };
    authStub.returns(Promise.resolve(authTokenResponse));

    const res = await request(app.getHttpServer())
      .post("/auth/token")
      .set("Content-type", "application/json")
      .send({ username: "User", password: "Pass" });

    expect(res.status).eq(201);
    expect(res.body.token).eq(authTokenResponse.token);
  });

  it("Fail to get token", async () => {
    const authStub = sandbox.stub(authServiceApiClient, "getToken");
    authStub.throws(new UnauthorizedException());

    const res = await request(app.getHttpServer())
      .post("/auth/token")
      .set("Content-type", "application/json")
      .send({ username: "User", password: "Pass" });

    expect(res.status).eq(401);
  });
});
