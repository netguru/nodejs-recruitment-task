const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const dbConnect = require('../src/db');

describe('Movies API', () => {
  beforeAll(async () => {
    await dbConnect('test_movie');
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe('GET /movies', () => {
    describe('Missing athorization', () => {
      test('should respond with a 400 status code', async () => {
        const {statusCode} = await request(app).get('/movies');
        expect(statusCode).toBe(400);
      });

      test('should respond with a json object containing the error message',
        async () => {
          const {body} = await request(app).get('/movies');
          expect(body).toHaveProperty('error');
          expect(body.error).toBe('Invalid token');
        });
    });

    describe('Token expired', () => {
      test('should respond with a json object containing the error message',
        async () => {
          // eslint-disable-next-line max-len
          const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0NzYyMjY3NCwiZXhwIjoxNjQ3NjI0NDc0LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.U7sqpDv46j7BKaxV9fV-1e2bT2OzF3TQ5WEH8etqcf0';

          const response = await request(app)
          .get('/movies')
          .set('Authorization', 'Bearer ' + expiredToken);
          
          expect(response.statusCode).toBe(401);
          expect(response.body).toHaveProperty('error');
          expect(response.body.error).toBe('Token expired');
        });
    });

    describe('Retrieve movie list by user', () => {
      test('should return correct number of movie list', async () => {
        const user = {
          id: 123,
          name: 'Basic Thomas',
          role: 'basic',
        }
        const token = jwt.sign(
          {
            userId: user.id,
            name: user.name,
            role: user.role,
          },
          'secret',
          {
            issuer: 'https://www.netguru.com/',
            subject: `${user.id}`,
            expiresIn: 30 * 60,
          },
        );
        
        const requestBody = [
          {title: 'The Batman'},
          {title: 'Spider-Man: No Way Home'},
        ];

        for (const rbody of requestBody) {
          // create movie
          await request(app).post('/movies')
            .set('Authorization', 'Bearer ' + token)
            .send(rbody);
        }

        const {body, statusCode} = await request(app).get('/movies')
          .set('Authorization', 'Bearer ' + token);

        expect(statusCode).toBe(200);
        expect(body.data.length).toBe(requestBody.length);

        for (const data of body.data) {
          expect(data).toHaveProperty('title');
          const strRegEx = `(${requestBody[0].title}|${requestBody[1].title})`;
          expect(data.title).toMatch(new RegExp(strRegEx, 'i'));
        }
      });
    });
  });

  describe('POST /movies', () => {
    describe('Create movie with a basic user', () => {
      let token;
      beforeAll(async () => {
        const user = {
          id: 123,
          name: 'Basic Thomas',
          role: 'basic',
        }
        token = jwt.sign(
          {
            userId: user.id,
            name: user.name,
            role: user.role,
          },
          'secret',
          {
            issuer: 'https://www.netguru.com/',
            subject: `${user.id}`,
            expiresIn: 30 * 60,
          },
        );
      });

      describe('Invalid title', () => {
        let response;
        beforeAll(async () => {
          response = await request(app).post('/movies')
            .set('Authorization', 'Bearer ' + token)
            .send({
              test: 'test',
            });
        });

        test('should respond with a 400 status code', async () => {
          expect(response.statusCode).toBe(400);
        });

        test('should respond with a json object containing the error message',
          async () => {
            expect(response.body.success).toBe(false);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Invalid title');
          });
      });

      describe('Movie not found', () => {
        let response;
        beforeAll(async () => {
          response = await request(app).post('/movies')
            .set('Authorization', 'Bearer ' + token)
            .send({
              title: '123456789',
            });
        });

        test('should respond with a 404 status code', async () => {
          expect(response.statusCode).toBe(404);
        });

        test('should respond with a json object containing the error message',
          async () => {
            expect(response.body.success).toBe(false);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Movie not found');
          });
      });

      describe('Movie creation successful', () => {
        let response;
        beforeAll(async () => {
          response = await request(app).post('/movies')
            .set('Authorization', 'Bearer ' + token)
            .send({
              title: 'The Batman',
            });
        });

        test('should respond with a 201 status code', async () => {
          expect(response.statusCode).toBe(201);
        });

        test('should respond with a json object with the data information',
          async () => {
            const body = response.body;
            const data = body.data;
            expect(body.success).toBe(true);
            expect(body).toHaveProperty('data');
            expect(data).toHaveProperty('title', 'The Batman');
            expect(data).toHaveProperty('creator', 123);
            expect(data).toHaveProperty('director', 'Matt Reeves');
            expect(data).toHaveProperty('genre', 'Action, Crime, Drama');
            expect(data).toHaveProperty('releasedDate');
            expect(data).toHaveProperty('createdAt');
            expect(data).toHaveProperty('_id');
          });
      });

      describe('Creation limit of 5 movies per month', () => {
        test('should not be able to create a movie more than 5', async () => {
          const requestBody = [
            {title: 'The Batman'},
            {title: 'Spider-Man: No Way Home'},
            {title: 'The Flash'},
            {title: 'Man of Steel'},
            {title: 'Green Lantern'},
          ];

          for (const rbody of requestBody) {
            // create movie
            await request(app).post('/movies')
              .set('Authorization', 'Bearer ' + token)
              .send(rbody);
          }

          // create movie
          const {body, statusCode}= await request(app).post('/movies')
            .set('Authorization', 'Bearer ' + token)
            .send({title: 'Iron Man'},
            );

          expect(statusCode).toBe(422);
          expect(body.success).toBe(false);
          expect(body).toHaveProperty('error');
          expect(body.error).toBe('User monthly limit reached');
        });
      });
    });

    describe('Create movie with a premium user', () => {
      let token;
      beforeAll(async () => {
        const user = {
          id: 434,
          name: 'Premium Jim',
          role: 'premium',
        }
        token = jwt.sign(
          {
            userId: user.id,
            name: user.name,
            role: user.role,
          },
          'secret',
          {
            issuer: 'https://www.netguru.com/',
            subject: `${user.id}`,
            expiresIn: 30 * 60,
          },
        );
      });

      describe('Unlimited creating of movies', () => {
        test('should be able to create movies with no limit', async () => {
          const requestBody = [
            {title: 'The Batman'},
            {title: 'Spider-Man: No Way Home'},
            {title: 'The Flash'},
            {title: 'Man of Steel'},
            {title: 'Green Lantern'},
          ];

          for (const rbody of requestBody) {
            // create movie
            await request(app).post('/movies')
              .set('Authorization', 'Bearer ' + token)
              .send(rbody);
          }

          // create movie
          const {body, statusCode}= await request(app).post('/movies')
            .set('Authorization', 'Bearer ' + token)
            .send({title: 'Iron Man'},
            );

          expect(statusCode).toBe(201);
          expect(body.success).toBe(true);
        });
      });
    });
  });
});
