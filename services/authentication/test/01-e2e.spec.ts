import request from 'supertest';
import { errorResponseMessages } from '../../../shared/src/utils/errors';
import { users } from '../../../shared/src/utils/utils';
import app from '../src/app';

const api = request(app);

describe('E2E tests /auth', () => {
  it(`Expected 400 after calling with empty body`, (done) => {
    api
      .post('/auth')
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ error: errorResponseMessages.invalidPayload });
      })
      .end(done);
  });

  it(`Expected 400 after calling with empty username`, (done) => {
    api
      .post('/auth')
      .send({ username: '', password: 'a' })
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ error: errorResponseMessages.invalidPayload });
      })
      .end(done);
  });

  it(`Expected 400 after calling with empty password`, (done) => {
    api
      .post('/auth')
      .send({ username: 'a', password: '' })
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ error: errorResponseMessages.invalidPayload });
      })
      .end(done);
  });

  it(`Expected 400 after calling with empty credentials`, (done) => {
    api
      .post('/auth')
      .send({ username: '', password: '' })
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual({ error: errorResponseMessages.invalidPayload });
      })
      .end(done);
  });

  it(`Expected 401 after calling with bad username`, (done) => {
    const user = { username: 'a', password: users[0].password };

    api
      .post('/auth')
      .send(user)
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({ error: errorResponseMessages.invalidUsernamePassword });
      })
      .end(done);
  });

  it(`Expected 401 after calling with bad password`, (done) => {
    const user = { username: users[0].username, password: 'a' };

    api
      .post('/auth')
      .send(user)
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({ error: errorResponseMessages.invalidUsernamePassword });
      })
      .end(done);
  });

  it(`Expected 401 after calling with bad credentials`, (done) => {
    api
      .post('/auth')
      .send({ username: 'a', password: 'a' })
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({ error: errorResponseMessages.invalidUsernamePassword });
      })
      .end(done);
  });

  it(`Expected token after calling with basic credentials`, (done) => {
    api
      .post('/auth')
      .send(users[0])
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
      })
      .end(done);
  });

  it(`Expected token after calling with premium credentials`, (done) => {
    api
      .post('/auth')
      .send(users[0])
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
      })
      .end(done);
  });
});
