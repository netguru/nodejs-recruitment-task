const PREMIUM = 'premium';
const BASIC = 'basic';

module.exports = (req, _, next) => {
	req.user.hasPremiumAccess = req.user.role === PREMIUM;
	req.user.hasBasicAccess = req.user.role === BASIC;

	next();
};
