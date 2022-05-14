class ErrorHandler {
	async asyncError(handler) {
		this.result = null;
		this.error = null;

		try {
			this.result = await handler;
		} catch (e) {
			this.error = e;
		}

		return [this.result, this.error];
	}
}

module.exports = ErrorHandler;
