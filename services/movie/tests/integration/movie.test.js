/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const mockAxios = require('axios');
const jwt = require('jsonwebtoken');
const server = require('../../src/server');
const { users, movies } = require('./fakeData');

describe('Movies Endpoint', () => {
	let mongo = null;
	let basicUserToken = '';
	let premiumUserToken = '';

	beforeAll(async () => {
		process.env.JWT_SECRET = 'SECRET';
		mongo = await MongoMemoryServer.create();
		const mongoUri = mongo.getUri();
		await mongoose.connect(mongoUri);
	});

	afterAll(async () => {
		await mongo.stop();
		await mongoose.connection.close();
	});

	beforeEach(async () => {
		const collections = await mongoose.connection.db.collections();

		for (const collection of collections) {
			await collection.deleteMany({});
		}

		basicUserToken = jwt.sign(
			{
				userId: users[0].id,
				name: users[0].name,
				role: users[0].role,
			},
			process.env.JWT_SECRET,
			{
				issuer: 'https://www.netguru.com/',
				subject: `${users[0].id}`,
				expiresIn: 30 * 60,
			}
		);

		premiumUserToken = jwt.sign(
			{
				userId: users[1].id,
				name: users[1].name,
				role: users[1].role,
			},
			process.env.JWT_SECRET,
			{
				issuer: 'https://www.netguru.com/',
				subject: `${users[1].id}`,
				expiresIn: 30 * 60,
			}
		);
	});

	describe('Post api payload', () => {
		it('should return 422 if title missing in post request', async () => {
			const responseToBo = { title: 'title is required' };
			await request(server)
				.post('/movies')
				.set('Authorization', `Bearer ${basicUserToken}`)
				.send()
				.expect(422)
				.then(response => {
					expect(responseToBo).toStrictEqual(response.body);
				});
		});
	});

	describe('Auth token', () => {
		it('should return 401 if user auth token missing', async () => {
			const title = 'Dune';
			const responseToBo = { message: 'Authorization token missing' };
			await request(server)
				.post('/movies')
				.send({ title })
				.expect(401)
				.then(response => {
					expect(responseToBo).toStrictEqual(response.body);
				});

			await request(server)
				.get('/movies')
				.expect(401)
				.then(response => {
					expect(responseToBo).toStrictEqual(response.body);
				});
		});

		it('should return 401 if user token is invalid', async () => {
			const title = 'Dune';
			const invalidToken = 'abc';
			const responseToBo = { message: 'Invalid token' };

			await request(server)
				.post('/movies')
				.set('Authorization', `Bearer ${invalidToken}`)
				.send({ title })
				.expect(401)
				.then(response => {
					expect(responseToBo).toStrictEqual(response.body);
				});

			await request(server)
				.get('/movies')
				.set('Authorization', `Bearer ${invalidToken}`)
				.expect(401)
				.then(response => {
					expect(responseToBo).toStrictEqual(response.body);
				});
		});
	});

	describe('Movies post request', () => {
		it('should create a new movie data with valid token and data', async () => {
			mockAxios.get.mockImplementationOnce(() => Promise.resolve(movies[0]));

			const title = movies[0].Title;

			await request(server)
				.post('/movies')
				.set('Authorization', `Bearer ${basicUserToken}`)
				.send({ title })
				.expect(201)
				.then(response => {
					expect({
						title: movies[0].Title,
						released: movies[0].Released,
						genre: movies[0].Genre,
						director: movies[0].Director,
						userId: users[0].id,
					}).toStrictEqual(response.body);
				});
		});

		it('should return 400, if movie already exist', async () => {
			mockAxios.get.mockImplementationOnce(() => Promise.resolve(movies[0]));

			const title = movies[0].Title;

			const responseToBo = { message: 'Already have this movie in list' };

			await request(server)
				.post('/movies')
				.set('Authorization', `Bearer ${basicUserToken}`)
				.send({ title })
				.expect(201);

			mockAxios.get.mockImplementationOnce(() => Promise.resolve(movies[0]));

			await request(server)
				.post('/movies')
				.set('Authorization', `Bearer ${basicUserToken}`)
				.send({ title })
				.expect(400)
				.then(response => {
					expect(responseToBo).toStrictEqual(response.body);
				});
		});

		it('should return 404, if movie not found', async () => {
			mockAxios.get.mockImplementationOnce(() =>
				Promise.resolve({
					Response: 'False',
					Error: 'Movie not found!',
				})
			);

			const title = 'abcdefghij';
			const responseToBo = { message: 'Movie not found' };

			await request(server)
				.post('/movies')
				.set('Authorization', `Bearer ${basicUserToken}`)
				.send({ title })
				.expect(404)
				.then(response => {
					expect(responseToBo).toStrictEqual(response.body);
				});

			mockAxios.get.mockImplementationOnce(() => Promise.reject());

			await request(server)
				.post('/movies')
				.set('Authorization', `Bearer ${basicUserToken}`)
				.send({ title })
				.expect(404)
				.then(response => {
					expect(responseToBo).toStrictEqual(response.body);
				});
		});

		it('should return 404, if any error happen in provider API call', async () => {
			const title = 'abcdefghij';
			const responseToBo = { message: 'Movie not found' };

			mockAxios.get.mockImplementationOnce(() => Promise.reject());

			await request(server)
				.post('/movies')
				.set('Authorization', `Bearer ${basicUserToken}`)
				.send({ title })
				.expect(404)
				.then(response => {
					expect(responseToBo).toStrictEqual(response.body);
				});
		});
	});

	describe('Basic user', () => {
		it('should allow to create 5 movies for basic user', async () => {
			const responseToBo = {
				message:
					'User not allow to save new movies, Already fill up this month quote',
			};

			for (let index = 0; index < movies.length; index += 1) {
				const movie = movies[index];

				mockAxios.get.mockImplementationOnce(() => Promise.resolve(movie));

				await request(server)
					.post('/movies')
					.set('Authorization', `Bearer ${basicUserToken}`)
					.send({ title: movie.Title })
					.expect(index === 5 ? 400 : 201)
					.then(response => {
						if (index === 5) {
							expect(responseToBo).toStrictEqual(response.body);
						} else {
							expect({
								title: movie.Title,
								released: movie.Released,
								genre: movie.Genre,
								director: movie.Director,
								userId: users[0].id,
							}).toStrictEqual(response.body);
						}
					});
			}
		});
	});

	describe('Premium user', () => {
		it('should allow to create All movies for premium user', async () => {
			for (let index = 0; index < movies.length; index += 1) {
				const movie = movies[index];
				mockAxios.get.mockImplementationOnce(() => Promise.resolve(movie));
				await request(server)
					.post('/movies')
					.set('Authorization', `Bearer ${premiumUserToken}`)
					.send({ title: movie.Title })
					.expect(201);
			}
		});
	});

	describe('Movie get request', () => {
		it('should result all the movie list for specific user', async () => {
			for (let index = 0; index < movies.length; index += 1) {
				const movie = movies[index];
				mockAxios.get.mockImplementationOnce(() => Promise.resolve(movie));
				await request(server)
					.post('/movies')
					.set('Authorization', `Bearer ${premiumUserToken}`)
					.send({ title: movie.Title })
					.expect(201);
			}

			await request(server)
				.get('/movies')
				.set('Authorization', `Bearer ${premiumUserToken}`)
				.send()
				.expect(200);
		});
	});
});
