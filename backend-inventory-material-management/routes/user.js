const express = require('express');
const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/async');
const EmailSender = require('../utils/sendEmail');
const { validateInput } = require('../validations/validation_result');
const { getPagination, getPagingData } = require('./pagination');
const { QueryTypes, Op } = require('sequelize');
const getOTP = require('../utils/otp_generator');
const excel = require('node-excel-export');
const { stylesData } = require('../utils/style');
const { saveValid, updateValid, idValid } = require('../validations/users_validator');
const { invalid } = require('moment/moment');

 const router  = express.Router();
// @desc Register user
// @route POST /api/auth/register
// @access public
router.post('/register',updateValid(), saveValid(), idValid(), async(req,res)=>{
	const errors = validateInput(req);
	// console.log(errors);
	if (!errors.isEmpty()) {
		// console.log(errors);
		console.log(req.body)
		console.log("hello")
		return res.status(200).jsonp({ error: true, datas: errors.array() });
	} else {
		const user = await db.user.create(req.body);

		// console.log("user data")
		console.log(user)
		res.status(200).json({
			success: true,
			message: `User registered`,
			});
		}
		res.send("done")
	})

// @desc Login user
// @route POST /api/auth/login
// @access public
router.post('/login',updateValid(), saveValid(), idValid(), async(req,res)=>{
	const { username, password } = req.body;

	if (!username || !password)
		return next(
			new ErrorResponse(`Please provide an username and password`),
			400
		);

	// Check user exist
	const user = await db.user.findOne({
		where: {
			Employee_Code: username,
		},
	});

	if (!user) return next(new ErrorResponse(`Invalid credentials`, 401));

	//Match Password
	const isMatch = await user.matchPassword(password, user.Password);

	if (!isMatch) return next(new ErrorResponse(`Invalid credentials`, 401));

	sendTokenReponse(user, 200, res);
});
const sendTokenReponse = async (user, statusCode, res) => {
	console.log(user.ID);
	const token = await user.getSignedJwtToken(user.ID);

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_PARSER * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res.status(statusCode).cookie('token', token, options).json({
		success: true,
		token: token,
		name: user.Name,
		role: user.User_Type,
		// id: user.id,
	});
};

// @desc Logout user
// @route POST /api/auth/logout
// @access public
router.post('/logout',updateValid(), saveValid(), idValid(), async(req,res)=>{
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: `You are successfully logout`,
	});
});



// @desc Get all Users
// @route GET /api/users
// @access public
router.post('/users',updateValid(), saveValid(), idValid(), async(req,res)=>{
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	let condition = '';
	if (req.body.hasOwnProperty('search')) {
		if (req.body.search != '') {
			condition = req.body.search
				? {
						Name: {
							[Op.like]: `${req.body.search}%`,
						},
				  }
				: null;
		}
	}
	const users = await db.user.findAndCountAll({
		where: condition,
		limit,
		offset,
		order: ['Name'],
	});

	if (users) {
		let { total, data, totalPages, currentPage } = getPagingData(
			users,
			req.body.pageNumber,
			req.body.numberOfRows
		);
		res.status(200).json({
			error: false,
			total,
			data,
			totalPages,
			currentPage,
		});
	} else {
		res.status(200).json({
			error: false,
			data: {},
		});
	}
});


// @desc Get all Users and choose HOD and HEAD
// @route GET /api/HOD_HEAD
// @access public
router.post('/getHodHead',updateValid(), saveValid(), idValid(), async(req,res)=>{
	const HodHead = await db.user.findAll({ order: ['Name'] });
	res.status(200).json({
		success: true,
		data: HodHead,
	});
});

// @desc Get all Support Users and choose
// @route GET /api/HOD_HEAD
// @access public
router.post('/getAllSupports',updateValid(), saveValid(), idValid(), async(req,res)=>{
	const allSupport = await db.user.findAll({
		where: {
			User_Type: process.env.SUPPORT,
		},
		attributes: ['ID', 'Name', 'Email'],
		order: ['Name'],
	});
	res.status(200).json({
		success: true,
		data: allSupport,
	});
});

