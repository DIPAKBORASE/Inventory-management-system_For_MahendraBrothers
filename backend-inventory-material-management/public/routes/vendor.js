const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
	getVendor,
	getVendors,
	updateVendor,
	deleteVendor,
	addVendor,
	getAllVendors,
	getVendorsExport,
} = require('../controllers/vendor');

const vendor_valid = require('../validations/vendor_validator');

router
	.post(
		'/getVendor',
		vendor_valid.idValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		getVendor
	)
	.post('/getVendors', protect, authorize(process.env.SYSTEM_ADMIN), getVendors)
	.post(
		'/getVendorsExport',
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		getVendorsExport
	)
	.post(
		'/updateVendor',
		vendor_valid.updateValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		updateVendor
	)
	.post(
		'/deleteVendor',
		vendor_valid.idValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		deleteVendor
	)
	.post(
		'/addVendor',
		vendor_valid.saveValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		addVendor
	)
	.post(
		'/getAllVendors',
		protect,
		authorize(
			process.env.IT,
			process.env.ADMIN,
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getAllVendors
	);

module.exports = router;
