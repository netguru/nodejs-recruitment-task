const request = require('supertest');
const app = require('../src/app');

describe('Auth API', () => {
  describe('POST /auth', () => {
    describe('Given a user and password', () => {
      let response;
      beforeAll(async () => {
        response = await request(app).post('/auth').send({
          username: 'basic-thomas',
          password: 'sR-_pcoow-27-6PAwCD8',
        });
      });

      test('should respond with a 200 status code', async () => {
        expect(response.statusCode).toBe(200);
      });

      test('should specify json in the content type header',
        async () => {
          expect(response.headers['content-type'])
            .toEqual(expect.stringContaining('application/json'));
        });

      test('should respond with a json object containing the jwt token',
        async () => {
          expect(response.body).toHaveProperty('token');
        });
    });

    describe('When the request body is empty', () => {
      let response;
      beforeAll(async () => {
        response = await request(app).post('/auth').send();
      });

      test('should respond with a 400 status code', async () => {
        expect(response.statusCode).toBe(400);
      });

      test('should respond with a json object containing the error message',
        async () => {
          expect(response.body).toHaveProperty('error');
          expect(response.body.error).toBe('Invalid payload');
        });
    });

    describe('When the username and password is missing', () => {
      test('should respond with a 401 status code', async () => {
        const requestBody = [
          {username: 'username'},
          {password: 'password'},
        ];

        for (const body of requestBody) {
          const {statusCode} = await request(app).post('/auth').send(body);
          expect(statusCode).toBe(401);
        }
      });

      test('should respond with a json object containing the error message',
        async () => {
          const requestBody = [
            {username: 'username'},
            {password: 'password'},
          ];

          for (const rbody of requestBody) {
            const {body} = await request(app).post('/auth').send(rbody);
            expect(body).toHaveProperty('error');
            expect(body.error).toBe('Invalid username or password');
          }
        });
    });
  });
});