router.post('/getUser',updateValid(), saveValid(), idValid(), async(req,res)=>{
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		await db.user
			.findOne({
				where: {
					id: req.body.id,
				},
			})
			.then((data) => {
				if (data) {
					res.send({
						message: 'User details found',
						data: data,
						error: false,
					});
				} else {
					return next(new ErrorResponse(`User details not found`, 500));
				}
			})
			.catch((err) => {
				next(err);
			});
	}
});

// @desc Update User
// @route PUT /api/users/:id
// @access private
router.post('/updateUser',updateValid(), saveValid(), idValid(), async(req,res)=>{
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const { id } = req.body;
		const user = await db.user.update(req.body, {
			where: {
				id: id,
			},
		});

		if (user == 0) return next(new ErrorResponse(`User not found`, 500));

		res.status(200).json({
			success: true,
			message: `User details updated`,
		});
	}
});

// @desc change password
// @route PUT /api/users/changePassword
// @access private
router.post('/changePassword',updateValid(), saveValid(), idValid(), async(req,res)=>{
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const { Old_Password, New_Password } = req.body;
		let formOldPassword = Old_Password;
		let loggedPassword = await db.user.findByPk(req.user.ID);
		const isMatch = await bcrypt.compare(
			formOldPassword,
			loggedPassword.Password
		);
		if (!isMatch) {
			return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
		}
		const user = await db.user.update(
			{ Password: New_Password },
			{
				where: {
					id: req.user.ID,
				},
			}
		);

		if (user == 0) return next(new ErrorResponse(`User not found`, 500));

		res.status(200).json({
			success: true,
			message: `Password changed`,
		});
	}
});

// @desc Forgot Password
// @route PUT /api/users/forgotPassword
// @access private

router.post('/forgotPassword', idValid(), updateValid(), async(req,res)=>{
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const { Email } = req.body;

		let user = await db.user.findOne({
			where: {
				Email: Email,
			},
		});

		if (!user) {
			return res.status(200).json({
				success: false,
				message: 'Invalid credentials',
			});
		}
		let OTP = getOTP();
		console.log('OTP show', OTP);
		let a = await db.user.update(
			{
				OTP: OTP,
			},
			{
				where: {
					Email: Email,
				},
			}
		);
		console.log(a);
		//Match Password
		let userEmail = user.dataValues.Email;
		let userName = user.dataValues.Name;
		console.log(process.env.EMAIL_FLAG);
		if (process.env.EMAIL_FLAG) {
			new EmailSender().sendOTPToUser(userEmail, userName, OTP);
		}
		return res.status(200).json({
			success: true,
			message: 'OTP send sucessfully.',
		});
	}
});

// @desc Update Password
// @route PUT /api/users/forgotPassword
// @access private
router.post('/updatePassword',updateValid(), saveValid(), idValid(), async(req,res)=>{
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const { Email, New_Password } = req.body;

		await db.user.update(
			{ Password: New_Password },
			{
				where: {
					Email: Email,
				},
			}
		);

		res
			.status(200)
			.json({ success: true, msg: 'password changed successfully' });
	}
});

// @desc Resend OTP
// @route PUT /api/users/resendOTP
// @access private

router.post('/resendOTP',updateValid(), saveValid(), idValid(), async(req,res)=>{
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const { Email } = req.body;

		//Check user exist
		const user = await db.user.findOne({
			where: {
				Email: Email,
			},
		});

		if (!user) {
			return res.status(200).json({
				success: false,
				message: 'Invalid credentials',
			});
		}

		let OTP = getOTP();
		await db.user.update(
			{
				OTP: OTP,
			},
			{
				where: {
					Email: Email,
				},
			}
		);
		//Match Password
		let userEmail = user.dataValues.Email;
		let userName = user.dataValues.Name;
		if (process.env.EMAIL_FLAG) {
			new EmailSender().sendOTPToUser(userEmail, userName, OTP);
		}
		return res.status(200).json({
			success: true,
			message: 'OTP send sucessfully.',
		});
	}
});

