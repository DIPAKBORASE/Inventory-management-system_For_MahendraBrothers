const { check } = require('express-validator');

const statusValid = () => {
	return [
		[
			check('Status')
				.trim()
				.not()
				.isEmpty()
				.withMessage('status can not be empty'),
		],
	];
};
module.exports = {
	statusValid,
};
