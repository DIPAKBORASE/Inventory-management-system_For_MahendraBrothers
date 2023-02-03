const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');
const excel = require('node-excel-export');
const { stylesData } = require('../utils/style');

// @desc Register user
// @route POST /api/issuetype/addIssueType
// @access public
exports.addIssueType = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let userType = req.user.User_Type;
		let department = req.body.User_Type;
		if (department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
			req.body.User_Type = process.env.DEPT_IT;
		} else if (department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
			req.body.User_Type = process.env.DEPT_ADMIN;
		} else if (userType == process.env.IT_SYSTEM_ADMIN) {
			req.body.User_Type = process.env.DEPT_IT;
		} else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
			req.body.User_Type = process.env.DEPT_ADMIN;
		} else {
			return next(new ErrorResponse(`Enter Invalid Data.`, 500));
		}
		const issueType = await db.issue_type.create(req.body);
		res.status(200).json({
			success: true,
			message: `New IssueType added`,
			data: issueType,
		});
	}
});

// @desc Register user
// @route POST /api/location/updateIssueType
// @access public
exports.updateIssueType = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let userType = req.user.User_Type;
		let userTypeName;
		let condition = {
			ID: { [Op.eq]: `${req.body.id}` },
		};

		let department = req.body.User_Type;
		if (department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
			req.body.User_Type = process.env.DEPT_IT;
		} else if (department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
			req.body.User_Type = process.env.DEPT_ADMIN;
		} else if (userType == process.env.IT_SYSTEM_ADMIN) {
			req.body.User_Type = process.env.DEPT_IT;
		} else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
			req.body.User_Type = process.env.DEPT_ADMIN;
		} else {
			return next(new ErrorResponse(`Enter Invalid Data.`, 500));
		}

		if (userType == process.env.IT_SYSTEM_ADMIN) {
			condition.User_Type = process.env.DEPT_IT;
		} else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
			condition.User_Type = process.env.DEPT_ADMIN;
		}

		const issueType = await db.issue_type.update(req.body, {
			where: condition,
		});

		if (issueType == 0)
			return next(new ErrorResponse(`IssueType details not found`, 404));

		res.status(200).json({
			success: true,
			message: `IssueType details updated`,
			data: issueType,
		});
	}
});

// @desc Register user
// @route POST /api/issuetype/deleteIssueType
// @access public
exports.deleteIssueType = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const IssueType = await db.issue_type.destroy({
			where: {
				ID: req.body.id,
			},
		});

		if (IssueType === 0) {
			return next(new ErrorResponse(`Issue Type not found`, 404));
		}

		res.status(200).json({
			success: true,
			message: `Issue Type deleted`,
			data: IssueType,
		});
	}
});

// @desc Register user
// @route POST /api/issuetype/getIssueType
// @access public
exports.getIssueType = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let userType = req.user.User_Type;
		let condition = {
			ID: { [Op.eq]: `${req.body.id}` },
		};
		if (userType == process.env.IT_SYSTEM_ADMIN) {
			condition.User_Type = process.env.DEPT_IT;
		} else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
			condition.User_Type = process.env.DEPT_ADMIN;
		}

		await db.issue_type
			.findOne({
				where: condition,
			})
			.then((data) => {
				if (data) {
					res.send({
						message: 'IssueType details found',
						data: data,
						error: false,
					});
				} else {
					return next(new ErrorResponse(`IssueType details not found`, 404));
				}
			})
			.catch((err) => {
				next(err);
			});
	}
});

// @desc Register user
// @route POST /api/issuetype/getIssueTypes
// @access public
// exports.getIssueTypes = asyncHandler(async (req, res, next) => {
// 	console.log(req.body);
// 	const { page, pageSize } = req.body;
// 	const IssueTypes = await db.issue_type.findAndCountAll({
// 		offset: page * pageSize,
// 		limit: pageSize,
// 	});
// 	res.status(200).json({
// 		success: true,
// 		data: IssueTypes,
// 	});
// });
exports.getIssueTypes = asyncHandler(async (req, res, next) => {
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	let userType = req.user.User_Type;
	let condition = {};
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
	if (userType == process.env.IT_SYSTEM_ADMIN) {
		condition.User_Type = process.env.DEPT_IT;
	} else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
		condition.User_Type = process.env.DEPT_ADMIN;
	}
	const issue_types = await db.issue_type.findAndCountAll({
		where: condition,
		limit,
		offset,
		order: [
			['User_Type', 'DESC'],
			['Name', 'ASC'],
		],
	});

	if (issue_types) {
		let { total, data, totalPages, currentPage } = getPagingData(
			issue_types,
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
// @desc get all issue type
// @route POST /api/issuetype/getAllIssueType
// @access public
exports.getAllIssueType = asyncHandler(async (req, res, next) => {
	let userType;
	let condition = {};
	if (req.body.Request_Department == 'IT') {
		condition.User_Type = process.env.DEPT_IT;
	} else if (req.body.Request_Department == 'Admin') {
		condition.User_Type = process.env.DEPT_ADMIN;
	} else {
		return next(new ErrorResponse(`Invalid Data`, 500));
	}

	// if (userType == process.env.IT_SYSTEM_ADMIN) {
	// 	condition.User_Type = process.env.DEPT_IT;
	// } else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
	// 	condition.User_Type = process.env.DEPT_ADMIN;
	// }

	const allIssueType = await db.issue_type.findAll({
		where: condition,
		order: ['Name'],
	});
	res.status(200).json({
		success: true,
		data: allIssueType,
	});
});

// @desc get issue type export
// @route POST /api/issuetype/getIssueTypesExport
// @access public
exports.getIssueTypesExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [[{ value: 'Issue Type Master', style: styles.topHeader }]];
	let userType = req.user.User_Type;
	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Issue_Type_Name: {
			displayName: 'Issue Type Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		User_Type: {
			displayName: 'Department',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
	};

	let condition = {};
	if (req.body.search != '') {
		condition.Name = { [Op.like]: `${req.body.search}%` };
	}
	if (userType == process.env.IT_SYSTEM_ADMIN) {
		condition.User_Type = process.env.DEPT_IT;
	} else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
		condition.User_Type = process.env.DEPT_ADMIN;
	}
	const issueTypesData = await db.issue_type.findAll({
		where: condition,
		order: [
			['User_Type', 'DESC'],
			['Name', 'ASC'],
		],
	});

	let issueTypesDataList = [];
	let count = 1;
	for (let i = 0; i < issueTypesData.length; i++) {
		issueTypesDataItem = {
			Sr_No: count,
			Issue_Type_Name: issueTypesData[i].dataValues.Name,
			User_Type: issueTypesData[i].dataValues.User_Type,
		};
		issueTypesDataList.push(issueTypesDataItem);
		count = count + 1;
	}
	const dataset = issueTypesDataList;

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
	res.attachment('Issue_Types.xlsx');
	return res.send(report);
	// if (issueTypesDataList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: issueTypesDataList,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