// @desc verify OTP
// @route PUT /api/users/verifyOTP
// @access private

router.post('/verifyOTP',updateValid(), saveValid(), idValid(), async(req,res)=>{
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const { Email, OTP } = req.body;

		//Check user exist
		const user = await db.user.findOne({
			where: {
				Email: Email,
			},
		});
		if (user.dataValues.OTP != OTP) {
			return res.status(200).json({
				success: false,
				message: 'Invalid OTP.',
			});
		}
		// sendTokenReponse(user, 200, res);
		return res.status(200).json({
			success: true,
			message: 'OTP successfully validated.',
		});
	}
});

// @desc Delete User
// @route DELETE /api/users/:id
// @access private
router.post('/deleteUser', idValid(), async(req,res)=>{
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const { id } = req.body;
		const user = await db.user.destroy({
			where: {
				id: req.body.id,
			},
		});

		if (user === 0) return next(new ErrorResponse(`User not found`, 500));

		res.status(200).json({
			success: true,
			message: `User deleted`,
		});
	}
});

// @desc get location export
// @route POST /api/users/getUsersExport
// @access public
router.post('/getUsersExport',updateValid(), saveValid(), idValid(), async(req,res)=>{
	const styles = stylesData();
	const heading = [[{ value: 'Users Master', style: styles.topHeader }]];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Employee_Code: {
			displayName: 'Employee Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Name: {
			displayName: 'Employee Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Email: {
			displayName: 'Email',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Phone: {
			displayName: 'Phone',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		HOD: {
			displayName: 'HOD Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		HEAD: {
			displayName: 'Head Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Location: {
			displayName: 'Location',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Department: {
			displayName: 'Department',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Cost_Center: {
			displayName: 'Cost Center',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		User_Type: {
			displayName: 'User Type',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
	};

	let condition = {};
	if (req.body.search != '') {
		condition.Name = {
			[Op.like]: `${req.body.search}%`,
		};
	}
	const usersData = await db.user.findAll({
		where: condition,
		order: ['Name'],
	});

	let usersDataList = [];
	let count = 1;
	for (let i = 0; i < usersData.length; i++) {
		let HODData = await db.user.findOne({
			where: {
				ID: usersData[i].dataValues.HOD,
			},
			attributes: ['Name'],
		});
		let HeadData = await db.user.findOne({
			where: {
				ID: usersData[i].dataValues.HEAD,
			},
			attributes: ['Name'],
		});

		locationsDataItem = {
			Sr_No: count,
			Employee_Code: usersData[i].dataValues.Employee_Code,
			Name: usersData[i].dataValues.Name,
			Email: usersData[i].dataValues.Email,
			Phone: usersData[i].dataValues.Mobile
				? Number(usersData[i].dataValues.Mobile)
				: ' ',
			HOD: HODData ? HODData.Name : ' ',
			HEAD: HeadData ? HeadData.Name : ' ',
			Location: usersData[i].dataValues.Location
				? usersData[i].dataValues.Location
				: ' ',
			Department: usersData[i].dataValues.Department
				? usersData[i].dataValues.Department
				: ' ',
			Cost_Center: usersData[i].dataValues.Cost_Center
				? usersData[i].dataValues.Cost_Center
				: ' ',
			User_Type: usersData[i].dataValues.User_Type,
		};
		usersDataList.push(locationsDataItem);
		count = count + 1;
	}
	const dataset = usersDataList;

	const merges = [
		{
			start: { row: 1, column: 1 },
			end: { row: 1, column: Object.keys(specification).length },
		},
	];

	const report = excel.buildExport([
		{
			name: 'Report',
			heading: heading,
			merges: merges,
			specification: specification,
			data: dataset,
		},
	]);
	res.attachment('Users.xlsx');
	return res.send(report);
	// if (usersDataList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: usersDataList,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});

module.exports = router
