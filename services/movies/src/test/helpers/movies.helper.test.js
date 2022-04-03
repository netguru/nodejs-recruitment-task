const { expect } = require('chai');
const { assert } = require('joi');
const MovieHelper = require('../../helpers/movies.helper');

describe('Movies helper', () => {
    it('returns  fetches data from OMDB API', async () => {
        const title = 'supergirl';
        const resp = await MovieHelper.getMovieDetails(title);
        expect(resp).to.include({ Title: 'Supergirl' });
    });

    it('returns false when movie is not found', async () => {
        const title = 'jhfhfhjfhjfhfhfhfh';
        const resp = await MovieHelper.getMovieDetails(title);
        expect(resp).to.be.false;
    });
});
