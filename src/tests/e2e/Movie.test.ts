// import axios from "axios";
import { config } from "dotenv-safe";
import { Express } from "express";
import path from "path";
import fs from "fs";
import request from "supertest";
import { MAX_MOVIES_BASIC_PER_MONTH } from "../../constants";
import { getApp } from "../utils/getApp";
import axios from "axios";

if (process.env.NODE_ENV === "CI") {
  config({ allowEmptyValues: true });
}

// here OMDB's api key is used
// hence we mock axios so actual API call is not made
jest.mock("axios");

let app: Express;
let dbFile: string;
let teardown: Function;
let jwtBasicPlan: string;
let jwtPremiumPlan: string;

describe("Movie API", () => {
  beforeAll(async () => {
    // @ts-ignore
    axios.create.mockReturnThis();
    // @ts-ignore
    axios.get.mockResolvedValue({
      data: {
        Title: "Harry Potter and the Deathly Hallows: Part 2",
        Year: "2011",
        Released: "15 Jul 2011",
        Genre: "Adventure, Fantasy, Mystery",
        Director: "David Yates",
      },
    });

    const { dbFile: _dbFile, teardown: _teardown, app: _app } = await getApp();
    app = _app;
    dbFile = _dbFile;
    teardown = _teardown;
    // in a real-world scenario, JWT tokens can be saved as env variables
    // and used here directly
    let resp = await request(app).post("/api/auth/login").send({
      username: "basic-thomas",
      password: "sR-_pcoow-27-6PAwCD8",
    });
    jwtBasicPlan = resp.body.token;
    resp = await request(app).post("/api/auth/login").send({
      username: "premium-jim",
      password: "GBLtTyq3E_UNjFnpo9m6",
    });
    jwtPremiumPlan = resp.body.token;
  });

  afterAll(async () => {
    await teardown();
    fs.unlinkSync(path.join(__dirname, "../../../", dbFile));
  });

  test("POST /movie saves a movie", async () => {
    await request(app)
      .post("/api/movie")
      .send({
        title: "harry",
      })
      .set("Authorization", `Bearer ${jwtPremiumPlan}`)
      .expect(200);
  });

  test("POST /movie sends error when incorrect data is given", async () => {
    await request(app)
      .post(`/api/movie`)
      .send({})
      .set("Authorization", `Bearer ${jwtPremiumPlan}`)
      .expect(400);
  });

  test("POST /movie throttles basic plan users", async () => {
    for (let i = 1; i <= MAX_MOVIES_BASIC_PER_MONTH; i++) {
      await request(app)
        .post("/api/movie")
        .send({
          title: "harry",
        })
        .set("Authorization", `Bearer ${jwtBasicPlan}`)
        .expect(200);
    }

    await request(app)
      .post("/api/movie")
      .send({
        title: "harry",
      })
      .set("Authorization", `Bearer ${jwtBasicPlan}`)
      .expect(400);
  });

  test("POST /movie deos not throttle premium plan users", async () => {
    for (let i = 1; i <= MAX_MOVIES_BASIC_PER_MONTH; i++) {
      await request(app)
        .post("/api/movie")
        .send({
          title: "harry",
        })
        .set("Authorization", `Bearer ${jwtPremiumPlan}`)
        .expect(200);
    }

    await request(app)
      .post("/api/movie")
      .send({
        title: "harry",
      })
      .set("Authorization", `Bearer ${jwtPremiumPlan}`)
      .expect(200);
  });

  test("GET /movie returns list of all movies by a user", async () => {
    const resp = await request(app)
      .get("/api/movie")
      .set("Authorization", `Bearer ${jwtPremiumPlan}`)
      .expect(200);
    expect(resp.body).toBeInstanceOf(Array);
    const userId = resp.body[0].userId;
    expect(resp.body[0].userId).toBeTruthy();
    // no other userId be present in the list
    expect(resp.body.find((m: any) => m.userId !== userId)).toBeFalsy();
  });
});
