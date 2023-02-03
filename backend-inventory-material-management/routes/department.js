const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');
const excel = require('node-excel-export');
const { stylesData } = require('../utils/style');
// @desc add department
// @route POST /api/issuetype/addDepartment
// @access public
exports.addDepartment = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const department = await db.department.create(req.body);
		res.status(200).json({
			success: true,
			message: `New Department added`,
			data: department,
		});
	}
});

// @desc update department
// @route POST /api/department/updateDepartment
// @access public
exports.updateDepartment = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const department = await db.department.update(req.body, {
			where: {
				ID: req.body.id,
			},
		});

		if (department == 0)
			return next(new ErrorResponse(`Department details not found.`, 404));

		res.status(200).json({
			success: true,
			message: `Department details updated.`,
			data: department,
		});
	}
});

// @desc delete department
// @route POST /api/department/deleteDepartment
// @access public
exports.deleteDepartment = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const department = await db.department.destroy({
			where: {
				ID: req.body.id,
			},
		});

		if (department === 0) {
			return next(new ErrorResponse(`Department not found.`, 404));
		}

		res.status(200).json({
			success: true,
			message: `Department deleted.`,
			data: department,
		});
	}
});

// @desc get department
// @route POST /api/department/getDepartment
// @access public
exports.getDepartment = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		await db.department
			.findOne({
				where: {
					ID: req.body.id,
				},
			})
			.then((data) => {
				if (data) {
					res.send({
						message: 'Department details found.',
						data: data,
						error: false,
					});
				} else {
					return next(new ErrorResponse(`Department details not found.`, 404));
				}
			})
			.catch((err) => {
				next(err);
			});
	}
});

// @desc get departments
// @route POST /api/department/getDepartments
// @access public
exports.getDepartments = asyncHandler(async (req, res, next) => {
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
	const departments = await db.department.findAndCountAll({
		where: condition,
		limit,
		offset,
		order: ['Name'],
	});

	if (departments) {
		let { total, data, totalPages, currentPage } = getPagingData(
			departments,
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
// @desc get all department
// @route POST /api/department/getAllDepartment
// @access public
exports.getAllDepartment = asyncHandler(async (req, res, next) => {
	const allDepartment = await db.department.findAll({
		order: ['Name'],
		attributes: ['Name', 'Cost_Center_Name'],
	});
	res.status(200).json({
		success: true,
		data: allDepartment,
	});
});

// @desc get material receipt export
// @route POST /api/department/getDepartmentsExport
// @access public
exports.getDepartmentsExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [
		[{ value: 'Departments & Cost Centers Master', style: styles.topHeader }],
	];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Department_Name: {
			displayName: 'Department Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Cost_Center_Name: {
			displayName: 'Cost Center Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
	};

	let condition = {};
	if (req.body.search != '') {
		condition.Name = { [Op.like]: `${req.body.search}%` };
	}
	const departmentsData = await db.department.findAll({
		where: condition,
		order: ['Name'],
	});

	let departmentsDataList = [];
	let count = 1;
	for (let i = 0; i < departmentsData.length; i++) {
		departmentsDataItem = {
			Sr_No: count,
			Department_Name: departmentsData[i].dataValues.Name,
			Cost_Center_Name: departmentsData[i].dataValues.Cost_Center_Name,
		};
		departmentsDataList.push(departmentsDataItem);
		count = count + 1;
	}
	const dataset = departmentsDataList;

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
	res.attachment('Dept & Cost Center.xlsx');
	return res.send(report);
	// if (departmentsData) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: departmentsData,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
