module.exports = {
	port: process.env.PORT,
	isProduction: process.env.NODE_ENV === 'production',
	isDevelopment: process.env.NODE_ENV !== 'production',
	siteOriginURL: process.env.SITE_ORIGIN_URL,
	jwtSecret: process.env.JWT_SECRET,
	mongoDbUrl: process.env.MONGODB_URL,
	omdbUrl: process.env.OMDB_URL,
	omdbApiKey: process.env.OMDB_API_KEY,
	basicUserMovieUploadCount: 5,
};
