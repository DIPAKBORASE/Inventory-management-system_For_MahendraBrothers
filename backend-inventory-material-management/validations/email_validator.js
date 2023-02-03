const { check } = require('express-validator');

const saveValid = () => {
	return [
		[
			check('Email')
				.trim()
				.not()
				.isEmpty()
				.withMessage('email can not be empty')
				.isEmail()
				.withMessage('email is not valid'),
		],
	];
};

module.exports = {
	saveValid,
};
