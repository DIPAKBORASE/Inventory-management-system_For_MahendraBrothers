const { check } = require('express-validator');

const saveValid = () => {
	return [
		[
			check('Dated_On').trim().isDate().withMessage('Must be a valid date'),
			check('From_Location')
				.trim()
				.not()
				.isEmpty()
				.withMessage('from location can not be empty')
				.isNumeric()
				.withMessage('from location is not valid'),
			check('To_Location')
				.trim()
				.not()
				.isEmpty()
				.withMessage('to location can not be empty')
				.isNumeric()
				.withMessage('to location is not valid'),
			check('Department')
				.trim()
				.not()
				.isEmpty()
				.withMessage('department can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'department length should not be less than 2 characters or greater than 50 characters'
				),
			// check('Cost_Center')
			// 	.trim()
			// 	.not()
			// 	.isEmpty()
			// 	.withMessage('cost center can not be empty')
			// 	.isLength({ min: 2, max: 50 })
			// 	.withMessage(
			// 		'cost center length should not be less than 2 characters or greater than 50 characters'
			// 	),
			check('Collected_By')
				.trim()
				.not()
				.isEmpty()
				.withMessage('collected by can not be empty'),
			check('Mode_Of_Transport')
				.trim()
				.not()
				.isEmpty()
				.withMessage('mode of transport quantity can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'mode of transport length should not be less than 2 characters or greater than 50 characters'
				),
			check('products.*.ID')
				.trim()
				.not()
				.isEmpty()
				.withMessage('ID can not be empty'),
			check('products.*.ALT_Code')
				.trim()
				.not()
				.isEmpty()
				.withMessage('ALT_Code can not be empty'),
			check('products.*.Name')
				.trim()
				.not()
				.isEmpty()
				.withMessage('name can not be empty'),
			check('products.*.Quantity')
				.trim()
				.not()
				.isEmpty()
				.withMessage('quantity can not be empty')
				.isNumeric()
				.withMessage('quantity id is not valid'),
			check('products.*.UOM')
				.trim()
				.not()
				.isEmpty()
				.withMessage('UOM can not be empty'),
			check('products.*.Remark')
				.trim()
				.not()
				.isEmpty()
				.withMessage('Remark can not be empty'),
			check('products.*.Username')
				.trim()
				.not()
				.isEmpty()
				.withMessage('Username can not be empty'),
		],
	];
};
const updateValid = () => {
	return [
		[
			check('Dated_On').trim().isDate().withMessage('Must be a valid date'),
			check('From_Location')
				.trim()
				.not()
				.isEmpty()
				.withMessage('from location group can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'from location group length should not be less than 2 characters or greater than 50 characters'
				),
			check('To_Location')
				.trim()
				.not()
				.isEmpty()
				.withMessage('to location can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'to location length should not be less than 2 characters or greater than 50 characters'
				),
			check('Department')
				.trim()
				.not()
				.isEmpty()
				.withMessage('department can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'department length should not be less than 2 characters or greater than 50 characters'
				),
			// check('Cost_Center')
			// 	.trim()
			// 	.not()
			// 	.isEmpty()
			// 	.withMessage('cost center can not be empty')
			// 	.isLength({ min: 2, max: 50 })
			// 	.withMessage(
			// 		'cost center length should not be less than 2 characters or greater than 50 characters'
			// 	),
			check('Collected_By')
				.trim()
				.not()
				.isEmpty()
				.withMessage('collected by can not be empty'),
			check('Mode_Of_Transport')
				.trim()
				.not()
				.isEmpty()
				.withMessage('mode of transport quantity can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'mode of transport length should not be less than 2 characters or greater than 50 characters'
				),
			check('products.*.ID')
				.trim()
				.not()
				.isEmpty()
				.withMessage('ID can not be empty'),
			check('products.*.ALT_Code')
				.trim()
				.not()
				.isEmpty()
				.withMessage('ALT_Code can not be empty'),
			check('products.*.Name')
				.trim()
				.not()
				.isEmpty()
				.withMessage('name can not be empty'),
			check('products.*.Quantity')
				.trim()
				.not()
				.isEmpty()
				.withMessage('quantity can not be empty')
				.isNumeric()
				.withMessage('quantity id is not valid'),
			check('products.*.UOM')
				.trim()
				.not()
				.isEmpty()
				.withMessage('UOM can not be empty'),
			check('products.*.Remark')
				.trim()
				.not()
				.isEmpty()
				.withMessage('Remark can not be empty'),
			check('products.*.Username')
				.trim()
				.not()
				.isEmpty()
				.withMessage('Username can not be empty'),
		],
	];
};

const idValid = () => {
	return [
		[check('id').not().isEmpty().withMessage(' dispatch id can not be empty')],
	];
};
const trackValid = () => {
	return [
		[
			check('Username')
				.not()
				.isEmpty()
				.withMessage(' Username can not be empty'),
		],
	];
};

module.exports = {
	saveValid,
	trackValid,
	updateValid,
	idValid,
};
