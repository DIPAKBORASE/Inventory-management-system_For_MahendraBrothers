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
			check('Contact_Person')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'contact person length should not be less than 2 characters or greater than 50 characters'
				),
			check('Email')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isEmail()
				.withMessage('email is not valid'),
			check('Phone')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 10, max: 20 })
				.withMessage(
					'phone number length should not be less than 10 characters or greater than 20 characters'
				),
			check('State')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'state length should not be less than 2 characters or greater than 20 characters'
				),
			check('Country')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'country length should not be less than 2 characters or greater than 20 characters'
				),
			check('City')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'city length should not be less than 2 characters or greater than 20 characters'
				),
			check('Address')
				.trim()
				.not()
				.isEmpty()
				.withMessage('address can not be empty')
				.isLength({ min: 2 })
				.withMessage('address length should not be less than 2 characters'),
			check('Pincode')
				.trim()
				.not()
				.isEmpty()
				.withMessage('pincode can not be empty')
				.isNumeric()
				.withMessage('pincode is not valid')
				.isLength({ min: 6, max: 6 })
				.withMessage(
					'pincode length should not be less than or greater than 6 characters'
				),
			check('Description')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage('description length should not be less than 2 characters'),
			check('GST_No')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 15, max: 15 })
				.withMessage('gst number length should not be less than 15 characters'),
			check('PAN_No')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 10, max: 10 })
				.withMessage('pan number length should not be less than 10 characters'),
			check('Bank_Name')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage('bank name length should not be less than 2 characters'),
			check('Account_Number')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.isNumeric()
				.withMessage('account number is not valid')
				.withMessage(
					'account number length should not be less than 2 characters'
				),
			check('Bank_Branch')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage('bank branch length should not be less than 2 characters'),
			check('IFSC_Code')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage('ifsc code length should not be less than 2 characters'),
			check('Bank_Address')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage(
					'bank address length should not be less than 2 characters'
				),
		],
	];
};
const updateValid = () => {
	return [
		[
			check('id').not().isEmpty().withMessage('vendor id can not be empty'),
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
			check('Contact_Person')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'contact person length should not be less than 2 characters or greater than 50 characters'
				),
			check('Email')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isEmail()
				.withMessage('email is not valid'),
			check('Phone')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 10, max: 20 })
				.withMessage(
					'phone number length should not be less than 10 characters or greater than 20 characters'
				),
			check('State')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'state length should not be less than 2 characters or greater than 20 characters'
				),
			check('Country')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'country length should not be less than 2 characters or greater than 20 characters'
				),
			check('City')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'city length should not be less than 2 characters or greater than 20 characters'
				),
			check('Address')
				.trim()
				.not()
				.isEmpty()
				.withMessage('address can not be empty')
				.isLength({ min: 2 })
				.withMessage('address length should not be less than 2 characters'),
			check('Pincode')
				.trim()
				.not()
				.isEmpty()
				.withMessage('pincode can not be empty')
				.isNumeric()
				.withMessage('pincode is not valid')
				.isLength({ min: 6, max: 6 })
				.withMessage(
					'pincode length should not be less than or greater than 6 characters'
				),
			check('Description')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage('description length should not be less than 2 characters'),
			check('GST_No')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 15, max: 15 })
				.withMessage('gst number length should not be less than 15 characters'),
			check('PAN_No')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 10, max: 10 })
				.withMessage('pan number length should not be less than 10 characters'),
			check('Bank_Name')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage('bank name length should not be less than 2 characters'),
			check('Account_Number')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.isNumeric()
				.withMessage('account number is not valid')
				.withMessage(
					'account number length should not be less than 2 characters'
				),
			check('Bank_Branch')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage('bank branch length should not be less than 2 characters'),
			check('IFSC_Code')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage('ifsc code length should not be less than 2 characters'),
			check('Bank_Address')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage(
					'bank address length should not be less than 2 characters'
				),
		],
	];
};

const idValid = () => {
	return [
		[check('id').not().isEmpty().withMessage(' vendor id can not be empty')],
	];
};

module.exports = {
	saveValid,
	updateValid,
	idValid,
};
