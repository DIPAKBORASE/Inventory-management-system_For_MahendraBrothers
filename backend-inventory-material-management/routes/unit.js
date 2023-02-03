const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');
const excel = require('node-excel-export');
const { stylesData } = require('../utils/style');

// @desc Register user
// @route POST /api/unit/addUnit
// @access public
exports.addUnit = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const unit = await db.unit.create(req.body);
		res.status(200).json({
			success: true,
			message: `New unit added`,
			data: unit,
		});
	}
});

// @desc Register user
// @route POST /api/unit/updateUnit
// @access public
exports.updateUnit = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const unit = await db.unit.update(req.body, {
			where: {
				ID: req.body.id,
			},
		});

		if (unit == 0)
			return next(new ErrorResponse(`Unit details not found`, 404));

		res.status(200).json({
			success: true,
			message: `Unit details updated`,
			data: unit,
		});
	}
});

// @desc Register user
// @route POST /api/unit/deleteUnit
// @access public
exports.deleteUnit = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const Unit = await db.unit.destroy({
			where: {
				ID: req.body.id,
			},
		});

		if (Unit === 0) {
			return next(new ErrorResponse(`Unit not found`, 404));
		}

		res.status(200).json({
			success: true,
			message: `Unit deleted`,
			data: Unit,
		});
	}
});

// @desc Register user
// @route POST /api/unit/getUnit
// @access public
exports.getUnit = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		await db.unit
			.findOne({
				where: {
					ID: req.body.id,
				},
			})
			.then((data) => {
				if (data) {
					res.send({
						message: 'Unit details found',
						data: data,
						error: false,
					});
				} else {
					return next(new ErrorResponse(`Unit details not found`, 404));
				}
			})
			.catch((err) => {
				next(err);
			});
	}
});

// @desc get Units with pagination
// @route POST /api/unit/getUnits
// @access public
exports.getUnits = asyncHandler(async (req, res, next) => {
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	let condition = '';
	if (req.body.hasOwnProperty('search')) {
		if (req.body.search != '') {
			condition = req.body.search
				? { Name: { [Op.like]: `${req.body.search}%` } }
				: null;
		}
	}
	const units = await db.unit.findAndCountAll({
		where: condition,
		limit,
		offset,
		order: ['Name'],
	});

	if (units) {
		let { total, data, totalPages, currentPage } = getPagingData(
			units,
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
// @desc get All Units
// @route POST /api/unit/getAllUnits
// @access public
exports.getAllUnits = asyncHandler(async (req, res, next) => {
	const allUnits = await db.unit.findAll({ order: ['Name'] });
	res.status(200).json({
		success: true,
		data: allUnits,
	});
});

// @desc get units export
// @route POST /api/units/getUnitsExport
// @access public
exports.getUnitsExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [[{ value: 'Units Master', style: styles.topHeader }]];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Unit_Name: {
			displayName: 'Unit Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
	};

	let condition = {};
	if (req.body.search != '') {
		condition.Name = { [Op.like]: `${req.body.search}%` };
	}
	const unitsData = await db.unit.findAll({
		where: condition,
		order: ['Name'],
	});

	let unitsDataList = [];
	let count = 1;
	for (let i = 0; i < unitsData.length; i++) {
		// for (let j = 0; j < unitsData[i].dataValues.assets.length; j++) {
		unitsDataItem = {
			Sr_No: count,
			Unit_Name: unitsData[i].dataValues.Name,
		};
		unitsDataList.push(unitsDataItem);
		count = count + 1;
		// }
	}
	const dataset = unitsDataList;

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
	res.attachment('Units.xlsx');
	return res.send(report);
	// if (unitsData) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: unitsData,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
