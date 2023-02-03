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
			check('Type_Of_Issue')
				.trim()
				.not()
				.isEmpty()
				.withMessage('type of issue can not be empty'),
			check('Description')
				.trim()
				.not()
				.isEmpty()
				.withMessage('description can not be empty'),
			check('Priority')
				.trim()
				.not()
				.isEmpty()
				.withMessage('priority can not be empty'),
		],
	];
};
const updateValid = () => {
	return [
		[
			check('id').not().isEmpty().withMessage('request id can not be empty'),
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
			check('Type_Of_Issue')
				.trim()
				.not()
				.isEmpty()
				.withMessage('type of issue can not be empty'),
			check('Description')
				.trim()
				.not()
				.isEmpty()
				.withMessage('description can not be empty'),
			check('Priority')
				.trim()
				.not()
				.isEmpty()
				.withMessage('priority can not be empty'),
		],
	];
};

const idValid = () => {
	return [
		[check('id').not().isEmpty().withMessage(' request id can not be empty')],
	];
};

module.exports = {
	saveValid,
	updateValid,
	idValid,
};
