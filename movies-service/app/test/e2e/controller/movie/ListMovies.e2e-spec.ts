import {INestApplication} from "@nestjs/common";
import {getTestApp} from "@test/testModuleBuilder";
import {expect} from "chai";
import request from "supertest";
import {createUserToken} from "@test/helpers/createUserToken";
import {Configuration} from "@app/logic/service/configuration/Configuration";
import {UserRole} from "@app/model/user/User";
import {loadFixtures} from "@test/loadFixtures";

describe("List movies (e2e)", () => {
  let app: INestApplication;
  let configuration: Configuration;

  before(async () => {
    await loadFixtures();
    app = await getTestApp();
    configuration = app.get(Configuration);
  });

  after(async () => {
    await app.close();
  });

  it("List movies for user that has some movies", async () => {
    const user = createUserToken(300, configuration.jwtSecret, UserRole.basic);

    const res = await request(app.getHttpServer())
      .get("/movies?perPage=10")
      .set("Content-type", "application/json")
      .auth(user, { type: "bearer" });

    expect(res.status).eq(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).eq(10);
  });

  it("List movies for user that does not have any movies", async () => {
    const user = createUserToken(301, configuration.jwtSecret, UserRole.basic);

    const res = await request(app.getHttpServer())
      .get("/movies?perPage=10")
      .set("Content-type", "application/json")
      .auth(user, { type: "bearer" });

    expect(res.status).eq(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).eq(0);
  });

});
