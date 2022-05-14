module.exports = (req, res, next) => {
	req.routeData = { ...req.body, ...req.params, ...req.query };
	next();
};
