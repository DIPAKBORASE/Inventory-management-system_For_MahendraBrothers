const { check } = require('express-validator');

const saveValid = () => {
	return [
		[
			check('Name')
				.trim()
				.not()
				.isEmpty()
				.withMessage('name can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'name length should not be less than 2 characters or greater than 50 characters'
				),
			check('Cost_Center_Name')
				.trim()
				.not()
				.isEmpty()
				.withMessage('cost center can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'cost center length should not be less than 2 characters or greater than 50 characters'
				),
		],
	];
};
const updateValid = () => {
	return [
		[
			check('id').not().isEmpty().withMessage('department id can not be empty'),

			check('Name')
				.trim()
				.not()
				.isEmpty()
				.withMessage('name can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'name length should not be less than 2 characters or greater than 50 characters'
				),
			check('Cost_Center_Name')
				.trim()
				.not()
				.isEmpty()
				.withMessage('cost center can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'cost center length should not be less than 2 characters or greater than 50 characters'
				),
		],
	];
};

const idValid = () => {
	return [
		[
			check('id')
				.not()
				.isEmpty()
				.withMessage(' department id can not be empty'),
		],
	];
};

module.exports = {
	saveValid,
	updateValid,
	idValid,
};
