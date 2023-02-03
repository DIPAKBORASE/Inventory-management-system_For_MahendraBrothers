const express = require('express');
const { changeSupportRequestStatus } = require('../controllers/support');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const supportValid = require('../validations/support_validator');

router.post(
	'/changeSupportRequestStatus',
	// requestProcurementValidator.requestTypeValid(),
	protect,
	authorize(process.env.SUPPORT),
	changeSupportRequestStatus
);

module.exports = router;
