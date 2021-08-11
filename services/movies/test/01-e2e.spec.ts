import request from 'supertest';
import app from '../src/app/app';

const api = request(app);

describe('E2E tests', () => {
  it(`401 expected after calling with no credentials`, (done) => {
    api
      .post('/movies')
      .expect(401)
      .end((err) => {
        if (err) done(err);
        else done();
      });
  });
});
