const { check } = require('express-validator');

const saveValid = () => {
	return [
		[
			check('Request_Department')
				.trim()
				.not()
				.isEmpty()
				.withMessage('request department can not be empty'),
			check('Request_Type')
				.trim()
				.not()
				.isEmpty()
				.withMessage('request type can not be empty'),
			check('Location_ID')
				.trim()
				.not()
				.isEmpty()
				.withMessage('location id can not be empty')
				.isNumeric()
				.withMessage('location id is not valid'),
			check('products.*.ID')
				.trim()
				.not()
				.isEmpty()
				.withMessage('ID can not be empty'),
			check('products.*.Name')
				.trim()
				.not()
				.isEmpty()
				.withMessage('name can not be empty'),
			check('products.*.UOM')
				.trim()
				.not()
				.isEmpty()
				.withMessage('UOM can not be empty'),
			check('products.*.Price')
				.trim()
				.isNumeric()
				.withMessage('price is not valid')
				.not()
				.isEmpty()
				.withMessage('price can not be empty'),
			check('products.*.TAX_Percentage')
				.trim()
				.not()
				.isEmpty()
				.withMessage('tax percentage can not be empty')
				.isNumeric()
				.withMessage('tax percentage is not valid'),
			check('products.*.Quantity')
				.trim()
				.not()
				.isEmpty()
				.withMessage('quantity can not be empty')
				.isNumeric()
				.withMessage('quantity id is not valid'),
		],
	];
};
const updateValid = () => {
	return [
		[
			check('id').not().isEmpty().withMessage('request id can not be empty'),
			check('products.*.ID')
				.trim()
				.not()
				.isEmpty()
				.withMessage('ID can not be empty'),
			check('products.*.ID')
				.trim()
				.not()
				.isEmpty()
				.withMessage('Product ID can not be empty'),
			check('products.*.Name')
				.trim()
				.not()
				.isEmpty()
				.withMessage('name can not be empty'),
			check('products.*.UOM')
				.trim()
				.not()
				.isEmpty()
				.withMessage('UOM can not be empty'),
			check('products.*.Price')
				.trim()
				.isNumeric()
				.withMessage('price is not valid')
				.not()
				.isEmpty()
				.withMessage('price can not be empty'),
			check('products.*.TAX_Percentage')
				.trim()
				.not()
				.isEmpty()
				.withMessage('tax percentage can not be empty')
				.isNumeric()
				.withMessage('tax percentage is not valid'),
			check('products.*.Quantity')
				.trim()
				.not()
				.isEmpty()
				.withMessage('quantity can not be empty')
				.isNumeric()
				.withMessage('quantity id is not valid'),
		],
	];
};

const idValid = () => {
	return [
		[check('id').not().isEmpty().withMessage(' request id can not be empty')],
	];
};
const requestTypeValid = () => {
	return [
		[
			check('Request_Type')
				.trim()
				.not()
				.isEmpty()
				.withMessage('request type can not be empty'),
		],
	];
};

module.exports = {
	saveValid,
	updateValid,
	idValid,
	requestTypeValid,
};
