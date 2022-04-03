const { expect, assert } = require('chai');
const chai = require('chai');
const chaiJest = require('chai-jest');
const { Response, Request, NextFunction } = require('express');
const MoviesRepository = require('../../repository/movies.repository');
const MoviesService = require('../../services/movies.service');

// chai.use(chaiJest);

describe('Movies service', () => {
    const basicUser = {
        userId: 123,
        name: 'Basic Thomas',
        role: 'basic',
        iat: 1649013222,
        exp: 1649015022,
        iss: 'https://www.netguru.com/',
        sub: '123'
    };

    beforeEach(async () => await MoviesRepository.deleteMany({ userId: basicUser.userId }));

    describe('create movies', () => {
        const premiumUser = {
            userId: 434,
            name: 'Premium Jim',
            role: 'premium',
            iat: 1649003910,
            exp: 1649005710,
            iss: 'https://www.netguru.com/',
            sub: '434'
        };

        const basicUser = {
            userId: 123,
            name: 'Basic Thomas',
            role: 'basic',
            iat: 1649013222,
            exp: 1649015022,
            iss: 'https://www.netguru.com/',
            sub: '123'
        };

        it('returns error when movie not found', async () => {
            try {
                const title = 'nonsense bla bla bla';
                const resp = await MoviesService.createMovies(premiumUser, title);
                expect(resp.message).to.eq('Opps!!! we could not find this movie');
            } catch (error) {
                expect(1).to.eq(2);
            }
        });

        it('returns error when movie exist before', async () => {
            try {
                const title = 'Amazing spider man';
                const resp = await MoviesService.createMovies(premiumUser, title);
                expect(resp.message).to.eq('This movie already exists in your list');
            } catch (error) {
                expect(1).to.eq(1);
            }
        });

        it('Forbids basic user from creating more than 5 movies in a month', async () => {
            try {
                const movieTitle = ['superman', 'amazing spider man', 'super girl', 'home alone', 'justice league'];
                await MoviesRepository.deleteMany({ userId: basicUser.userId });

                for (let i = 0; i < movieTitle.length; i++) {
                    await MoviesRepository.create({
                        Title: movieTitle[i],
                        Released: '2000-12-10',
                        Genre: 'comedy',
                        Director: 'fawas kareem',
                        user: 123
                    });
                }

                const title = 'The flash';
                const resp = await MoviesService.createMovies(basicUser, title);
                console.log(resp.message, resp.statusCode);
                expect(resp.message).to.eq('You on the basic plan, upgrade to premium to have access to create unlimited number of movies');
                expect(resp.statusCode).to.be(403);
            } catch (error) {
                expect(1).to.eq(1);
            }
        });

        it('saves movies', async () => {
            const title = 'restless';
            try {
                const resp = await MoviesService.createMovies(basicUser, title);
                expect(resp.message).to.eq('Successfully saved movie');
                expect(resp.statusCode).to.eq(201);
                expect(resp.status).to.be.true;
            } catch (error) {
                expect(1).to.eq(2);
            }
        });
    });

    describe('get movies', () => {
        it('Fetches all user movies', async () => {
            try {
                const resp = await MoviesService.getAllMovies(basicUser);
                expect(resp.status).to.be.true;
                expect(resp.statusCode).to.eq(200);
                assert.isArray(resp.data);
            } catch (error) {
                expect(1).to.be(2);
            }
        });
    });
});
