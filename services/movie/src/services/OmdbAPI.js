const { ErrorHandler, omdbAPIRequest } = require('../helper');

class OmdbAPI extends ErrorHandler {
	async getDetails(title) {
		const [result, error] = this.asyncError(
			omdbAPIRequest({
				method: 'get',
				params: {
					t: title,
				},
			})
		);

		if (error) {
			return {};
		}

		return result;
	}
}

module.exports = OmdbAPI;
