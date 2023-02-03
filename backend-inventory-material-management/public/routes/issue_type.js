const express = require('express');
const {
	getIssueType,
	getIssueTypes,
	updateIssueType,
	deleteIssueType,
	addIssueType,
	getAllIssueType,
	getIssueTypesExport,
} = require('../controllers/issue_type');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const issue_type_valid = require('../validations/issue_type_validator');

router
	.post(
		'/getIssueType',
		issue_type_valid.idValid(),
		protect,
		authorize(
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getIssueType
	)
	.post(
		'/getIssueTypes',
		protect,
		authorize(
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getIssueTypes
	)
	.post(
		'/getIssueTypesExport',
		protect,
		authorize(
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getIssueTypesExport
	)
	.post(
		'/getAllIssueType',
		protect,
		authorize(
			process.env.REQUESTER,
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getAllIssueType
	)
	.post(
		'/updateIssueType',
		issue_type_valid.updateValid(),
		protect,
		authorize(
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		updateIssueType
	)
	.post(
		'/deleteIssueType',
		issue_type_valid.idValid(),
		protect,
		authorize(
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		deleteIssueType
	)
	.post(
		'/addIssueType',
		issue_type_valid.saveValid(),
		protect,
		authorize(
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		addIssueType
	);

module.exports = router;
