const mongoose = require('mongoose');
const MovieService = require('../services/movie-service');
const MovieRepository = require('../database/movie-repository');
const { createTestMovies, clearDatabase } = require('./helpers/helpers');
const { mongoDbUrl } = require('../config/config');

const basicUser = {
  userId: 123,
  name: 'Basic Thomas',
  role: 'basic',
  iat: 1606221838,
  exp: 1606223638,
  iss: 'https://www.netguru.com/',
  sub: '123'
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

describe('movies tests', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
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

  it('should create a movie in the database', async () => {
    const title = 'Stargate';

    await MovieService.createMovie(title, basicUser);

    const movies = await MovieRepository.findByTitleAndUserId(title, basicUser.userId);

    expect(movies.length).toBe(1);
  });

  it('should not allow a basic user to create more than 5 movies', async () => {
    await createTestMovies(basicUser);

    try {
      await MovieService.createMovie('X-Men', basicUser);
    } catch (e) {
      expect(e.message).toBe('The user is not allowed to create more than 5 movies per month');
    }
  });

  it('should not return an error if a premium user tries to create more than 5 movies', async () => {
    console.log('create movies');
    await createTestMovies(premiumUser);

    try {
      await MovieService.createMovie('X-Men', premiumUser);
      console.log('find movies by user id');
      const movies = await MovieRepository.findByUserId(premiumUser.userId);

      console.log(movies);
      expect(movies.length).toEqual(6);
    } catch (e) {
      console.log(e);
    }
  });
});
