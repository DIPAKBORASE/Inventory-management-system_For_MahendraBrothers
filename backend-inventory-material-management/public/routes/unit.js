const express = require('express');
const {
	getUnit,
	getUnits,
	updateUnit,
	deleteUnit,
	addUnit,
	getAllUnits,
	getUnitsExport,
} = require('../controllers/unit');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const unit_valid = require('../validations/unit_validator');

router
	.post(
		'/getUnit',
		unit_valid.idValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		getUnit
	)
	.post('/getUnits', protect, authorize(process.env.SYSTEM_ADMIN), getUnits)
	.post(
		'/getUnitsExport',
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		getUnitsExport
	)
	.post(
		'/getAllUnits',
		protect,
		authorize(
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getAllUnits
	)
	.post(
		'/updateUnit',
		unit_valid.updateValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		updateUnit
	)
	.post(
		'/deleteUnit',
		unit_valid.idValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		deleteUnit
	)
	.post(
		'/addUnit',
		unit_valid.saveValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		addUnit
	);

module.exports = router;
