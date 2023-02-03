const { check } = require('express-validator');

const updateHODHeadValid = () => {
	return [
		[
			check('Reject_Reason')
				.trim()
				.not()
				.isEmpty()
				.withMessage('reject reason can not be empty')
				.isLength({ min: 2, max: 50 })
				.withMessage(
					'reject reason length should not be less than 2 characters or greater than 50 characters'
				),
			check('id').not().isEmpty().withMessage('request id can not be empty'),
			check('hash').not().isEmpty().withMessage('hash id can not be empty'),
		],
	];
};

const idValid = () => {
	return [
		[
			check('id')
				.not()
				.isEmpty()
				.withMessage(' issue type id can not be empty'),
		],
	];
};

module.exports = {
	updateHODHeadValid,
	// updateHODValid,
	idValid,
};
