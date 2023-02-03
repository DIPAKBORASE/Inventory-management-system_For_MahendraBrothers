const express = require('express');
const { rejectRequest, approveRequest } = require('../controllers/approval');
const router = express.Router();

const approval_valid = require('../validations/approval_validator');
router

	.post('/approveRequest/', approveRequest)
	.post('/rejectRequest', approval_valid.updateHODHeadValid(), rejectRequest);

module.exports = router;
