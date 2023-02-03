const { check, body } = require('express-validator');

const loginValid = () => {
	return [
		[
			check('Employee_Code')
				.trim()
				.not()
				.isEmpty()
				.withMessage('username can not be empty')
				.isLength({ min: 7 })
				.withMessage('username length should not be less than 7 characters'),
			check('Password')
				.trim()
				.not()
				.isEmpty()
				.withMessage('password can not be empty')
				.isLength({ min: 2 })
				.withMessage('password length should not be less than 2 characters'),
		],
	];
};

module.exports = {
	loginValid,
};
