const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
	getUsers,
	getUser,
	updateUser,
	changePassword,
	deleteUser,
	getHodHead,
	getAllSupports,
	forgotPassword,
	updatePassword,
	resendOTP,
	verifyOTP,
	getUsersExport,
} = require('../controllers/user');

const users_valid = require('../validations/users_validator');
const change_pass_valid = require('../validations/change_password_validator');
const update_pass_valid = require('../validations/update_password_validator');
const email_valid = require('../validations/email_validator');
const otp_valid = require('../validations/verify_otp_validator');

router.post('/', protect, authorize(process.env.SYSTEM_ADMIN), getUsers);
router.post(
	'/changePassword',
	change_pass_valid.saveValid(),
	protect,
	authorize(
		process.env.REQUESTER,
		process.env.SUPPORT,
		process.env.IT,
		process.env.ADMIN,
		process.env.IT_SYSTEM_ADMIN,
		process.env.ADMIN_SYSTEM_ADMIN,
		process.env.SYSTEM_ADMIN
	),
	changePassword
);
router.post('/forgotPassword', email_valid.saveValid(), forgotPassword);
router.post(
	'/updatePassword',
	email_valid.saveValid(),
	update_pass_valid.saveValid(),
	updatePassword
);
router.post('/resendOTP', email_valid.saveValid(), resendOTP);
router.post(
	'/verifyOTP',
	email_valid.saveValid(),
	otp_valid.saveValid(),
	verifyOTP
);
router.post(
	'/getUser',
	users_valid.idValid(),
	protect,
	authorize(process.env.SYSTEM_ADMIN),
	getUser
);
router.post(
	'/getHodHead',
	users_valid.idValid(),
	protect,
	authorize(
		process.env.IT_SYSTEM_ADMIN,
		process.env.ADMIN_SYSTEM_ADMIN,
		process.env.SYSTEM_ADMIN
	),
	getHodHead
);
router.post(
	'/getAllSupports',
	users_valid.idValid(),
	protect,
	authorize(
		process.env.IT,
		process.env.ADMIN,
		process.env.IT_SYSTEM_ADMIN,
		process.env.ADMIN_SYSTEM_ADMIN,
		process.env.SUPPORT,
		process.env.SYSTEM_ADMIN
	),
	getAllSupports
);
router.post(
	'/updateUser',
	users_valid.updateValid(),
	protect,
	authorize(process.env.SYSTEM_ADMIN),
	updateUser
);
router.post(
	'/deleteUser',
	users_valid.idValid(),
	protect,
	authorize(process.env.SYSTEM_ADMIN),
	deleteUser
);
router.post(
	'/getUsersExport',
	protect,
	authorize(process.env.SYSTEM_ADMIN),
	getUsersExport
);

module.exports = router;
