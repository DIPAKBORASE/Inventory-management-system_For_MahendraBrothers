const { check } = require('express-validator');

const saveValid = () => {
	return [
		[
			check('Vendor_ID')
				.trim()
				.not()
				.isEmpty()
				.withMessage('vendor id can not be empty')
				.isNumeric()
				.withMessage('vendor id is not valid'),
			check('Challan_No')
				.trim()
				.not()
				.isEmpty()
				.withMessage('challan number can not be empty'),
			check('PO_Number').trim().optional({ nullable: true, checkFalsy: true }),
			check('Dated_On').trim().isDate().withMessage('Must be a valid date'),
			check('products.*.ID')
				.trim()
				.not()
				.isEmpty()
				.withMessage('ID can not be empty'),
			check('products.*.Quantity')
				.trim()
				.not()
				.isEmpty()
				.withMessage('quantity can not be empty')
				.isNumeric()
				.withMessage('quantity id is not valid'),
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
			check('products.*.Manufacturer')
				.trim()
				.optional({ nullable: true, checkFalsy: true }),
			check('products.*.Serial_Number')
				.trim()
				.optional({ nullable: true, checkFalsy: true }),
			check('products.*.Model')
				.trim()
				.optional({ nullable: true, checkFalsy: true }),
			check('products.*.AMC_Expiry')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isDate()
				.withMessage('Must be a valid date'),
			check('products.*.AMC_Vendor')
				.trim()
				.optional({ nullable: true, checkFalsy: true }),
			check('products.*.Product_Expiry')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isDate()
				.withMessage('Must be a valid date'),
		],
	];
};
const updateValid = () => {
	return [
		[
			check('id').not().isEmpty().withMessage('asset id can not be empty'),
			check('Product_ID')
				.trim()
				.not()
				.isEmpty()
				.withMessage('product id can not be empty')
				.isNumeric()
				.withMessage('product id is not valid'),
			check('Vendor_ID')
				.trim()
				.not()
				.isEmpty()
				.withMessage('vendor id can not be empty')
				.isNumeric()
				.withMessage('vendor id is not valid'),
			check('Challan_No')
				.trim()
				.not()
				.isEmpty()
				.withMessage('challan number can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'challan number length should not be less than 2 characters or greater than 50 characters'
				),
			check('PO_Number')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'po number length should not be less than 2 characters or greater than 50 characters'
				),
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
			check('products.*.Total_Price')
				.trim()
				.not()
				.isEmpty()
				.withMessage('total price can not be empty')
				.isNumeric()
				.withMessage('total price is not valid'),
			check('Manufacturer')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'manufacturer length should not be less than 2 characters or greater than 20 characters'
				),
			check('Serial_Number')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isNumeric()
				.withMessage('serial number is not valid')
				.isEmpty()
				.withMessage('serial number can not be empty'),
			check('AMC_Expiry')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isDate()
				.withMessage('Must be a valid date'),
			check('AMC_Vendor')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'amc vendor name length should not be less than 2 characters or greater than 50 characters'
				),
			check('Product_Expiry')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isDate()
				.withMessage('Must be a valid date'),
			check('Dated_On')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isDate()
				.withMessage('Must be a valid date'),
			check('Current_Location')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'current location length should not be less than 2 characters or greater than 50 characters'
				),
			check('Current_Department')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'current department length should not be less than 2 characters or greater than 50 characters'
				),
			check('Current_Cost_Center')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'current cost center length should not be less than 2 characters or greater than 50 characters'
				),
		],
	];
};

const idValid = () => {
	return [
		[check('id').not().isEmpty().withMessage(' asset id can not be empty')],
	];
};
const searchInwardValid = () => {
	return [
		[
			check('From_Location')
				.trim()
				.not()
				.isEmpty()
				.withMessage('asset from Location can not be empty')
				.isNumeric()
				.withMessage('asset from Location is not valid'),
		],
		[
			check('Type_Of_Issue')
				.trim()
				.not()
				.isEmpty()
				.withMessage('type of issue can not be empty'),
		],
	];
};

module.exports = {
	saveValid,
	updateValid,
	idValid,
	searchInwardValid,
};
