const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');
const excel = require('node-excel-export');
const { stylesData } = require('../utils/style');

// @desc add location
// @route POST /api/location/addLocation
// @access public
exports.addLocation = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		req.body.ALT_Code = req.body.ALT_Code ? req.body.ALT_Code : null;
		let findlocation = await db.location.findOne({
			paranoid: false,
		});
		if (findlocation == null) {
			req.body.Is_Default = 1;
		}
		const location = await db.location.create(req.body);
		res.status(200).json({
			success: true,
			message: `New Location added`,
		});
	}
});

// @desc update location by id
// @route POST /api/location/updateLocation
// @access public
exports.updateLocation = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		req.body.ALT_Code = req.body.ALT_Code ? req.body.ALT_Code : null;
		const location = await db.location.update(req.body, {
			where: {
				ID: req.body.id,
			},
		});

		if (location == 0)
			return next(new ErrorResponse(`Location details not found`, 500));

		res.status(200).json({
			success: true,
			message: `Location details updated`,
		});
	}
});

// @desc delete location by id
// @route POST /api/location/deleteLocation
// @access public
exports.deleteLocation = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const Location = await db.location.destroy({
			where: {
				ID: req.body.id,
				Is_Default: 0,
			},
		});

		if (Location === 0) {
			return next(new ErrorResponse(`Location not found`, 500));
		}

		res.status(200).json({
			success: true,
			message: `Location deleted`,
		});
	}
});

// @desc get location by id
// @route POST /api/location/getLocation
// @access public
exports.getLocation = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		await db.location
			.findOne({
				where: {
					ID: req.body.id,
				},
			})
			.then((data) => {
				if (data) {
					res.send({
						message: 'Location details found.',
						data: data,
						error: false,
					});
				} else {
					return next(new ErrorResponse(`Location details not found.`, 500));
				}
			})
			.catch((err) => {
				next(err);
			});
	}
});

// @desc get location list with pagination
// @route POST /api/location/getLocations
// @access public
exports.getLocations = asyncHandler(async (req, res, next) => {
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
	const locations = await db.location.findAndCountAll({
		where: condition,
		limit,
		offset,
		order: ['Name'],
	});

	if (locations) {
		let { total, data, totalPages, currentPage } = getPagingData(
			locations,
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
	// const taskitems = await db.location.findAll({
	// 	where: condition,
	// 	order: ['Name'],
	// });
	// const tasks = await db.location.findAll({
	// 	where: condition,
	// 	limit,
	// 	offset,
	// 	order: ['Name'],
	// });

	// if (tasks) {
	// 	tasks.count = taskitems ? taskitems.length : 0;
	// 	let { totalItems, data, Total, totalPages, currentPage } = getPagingData(
	// 		tasks,
	// 		req.body.pageNumber,
	// 		req.body.numberOfRows
	// 	);
	// 	res.status(200).json({
	// 		error: false,
	// 		data: { totalItems, data, totalPages, currentPage },
	// 		total: totalItems,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		error: false,
	// 		data: {},
	// 	});
	// }
});

// @desc Get All location
// @route POST /api/location/getAllLocation
// @access public
exports.getAllLocation = asyncHandler(async (req, res, next) => {
	const allLocation = await db.location.findAll({ order: ['Name'] });
	res.status(200).json({
		success: true,
		data: allLocation,
	});
});

// @desc get location export
// @route POST /api/location/getLocationsExport
// @access public
exports.getLocationsExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [[{ value: 'Location Master', style: styles.topHeader }]];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		ALT_Code: {
			displayName: 'Location Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Location_Name: {
			displayName: 'Location Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Contact_Person: {
			displayName: 'Contact Person',
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
		State: {
			displayName: 'State',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		City: {
			displayName: 'City',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Address: {
			displayName: 'Address',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 900,
		},
	};

	let condition = {};
	if (req.body.search != '') {
		condition.Name = { [Op.like]: `${req.body.search}%` };
	}
	const locationsData = await db.location.findAll({
		where: condition,
		order: ['Name'],
	});

	let locationsDataList = [];
	let count = 1;
	for (let i = 0; i < locationsData.length; i++) {
		locationsDataItem = {
			Sr_No: count,
			ALT_Code: locationsData[i].dataValues.ALT_Code
				? locationsData[i].dataValues.ALT_Code
				: ' ',
			Location_Name: locationsData[i].dataValues.Name
				? locationsData[i].dataValues.Name
				: ' ',
			Contact_Person: locationsData[i].dataValues.Contact_Person
				? locationsData[i].dataValues.Contact_Person
				: ' ',
			Email: locationsData[i].dataValues.Email
				? locationsData[i].dataValues.Email
				: ' ',
			Phone: locationsData[i].dataValues.Phone
				? Number(locationsData[i].dataValues.Phone)
				: ' ',
			State: locationsData[i].dataValues.State
				? locationsData[i].dataValues.State
				: ' ',
			City: locationsData[i].dataValues.City
				? locationsData[i].dataValues.City
				: ' ',
			Address: locationsData[i].dataValues.Address
				? locationsData[i].dataValues.Address
				: ' ',
		};
		locationsDataList.push(locationsDataItem);
		count = count + 1;
	}
	const dataset = locationsDataList;

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
	res.attachment('Locations.xlsx');
	return res.send(report);
	// if (locationsData) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: locationsData,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
