const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../models');

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.body.token) {
		token = req.body.token;
	} else if (req.cookies.token) {
		token = req.cookies.token;
	}
	if (!token) return next(new ErrorResponse(`You are not Authorized.`, 401));

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await db.user.findByPk(decoded.id);
		if (process.env.NODE_ENV === 'development') {
			// console.log('setting user', req.user, token, decoded.id);
		}
		next();
	} catch (error) {
		return next(new ErrorResponse(`You are not Authorized.`, 401));
	}
});

exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.User_Type)) {
			return next(
				new ErrorResponse(
					`User role ${req.user.User_Type} is not authorized to access this route`,
					403
				)
			);
		}
		next();
	};
};
