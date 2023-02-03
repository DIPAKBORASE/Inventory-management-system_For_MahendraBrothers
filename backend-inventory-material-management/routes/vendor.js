const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');
const EmailSender = require('../utils/sendEmail');
const excel = require('node-excel-export');
const { stylesData } = require('../utils/style');
// @desc Register user
// @route POST /api/vendor/addVendor
// @access public
exports.addVendor = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const vendor = await db.vendors.create(req.body);
		res.status(200).json({
			success: true,
			message: `New vendor added`,
			data: vendor,
		});
	}
});

// @desc Register user
// @route POST /api/vendor/updateVendor
// @access public
exports.updateVendor = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const vendor = await db.vendors.update(req.body, {
			where: {
				ID: req.body.id,
			},
		});

		if (vendor == 0)
			return next(new ErrorResponse(`vendor details not found`, 404));

		res.status(200).json({
			success: true,
			message: `vendor details updated`,
			data: vendor,
		});
	}
});

// @desc Register user
// @route POST /api/vendor/deleteVendor
// @access public
exports.deleteVendor = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const Vendor = await db.vendors.destroy({
			where: {
				ID: req.body.id,
			},
		});

		if (Vendor === 0) {
			return next(new ErrorResponse(`Vendor not found`, 404));
		}

		res.status(200).json({
			success: true,
			message: `Vendor deleted`,
			data: Vendor,
		});
	}
});

// @desc Register user
// @route POST /api/vendor/getVendor
// @access public
exports.getVendor = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		await db.vendors
			.findOne({
				where: {
					ID: req.body.id,
				},
			})
			.then((data) => {
				if (data) {
					res.send({
						message: 'Vendor details found',
						data: data,
						error: false,
					});
				} else {
					return next(new ErrorResponse(`Vendor details not found`, 404));
				}
			})
			.catch((err) => {
				next(err);
			});
	}
});

exports.getVendors = asyncHandler(async (req, res, next) => {
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
	const vendors = await db.vendors.findAndCountAll({
		where: condition,
		limit,
		offset,
		order: ['Name'],
	});

	if (vendors) {
		let { total, data, totalPages, currentPage } = getPagingData(
			vendors,
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
// @desc get All Vendors
// @route POST /api/vendor/getAllVendors
// @access public
exports.getAllVendors = asyncHandler(async (req, res, next) => {
	const allVendors = await db.vendors.findAll({
		order: ['Name'],
		attributes: ['ID', 'ALT_Code', 'Name', 'Address', 'GST_No'],
	});
	res.status(200).json({
		success: true,
		data: allVendors,
	});
});

// @desc get vendors export
// @route POST /api/vendor/getVendorsExport
// @access public
exports.getVendorsExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [[{ value: 'Vendor Master', style: styles.topHeader }]];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		ALT_Code: {
			displayName: 'Vendor Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Vendor_Name: {
			displayName: 'Vendor Name',
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
		Country: {
			displayName: 'Country',
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
			width: 400,
		},
		Pincode: {
			displayName: 'Pincode',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 100,
		},
		Description: {
			displayName: 'Description',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		GST_No: {
			displayName: 'GST Number',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		PAN_No: {
			displayName: 'PAN Number',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Bank_Name: {
			displayName: 'Bank Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Account_Number: {
			displayName: 'Account Number',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Bank_Branch: {
			displayName: 'Bank Branch',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		IFSC_Code: {
			displayName: 'IFSC Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Bank_Address: {
			displayName: 'Bank Address',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 300,
		},
	};

	let condition = {};
	if (req.body.search != '') {
		condition.Name = { [Op.like]: `${req.body.search}%` };
	}
	const vendorsData = await db.vendors.findAll({
		where: condition,
		order: ['Name'],
	});

	let vendorsDataList = [];
	let count = 1;
	for (let i = 0; i < vendorsData.length; i++) {
		vendorsDataItem = {
			Sr_No: count,
			ALT_Code: vendorsData[i].dataValues.ALT_Code
				? vendorsData[i].dataValues.ALT_Code
				: ' ',
			Vendor_Name: vendorsData[i].dataValues.Name,
			Contact_Person: vendorsData[i].dataValues.Contact_Person,
			Email: vendorsData[i].dataValues.Email,
			Phone: Number(vendorsData[i].dataValues.Phone),
			State: vendorsData[i].dataValues.State
				? vendorsData[i].dataValues.State
				: ' ',
			Country: vendorsData[i].dataValues.Country
				? vendorsData[i].dataValues.Country
				: ' ',
			City: vendorsData[i].dataValues.City
				? vendorsData[i].dataValues.City
				: ' ',
			Address: vendorsData[i].dataValues.Address,
			Pincode: Number(vendorsData[i].dataValues.Pincode),
			Description: vendorsData[i].dataValues.Description
				? vendorsData[i].dataValues.Description
				: ' ',
			GST_No: vendorsData[i].dataValues.GST_No
				? vendorsData[i].dataValues.GST_No
				: ' ',
			PAN_No: vendorsData[i].dataValues.PAN_No
				? vendorsData[i].dataValues.PAN_No
				: ' ',
			Bank_Name: vendorsData[i].dataValues.Bank_Name
				? vendorsData[i].dataValues.Bank_Name
				: ' ',
			Account_Number: vendorsData[i].dataValues.Account_Number
				? vendorsData[i].dataValues.Account_Number
				: ' ',
			Bank_Branch: vendorsData[i].dataValues.Bank_Branch
				? vendorsData[i].dataValues.Bank_Branch
				: ' ',
			IFSC_Code: vendorsData[i].dataValues.IFSC_Code
				? vendorsData[i].dataValues.IFSC_Code
				: ' ',
			Bank_Address: vendorsData[i].dataValues.Bank_Address
				? vendorsData[i].dataValues.Bank_Address
				: ' ',
		};
		vendorsDataList.push(vendorsDataItem);
		count = count + 1;
	}
	const dataset = vendorsDataList;

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
	res.attachment('Vendors.xlsx');
	return res.send(report);
	// if (vendorsData) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: vendorsData,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
