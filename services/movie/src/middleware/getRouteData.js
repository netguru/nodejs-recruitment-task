const getRouteData = (req, res, next) => {
	let params;

	switch (req.method) {
		case 'GET':
			params = { ...req.query, ...req.params };
			break;
		case 'POST':
		case 'PUT':
		case 'PATCH':
		case 'UPDATE':
		case 'DELETE':
			params = { ...req.body, ...req.params };
			break;

		default:
			params = {};
			break;
	}

	req.routeData = params;

	next();
};

module.exports = getRouteData;
