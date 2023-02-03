const { validationResult } = require('express-validator');

const validateInput = validationResult.withDefaults({
	formatter: ({ msg, param, value }) => ({
		msg,
		param,
	}),
});

module.exports = {
	validateInput,
};
