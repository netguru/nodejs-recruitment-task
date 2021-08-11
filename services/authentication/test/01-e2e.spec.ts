import request from 'supertest';
import app from '../src/app';

const api = request(app);

describe('E2E tests', () => {
  it(`400 expected after calling with no credentials`, (done) => {
    api
      .post('/auth')
      .expect(400)
      .end((err) => {
        if (err) done(err);
        else done();
      });
  });
});
