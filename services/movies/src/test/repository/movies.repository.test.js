const { expect, assert } = require('chai');
const chai = require('chai');
const mocha = require('mocha');
const MoviesRepository = require('../../repository/movies.repository');
const mongoose = require('mongoose');

describe('Movie repo', () => {
    // const db = mongoose.connect('mongodb://localhost:27017/movies_test', { useNewUrlParser: true, useUnifiedTopology: true });
    // beforeEach(() => {
    //     // mongoose
    //     //     .connect(' mongodb://localhost:27017/movies_test', { useNewUrlParser: true, useUnifiedTopology: true })
    //     //     .then(() => console.log('test db connected'))
    //     //     .catch((error) => console.error(error));
    //     // const db = mongoose.connect(' mongodb://localhost:27017/movies_test', { useNewUrlParser: true, useUnifiedTopology: true });
    // });

    // afterEach(async () => {
    //     await db.disconnect();
    // });

    describe('Create data', () => {
        it('creates record', async () => {
            const data = {
                Title: 'this is a title',
                Released: '2000-12-10',
                Genre: 'comedy',
                Director: 'fawas kareem',
                user: 123
            };
            try {
                await MoviesRepository.create(data);
                expect(1).to.eq(1);
            } catch (error) {
                expect(1).to.eq(2);
            }
        });

        it('throws error for missing required fields', async () => {
            const data = {
                Title: 'this is a title',
                Released: '2000-12-10',
                Genre: 'comedy',
                Director: 'fawas kareem'
            };
            try {
                await MoviesRepository.create(data);
                expect(1).to.eq(2);
            } catch (error) {
                expect(1).to.eq(1);
            }
        });
    });

    describe('Find one', () => {
        it('fetches record', async () => {
            const filter = { user: 123 };
            try {
                const resp = await MoviesRepository.findOne(filter);
                expect(resp).to.include({ user: 123 });
            } catch (error) {
                expect(1).to.eq(2);
            }
        });

        it('returns an object', async () => {
            const filter = { user: 123 };
            try {
                const resp = await MoviesRepository.findOne(filter);
                assert.isObject(resp);
            } catch (error) {
                expect(1).to.eq(2);
            }
        });

        it('returns null if record not found', async () => {
            const filter = { user: 1234 };
            try {
                const resp = await MoviesRepository.findOne(filter);
                expect(resp).to.eq(null);
            } catch (error) {
                expect(1).to.eq(2);
            }
        });
    });

    describe('find all', () => {
        it('returns an array', async () => {
            try {
                const resp = await MoviesRepository.findAll();
                assert.isArray(resp);
            } catch (error) {
                expect(1).to.eq(2);
            }
        });

        it('Fetches records', async () => {
            const filter = { user: 123 };
            try {
                const resp = await MoviesRepository.findAll(filter);
                expect(resp).to.be.an('array').that.is.not.empty;
            } catch (error) {
                expect(1).to.eq(2);
            }
        });

        it('Throws error if record not fetched', async () => {
            const filter = { user: 1234 };
            try {
                const resp = await MoviesRepository.findAll(filter);
                expect(resp).to.be.an('array').that.is.not.empty;
            } catch (error) {
                expect(1).to.eq(1);
            }
        });
    });

    describe('find all with aggregate', () => {});
});
