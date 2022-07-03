import { INestApplication } from "@nestjs/common";
import { createUserToken } from "@test/helpers/createUserToken";
import { loadFixtures } from "@test/loadFixtures";
import { getTestApp } from "@test/testModuleBuilder";
import { expect } from "chai";
import { startOfDay } from "date-fns";
import { createSandbox } from "sinon";
import request from "supertest";

import { Configuration } from "@app/logic/service/configuration/Configuration";
import { OMDBApiClient } from "@app/logic/service/omdb/OMDBApiClient";
import { UserRole } from "@app/model/user/User";

describe("Create a movie (e2e)", () => {
  let app: INestApplication;
  let omdbClient: OMDBApiClient;
  let configuration: Configuration;
  const sandbox = createSandbox();
  //let fixtures: CreatedFixtures;

  before(async () => {
    await loadFixtures();
    app = await getTestApp();
    omdbClient = app.get(OMDBApiClient);
    configuration = app.get(Configuration);
  });

  after(async () => {
    await app.close();
  });

  afterEach(async () => {
    sandbox.restore();
  });

  it("Successfully create a movie", async () => {
    const omdbClientStub = sandbox.stub(omdbClient, "fetchDataByTitle");
    const omdbReturningPayload = {
      Title: "title",
      Genre: "genre",
      Director: "director",
      Released: "25 Jun 1982", // format used in omdb
    };
    omdbClientStub.returns(Promise.resolve(omdbReturningPayload));

    const user = createUserToken(1, configuration.jwtSecret, UserRole.basic);

    const res = await request(app.getHttpServer())
      .post("/movies")
      .set("Content-type", "application/json")
      .auth(user, { type: "bearer" })
      .send({ title: "Test" });

    expect(res.status).eq(201);
    expect(res.body.title).eq(omdbReturningPayload.Title);
    expect(res.body.genre).eq(omdbReturningPayload.Genre);
    expect(res.body.director).eq(omdbReturningPayload.Director);
    expect(startOfDay(new Date(res.body.releasedAt)).getTime()).eq(
      startOfDay(new Date(omdbReturningPayload.Released)).getTime()
    );
  });

  it("Fail to create a movie without authorization", async () => {
    const res = await request(app.getHttpServer())
      .post("/movies")
      .set("Content-type", "application/json")
      .send({ title: "Test" });

    expect(res.status).eq(403);
  });

  it("Fail to create a movie because of quota depletion", async () => {
    const omdbClientStub = sandbox.stub(omdbClient, "fetchDataByTitle");
    const omdbReturningPayload = {
      Title: "title",
      Genre: "genre",
      Director: "director",
      Released: "25 Jun 1982", // format used in omdb
    };
    omdbClientStub.returns(Promise.resolve(omdbReturningPayload));

    const user = createUserToken(2, configuration.jwtSecret, UserRole.basic);

    for (let i = 0; i < 5; i++) {
      const res = await request(app.getHttpServer())
        .post("/movies")
        .set("Content-type", "application/json")
        .auth(user, { type: "bearer" })
        .send({ title: "Test" });
      expect(res.status).eq(201);
    }

    const res = await request(app.getHttpServer())
      .post("/movies")
      .set("Content-type", "application/json")
      .auth(user, { type: "bearer" })
      .send({ title: "Test" });

    expect(res.status).eq(400);
  });

  it("Allow to create a movie even over limit for premium users", async () => {
    const omdbClientStub = sandbox.stub(omdbClient, "fetchDataByTitle");
    const omdbReturningPayload = {
      Title: "title",
      Genre: "genre",
      Director: "director",
      Released: "25 Jun 1982", // format used in omdb
    };
    omdbClientStub.returns(Promise.resolve(omdbReturningPayload));

    const user = createUserToken(3, configuration.jwtSecret, UserRole.premium);

    for (let i = 0; i < 5; i++) {
      const res = await request(app.getHttpServer())
        .post("/movies")
        .set("Content-type", "application/json")
        .auth(user, { type: "bearer" })
        .send({ title: "Test" });
      expect(res.status).eq(201);
    }

    const res = await request(app.getHttpServer())
      .post("/movies")
      .set("Content-type", "application/json")
      .auth(user, { type: "bearer" })
      .send({ title: "Test" });

    expect(res.status).eq(201);
  });
});
