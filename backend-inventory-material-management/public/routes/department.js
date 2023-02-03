const express = require('express');
const {
	addDepartment,
	getAllDepartment,
	getDepartments,
	getDepartment,
	deleteDepartment,
	updateDepartment,
	getDepartmentsExport,
} = require('../controllers/department');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const department_valid = require('../validations/department_validator');

router
	.post(
		'/getDepartment',
		department_valid.idValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		getDepartment
	)
	.post(
		'/getAllDepartment',
		protect,
		authorize(
			process.env.IT,
			process.env.ADMIN,
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getAllDepartment
	)
	.post(
		'/getDepartments',
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		getDepartments
	)
	.post(
		'/getDepartmentsExport',
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		getDepartmentsExport
	)

	.post(
		'/updateDepartment',
		department_valid.updateValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		updateDepartment
	)
	.post(
		'/deleteDepartment',
		department_valid.idValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		deleteDepartment
	)
	.post(
		'/addDepartment',
		department_valid.saveValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		addDepartment
	);

module.exports = router;
