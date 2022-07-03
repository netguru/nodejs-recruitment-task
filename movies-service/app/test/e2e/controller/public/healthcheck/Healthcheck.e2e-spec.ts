import { INestApplication } from "@nestjs/common";
import { getTestApp } from "@test/testModuleBuilder";
import { expect } from "chai";
import request from "supertest";

describe("Get result of HealthCheck endpoint (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getTestApp();
  });

  after(async () => {
    await app.close();
  });

  it("Get the result of /healthcheck", async () => {
    const res = await request(app.getHttpServer()).get("/healthcheck").set("Accept", "application/json");

    expect(res.status).eq(200);
    expect(res.text).eq("OK");
  });
});
