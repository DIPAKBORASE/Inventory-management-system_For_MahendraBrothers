const { check } = require('express-validator');

const saveValid = () => {
	return [
		[
			check('Employee_Code')
				.trim()
				.not()
				.isEmpty()
				.withMessage('employee code can not be empty')
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'employee code length should not be less than 2 characters or greater than 20 characters'
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
			check('Email')
				.trim()
				.not()
				.isEmpty()
				.withMessage('email can not be empty')
				.isEmail()
				.withMessage('email is not valid'),
			check('Mobile')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 10, max: 20 })
				.withMessage(
					'mobile number length should not be less than 10 characters or greater than 20 characters'
				),
			check('Password')
				.trim()
				.not()
				.isEmpty()
				.withMessage('password can not be empty')
				.isLength({ min: 3, max: 50 })
				.withMessage(
					'password length should not be less than 2 characters or greater than 50 characters'
				),
			check('User_Type')
				.trim()
				.not()
				.isEmpty()
				.withMessage('user type can not be empty')
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'user type length should not be less than 2 characters or greater than 20 characters'
				),
			check('HOD')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isNumeric()
				.withMessage('HOD is not valid'),
			check('HEAD')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isNumeric()
				.withMessage('HEAD is not valid'),
			check('Location')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'location length should not be less than 2 characters or greater than 50 characters'
				),
			check('Department')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'department length should not be less than 2 characters or greater than 50 characters'
				),
			check('Cost_Center')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
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
			check('id').not().isEmpty().withMessage('user id can not be empty'),
			check('Employee_Code')
				.trim()
				.not()
				.isEmpty()
				.withMessage('employee code can not be empty')
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'employee code length should not be less than 2 characters or greater than 20 characters'
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
			check('Email')
				.trim()
				.not()
				.isEmpty()
				.withMessage('email can not be empty')
				.isEmail()
				.withMessage('email is not valid'),
			check('Mobile')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 10, max: 20 })
				.withMessage(
					'mobile number length should not be less than 10 characters or greater than 20 characters'
				),
			check('User_Type')
				.trim()
				.not()
				.isEmpty()
				.withMessage('user type can not be empty')
				.isLength({ min: 2, max: 20 })
				.withMessage(
					'user type length should not be less than 2 characters or greater than 20 characters'
				),
			check('HOD')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isNumeric()
				.withMessage('HOD is not valid'),
			check('HEAD')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isNumeric()
				.withMessage('HEAD is not valid'),
			check('Department')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'department length should not be less than 2 characters or greater than 50 characters'
				),
			check('Cost_Center')
				.trim()
				.optional({ nullable: true, checkFalsy: true })
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'cost center length should not be less than 2 characters or greater than 50 characters'
				),
		],
	];
};

const idValid = () => {
	return [
		[check('id').not().isEmpty().withMessage(' user id can not be empty')],
	];
};

module.exports = {
	saveValid,
	updateValid,
	idValid,
};
