const { check, body } = require('express-validator');

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
			body('Name')
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
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'state length should not be less than 2 characters or greater than 50 characters'
				),
			check('City')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'city length should not be less than 2 characters or greater than 50 characters'
				),
			check('Address')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage('address length should not be less than 2 characters'),
		],
	];
};
const updateValid = () => {
	return [
		[
			check('id').not().isEmpty().withMessage('location id can not be empty'),
			check('ALT_Code')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'alt code length should not be less than 2 characters or greater than 20 characters'
				),
			body('Name')
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
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'state length should not be less than 2 characters or greater than 50 characters'
				),
			check('City')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'city length should not be less than 2 characters or greater than 50 characters'
				),
			check('Address')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2 })
				.withMessage('address length should not be less than 2 characters'),
		],
	];
};

const idValid = () => {
	return [
		[check('id').not().isEmpty().withMessage(' location id can not be empty')],
	];
};

module.exports = {
	saveValid,
	updateValid,
	idValid,
};
