const { ErrorHandler, omdbAPIRequest } = require('../helper');

class OmdbAPI extends ErrorHandler {
	async getDetails(title) {
		const [result, error] = await this.asyncError(
			omdbAPIRequest.get('/', {
				params: {
					t: title,
				},
			})
		);

		// if result have error or response false in it's object, in that case movie not available
		if (error || result?.Error || result?.Response === 'False') {
			return null;
		}

		return result;
	}
}

module.exports = OmdbAPI;
