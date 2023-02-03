const { check } = require('express-validator');

const saveValid = () => {
	return [
		[
			check('ALT_Code')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'alt code length should not be less than 2 characters or greater than 20 characters'
				),
			check('Name')
				.trim()
				.not()
				.isEmpty()
				.withMessage('name can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'name length should not be less than 2 characters or greater than 50 characters'
				),
			check('Product_Group')
				.trim()
				.not()
				.isEmpty()
				.withMessage('product group can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'product group length should not be less than 2 characters or greater than 50 characters'
				),
			check('UOM')
				.trim()
				.not()
				.isEmpty()
				.withMessage('UOM can not be empty')
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'UOM length should not be less than 2 characters or greater than 20 characters'
				),
			// check('Asset_Holder')
			// 	.trim()
			// 	.not()
			// 	.isEmpty()
			// 	.withMessage('asset_Holder can not be empty'),
			check('Category')
				.trim()
				.not()
				.isEmpty()
				.withMessage('category can not be empty'),
			check('Description')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage('description length should not be less than 2 characters'),
			check('Price')
				.trim()
				.not()
				.isEmpty()
				.withMessage('price can not be empty')
				.isNumeric()
				.withMessage('price is not valid'),
			check('Low_Stock_Quantity')
				.trim()
				.not()
				.isEmpty()
				.withMessage('low stock quantity can not be empty')
				.isNumeric()
				.withMessage('low stock quantity is not valid'),
			check('TAX_Percentage')
				.trim()
				.not()
				.isEmpty()
				.withMessage('tax percentage can not be empty')
				.isNumeric()
				.withMessage('tax percentage is not valid'),
			// check('Manufacturer_Name')
			// 	.trim()
			// 	.not()
			// 	.isEmpty()
			// 	.withMessage('manufacturer name can not be empty')
			// 	.isLength({ min: 2, max: 50 })
			// 	.withMessage(
			// 		'manufacturer name length should not be less than 2 characters or greater than 50 characters'
			// 	),
		],
	];
};
const updateValid = () => {
	return [
		[
			check('id').not().isEmpty().withMessage('product id can not be empty'),
			check('ALT_Code')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'alt code length should not be less than 2 characters or greater than 20 characters'
				),
			check('Name')
				.trim()
				.not()
				.isEmpty()
				.withMessage('name can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'name length should not be less than 2 characters or greater than 50 characters'
				),
			check('Product_Group')
				.trim()
				.not()
				.isEmpty()
				.withMessage('product group can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'product group length should not be less than 2 characters or greater than 50 characters'
				),
			check('UOM')
				.trim()
				.not()
				.isEmpty()
				.withMessage('UOM can not be empty')
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'UOM length should not be less than 2 characters or greater than 20 characters'
				),
			// check('Asset_Holder')
			// 	.trim()
			// 	.not()
			// 	.isEmpty()
			// 	.withMessage('asset_Holder can not be empty'),
			// check('Category')
			// 	.trim()
			// 	.not()
			// 	.isEmpty()
			// 	.withMessage('category can not be empty'),
			check('Description')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage('description length should not be less than 2 characters'),
			check('Price')
				.trim()
				.not()
				.isEmpty()
				.withMessage('price can not be empty')
				.isNumeric()
				.withMessage('price is not valid'),
			check('Low_Stock_Quantity')
				.trim()
				.not()
				.isEmpty()
				.withMessage('low stock quantity can not be empty')
				.isNumeric()
				.withMessage('low stock quantity is not valid'),
			check('TAX_Percentage')
				.trim()
				.not()
				.isEmpty()
				.withMessage('tax percentage can not be empty')
				.isNumeric()
				.withMessage('tax percentage is not valid'),
			// check('Manufacturer_Name')
			// 	.trim()
			// 	.not()
			// 	.isEmpty()
			// 	.withMessage('manufacturer name can not be empty')
			// 	.isLength({ min: 2, max: 50 })
			// 	.withMessage(
			// 		'manufacturer name length should not be less than 2 characters or greater than 50 characters'
			// 	),
		],
	];
};

const idValid = () => {
	return [
		[check('id').not().isEmpty().withMessage(' product id can not be empty')],
	];
};
const trackValid = () => {
	return [
		[check('Barcode').not().isEmpty().withMessage(' Barcode can not be empty')],
	];
};

module.exports = {
	saveValid,
	updateValid,
	idValid,
	trackValid,
};
