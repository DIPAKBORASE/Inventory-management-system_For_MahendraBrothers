const { check } = require('express-validator');

const saveValid = () => {
	return [
		[
			check('OTP')
				.trim()
				.not()
				.isEmpty()
				.withMessage('otp can not be empty')
				.isNumeric()
				.withMessage('otp is not valid'),
		],
	];
};

module.exports = {
	saveValid,
};
