const mongoose = require('mongoose');
const axios = require('axios');
const request = require('supertest');
const server = require('../server');
const mongoDbUrl = process.env.MONGODB_URL || 'mongodb://root:example@localhost:27017/?appname=MongoDB%20Compass&authSource=admin';
const { createTestMovies, clearDatabase } = require('./helpers/helpers');

const premiumCredentials = {
  username: 'premium-jim',
  password: 'GBLtTyq3E_UNjFnpo9m6'
};

const premiumUser = {
  userId: 434,
  name: 'Premium Jim',
  role: 'premium',
  iat: 1606221838,
  exp: 1606223638,
  iss: 'https://www.netguru.com/',
  sub: '434'
};
const basicUser = {
  userId: 123,
  name: 'Basic Thomas',
  role: 'basic',
  iat: 1606221838,
  exp: 1606223638,
  iss: 'https://www.netguru.com/',
  sub: '123'
};

let token = '';
describe('api tests', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      const authInfo = await axios.post('http://localhost:3000/auth', premiumCredentials);
      token = authInfo.data.token;
    } catch (e) {
      console.log(e);
    }
  });

  beforeEach(async () => {
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => await clearDatabase(basicUser, premiumUser));

  it('should return all the movies for an authenticated user', async () => {
    await createTestMovies(premiumUser);

    const response = await request(server)
      .get('/movies')
      .auth(token, { type: 'bearer' })
      .set({
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      });

    expect(response.body.length).toEqual(5);
    expect(response.status).toBe(200);
  });

  it('should not return movies for an un-authenticated entity', async () => {
    await createTestMovies(premiumUser);

    const response = await request(server)
      .get('/movies')
      .auth(token, { type: 'bearer' })
      .set({
        'content-type': 'application/json',
        Authorization: 'Bearer somerandomtoken'
      });

    expect(response.status).toEqual(401);
  });

  it('should create a movie for an authenticated user', async () => {
    const response = await request(server)
      .post('/movies')
      .auth(token, { type: 'bearer' })
      .set({
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      })
      .send({ title: 'Lord of the rings' });

    expect(response.status).toEqual(201);
  });
});
