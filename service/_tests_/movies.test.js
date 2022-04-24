const Movie  = require("../../schema/movie");
const app  = require("../../src/server");
const request = require('supertest');

jest.setTimeout(30000);
jest.useFakeTimers();

describe("Test example of movies", () => {
  test("GET /", async(done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      expect(response.statusCode).toBe(200); 
      expect(response.body.message).toBe('pass!')
      done(); 
  });
  test("GET /movies", async() => {
    const movies = await Movie.find();
    request(app)
      .get("/movies")
      .expect("Content-Type", /json/)
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(res.text).data[0].title).toBe(movies[0].title);
      expect(JSON.parse(res.text).data[0].released).toBe(movies[0].released);
      expect(JSON.parse(res.text).data[0].director).toBe(movies[0].director);
      expect(JSON.parse(res.text).data[0].genre).toBe(movies[0].genre);    
  });

  test("GET /auth/movies", async() => {
    const movies = await Movie.find();
    request(app)
      .get("/auth/movies")
      .send({
              title : "Batman",
              released: "23 Jun 1989",
              genre: "Action, Adventure",
              director: "Tim Burton"
        })
      .expect("Content-Type", /json/)
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(res.text).data[0].title).toBe(movies[0].title);
      expect(JSON.parse(res.text).data[0].genre).toBe(movies[0].genre); 
      expect(JSON.parse(res.text).data[0].released).toBe(movies[0].released);
      expect(JSON.parse(res.text).data[0].director).toBe(movies[0].director);   
  });


  test("POST /auth/login", async() => {
    const movies = await Movie.find();
    request(app)
      .get("/auth/login")
      .send({
          username: "basic-thomas",
          password: "sR-_pcoow-27-6PAwCD8"
        })
      .expect("Content-Type", /json/)
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
      expect(JSON.parse(res.text).data[0].username).toBe(movies[0].username);
      expect(JSON.parse(res.text).data[0].password).toBe(movies[0].password);
      expect(response.body.id).toBeDefined();    
  });


  test("POST /auth/register", async() => {
    const movies = await Movie.find();
    request(app)
      .get("/auth/register")
      .send({
        username: "Testing Movie",
        password: "sseeeee",
        title: "User Log In Created Movie 2",
        released: "23 April 2022",
        genre: "Trying 3 MD3",
        director: "myself 3"
      })
      .expect("Content-Type", /json/)
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(res.text).data[0].username).toBe(movies[0].username);
      expect(JSON.parse(res.text).data[0].password).toBe(movies[0].password); 
      expect(JSON.parse(res.text).data[0].title).toBe(movies[0].title);
      expect(JSON.parse(res.text).data[0].released).toBe(movies[0].released);
      expect(JSON.parse(res.text).data[0].genre).toBe(movies[0].genre); 
      expect(JSON.parse(res.text).data[0].director).toBe(movies[0].director);      
  });
});



