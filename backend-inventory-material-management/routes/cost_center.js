const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');
const excel = require('node-excel-export');
const { stylesData } = require('../utils/style');

// @desc add cost center
// @route POST /api/costcenter/addCostCenter
// @access public
exports.addCostCenter = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const costCenter = await db.cost_center.create(req.body);
		res.status(200).json({
			success: true,
			message: `New Cost Center added`,
			data: costCenter,
		});
	}
});

// @desc update cost center
// @route POST /api/costcenter/updateCostCenter
// @access public
exports.updateCostCenter = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const costCenter = await db.cost_center.update(req.body, {
			where: {
				ID: req.body.id,
			},
		});

		if (costCenter == 0)
			return next(new ErrorResponse(`Cost Center details not found.`, 404));

		res.status(200).json({
			success: true,
			message: `Cost Center details updated.`,
			data: costCenter,
		});
	}
});

// @desc delete cost center
// @route POST /api/cost center/deleteCostCenter
// @access public
exports.deleteCostCenter = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const costCenter = await db.cost_center.destroy({
			where: {
				ID: req.body.id,
			},
		});

		if (costCenter === 0) {
			return next(new ErrorResponse(`Cost Center not found.`, 404));
		}

		res.status(200).json({
			success: true,
			message: `Cost Center deleted.`,
			data: costCenter,
		});
	}
});

// @desc get cost center
// @route POST /api/costcenter/getCostCenter
// @access public
exports.getCostCenter = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		await db.cost_center
			.findOne({
				where: {
					ID: req.body.id,
				},
			})
			.then((data) => {
				if (data) {
					res.send({
						message: 'Cost Center details found.',
						data: data,
						error: false,
					});
				} else {
					return next(new ErrorResponse(`Cost Center details not found.`, 404));
				}
			})
			.catch((err) => {
				next(err);
			});
	}
});

// @desc get cost center
// @route POST /api/costcenter/getCostCenters
// @access public
exports.getCostCenters = asyncHandler(async (req, res, next) => {
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
	const costCenters = await db.cost_center.findAndCountAll({
		where: condition,
		limit,
		offset,
		order: ['Name'],
	});

	if (costCenters) {
		let { total, data, totalPages, currentPage } = getPagingData(
			costCenters,
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
// @desc get all cost center
// @route POST /api/costcenter/getAllCostCenter
// @access public
exports.getAllCostCenter = asyncHandler(async (req, res, next) => {
	const allCostCenter = await db.cost_center.findAll({
		order: ['Name'],
		attributes: ['Name'],
	});
	res.status(200).json({
		success: true,
		data: allCostCenter,
	});
});

// @desc get cost center export
// @route POST /api/costcenter/getCostCentersExport
// @access public
exports.getCostCentersExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [[{ value: 'Cost Center Master', style: styles.topHeader }]];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
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
	const costCenterData = await db.cost_center.findAll({
		where: condition,
		order: ['Name'],
	});

	let costCenterDataList = [];
	let count = 1;
	for (let i = 0; i < costCenterData.length; i++) {
		costCenterDataItem = {
			Sr_No: count,
			Cost_Center_Name: costCenterData[i].dataValues.Name,
		};
		costCenterDataList.push(costCenterDataItem);
		count = count + 1;
	}
	const dataset = costCenterDataList;

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
	res.attachment('Cost_Center.xlsx');
	return res.send(report);
	// if (costCenterData) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: costCenterData,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
