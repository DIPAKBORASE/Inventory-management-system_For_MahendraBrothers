const express = require('express');
const {
	getLowStockAlert,
	getLowStockAlertEmail,
} = require('../controllers/low_stock_alert');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.post(
	'/getLowStockAlert',
	protect,
	authorize(
		process.env.IT,
		process.env.ADMIN,
		process.env.IT_SYSTEM_ADMIN,
		process.env.ADMIN_SYSTEM_ADMIN,
		process.env.SYSTEM_ADMIN
	),
	getLowStockAlert
);
router.get('/sumit', getLowStockAlertEmail);

module.exports = router;
