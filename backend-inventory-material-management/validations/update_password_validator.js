const { check } = require('express-validator');

const saveValid = () => {
	return [
		[
			check('New_Password')
				.trim()
				.not()
				.isEmpty()
				.withMessage('new password can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'new password length should not be less than 2 characters or greater than 50 characters'
				),
		],
	];
};

module.exports = {
	saveValid,
};
