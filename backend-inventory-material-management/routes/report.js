const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');
const moment = require('moment');

// @desc get material receipt report
// @route POST /api/report/getMaterialReceiptReport
// @access public
exports.getMaterialReceiptReport = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);

	let condition = '';
	if (req.body.search != '') {
		condition += ' and Challan_No Like "' + req.body.search + '%" ';
	}
	if (req.body.startDate != '' && req.body.endDate != '') {
		condition +=
			' and Dated_On >= "' +
			req.body.startDate +
			'" and Dated_On <= "' +
			req.body.endDate +
			'"';
	} else if (req.body.startDate != '') {
		condition += ' and Dated_On >= "' + req.body.startDate + '"';
	} else if (req.body.endDate != '') {
		condition += ' and Dated_On <= "' + req.body.endDate + '"';
	}
	if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
		condition += ' and  User_Type = "' + process.env.DEPT_IT + '"';
	} else if (
		userType == process.env.ADMIN_SYSTEM_ADMIN ||
		userType == process.env.ADMIN
	) {
		condition += ' and User_Type = "' + process.env.DEPT_ADMIN + '"';
	}
	if (req.body.Vendor_Name != '') {
		condition += ' and vendor.Name =  "' + req.body.Vendor_Name + '" ';
	}

	if (req.body.ALT_Code != '') {
		condition +=
			' and `assets->product`.`ALT_Code` = "' + req.body.ALT_Code + '"';
	}
	if (req.body.Product_Group != '') {
		condition +=
			' and `assets->product`.`Product_Group` = "' +
			req.body.Product_Group +
			'"';
	}

	const materialData1 = await db.sequelize
		.query(
			'SELECT `inward`.`ID`, `inward`.`Challan_No`, `inward`.`Dated_On`, `vendor`.`ID` AS `Vendor_ID`, `vendor`.`Name` AS `Vendor_Name`,' +
				' `assets`.`ID` AS `Asset_ID`, `assets`.`Per_Unit_Price` AS `Per_Unit_Price`, SUM(`assets`.`Quantity`) AS `Quantity`,' +
				' SUM(`assets`.`Sub_Total`) AS `Sub_Total`, SUM(`assets`.`Total_Price`) AS `Total_Price`, SUM(`assets`.`TAX_Value`) AS `TAX_Value`,' +
				' `assets->product`.`ID` AS `Product_ID`, ' +
				'`assets->product`.`ALT_Code` AS `ALT_Code`, `assets->product`.`Name` AS `Product_Name`, `assets->product`.`Description` AS `Description`,' +
				' `assets->product`.`UOM` AS `UOM`, `assets->product`.`Product_Group` AS `Product_Group`, `assets->product`.`TAX_Percentage` AS `TAX_Percentage`' +
				' FROM `inward` AS `inward` LEFT OUTER JOIN `vendors` AS `vendor` ON `inward`.`Vendor_ID` = `vendor`.`ID`' +
				' AND (`vendor`.`Deleted_At` IS NULL) LEFT OUTER JOIN `assets` AS `assets` ON `inward`.`ID` = `assets`.`Inward_ID`' +
				' AND (`assets`.`Deleted_At` IS NULL) LEFT OUTER JOIN `products` AS `assets->product` ON `assets`.`Product_ID` = `assets->product`.`ID`' +
				' AND (`assets->product`.`Deleted_At` IS NULL) WHERE `inward`.`Deleted_At` IS NULL' +
				condition +
				' GROUP BY `assets`.`Product_ID`,`Challan_No`,`Vendor_ID` ',
			{
				replacements: {
					// limit: limit,
					// offset: offset,
					search: '%' + req.body.search + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});
	const materialData = await db.sequelize
		.query(
			'SELECT `inward`.`ID`, `inward`.`Challan_No`, `inward`.`Dated_On`, `vendor`.`ID` AS `Vendor_ID`, `vendor`.`Name` AS `Vendor_Name`,' +
				' `assets`.`ID` AS `Asset_ID`, `assets`.`Per_Unit_Price` AS `Per_Unit_Price`, SUM(`assets`.`Quantity`) AS `Quantity`,' +
				' SUM(`assets`.`Sub_Total`) AS `Sub_Total`, SUM(`assets`.`Total_Price`) AS `Total_Price`, SUM(`assets`.`TAX_Value`) AS `TAX_Value`,' +
				' `assets->product`.`ID` AS `Product_ID`, ' +
				'`assets->product`.`ALT_Code` AS `ALT_Code`, `assets->product`.`Name` AS `Product_Name`, `assets->product`.`Description` AS `Description`,' +
				' `assets->product`.`UOM` AS `UOM`, `assets->product`.`Product_Group` AS `Product_Group`, `assets->product`.`TAX_Percentage` AS `TAX_Percentage`' +
				' FROM `inward` AS `inward` LEFT OUTER JOIN `vendors` AS `vendor` ON `inward`.`Vendor_ID` = `vendor`.`ID`' +
				' AND (`vendor`.`Deleted_At` IS NULL) LEFT OUTER JOIN `assets` AS `assets` ON `inward`.`ID` = `assets`.`Inward_ID`' +
				' AND (`assets`.`Deleted_At` IS NULL) LEFT OUTER JOIN `products` AS `assets->product` ON `assets`.`Product_ID` = `assets->product`.`ID`' +
				' AND (`assets->product`.`Deleted_At` IS NULL) WHERE `inward`.`Deleted_At` IS NULL' +
				condition +
				' GROUP BY `assets`.`Product_ID`,`Challan_No`,`Vendor_ID` Order By `Dated_On` desc, `inward`.`ID` DESC limit :offset, :limit ',
			{
				replacements: {
					limit: limit,
					offset: offset,
					search: '%' + req.body.search + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});

	// let dummyData = materialData.reduce((acc, d) => {
	// 	const found = acc.find((a) => a.Challan_No === d.Challan_No);
	// 	const value = {
	// 		ID: d.Asset_ID,
	// 		Per_Unit_Price: d.Per_Unit_Price,
	// 		Quantity: d.Quantity,
	// 		Total_Price: d.Total_Price,
	// 		TAX_Value: d.TAX_Value,
	// 		Net_Amount: d.Net_Amount,

	// 		product: {
	// 			ID: d.Product_ID,
	// 			ALT_Code: d.ALT_Code,
	// 			Name: d.Product_Name,
	// 			Product_Group: d.Product_Group,
	// 			Description: d.Description,
	// 			UOM: d.UOM,
	// 			TAX_Percentage: d.TAX_Percentag,
	// 		},
	// 	};
	// 	if (!found) {
	// 		acc.push({
	// 			Challan_No: d.Challan_No,
	// 			Dated_On: d.Dated_On,
	// 			vendor: {
	// 				Name: d.Vendor_Name,
	// 			},
	// 			assets: [value],
	// 		});
	// 	} else {
	// 		found.assets.push(value);
	// 	}
	// 	return acc;
	// }, []);

	materialData.count = materialData1.length;
	materialData.rows = materialData;

	if (materialData) {
		let { total, data, totalPages, currentPage } = getPagingData(
			materialData,
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

	// let products = await db.inward.findAll({
	// 	where: condition,
	// 	group: ['assets.Product_ID', 'Challan_No'],
	// 	// limit,
	// 	// offset,

	// 	attributes: ['Challan_No', 'Dated_On'],
	// 	include: [
	// 		{
	// 			model: db.vendors,
	// 			attributes: ['Name'],
	// 			where: vendorCondition,
	// 		},
	// 		{
	// 			model: db.asset,
	// 			as: 'assets',
	// 			attributes: [
	// 				'ID',
	// 				'Per_Unit_Price',
	// 				[
	// 					db.sequelize.fn('SUM', db.sequelize.col('assets.Quantity')),
	// 					'Quantity',
	// 				],
	// 				[
	// 					db.sequelize.fn('SUM', db.sequelize.col('assets.Total_Price')),
	// 					'Total_Price',
	// 				],
	// 				[
	// 					db.sequelize.fn('SUM', db.sequelize.col('assets.TAX_Value')),
	// 					'TAX_Value',
	// 				],
	// 				[
	// 					db.Sequelize.fn(
	// 						'SUM',
	// 						db.Sequelize.where(
	// 							db.Sequelize.col('assets.Total_Price'),
	// 							'+',
	// 							db.Sequelize.col('assets.TAX_Value')
	// 						)
	// 					),
	// 					'Net_Amount',
	// 				],
	// 			],
	// 			include: [
	// 				{
	// 					model: db.products,
	// 					attributes: [
	// 						'ID',
	// 						'ALT_Code',
	// 						'Name',
	// 						'Description',
	// 						'UOM',
	// 						'Product_Group',
	// 						'TAX_Percentage',
	// 					],
	// 					where: productCondition,
	// 				},
	// 			],
	// 		},
	// 	],
	// 	distinct: true,
	// });

	// if (products) {
	// 	// products.count = products.length;
	// 	res.status(200).json({
	// 		success: true,
	// 		data: products,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});

// @desc get material receipt report
// @route POST /api/report/getMaterialReceiptReport
// @access public
exports.getIssueTrackerReport = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);

	let condition =
		'AND (`request`.`Request_Type` = "' +
		process.env.SERVICEREQUEST +
		'" AND `request`.`Type_Of_Issue` IS NOT NULL)';

	if (req.body.search != '') {
		condition += ' and Request_Number Like "' + req.body.search + '%" ';
	}
	if (req.body.startDate != '' && req.body.endDate != '') {
		condition +=
			' and Date(Request_Date) >= "' +
			req.body.startDate +
			'" and Date(Request_Date) <= "' +
			req.body.endDate +
			'"';
	} else if (req.body.startDate != '') {
		condition += ' and Date(Request_Date) >= "' + req.body.startDate + '"';
	} else if (req.body.endDate != '') {
		condition += ' and Date(Request_Date) <= "' + req.body.endDate + '"';
	}
	if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
		condition += ' and  Request_Department = "' + process.env.DEPT_IT + '"';
	} else if (
		userType == process.env.ADMIN_SYSTEM_ADMIN ||
		userType == process.env.ADMIN
	) {
		condition += ' and Request_Department = "' + process.env.DEPT_ADMIN + '"';
	}
	if (req.body.Status != '') {
		condition += ' and Status =  "' + req.body.Status + '" ';
	}
	if (req.body.Department != '') {
		condition += ' and Department =  "' + req.body.Department + '" ';
	}
	if (req.body.Location_Name != '') {
		condition += ' and `location`.`Name` =  "' + req.body.Location_Name + '" ';
	}

	if (req.body.Issue_Type_Name != '') {
		condition +=
			' and `issue_type`.`Name` =  "' + req.body.Issue_Type_Name + '" ';
	}

	const issueTracker1 = await db.sequelize
		.query(
			'SELECT `request`.`ID`, `request`.`Request_Number`, `users`.`Department` AS `Department`,`request`.`Request_Department`,`request`.`Support_Comment`, `request`.`Request_Date`, `request`.`Status`,' +
				' `location`.`ID` AS `location.ID`, `location`.`Name` AS `location_Name`, `issue_type`.`ID` AS `issue_type.ID`, ' +
				'`issue_type`.`Name` AS `issue_type_Name`,`request`.`Assigned_Date` AS `Assigned_Time`,`request`.`Resolved_Date` AS `Resolved_Time`,`request`.`TAT` AS `TAT` FROM `request` AS `request` LEFT OUTER JOIN `location` AS `location` ON `request`.`Location_ID` = `location`.`ID`' +
				' AND (`location`.`Deleted_At` IS NULL) LEFT OUTER JOIN `issue_types` AS `issue_type` ON `request`.`Type_Of_Issue` = `issue_type`.`ID` ' +
				'AND (`issue_type`.`Deleted_At` IS NULL) LEFT OUTER JOIN `users` AS `users` ON `request`.`User_ID` = `users`.`ID` AND (`users`.`Deleted_At` IS NULL) WHERE `request`.`Deleted_At` IS NULL ' +
				condition,
			{
				replacements: {
					// limit: limit,
					// offset: offset,
					search: '%' + req.body.search + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});
	const issueTracker = await db.sequelize
		.query(
			'SELECT `request`.`ID`, `request`.`Request_Number`, `users`.`Department` AS `Department`,`request`.`Request_Department`,`request`.`Support_Comment`, `request`.`Request_Date`, `request`.`Status`,' +
				' `location`.`ID` AS `location.ID`, `location`.`Name` AS `location_Name`, `issue_type`.`ID` AS `issue_type.ID`, ' +
				'`issue_type`.`Name` AS `issue_type_Name`,`request`.`Assigned_Date` AS `Assigned_Time`,`request`.`Resolved_Date` AS `Resolved_Time`,`request`.`TAT` AS `TAT` FROM `request` AS `request` LEFT OUTER JOIN `location` AS `location` ON `request`.`Location_ID` = `location`.`ID`' +
				' AND (`location`.`Deleted_At` IS NULL) LEFT OUTER JOIN `issue_types` AS `issue_type` ON `request`.`Type_Of_Issue` = `issue_type`.`ID` ' +
				'AND (`issue_type`.`Deleted_At` IS NULL) LEFT OUTER JOIN `users` AS `users` ON `request`.`User_ID` = `users`.`ID` AND (`users`.`Deleted_At` IS NULL) WHERE `request`.`Deleted_At` IS NULL ' +
				condition +
				' order by Request_Date desc, `request`.`ID` DESC limit :offset, :limit ',
			{
				replacements: {
					limit: limit,
					offset: offset,
					search: '%' + req.body.search + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});

	// let dummyData = issueTracker.reduce((acc, d) => {
	// 	const found = acc.find((a) => a.Request_Number === d.Request_Number);
	// 	const value = {
	// 		ID: d.ID,
	// 	};
	// 	if (!found) {
	// 		acc.push({
	// 			ID: d.ID,
	// 			Request_Number: d.Request_Number,
	// 			Request_Department: d.Request_Department,
	// 			Request_Date: d.Request_Date,
	// 			Status: d.Status,
	// 			Support_Comment: d.Support_Comment,
	// 			location: {
	// 				Name: d.location_Name,
	// 			},
	// 			issue_type: {
	// 				Name: d.issue_type_Name,
	// 			},
	// 			// assets: [value],
	// 		});
	// 	} else {
	// 		found.assets.push(value);
	// 	}
	// 	return acc;
	// }, []);

	issueTracker.count = issueTracker1.length;
	issueTracker.rows = issueTracker;

	if (issueTracker) {
		let { total, data, totalPages, currentPage } = getPagingData(
			issueTracker,
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

	// let products = await db.inward.findAll({
	// 	where: condition,
	// 	group: ['assets.Product_ID', 'Challan_No'],
	// 	// limit,
	// 	// offset,

	// 	attributes: ['Challan_No', 'Dated_On'],
	// 	include: [
	// 		{
	// 			model: db.vendors,
	// 			attributes: ['Name'],
	// 			where: vendorCondition,
	// 		},
	// 		{
	// 			model: db.asset,
	// 			as: 'assets',
	// 			attributes: [
	// 				'ID',
	// 				'Per_Unit_Price',
	// 				[
	// 					db.sequelize.fn('SUM', db.sequelize.col('assets.Quantity')),
	// 					'Quantity',
	// 				],
	// 				[
	// 					db.sequelize.fn('SUM', db.sequelize.col('assets.Total_Price')),
	// 					'Total_Price',
	// 				],
	// 				[
	// 					db.sequelize.fn('SUM', db.sequelize.col('assets.TAX_Value')),
	// 					'TAX_Value',
	// 				],
	// 				[
	// 					db.Sequelize.fn(
	// 						'SUM',
	// 						db.Sequelize.where(
	// 							db.Sequelize.col('assets.Total_Price'),
	// 							'+',
	// 							db.Sequelize.col('assets.TAX_Value')
	// 						)
	// 					),
	// 					'Net_Amount',
	// 				],
	// 			],
	// 			include: [
	// 				{
	// 					model: db.products,
	// 					attributes: [
	// 						'ID',
	// 						'ALT_Code',
	// 						'Name',
	// 						'Description',
	// 						'UOM',
	// 						'Product_Group',
	// 						'TAX_Percentage',
	// 					],
	// 					where: productCondition,
	// 				},
	// 			],
	// 		},
	// 	],
	// 	distinct: true,
	// });

	// if (materialData) {
	// 	// materialData.count = materialData.length;
	// 	res.status(200).json({
	// 		success: true,
	// 		data: materialData,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
// @desc get consumption report
// @route POST /api/report/getConsumptionReport
// @access public
exports.getConsumptionReport = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	let condition = '';
	if (req.body.search != '') {
		condition +=
			' and `asset_transactions->asset->product`.`Name` Like "' +
			req.body.search +
			'%" ';
	}
	if (req.body.startDate != '' && req.body.endDate != '') {
		condition +=
			' and `dispatch`.`Dated_On` >= "' +
			req.body.startDate +
			'" and `dispatch`.`Dated_On` <= "' +
			req.body.endDate +
			'"';
	} else if (req.body.startDate != '') {
		condition += ' and `dispatch`.`Dated_On` >= "' + req.body.startDate + '"';
	} else if (req.body.endDate != '') {
		condition += ' and `dispatch`.`Dated_On` <= "' + req.body.endDate + '"';
	}
	if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
		condition += ' and  User_Type = "' + process.env.DEPT_IT + '"';
	} else if (
		userType == process.env.ADMIN_SYSTEM_ADMIN ||
		userType == process.env.ADMIN
	) {
		condition += ' and User_Type = "' + process.env.DEPT_ADMIN + '"';
	}

	if (req.body.Location_Name != '') {
		condition += ' and toLocation.Name =  "' + req.body.Location_Name + '" ';
	}
	if (req.body.Department != '') {
		condition += ' and Department = "' + req.body.Department + '"';
	}
	if (req.body.Product_Group != '') {
		condition += ' and Product_Group = "' + req.body.Product_Group + '"';
	}
	let consumptionData1;
	let consumptionData;
	if (req.body.type == 'datewise') {
		consumptionData1 = await db.sequelize
			.query(
				'SELECT `dispatch`.`ID`, `dispatch`.`Gate_Pass_No`, `dispatch`.`Dated_On`,`dispatch`.`Department`,`dispatch`.`Cost_Center`, `toLocation`.`ID` AS `toLocation.ID`, `toLocation`.`Name` AS `Location_Name`,' +
					' `asset_transactions`.`ID` AS `asset_transactions_ID`, SUM(`asset_transactions`.`Quantity`) AS `Quantity`,' +
					' `asset_transactions->asset`.`ID` AS `asset_ID`, `asset_transactions->asset`.`Per_Unit_Price` AS `Price`, SUM(`asset_transactions->asset`.`Sub_Total`) AS `Sub_Total`, ' +
					'`asset_transactions->asset`.`TAX_Percentage` AS `TAX_Percentage`,SUM(`asset_transactions->asset`.`TAX_Value`) AS `TAX_Value`,SUM(`asset_transactions->asset`.`Total_Price`) AS `Total_Price`,' +
					' `asset_transactions->asset`.`Barcode` AS `Barcode`,' +
					' `asset_transactions->asset->product`.`ID` AS `product_ID`, ' +
					' `asset_transactions->asset->product`.`ALT_Code` AS `ALT_Code`,' +
					' `asset_transactions->asset->product`.`Name` AS `product_Name`,' +
					' `asset_transactions->asset->product`.`Description` AS `Description`,' +
					' `asset_transactions->asset->product`.`Product_Group` AS `Product_Group`,' +
					' `asset_transactions->asset->product`.`Asset_Holder` AS `Asset_Holder`' +
					' FROM `dispatch` AS `dispatch` LEFT OUTER JOIN `location` AS `toLocation` ON `dispatch`.`To_Location` = `toLocation`.`ID`' +
					' AND (`toLocation`.`Deleted_At` IS NULL) LEFT OUTER JOIN `asset_transactions`' +
					' AS `asset_transactions` ON `dispatch`.`ID` = `asset_transactions`.`Dispatch_ID`' +
					' AND (`asset_transactions`.`Deleted_At` IS NULL) LEFT OUTER JOIN `assets` AS `asset_transactions->asset` ON `asset_transactions`.`Asset_ID` = `asset_transactions->asset`.`ID` ' +
					'AND (`asset_transactions->asset`.`Deleted_At` IS NULL) LEFT OUTER JOIN `products` AS `asset_transactions->asset->product` ON `asset_transactions->asset`.`Product_ID` = `asset_transactions->asset->product`.`ID`' +
					' AND (`asset_transactions->asset->product`.`Deleted_At` IS NULL) WHERE `dispatch`.`Deleted_At` IS NULL' +
					condition +
					' GROUP BY `Gate_Pass_No`, `asset_transactions->asset`.`Product_ID`, `asset_transactions->asset`.`Barcode` ',
				{
					replacements: {
						// limit: limit,
						// offset: offset,
						search: '%' + req.body.search + '%',
					},
					type: QueryTypes.SELECT,
				}
			)
			.catch((e) => {
				res.status(500).json({
					error: true,
					message: 'Server error..!!',
				});
			});
		consumptionData = await db.sequelize
			.query(
				'SELECT `dispatch`.`ID`, `dispatch`.`Gate_Pass_No`, `dispatch`.`Dated_On`,`dispatch`.`Department`,`dispatch`.`Cost_Center`, `toLocation`.`ID` AS `toLocation.ID`, `toLocation`.`Name` AS `Location_Name`,' +
					' `asset_transactions`.`ID` AS `asset_transactions_ID`, SUM(`asset_transactions`.`Quantity`) AS `Quantity`,' +
					' `asset_transactions->asset`.`ID` AS `asset_ID`, `asset_transactions->asset`.`Per_Unit_Price` AS `Price`, SUM(`asset_transactions->asset`.`Sub_Total`) AS `Sub_Total`, ' +
					'`asset_transactions->asset`.`TAX_Percentage` AS `TAX_Percentage`,SUM(`asset_transactions->asset`.`TAX_Value`) AS `TAX_Value`,SUM(`asset_transactions->asset`.`Total_Price`) AS `Total_Price`,' +
					' `asset_transactions->asset`.`Barcode` AS `Barcode`,' +
					' `asset_transactions->asset->product`.`ID` AS `product_ID`, ' +
					' `asset_transactions->asset->product`.`ALT_Code` AS `ALT_Code`,' +
					' `asset_transactions->asset->product`.`Name` AS `product_Name`,' +
					' `asset_transactions->asset->product`.`Description` AS `Description`,' +
					' `asset_transactions->asset->product`.`Product_Group` AS `Product_Group`,' +
					' `asset_transactions->asset->product`.`Asset_Holder` AS `Asset_Holder`' +
					' FROM `dispatch` AS `dispatch` LEFT OUTER JOIN `location` AS `toLocation` ON `dispatch`.`To_Location` = `toLocation`.`ID`' +
					' AND (`toLocation`.`Deleted_At` IS NULL) LEFT OUTER JOIN `asset_transactions`' +
					' AS `asset_transactions` ON `dispatch`.`ID` = `asset_transactions`.`Dispatch_ID`' +
					' AND (`asset_transactions`.`Deleted_At` IS NULL) LEFT OUTER JOIN `assets` AS `asset_transactions->asset` ON `asset_transactions`.`Asset_ID` = `asset_transactions->asset`.`ID` ' +
					'AND (`asset_transactions->asset`.`Deleted_At` IS NULL) LEFT OUTER JOIN `products` AS `asset_transactions->asset->product` ON `asset_transactions->asset`.`Product_ID` = `asset_transactions->asset->product`.`ID`' +
					' AND (`asset_transactions->asset->product`.`Deleted_At` IS NULL) WHERE `dispatch`.`Deleted_At` IS NULL' +
					condition +
					' GROUP BY `Gate_Pass_No`, `asset_transactions->asset`.`Product_ID`, `asset_transactions->asset`.`Barcode` Order By `Dated_On` desc, `ID` DESC limit :offset, :limit',
				{
					replacements: {
						limit: limit,
						offset: offset,
						search: '%' + req.body.search + '%',
					},
					type: QueryTypes.SELECT,
				}
			)
			.catch((e) => {
				res.status(500).json({
					error: true,
					message: 'Server error..!!',
				});
			});
	} else if (req.body.type == 'consolidate') {
		consumptionData1 = await db.sequelize
			.query(
				'SELECT `dispatch`.`ID`, `dispatch`.`Gate_Pass_No`, `dispatch`.`Dated_On`,`dispatch`.`Department`,`dispatch`.`Cost_Center`, `toLocation`.`ID` AS `toLocation.ID`, `toLocation`.`Name` AS `Location_Name`,' +
					' `asset_transactions`.`ID` AS `asset_transactions_ID`, SUM(`asset_transactions`.`Quantity`) AS `Quantity`,' +
					' `asset_transactions->asset`.`ID` AS `asset_ID`, `asset_transactions->asset`.`Per_Unit_Price` AS `Price`, SUM(`asset_transactions->asset`.`Sub_Total`) AS `Sub_Total`, ' +
					'`asset_transactions->asset`.`TAX_Percentage` AS `TAX_Percentage`,SUM(`asset_transactions->asset`.`TAX_Value`) AS `TAX_Value`,SUM(`asset_transactions->asset`.`Total_Price`) AS `Total_Price`,' +
					' `asset_transactions->asset`.`Barcode` AS `Barcode`,' +
					' `asset_transactions->asset->product`.`ID` AS `product_ID`, ' +
					' `asset_transactions->asset->product`.`ALT_Code` AS `ALT_Code`,' +
					' `asset_transactions->asset->product`.`Name` AS `product_Name`,' +
					' `asset_transactions->asset->product`.`Description` AS `Description`,' +
					' `asset_transactions->asset->product`.`Product_Group` AS `Product_Group`,' +
					' `asset_transactions->asset->product`.`Asset_Holder` AS `Asset_Holder`' +
					' FROM `dispatch` AS `dispatch` LEFT OUTER JOIN `location` AS `toLocation` ON `dispatch`.`To_Location` = `toLocation`.`ID`' +
					' AND (`toLocation`.`Deleted_At` IS NULL) LEFT OUTER JOIN `asset_transactions`' +
					' AS `asset_transactions` ON `dispatch`.`ID` = `asset_transactions`.`Dispatch_ID`' +
					' AND (`asset_transactions`.`Deleted_At` IS NULL) LEFT OUTER JOIN `assets` AS `asset_transactions->asset` ON `asset_transactions`.`Asset_ID` = `asset_transactions->asset`.`ID` ' +
					'AND (`asset_transactions->asset`.`Deleted_At` IS NULL) LEFT OUTER JOIN `products` AS `asset_transactions->asset->product` ON `asset_transactions->asset`.`Product_ID` = `asset_transactions->asset->product`.`ID`' +
					' AND (`asset_transactions->asset->product`.`Deleted_At` IS NULL) WHERE `dispatch`.`Deleted_At` IS NULL' +
					condition +
					' GROUP BY `asset_transactions->asset`.`Product_ID` ',
				{
					replacements: {
						// limit: limit,
						// offset: offset,
						search: '%' + req.body.search + '%',
					},
					type: QueryTypes.SELECT,
				}
			)
			.catch((e) => {
				res.status(500).json({
					error: true,
					message: 'Server error..!!',
				});
			});
		consumptionData = await db.sequelize
			.query(
				'SELECT `dispatch`.`ID`, `dispatch`.`Gate_Pass_No`, `dispatch`.`Dated_On`,`dispatch`.`Department`,`dispatch`.`Cost_Center`, `toLocation`.`ID` AS `toLocation.ID`, `toLocation`.`Name` AS `Location_Name`,' +
					' `asset_transactions`.`ID` AS `asset_transactions_ID`, SUM(`asset_transactions`.`Quantity`) AS `Quantity`,' +
					' `asset_transactions->asset`.`ID` AS `asset_ID`, `asset_transactions->asset`.`Per_Unit_Price` AS `Price`, SUM(`asset_transactions->asset`.`Sub_Total`) AS `Sub_Total`, ' +
					'`asset_transactions->asset`.`TAX_Percentage` AS `TAX_Percentage`,SUM(`asset_transactions->asset`.`TAX_Value`) AS `TAX_Value`,SUM(`asset_transactions->asset`.`Total_Price`) AS `Total_Price`,' +
					' `asset_transactions->asset`.`Barcode` AS `Barcode`,' +
					' `asset_transactions->asset->product`.`ID` AS `product_ID`, ' +
					' `asset_transactions->asset->product`.`ALT_Code` AS `ALT_Code`,' +
					' `asset_transactions->asset->product`.`Name` AS `product_Name`,' +
					' `asset_transactions->asset->product`.`Description` AS `Description`,' +
					' `asset_transactions->asset->product`.`Product_Group` AS `Product_Group`,' +
					' `asset_transactions->asset->product`.`Asset_Holder` AS `Asset_Holder`' +
					' FROM `dispatch` AS `dispatch` LEFT OUTER JOIN `location` AS `toLocation` ON `dispatch`.`To_Location` = `toLocation`.`ID`' +
					' AND (`toLocation`.`Deleted_At` IS NULL) LEFT OUTER JOIN `asset_transactions`' +
					' AS `asset_transactions` ON `dispatch`.`ID` = `asset_transactions`.`Dispatch_ID`' +
					' AND (`asset_transactions`.`Deleted_At` IS NULL) LEFT OUTER JOIN `assets` AS `asset_transactions->asset` ON `asset_transactions`.`Asset_ID` = `asset_transactions->asset`.`ID` ' +
					'AND (`asset_transactions->asset`.`Deleted_At` IS NULL) LEFT OUTER JOIN `products` AS `asset_transactions->asset->product` ON `asset_transactions->asset`.`Product_ID` = `asset_transactions->asset->product`.`ID`' +
					' AND (`asset_transactions->asset->product`.`Deleted_At` IS NULL) WHERE `dispatch`.`Deleted_At` IS NULL' +
					condition +
					' GROUP BY  `asset_transactions->asset`.`Product_ID` Order By `Dated_On` desc, `ID` DESC limit :offset, :limit',
				{
					replacements: {
						limit: limit,
						offset: offset,
						search: '%' + req.body.search + '%',
					},
					type: QueryTypes.SELECT,
				}
			)
			.catch((e) => {
				res.status(500).json({
					error: true,
					message: 'Server error..!!',
				});
			});
	}

	// let dummyData = consumptionData.reduce((acc, d) => {
	// 	const found = acc.find((a) => a.Gate_Pass_No === d.Gate_Pass_No);
	// 	const value = {
	// 		ID: d.asset_transactions_ID,
	// 		Quantity: d.Quantity,
	// 		asset: {
	// 			ID: d.asset_ID,
	// 			Total_Price: d.Total_Price,
	// 			product: {
	// 				ID: d.Product_ID,
	// 				ALT_Code: d.ALT_Code,
	// 				Name: d.Product_Name,
	// 				Product_Group: d.Product_Group,
	// 				Description: d.Description,
	// 				Asset_Holder: d.Asset_Holder,
	// 			},
	// 		},
	// 	};
	// 	if (!found) {
	// 		acc.push({
	// 			Gate_Pass_No: d.Gate_Pass_No,
	// 			Dated_On: d.Dated_On,
	// 			toLocation: {
	// 				Name: d.Location_Name,
	// 			},
	// 			asset_transactions: [value],
	// 		});
	// 	} else {
	// 		found.asset_transactions.push(value);
	// 	}
	// 	return acc;
	// }, []);

	consumptionData.count = consumptionData1.length;
	consumptionData.rows = consumptionData;

	if (consumptionData) {
		let { total, data, totalPages, currentPage } = getPagingData(
			consumptionData,
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

	// let products = await db.dispatch.findAll({
	// 	where: condition,
	// 	attributes: ['Gate_Pass_No', 'Dated_On'],
	// 	include: [
	// 		{
	// 			model: db.location,
	// 			as: 'toLocation',
	// 			attributes: ['Name'],
	// 			where: locationCondition,
	// 		},
	// 		{
	// 			model: db.asset_transaction,
	// 			attributes: [
	// 				'ID',
	// 				[
	// 					db.Sequelize.fn(
	// 						'SUM',
	// 						db.Sequelize.col('asset_transactions.Quantity')
	// 					),
	// 					'Quantity',
	// 				],
	// 			],
	// 			include: [
	// 				{
	// 					model: db.asset,
	// 					attributes: ['ID', 'Total_Price'],
	// 					include: [
	// 						{
	// 							model: db.products,
	// 							attributes: [
	// 								'ID',
	// 								'ALT_Code',
	// 								'Name',
	// 								'Description',
	// 								'Product_Group',
	// 								'Asset_Holder',
	// 							],
	// 							where: productCondition,
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 	],
	// 	group: [
	// 		'Gate_Pass_No',
	// 		'asset_transactions.asset.Product_ID',
	// 		'asset_transactions.asset.Barcode',
	// 	],
	// });

	// if (products) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: products,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
// @desc get consumption report
// @route POST /api/report/getConsumptionReport
// @access public
exports.getStockSummaryReport = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	let condition = '';
	let flag = 0;
	if (req.body.search != '') {
		condition += ' and `product`.`Name` Like "' + req.body.search + '%" ';
	}
	if (req.body.startDate != '' && req.body.endDate != '') {
		condition +=
			' and Date(`asset`.`Created_At`) >= "' +
			req.body.startDate +
			'" and Date(`asset`.`Created_At`) <= "' +
			req.body.endDate +
			'"';
	} else if (req.body.startDate != '') {
		condition +=
			' and Date(`asset`.`Created_At`) >= "' + req.body.startDate + '"';
	} else if (req.body.endDate != '') {
		condition +=
			' and Date(`asset`.`Created_At`) <= "' + req.body.endDate + '"';
	}

	if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
		condition +=
			' and `product`.`Asset_Holder` = "' + process.env.DEPT_IT + '"';
	} else if (
		userType == process.env.ADMIN_SYSTEM_ADMIN ||
		userType == process.env.ADMIN
	) {
		condition +=
			' and`product`.`Asset_Holder` = "' + process.env.DEPT_ADMIN + '"';
	}

	if (req.body.Product_Group != '') {
		condition += ' and Product_Group = "' + req.body.Product_Group + '"';
	}
	if (req.body.Department != '') {
		condition += ' and Current_Department = "' + req.body.Department + '"';
	}
	if (req.body.Location != '') {
		condition += ' and Current_Location = "' + req.body.Location + '"';
	}

	const stockData1 = await db.sequelize
		.query(
			'SELECT `asset`.`ID`,`asset`.`Product_ID`,`asset`.`Current_Department`,`asset`.`Current_Location`,`location`.`Name` AS `Location_Name`,`asset`.`Created_At`, SUM(`Quantity`) AS `Received_Qty`, SUM(`Total_Price`) AS `Total_Amount`, ' +
				' SUM(CASE WHEN Status = "Assigned" OR Status = "Scrap" OR Status = "Lost" OR Status = "Repair" ' +
				' THEN Quantity ELSE 0 END) AS `Issue_Qty`,  SUM(CASE WHEN Status = "Assigned" OR Status = "Scrap" OR Status = "Lost" ' +
				' OR Status = "Repair" THEN Total_Price ELSE 0 END) AS `Issue_Amount`,  SUM(CASE WHEN Status = "Unassigned" ' +
				' THEN Quantity ELSE 0 END) AS `Balance_Qty`,  SUM(CASE WHEN Status = "Unassigned" THEN Total_Price ELSE 0 END) AS `Balance_Amount`,' +
				' `product`.`ID` AS `product.ID`, `product`.`ALT_Code` AS `ALT_Code`, `product`.`Name` AS `Product_Name`,' +
				' `product`.`Description` AS `Description`, `product`.`Product_Group` AS `Product_Group`, `product`.`UOM` AS `UOM`,' +
				' `product`.`Price` AS `Price`, `product`.`Asset_Holder` AS `Asset_Holder` FROM `assets` AS `asset`' +
				' LEFT OUTER JOIN `products` AS `product` ON `asset`.`Product_ID` = `product`.`ID` AND (`product`.`Deleted_At` IS NULL) LEFT OUTER JOIN `location` AS `location` ON `location`.`ID`= `asset`.`Current_Location` ' +
				' WHERE (`asset`.`Deleted_At` IS NULL)' +
				condition +
				' GROUP BY `Product_ID` ',
			{
				replacements: {
					// limit: limit,
					// offset: offset,
					search: '%' + req.body.search + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});
	const stockData = await db.sequelize
		.query(
			'SELECT `asset`.`ID`,`asset`.`Product_ID`,`asset`.`Current_Department`,`asset`.`Current_Location`,`location`.`Name` AS `Location_Name`,`asset`.`Created_At`, SUM(`Quantity`) AS `Received_Qty`, SUM(`Total_Price`) AS `Total_Amount`, ' +
				' SUM(CASE WHEN Status = "Assigned" OR Status = "Scrap" OR Status = "Lost" OR Status = "Repair" ' +
				' THEN Quantity ELSE 0 END) AS `Issue_Qty`,  SUM(CASE WHEN Status = "Assigned" OR Status = "Scrap" OR Status = "Lost" ' +
				' OR Status = "Repair" THEN Total_Price ELSE 0 END) AS `Issue_Amount`,  SUM(CASE WHEN Status = "Unassigned" ' +
				' THEN Quantity ELSE 0 END) AS `Balance_Qty`,  SUM(CASE WHEN Status = "Unassigned" THEN Total_Price ELSE 0 END) AS `Balance_Amount`,' +
				' `product`.`ID` AS `product.ID`, `product`.`ALT_Code` AS `ALT_Code`, `product`.`Name` AS `Product_Name`,' +
				' `product`.`Description` AS `Description`, `product`.`Product_Group` AS `Product_Group`, `product`.`UOM` AS `UOM`,' +
				' `product`.`Price` AS `Price`, `product`.`Asset_Holder` AS `Asset_Holder` FROM `assets` AS `asset`' +
				' LEFT OUTER JOIN `products` AS `product` ON `asset`.`Product_ID` = `product`.`ID` AND (`product`.`Deleted_At` IS NULL) LEFT OUTER JOIN `location` AS `location` ON `location`.`ID`= `asset`.`Current_Location` ' +
				' WHERE (`asset`.`Deleted_At` IS NULL)' +
				condition +
				' GROUP BY `Product_ID` order by `asset`.`Created_At` desc, `asset`.`ID` DESC limit :offset, :limit',
			{
				replacements: {
					limit: limit,
					offset: offset,
					search: '%' + req.body.search + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});

	stockData.count = stockData1.length;
	stockData.rows = stockData;

	if (stockData) {
		let { total, data, totalPages, currentPage } = getPagingData(
			stockData,
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
// @desc get consumption report
// @route POST /api/report/getItemWiseStockReport
// @access public
exports.getItemWiseStockReport = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	let condition = '';
	if (req.body.search != '') {
		condition += ' and `product`.`Name` Like "' + req.body.search + '%" ';
	}
	if (req.body.Location_Name != '') {
		condition += ' and `location`.`Name` = "' + req.body.Location_Name + '" ';
	}
	if (req.body.Department != '') {
		condition += ' and Current_Department = "' + req.body.Department + '" ';
	}
	if (req.body.Category != '') {
		condition += ' and `product`.`Category` = "' + req.body.Category + '" ';
	}
	// if (req.body.startDate != '' && req.body.endDate != '') {
	// 	condition +=
	// 		' and Dated_On >= "' +
	// 		req.body.startDate +
	// 		'" and Dated_On <= "' +
	// 		req.body.endDate +
	// 		'"';
	// } else if (req.body.startDate != '') {
	// 	condition += ' and Dated_On >= "' + req.body.startDate + '"';
	// } else if (req.body.endDate != '') {
	// 	condition += ' and Dated_On <= "' + req.body.endDate + '"';
	// }
	if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
		condition +=
			' and `product`.`Asset_Holder` = "' + process.env.DEPT_IT + '"';
	} else if (
		userType == process.env.ADMIN_SYSTEM_ADMIN ||
		userType == process.env.ADMIN
	) {
		condition +=
			' and`product`.`Asset_Holder` = "' + process.env.DEPT_ADMIN + '"';
	}

	// if (req.body.Product_Group != '') {
	// 	condition += ' and Product_Group = "' + req.body.Product_Group + '"';
	// }

	// const itemStock1 = await db.sequelize
	// 	.query(
	// 		'SELECT `item_stock`.`ID`, `item_stock`.`Dated_On`, `item_stock`.`Price`, `item_stock`.`Opening_Quantity`,' +
	// 			' `item_stock`.`Opening_Amount`, `item_stock`.`Received_Quantity`, `item_stock`.`Received_Amount`,`item_stock`.`Returned_Quantity`,`item_stock`.`Returned_Amount`,' +
	// 			' `item_stock`.`Issue_Quantity`, `item_stock`.`Issue_Amount`, `item_stock`.`Closing_Quantity`,`item_stock`.`Closing_Amount`,`item_stock`.`Scrap_Lost_Quantity`,`item_stock`.`Scrap_Lost_Amount`,' +
	// 			' `product`.`ID` AS `product_ID`, `product`.`Name` AS `product_Name` FROM `item_stocks` AS `item_stock`' +
	// 			' LEFT OUTER JOIN `products` AS `product` ON `item_stock`.`Product_ID` = `product`.`ID`' +
	// 			' AND (`product`.`Deleted_At` IS NULL) WHERE (`item_stock`.`Deleted_At` IS NULL)' +
	// 			condition,
	// 		{
	// 			replacements: {
	// 				// limit: limit,
	// 				// offset: offset,
	// 				search: '%' + req.body.search + '%',
	// 			},
	// 			type: QueryTypes.SELECT,
	// 		}
	// 	)
	// 	.catch((e) => {
	// 		res.status(500).json({
	// 			error: true,
	// 			message: 'Server error..!!',
	// 		});
	// 	});
	// const itemStock = await db.sequelize
	// 	.query(
	// 		'SELECT `item_stock`.`ID`, `item_stock`.`Dated_On`, `item_stock`.`Price`, `item_stock`.`Opening_Quantity`,' +
	// 			' `item_stock`.`Opening_Amount`, `item_stock`.`Received_Quantity`, `item_stock`.`Received_Amount`,`item_stock`.`Returned_Quantity`,`item_stock`.`Returned_Amount`,' +
	// 			' `item_stock`.`Issue_Quantity`, `item_stock`.`Issue_Amount`, `item_stock`.`Closing_Quantity`,`item_stock`.`Closing_Amount`,`item_stock`.`Scrap_Lost_Quantity`,`item_stock`.`Scrap_Lost_Amount`,' +
	// 			' `product`.`ID` AS `product_ID`, `product`.`Name` AS `product_Name` FROM `item_stocks` AS `item_stock`' +
	// 			' LEFT OUTER JOIN `products` AS `product` ON `item_stock`.`Product_ID` = `product`.`ID`' +
	// 			' AND (`product`.`Deleted_At` IS NULL) WHERE (`item_stock`.`Deleted_At` IS NULL)' +
	// 			condition +
	// 			'Order By Dated_On desc, `ID` DESC limit :offset, :limit',
	// 		{
	// 			replacements: {
	// 				limit: limit,
	// 				offset: offset,
	// 				search: '%' + req.body.search + '%',
	// 			},
	// 			type: QueryTypes.SELECT,
	// 		}
	// 	)
	// 	.catch((e) => {
	// 		res.status(500).json({
	// 			error: true,
	// 			message: 'Server error..!!',
	// 		});
	// 	});
	const itemStock1 = await db.sequelize
		.query(
			'SELECT "0" As `Opening_Quantity`,"0.00" AS `Opening_Amount`,Product_ID,Current_Department,`product`.`Category` AS `product_Category`,SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN 1 ELSE 0 END) AS `Received_Quantity`,' +
				' SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN Total_Price ELSE 0 END) AS `Received_Amount`,' +
				' SUM(CASE WHEN Status = "Assigned" THEN 1 ELSE 0 END) AS `Issue_Quantity`, ' +
				'SUM(CASE WHEN Status = "Assigned" THEN Total_Price ELSE 0 END) AS `Issue_Amount`,' +
				' SUM(CASE WHEN Status = "Scrap" OR Status = "Lost" THEN 1 ELSE 0 END) AS `Scrap_Lost_Quantity`,' +
				' SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") THEN Total_Price ELSE 0 END) AS `Scrap_Lost_Amount`,' +
				' SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN 1 ELSE 0 END) - SUM(CASE WHEN Status = "Assigned" THEN 1 ELSE 0 END)' +
				' - SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") THEN 1 ELSE 0 END)  AS `Closing_Quantity`,' +
				' SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN Total_Price ELSE 0 END) - SUM(CASE WHEN Status = "Assigned" ' +
				' THEN Total_Price ELSE 0 END) - SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") ' +
				' THEN Total_Price ELSE 0 END)  AS `Closing_Amount`, `product`.`ID` AS `product.ID`,' +
				' `product`.`Name` AS `product_Name`, `location`.`ID` AS `location.ID`, `location`.`Name` AS `location_Name`' +
				' FROM `assets` AS `asset` LEFT OUTER JOIN `products` AS `product` ON ' +
				' `asset`.`Product_ID` = `product`.`ID` AND (`product`.`Deleted_At` IS NULL)' +
				' LEFT OUTER JOIN `location` AS `location` ON `asset`.`Current_Location` = `location`.`ID`' +
				' AND (`location`.`Deleted_At` IS NULL) WHERE (`asset`.`Deleted_At` IS NULL)' +
				condition +
				'GROUP BY `Product_ID`',
			{
				replacements: {
					// limit: limit,
					// offset: offset,
					search: '%' + req.body.search + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});

	const itemStock = await db.sequelize
		.query(
			'SELECT "0" As `Opening_Quantity`,"0.00" AS `Opening_Amount`,Product_ID,Current_Department,`product`.`Category` AS `product_Category`,SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN 1 ELSE 0 END) AS `Received_Quantity`,' +
				' SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN Total_Price ELSE 0 END) AS `Received_Amount`,' +
				' SUM(CASE WHEN Status = "Assigned" THEN 1 ELSE 0 END) AS `Issue_Quantity`, ' +
				'SUM(CASE WHEN Status = "Assigned" THEN Total_Price ELSE 0 END) AS `Issue_Amount`,' +
				' SUM(CASE WHEN Status = "Scrap" OR Status = "Lost" THEN 1 ELSE 0 END) AS `Scrap_Lost_Quantity`,' +
				' SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") THEN Total_Price ELSE 0 END) AS `Scrap_Lost_Amount`,' +
				' SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN 1 ELSE 0 END) - SUM(CASE WHEN Status = "Assigned" THEN 1 ELSE 0 END)' +
				' - SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") THEN 1 ELSE 0 END)  AS `Closing_Quantity`,' +
				' SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN Total_Price ELSE 0 END) - SUM(CASE WHEN Status = "Assigned" ' +
				' THEN Total_Price ELSE 0 END) - SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") ' +
				' THEN Total_Price ELSE 0 END)  AS `Closing_Amount`, `product`.`ID` AS `product.ID`,' +
				' `product`.`Name` AS `product_Name`, `location`.`ID` AS `location.ID`, `location`.`Name` AS `location_Name`' +
				' FROM `assets` AS `asset` LEFT OUTER JOIN `products` AS `product` ON ' +
				' `asset`.`Product_ID` = `product`.`ID` AND (`product`.`Deleted_At` IS NULL)' +
				' LEFT OUTER JOIN `location` AS `location` ON `asset`.`Current_Location` = `location`.`ID`' +
				' AND (`location`.`Deleted_At` IS NULL) WHERE (`asset`.`Deleted_At` IS NULL)' +
				condition +
				'GROUP BY `Product_ID` limit :offset, :limit',
			{
				replacements: {
					limit: limit,
					offset: offset,
					search: '%' + req.body.search + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});

	itemStock.count = itemStock1.length;
	itemStock.rows = itemStock;
	console.log(itemStock.count);

	if (itemStock) {
		let { total, data, totalPages, currentPage } = getPagingData(
			itemStock,
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
// @desc get consumption report
// @route POST /api/report/getConsumptionReportYTDAndMTD
// @access public
exports.getConsumptionReportYTDAndMTD = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	let condition = '';
	if (req.body.search != '') {
		condition +=
			' and `asset->product`.`ALT_Code` Like "' + req.body.search + '%" ';
	}
	// if (req.body.startDate != '' && req.body.endDate != '') {
	// 	condition +=
	// 		' and `asset`.`Created_At` >= "' +
	// 		req.body.startDate +
	// 		'" and `asset`.`Created_At` <= "' +
	// 		req.body.endDate +
	// 		'"';
	// } else if (req.body.startDate != '') {
	// 	condition += ' and `asset`.`Created_At` >= "' + req.body.startDate + '"';
	// } else if (req.body.endDate != '') {
	// 	condition += ' and `asset`.`Created_At` <= "' + req.body.endDate + '"';
	// }
	if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
		condition +=
			' and `asset->product`.`Asset_Holder` = "' + process.env.DEPT_IT + '"';
	} else if (
		userType == process.env.ADMIN_SYSTEM_ADMIN ||
		userType == process.env.ADMIN
	) {
		condition +=
			' and `asset->product`.`Asset_Holder` = "' + process.env.DEPT_ADMIN + '"';
	}

	// if (req.body.Product_Group != '') {
	// 	condition += ' and Product_Group = "' + req.body.Product_Group + '"';
	// }
	if (req.body.Department != '') {
		condition += ' and `Current_Department` = "' + req.body.Department + '"';
	}
	if (req.body.Location_Name != '') {
		condition +=
			' and `asset->location`.`Name` =  "' + req.body.Location_Name + '" ';
	}
	if (req.body.Product_Name != '') {
		condition +=
			' and `asset->product`.`Name` =  "' + req.body.Product_Name + '" ';
	}

	let currentYear = moment().format('YYYY');
	let previousYear = moment().subtract(1, 'year').format('YYYY');
	let currentMonth = moment().format('M');
	let previousMonth = moment().subtract(1, 'year').format('M');

	const consumptionYTDAndMTDData1 = await db.sequelize
		.query(
			'SELECT  SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				currentYear +
				'" THEN asset.Quantity ELSE 0 END) AS `Current_YTD_Qty`,  SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" ' +
				' OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				currentYear +
				'" AND MONTH(Dated_On) = "' +
				currentMonth +
				'"' +
				' THEN asset.Quantity ELSE 0 END) AS `Current_MTD_Qty`,  SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" ' +
				' OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				previousYear +
				'" THEN asset.Quantity ELSE 0 END) AS `Last_YTD_Qty`,' +
				' SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				previousYear +
				'"' +
				' AND MONTH(Dated_On) = "' +
				previousMonth +
				'" THEN asset.Quantity ELSE 0 END) AS `Last_MTD_Qty`,' +
				' SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				currentYear +
				'"' +
				' THEN asset.Total_Price ELSE 0 END) AS `Current_YTD_Amt`,  SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" ' +
				'OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				currentYear +
				'" AND MONTH(Dated_On) = "' +
				currentMonth +
				'"' +
				' THEN asset.Total_Price ELSE 0 END) AS `Current_MTD_Amt`,  SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" ' +
				' OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				previousYear +
				'" THEN asset.Total_Price ELSE 0 END) AS `Last_YTD_Amt`,' +
				' SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				previousYear +
				'"' +
				' AND MONTH(Dated_On) = "' +
				previousMonth +
				'" THEN asset.Total_Price ELSE 0 END) AS `Last_MTD_Amt`, `asset`.`ID` AS `asset.ID`,' +
				' `asset`.`Current_Department` AS `asset.Current_Department`, `asset->location`.`ID` AS `asset.location.ID`,' +
				' `asset->location`.`Name` AS `asset.location.Name`, `asset->product`.`ID` AS `asset.product.ID`,' +
				' `asset->product`.`ALT_Code` AS `asset.product.ALT_Code`, `asset->product`.`Name` AS `asset.product.Name`,' +
				' `asset->product`.`Description` AS `asset.product.Description`, `asset->product`.`Product_Group` AS `asset.product.Product_Group`,' +
				' `asset->product`.`UOM` AS `asset.product.UOM`, `asset->product`.`Price` AS `asset.product.Price`,' +
				' `asset->product`.`Asset_Holder` AS `asset.product.Asset_Holder` FROM `asset_transactions` AS `asset_transaction`' +
				' LEFT OUTER JOIN `assets` AS `asset` ON `asset_transaction`.`Asset_ID` = `asset`.`ID` AND (`asset`.`Deleted_At` IS NULL) ' +
				' LEFT OUTER JOIN `location` AS `asset->location` ON `asset`.`Current_Location` = `asset->location`.`ID` ' +
				' AND (`asset->location`.`Deleted_At` IS NULL) LEFT OUTER JOIN `products` AS `asset->product` ' +
				' ON `asset`.`Product_ID` = `asset->product`.`ID` AND (`asset->product`.`Deleted_At` IS NULL)' +
				' WHERE (`asset_transaction`.`Deleted_At` IS NULL)' +
				condition +
				' GROUP BY `asset`.`Product_ID`, `asset`.`Current_Location`, `asset`.`Current_Department` ',
			{
				replacements: {
					// limit: limit,
					// offset: offset,
					search: '%' + req.body.search + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});
	const consumptionYTDAndMTDData = await db.sequelize
		.query(
			'SELECT  SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				currentYear +
				'" THEN asset.Quantity ELSE 0 END) AS `Current_YTD_Qty`,  SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" ' +
				' OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				currentYear +
				'" AND MONTH(Dated_On) = "' +
				currentMonth +
				'"' +
				' THEN asset.Quantity ELSE 0 END) AS `Current_MTD_Qty`,  SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" ' +
				' OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				previousYear +
				'" THEN asset.Quantity ELSE 0 END) AS `Last_YTD_Qty`,' +
				' SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				previousYear +
				'"' +
				' AND MONTH(Dated_On) = "' +
				previousMonth +
				'" THEN asset.Quantity ELSE 0 END) AS `Last_MTD_Qty`,' +
				' SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				currentYear +
				'"' +
				' THEN asset.Total_Price ELSE 0 END) AS `Current_YTD_Amt`,  SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" ' +
				'OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				currentYear +
				'" AND MONTH(Dated_On) = "' +
				currentMonth +
				'"' +
				' THEN asset.Total_Price ELSE 0 END) AS `Current_MTD_Amt`,  SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" ' +
				' OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				previousYear +
				'" THEN asset.Total_Price ELSE 0 END) AS `Last_YTD_Amt`,' +
				' SUM(CASE WHEN (Type_Of_Issue = "Office Transfer" OR Type_Of_Issue = "Dept to Dept") AND YEAR(Dated_On) = "' +
				previousYear +
				'"' +
				' AND MONTH(Dated_On) = "' +
				previousMonth +
				'" THEN asset.Total_Price ELSE 0 END) AS `Last_MTD_Amt`, `asset`.`ID` AS `asset.ID`,' +
				' `asset`.`Current_Department` AS `Current_Department`, `asset->location`.`ID` AS `asset.location.ID`,' +
				' `asset->location`.`Name` AS `Location_Name`, `asset->product`.`ID` AS `asset.product.ID`,' +
				' `asset->product`.`ALT_Code` AS `ALT_Code`, `asset->product`.`Name` AS `Product_Name`,' +
				' `asset->product`.`Description` AS `Description`, `asset->product`.`Product_Group` AS `Product_Group`,' +
				' `asset->product`.`UOM` AS `UOM`, `asset->product`.`Price` AS `Price`,' +
				' `asset->product`.`Asset_Holder` AS `Asset_Holder` FROM `asset_transactions` AS `asset_transaction`' +
				' LEFT OUTER JOIN `assets` AS `asset` ON `asset_transaction`.`Asset_ID` = `asset`.`ID` AND (`asset`.`Deleted_At` IS NULL) ' +
				' LEFT OUTER JOIN `location` AS `asset->location` ON `asset`.`Current_Location` = `asset->location`.`ID` ' +
				' AND (`asset->location`.`Deleted_At` IS NULL) LEFT OUTER JOIN `products` AS `asset->product` ' +
				' ON `asset`.`Product_ID` = `asset->product`.`ID` AND (`asset->product`.`Deleted_At` IS NULL)' +
				' WHERE (`asset_transaction`.`Deleted_At` IS NULL)' +
				condition +
				' GROUP BY `asset`.`Product_ID`, `asset`.`Current_Location`, `asset`.`Current_Department` limit :offset, :limit',
			{
				replacements: {
					limit: limit,
					offset: offset,
					search: '%' + req.body.search + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});

	consumptionYTDAndMTDData.count = consumptionYTDAndMTDData1.length;
	consumptionYTDAndMTDData.rows = consumptionYTDAndMTDData;

	if (consumptionYTDAndMTDData) {
		let { total, data, totalPages, currentPage } = getPagingData(
			consumptionYTDAndMTDData,
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

// @desc get search inwards
// @route POST /api/report/getChallanSummaryReport
// @access public
exports.getChallanSummaryReport = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	let condition = ' ';
	if (req.body.search != '') {
		// condition.Challan_No = { [Op.like]: `${req.body.search}%` };
		condition += ' and Challan_No Like "' + req.body.search + '%" ';
	}
	if (req.body.startDate != '' && req.body.endDate != '') {
		condition +=
			' and Dated_On >= "' +
			req.body.startDate +
			'" and Dated_On <= "' +
			req.body.endDate +
			'"';
	} else if (req.body.startDate != '') {
		condition += ' and Dated_On >= "' + req.body.startDate + '"';
	} else if (req.body.endDate != '') {
		condition += ' and Dated_On <= "' + req.body.endDate + '"';
	}
	if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
		condition += ' and  User_Type = "' + process.env.DEPT_IT + '"';
	} else if (
		userType == process.env.ADMIN_SYSTEM_ADMIN ||
		userType == process.env.ADMIN
	) {
		condition += ' and User_Type = "' + process.env.DEPT_ADMIN + '"';
	}
	if (req.body.Location_Name != '') {
		condition +=
			' and `assets->location`.`Name` =  "' + req.body.Location_Name + '" ';
	}
	if (req.body.Product_Name != '') {
		condition +=
			' and `assets->product`.`Name` = "' + req.body.Product_Name + '"';
	}
	const challanData1 = await db.sequelize
		.query(
			'SELECT `inward`.`ID`, `inward`.`Challan_No`, `inward`.`Dated_On`, `assets`.`ID` AS `Asset_ID`, `assets`.`Per_Unit_Price` AS `Per_Unit_Price`,' +
				'SUM(`assets`.`Quantity`) AS `Quantity`, SUM(`assets`.`Total_Price`) AS `Total_Price`, `assets->location`.`ID` AS `location_ID`,' +
				' `assets->location`.`Name` AS `location_Name`, `assets->product`.`ID` AS `product_ID`, `assets->product`.`ALT_Code` AS `ALT_Code`,' +
				' `assets->product`.`Name` AS `product_Name`, `assets->product`.`Description` AS `Description`, `assets->product`.`UOM` AS `UOM`,' +
				' `assets->product`.`TAX_Percentage` AS `TAX_Percentage` FROM `inward` AS `inward` LEFT OUTER JOIN `assets` AS `assets` ON `inward`.`ID` = `assets`.`Inward_ID`' +
				' AND (`assets`.`Deleted_At` IS NULL) LEFT OUTER JOIN `location` AS `assets->location` ON `assets`.`Current_Location` = `assets->location`.`ID` AND (`assets->location`.`Deleted_At` IS NULL)' +
				' LEFT OUTER JOIN `products` AS `assets->product` ON `assets`.`Product_ID` = `assets->product`.`ID` AND (`assets->product`.`Deleted_At` IS NULL) WHERE `inward`.`Deleted_At` IS NULL ' +
				condition +
				' GROUP BY `assets`.`Product_ID`,`Challan_No`,`Vendor_ID` ',
			{
				replacements: {
					limit: limit,
					offset: offset,
					search: '%' + req.body.search + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});
	const challanData = await db.sequelize
		.query(
			'SELECT `inward`.`ID`, `inward`.`Challan_No`, `inward`.`Dated_On`, `assets`.`ID` AS `Asset_ID`, `assets`.`Per_Unit_Price` AS `Per_Unit_Price`,' +
				'SUM(`assets`.`Quantity`) AS `Quantity`, SUM(`assets`.`Total_Price`) AS `Total_Price`, `assets->location`.`ID` AS `location_ID`,' +
				' `assets->location`.`Name` AS `location_Name`, `assets->product`.`ID` AS `product_ID`, `assets->product`.`ALT_Code` AS `ALT_Code`,' +
				' `assets->product`.`Name` AS `product_Name`, `assets->product`.`Description` AS `Description`, `assets->product`.`UOM` AS `UOM`,' +
				' `assets->product`.`TAX_Percentage` AS `TAX_Percentage` FROM `inward` AS `inward` LEFT OUTER JOIN `assets` AS `assets` ON `inward`.`ID` = `assets`.`Inward_ID`' +
				' AND (`assets`.`Deleted_At` IS NULL) LEFT OUTER JOIN `location` AS `assets->location` ON `assets`.`Current_Location` = `assets->location`.`ID` AND (`assets->location`.`Deleted_At` IS NULL)' +
				' LEFT OUTER JOIN `products` AS `assets->product` ON `assets`.`Product_ID` = `assets->product`.`ID` AND (`assets->product`.`Deleted_At` IS NULL) WHERE `inward`.`Deleted_At` IS NULL ' +
				condition +
				' GROUP BY `assets`.`Product_ID`,`Challan_No`,`Vendor_ID` order by `Dated_On` desc, `ID` DESC  limit :offset, :limit ',
			{
				replacements: {
					limit: limit,
					offset: offset,
					search: '%' + req.body.search + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});

	// let dummyData = challanData.reduce((acc, d) => {
	// 	const found = acc.find((a) => a.Challan_No === d.Challan_No);
	// 	const value = {
	// 		ID: d.Asset_ID,
	// 		Per_Unit_Price: d.Per_Unit_Price,
	// 		Quantity: d.Quantity,
	// 		Total_Price: d.Total_Price,
	// 		location: {
	// 			Name: d.location_Name,
	// 		},
	// 		product: {
	// 			ID: d.product_ID,
	// 			ALT_Code: d.ALT_Code,
	// 			Name: d.product_Name,
	// 			Description: d.Description,
	// 			UOM: d.UOM,
	// 			TAX_Percentage: d.TAX_Percentag,
	// 		},
	// 	};
	// 	if (!found) {
	// 		acc.push({
	// 			Challan_No: d.Challan_No,
	// 			Dated_On: d.Dated_On,

	// 			assets: [value],
	// 		});
	// 	} else {
	// 		found.assets.push(value);
	// 	}
	// 	return acc;
	// }, []);

	// let challanData = await db.inward.findAll({
	// 	where: condition,
	// 	// limit,
	// 	// offset,
	// 	group: ['assets.Product_ID', 'Challan_No'],

	// 	attributes: ['Challan_No', 'Dated_On'],
	// 	include: [
	// 		{
	// 			model: db.asset,
	// 			as: 'assets',
	// 			attributes: [
	// 				'ID',
	// 				'Per_Unit_Price',
	// 				[
	// 					db.sequelize.fn('SUM', db.sequelize.col('assets.Quantity')),
	// 					'Quantity',
	// 				],
	// 				[
	// 					db.sequelize.fn('SUM', db.sequelize.col('assets.Total_Price')),
	// 					'Total_Price',
	// 				],
	// 			],
	// 			include: [
	// 				{
	// 					model: db.location,
	// 					attributes: ['Name'],
	// 					where: locationCondition,
	// 				},
	// 				{
	// 					model: db.products,
	// 					attributes: [
	// 						'ID',
	// 						'ALT_Code',
	// 						'Name',
	// 						'Description',
	// 						'UOM',
	// 						'TAX_Percentage',
	// 					],
	// 					where: productCondition,
	// 				},
	// 			],
	// 		},
	// 	],
	// 	distinct: true,
	// });
	challanData.count = challanData1.length;
	challanData.rows = challanData;

	if (challanData) {
		let { total, data, totalPages, currentPage } = getPagingData(
			challanData,
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

	// if (challanData) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: challanData,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});

// @desc product stock ledger
// @route POST /api/report/getProductStockLedger
// @access public
// exports.getProductStockLedgerReport = asyncHandler(async (req, res, next) => {
// 	const userType = req.user.User_Type;
// 	const { limit, offset } = getPagination(
// 		req.body.pageNumber,
// 		req.body.numberOfRows
// 	);
// 	let condition = '';
// 	let openingCondition = '';
// 	// let otherCondition = '';
// 	let otherCondition = {};
// 	let productCondition = {};

// 	if (req.body.search != '') {
// 		// condition.Challan_No = { [Op.like]: `${req.body.search}%` };
// 		condition += ' and `product`.`Name` Like "' + req.body.search + '%" ';
// 	}
// 	if (req.body.search != '') {
// 		// otherCondition += ' and `product`.`Name` Like "' + req.body.search + '%" ';
// 		productCondition = {
// 			Name: {
// 				[Op.eq]: `${req.body.search}`,
// 			},
// 		};
// 	}

// 	if (req.body.startDate == '' && req.body.endDate == '') {
// 		// otherCondition +=
// 		// 'and `Dated_On` <= CURDATE() ORDER BY `product_stock_ledger`.`ID` DESC LIMIT 1 ';
// 		condition += 'and `Dated_On` >= "1970-01-01" ';
// 		openingCondition += ' `product_stock_ledger`.`Dated_On` <= "1970-01-01" ';
// 		// condition += '';
// 		// openingCondition += '';
// 		productCondition = {
// 			Name: {
// 				[Op.eq]: `${req.body.search}`,
// 			},
// 		};
// 		otherCondition = {
// 			Dated_On: {
// 				[Op.lt]: '1970-01-01',
// 			},
// 		};
// 	} else if (req.body.startDate != '' && req.body.endDate != '') {
// 		condition +=
// 			' and Dated_On >= "' +
// 			req.body.startDate +
// 			'" and Dated_On <= "' +
// 			req.body.endDate +
// 			'"';
// 		// otherCondition += ' and Dated_On <= "' + req.body.startDate + '"';
// 		otherCondition = {
// 			Dated_On: {
// 				[Op.lt]: req.body.startDate,
// 			},
// 		};
// 		openingCondition +=
// 			' `product_stock_ledger`.`Dated_On` < "' + req.body.startDate + '" ';
// 	} else if (req.body.startDate != '') {
// 		condition += ' and Dated_On >= "' + req.body.startDate + '"';
// 		// otherCondition +=
// 		// 	' and Dated_On <= "' +
// 		// 	req.body.startDate +
// 		// 	'" ORDER BY `product_stock_ledger`.`ID` DESC LIMIT 1';
// 		otherCondition = {
// 			Dated_On: {
// 				[Op.lt]: req.body.startDate,
// 			},
// 		};
// 		openingCondition +=
// 			' `product_stock_ledger`.`Dated_On` < "' + req.body.startDate + '" ';
// 	} else if (req.body.endDate != '') {
// 		condition += ' and Dated_On <= "' + req.body.endDate + '"';
// 		otherCondition = {
// 			Dated_On: {
// 				[Op.lt]: req.body.endDate,
// 			},
// 		};
// 		openingCondition +=
// 			' `product_stock_ledger`.`Dated_On` < "' + req.body.endDate + '" ';
// 	}

// 	// if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
// 	// 	condition += ' and  User_Type = "' + process.env.DEPT_IT + '"';
// 	// } else if (
// 	// 	userType == process.env.ADMIN_SYSTEM_ADMIN ||
// 	// 	userType == process.env.ADMIN
// 	// ) {
// 	// 	condition += ' and User_Type = "' + process.env.DEPT_ADMIN + '"';
// 	// }

// 	const prodoctStockLedgerData1 = await db.sequelize
// 		.query(
// 			' SELECT `product_stock_ledger`.`ID`, `product_stock_ledger`.`Voucher_No`, `product_stock_ledger`.`Dated_On`,' +
// 				' `product_stock_ledger`.`Department`, `product`.`Name` As `Item_Name`, `product_stock_ledger`.`Received_Quantity`,' +
// 				' `product_stock_ledger`.`Received_Rate`, `product_stock_ledger`.`Received_Amount`,' +
// 				' `product_stock_ledger`.`Issue_Quantity`, `product_stock_ledger`.`Issue_Rate`,' +
// 				' `product_stock_ledger`.`Issue_Amount`, `product_stock_ledger`.`Closing_Quantity`, ' +
// 				'`product_stock_ledger`.`Closing_Rate`, `product_stock_ledger`.`Closing_Amount`, `product_stock_ledger`.`Created_At`,' +
// 				' `product_stock_ledger`.`Updated_At`, `product_stock_ledger`.`Deleted_At`FROM `product_stock_ledgers`' +
// 				' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 				'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL)' +
// 				condition,
// 			{
// 				replacements: {
// 					limit: limit,
// 					offset: offset,
// 					search: '%' + req.body.search + '%',
// 				},
// 				type: QueryTypes.SELECT,
// 			}
// 		)
// 		.catch((e) => {
// 			res.status(500).json({
// 				error: true,
// 				message: 'Server error..!!',
// 			});
// 		});
// 	const prodoctStockLedgerData = await db.sequelize
// 		.query(
// 			' SELECT `product_stock_ledger`.`ID`, `product_stock_ledger`.`Voucher_No`, `product_stock_ledger`.`Dated_On`,' +
// 				' `product_stock_ledger`.`Department`, `product`.`Name` As `Item_Name`, `product_stock_ledger`.`Received_Quantity`,' +
// 				' `product_stock_ledger`.`Received_Rate`, `product_stock_ledger`.`Received_Amount`,' +
// 				' `product_stock_ledger`.`Issue_Quantity`, `product_stock_ledger`.`Issue_Rate`,' +
// 				' `product_stock_ledger`.`Issue_Amount`, `product_stock_ledger`.`Closing_Quantity`, ' +
// 				'`product_stock_ledger`.`Closing_Rate`, `product_stock_ledger`.`Closing_Amount`, `product_stock_ledger`.`Created_At`,' +
// 				' `product_stock_ledger`.`Updated_At`, `product_stock_ledger`.`Deleted_At`FROM `product_stock_ledgers`' +
// 				' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 				'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL)' +
// 				condition +
// 				' limit :offset, :limit ',
// 			{
// 				replacements: {
// 					limit: limit,
// 					offset: offset,
// 					search: '%' + req.body.search + '%',
// 				},
// 				type: QueryTypes.SELECT,
// 			}
// 		)
// 		.catch((e) => {
// 			res.status(500).json({
// 				error: true,
// 				message: 'Server error..!!',
// 			});
// 		});
// 	// const openingData = await db.sequelize
// 	// 	.query(
// 	// 		'SELECT `product_stock_ledger`.`Closing_Quantity` As `Opening_Quantity`, sum(`product_stock_ledger`.`Closing_Amount`) As `Opening_Amount`, ' +
// 	// 			' `product`.`Name` AS `product_Name` FROM `product_stock_ledgers`' +
// 	// 			' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ON `product_stock_ledger`.`Product_ID` = `product`.`ID`' +
// 	// 			' AND (`product`.`Deleted_At` IS NULL) WHERE `product_stock_ledger`.`Deleted_At` IS NULL' +
// 	// 			otherCondition,
// 	// 		{
// 	// 			replacements: {
// 	// 				search: '%' + req.body.search + '%',
// 	// 			},
// 	// 			type: QueryTypes.SELECT,
// 	// 		}
// 	// 	)
// 	// 	.catch((e) => {
// 	// 		res.status(500).json({
// 	// 			error: true,
// 	// 			message: 'Server error..!!',
// 	// 		});
// 	// 	});
// 	const openingData = await db.product_stock_ledger.findAll({
// 		where: otherCondition,
// 		order: [['ID', 'DESC']],
// 		limit: 1,
// 		attributes: [
// 			// [
// 			// 	db.Sequelize.literal(
// 			// 		'SUM(CASE WHEN Status = "Unassigned" THEN 1 ELSE 0 END)'
// 			// 	),
// 			// 	'Received_Quantity',
// 			// ],
// 			['Closing_Quantity', 'Opening_Quantity'],
// 			[
// 				db.Sequelize.literal(
// 					'(select SUM(Closing_Amount) FROM `product_stock_ledgers` AS `product_stock_ledger` ' +
// 						' INNER JOIN `products` AS `product` ON `product_stock_ledger`.`Product_ID` = ' +
// 						' `product`.`ID` AND (`product`.`Deleted_At` IS NULL AND `product`.`Name` ' +
// 						' = "' +
// 						req.body.search +
// 						'") WHERE (`product_stock_ledger`.`Deleted_At` IS NULL AND ' +
// 						openingCondition +
// 						' ) )'
// 				),
// 				'Opening_Amount',
// 			],
// 			// [
// 			// 	db.Sequelize.literal(
// 			// 		'(SELECT  `product_stock_ledger`.`Closing_Quantity` ' +
// 			// 			' FROM `product_stock_ledgers` AS `product_stock_ledger` LEFT JOIN `products` AS ' +
// 			// 			' `product` ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE ' +
// 			// 			' (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 			// 			condition +
// 			// 			'Order by `product_stock_ledger`.`ID` DESC limit 1)'
// 			// 	),
// 			// 	'Overall_Closing_Quantity',
// 			// ],
// 			// [
// 			// 	db.Sequelize.literal(
// 			// 		'(select SUM(Received_Quantity) FROM `product_stock_ledgers` AS `product_stock_ledger` ' +
// 			// 			' INNER JOIN `products` AS `product` ON `product_stock_ledger`.`Product_ID` = ' +
// 			// 			' `product`.`ID` AND (`product`.`Deleted_At` IS NULL AND `product`.`Name` ' +
// 			// 			' = "' +
// 			// 			req.body.search +
// 			// 			'") WHERE (`product_stock_ledger`.`Deleted_At` IS NULL AND ' +
// 			// 			openingCondition +
// 			// 			' ) )'
// 			// 	),
// 			// 	'Received_Quantity',
// 			// ],
// 			// [
// 			// 	db.Sequelize.literal(
// 			// 		'(SELECT SUM(`product_stock_ledger`.`Received_Quantity`) FROM `product_stock_ledgers`' +
// 			// 			' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 			// 			'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 			// 			condition +
// 			// 			' )'
// 			// 	),
// 			// 	'Received_Quantity',
// 			// ],
// 			// [
// 			// 	db.Sequelize.literal(
// 			// 		'(SELECT SUM(`product_stock_ledger`.`Received_Amount`)  FROM `product_stock_ledgers`' +
// 			// 			' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 			// 			'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 			// 			condition +
// 			// 			' )'
// 			// 	),
// 			// 	'Received_Amount',
// 			// ],
// 			// [
// 			// 	db.Sequelize.literal(
// 			// 		'(SELECT SUM(`product_stock_ledger`.`Issue_Quantity`)  FROM `product_stock_ledgers`' +
// 			// 			' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 			// 			'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 			// 			condition +
// 			// 			' )'
// 			// 	),
// 			// 	'Issue_Quantity',
// 			// ],
// 			// [
// 			// 	db.Sequelize.literal(
// 			// 		'(SELECT SUM(`product_stock_ledger`.`Issue_Amount`)  FROM `product_stock_ledgers`' +
// 			// 			' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 			// 			'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 			// 			condition +
// 			// 			' )'
// 			// 	),
// 			// 	'Issue_Amount',
// 			// ],
// 			// [
// 			// 	db.Sequelize.literal(
// 			// 		'(select SUM(Received_Quantity) FROM `product_stock_ledgers` AS `product_stock_ledger)'
// 			// 	),
// 			// 	'Received_Quantity',
// 			// ],
// 			// [db.Sequelize.literal('SUM(Received_Amount)'), 'Received_Amount'],
// 			// [db.Sequelize.literal('SUM(Issue_Quantity)'), 'Issue_Quantity'],
// 			// [db.Sequelize.literal('SUM(Issue_Amount)'), 'Issue_Amount'],
// 		],
// 		include: [
// 			{
// 				model: db.products,
// 				where: productCondition,
// 				attributes: ['Name'],
// 			},
// 		],
// 	});

// 	// let totalData = await db.product_stock_ledger.findAll({
// 	// 	where: {
// 	// 		Deleted_At: {
// 	// 			[Op.eq]: null,
// 	// 		},
// 	// 	},
// 	// 	order: [['ID', 'DESC']],
// 	// 	limit: 1,
// 	// 	attributes: [
// 	// 		[
// 	// 			db.Sequelize.literal(
// 	// 				'(SELECT SUM(`product_stock_ledger`.`Received_Quantity`) FROM `product_stock_ledgers`' +
// 	// 					' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 	// 					'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 	// 					condition +
// 	// 					' )'
// 	// 			),
// 	// 			'Received_Quantity',
// 	// 		],
// 	// 		[
// 	// 			db.Sequelize.literal(
// 	// 				'(SELECT SUM(`product_stock_ledger`.`Received_Amount`)  FROM `product_stock_ledgers`' +
// 	// 					' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 	// 					'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 	// 					condition +
// 	// 					' )'
// 	// 			),
// 	// 			'Received_Amount1',
// 	// 		],
// 	// 		[
// 	// 			db.Sequelize.literal(
// 	// 				'(SELECT SUM(`product_stock_ledger`.`Issue_Quantity`)  FROM `product_stock_ledgers`' +
// 	// 					' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 	// 					'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 	// 					condition +
// 	// 					' )'
// 	// 			),
// 	// 			'Issue_Quantity',
// 	// 		],
// 	// 		[
// 	// 			db.Sequelize.literal(
// 	// 				'(SELECT SUM(`product_stock_ledger`.`Issue_Amount`)  FROM `product_stock_ledgers`' +
// 	// 					' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 	// 					'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 	// 					condition +
// 	// 					' )'
// 	// 			),
// 	// 			'Issue_Amount',
// 	// 		],
// 	// 	],
// 	// 	include: [
// 	// 		{
// 	// 			model: db.products,
// 	// 			where: productCondition,
// 	// 			attributes: ['Name'],
// 	// 		},
// 	// 	],
// 	// });

// 	// let dummyData = challanData.reduce((acc, d) => {
// 	// 	const found = acc.find((a) => a.Challan_No === d.Challan_No);
// 	// 	const value = {
// 	// 		ID: d.Asset_ID,
// 	// 		Per_Unit_Price: d.Per_Unit_Price,
// 	// 		Quantity: d.Quantity,
// 	// 		Total_Price: d.Total_Price,
// 	// 		location: {
// 	// 			Name: d.location_Name,
// 	// 		},
// 	// 		product: {
// 	// 			ID: d.product_ID,
// 	// 			ALT_Code: d.ALT_Code,
// 	// 			Name: d.product_Name,
// 	// 			Description: d.Description,
// 	// 			UOM: d.UOM,
// 	// 			TAX_Percentage: d.TAX_Percentag,
// 	// 		},
// 	// 	};
// 	// 	if (!found) {
// 	// 		acc.push({
// 	// 			Challan_No: d.Challan_No,
// 	// 			Dated_On: d.Dated_On,

// 	// 			assets: [value],
// 	// 		});
// 	// 	} else {
// 	// 		found.assets.push(value);
// 	// 	}
// 	// 	return acc;
// 	// }, []);

// 	for (let i = 0; i < prodoctStockLedgerData.length; i++) {
// 		if (i == 0) {
// 			prodoctStockLedgerData[0].open = openingData;
// 		} else {
// 			prodoctStockLedgerData[i].open = [];
// 		}
// 	}
// 	prodoctStockLedgerData.count = prodoctStockLedgerData1.length;
// 	prodoctStockLedgerData.rows = prodoctStockLedgerData;

// 	// stockData = prodoctStockLedgerData.concat(openingData);
// 	// stockData.count = prodoctStockLedgerData1.length;

// 	// stockData = prodoctStockLedgerData.concat(openingData);
// 	// stockData = stockData.concat(totalData);
// 	// stockData.count = prodoctStockLedgerData1.length;
// 	// stockData.rows = stockData;

// 	if (prodoctStockLedgerData) {
// 		let { total, data, totalPages, currentPage } = getPagingData(
// 			// stockData,
// 			prodoctStockLedgerData,
// 			req.body.pageNumber,
// 			req.body.numberOfRows
// 		);
// 		res.status(200).json({
// 			error: false,
// 			total,
// 			data,
// 			// totalData,
// 			totalPages,
// 			currentPage,
// 		});
// 	} else {
// 		res.status(200).json({
// 			error: false,
// 			data: {},
// 		});
// 	}

// 	// if (prodoctStockLedgerData) {
// 	// 	res.status(200).json({
// 	// 		success: true,
// 	// 		data: prodoctStockLedgerData,
// 	// 	});
// 	// } else {
// 	// 	res.status(200).json({
// 	// 		success: true,
// 	// 		data: [],
// 	// 	});
// 	// }
// });

// @desc product stock ledger
// @route POST /api/report/getProductStockLedger
// @access public
exports.getCAPEXReport = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	let condition = {};
	let innerCondition = { Category: process.env.CAPEX };
	let innerCondition2 = {};
	if (req.body.search != '') {
		innerCondition.Name = req.body.search;
	}
	if (req.body.Department != '') {
		condition.Current_Department = req.body.Department;
	}
	if (req.body.Location_Name != '') {
		innerCondition2.Name = req.body.Location_Name;
	}

	if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
		innerCondition.Asset_Holder = process.env.DEPT_IT;
	} else if (
		userType == process.env.ADMIN ||
		userType == process.env.ADMIN_SYSTEM_ADMIN
	) {
		innerCondition.Asset_Holder = process.env.DEPT_ADMIN;
	}

	const assetItems = await db.asset.findAndCountAll({
		where: condition,
		limit,
		offset,
		attributes: [
			'Product_ID',
			'Barcode',
			'Manufacturer',
			'Serial_Number',
			'Model',
			'AMC_Expiry',
			'AMC_Vendor',
			'Product_Expiry',
			'Status',
			'Current_Location',
			'Current_Department',
			'Current_Cost_Center',
		],
		include: [
			{
				model: db.products,
				attributes: ['Name', 'Asset_Holder'],
				where: innerCondition,
			},
			{
				model: db.location,
				attributes: ['Name'],
				where: innerCondition2,
			},
		],
	});

	if (assetItems) {
		let { total, data, totalPages, currentPage } = getPagingData(
			// stockData,
			assetItems,
			req.body.pageNumber,
			req.body.numberOfRows
		);
		res.status(200).json({
			error: false,
			total,
			data,
			// totalData,
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
// @desc product stock ledger
// @route POST /api/report/getProductStockLedger
// @access public
exports.getProductStockLedgerReport = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	let condition = '';
	let openingCondition = '';
	let openingDispatchCondition = '';
	let flag = false;
	let openingData;
	let dispatchCondition = '';
	let searchString = req.body.search;

	if (searchString.search('\\"')) {
		searchString = searchString.replace(/"/g, '\\"');
	} else if (searchString.search("\\'")) {
		searchString = searchString.replace(/"/g, "\\'");
	}

	if (searchString != '') {
		condition += ' and `products`.`Name` Like "' + searchString + '%" ';
		dispatchCondition += ' and `products`.`Name` Like "' + searchString + '%" ';
	}

	if (req.body.startDate == '' && req.body.endDate == '') {
		condition += 'and `Dated_On` >= "1970-01-01" ';
		dispatchCondition += 'and `dispatch`.`Dated_On` >= "1970-01-01" ';
	} else if (req.body.startDate != '' && req.body.endDate != '') {
		condition +=
			' and Dated_On >= "' +
			req.body.startDate +
			'" and Dated_On <= "' +
			req.body.endDate +
			'"';
		dispatchCondition +=
			' and `dispatch`.`Dated_On` >= "' +
			req.body.startDate +
			'" and `dispatch`.`Dated_On` <= "' +
			req.body.endDate +
			'"';

		openingCondition +=
			' and `products`.`Name` Like "' +
			searchString +
			'%" and `Dated_On` >= "1970-01-01" and `Dated_On` < "' +
			req.body.startDate +
			'" ';
		openingDispatchCondition +=
			' and `products`.`Name` Like "' +
			searchString +
			'%" and `dispatch`.`Dated_On` >= "1970-01-01" and `dispatch`.`Dated_On` < "' +
			req.body.startDate +
			'" ';
		flag = true;
	} else if (req.body.startDate != '') {
		condition += ' and Dated_On >= "' + req.body.startDate + '"';
		dispatchCondition +=
			' and `dispatch`.`Dated_On` >= "' + req.body.startDate + '"';

		openingCondition +=
			' and `products`.`Name` Like "' +
			searchString +
			'%" and `Dated_On` >= "1970-01-01" and `Dated_On` < "' +
			req.body.startDate +
			'" ';
		openingDispatchCondition +=
			' and `products`.`Name` Like "' +
			searchString +
			'%" and `dispatch`.`Dated_On` >= "1970-01-01" and `dispatch`.`Dated_On` < "' +
			req.body.startDate +
			'" ';
		flag = true;
	} else if (req.body.endDate != '') {
		condition += ' and Dated_On <= "' + req.body.endDate + '"';
		dispatchCondition +=
			' and `dispatch`.`Dated_On` <= "' + req.body.endDate + '"';

		openingCondition +=
			' and `products`.`Name` Like "' +
			searchString +
			'%" and `Dated_On` >= "1970-01-01" and `Dated_On` < "' +
			req.body.endDate +
			'" ';
		openingDispatchCondition +=
			' and `products`.`Name` Like "' +
			searchString +
			'%" and `dispatch`.`Dated_On` >= "1970-01-01" and `dispatch`.`Dated_On` < "' +
			req.body.endDate +
			'" ';
		flag = true;
	}

	// const prodoctStockData = await db.sequelize
	// 	.query(
	// 		' SELECT `inward`.`Challan_No`,`inward`.`Dated_On`,`assets`.`Current_Department`,`products`.`Name`,' +
	// 			' SUM(`assets`.`Quantity`) AS `Received_Quantity`,`inward`.`Total_Price` AS `Received_Amount`,' +
	// 			' "0" AS `Issue_Quantity`,"0.0" AS `Issue_Amount`,"0" AS `Closing_Quantity`,' +
	// 			' "0.0" AS `Closing_Amount`,`inward`.`Created_At` FROM `inward` AS `inward` LEFT JOIN `assets`' +
	// 			' AS `assets` ON `inward`.`ID` = `assets`.`Inward_ID` LEFT JOIN `products` AS `products`' +
	// 			' ON `assets`.`Product_ID` = `products`.`ID` WHERE (`inward`.`Deleted_At` IS NULL)' +
	// 			condition +
	// 			' GROUP BY `assets`.`Inward_ID` UNION ALL SELECT `dispatch`.`Gate_Pass_No`,' +
	// 			'`dispatch`.`Dated_On`,`assets`.`Current_Department`,`products`.`Name`,"0"' +
	// 			' AS `Received_Quantity`,"0.0" AS `Received_Amount`,SUM(`assets`.`Quantity`)' +
	// 			' AS `Issue_Quantity`,sum(`assets`.`Total_Price`) AS `Issue_Amount`,"0" AS `Closing_Quantity`,' +
	// 			'"0.0" AS `Closing_Amount`,`dispatch`.`Created_At` FROM `dispatch` AS `dispatch` LEFT JOIN' +
	// 			' `asset_transactions` AS `asset_transactions` ON `Dispatch`.`ID` =' +
	// 			' `asset_transactions`.`Dispatch_ID` LEFT JOIN `assets` AS `assets` ON' +
	// 			' `asset_transactions`.`Asset_ID` = `assets`.`ID` LEFT JOIN `products` AS `products`' +
	// 			' ON `assets`.`Product_ID` = `products`.`ID` WHERE (`dispatch`.`Deleted_At` IS NULL)' +
	// 			dispatchCondition +
	// 			' GROUP BY `asset_transactions`.`Dispatch_ID` ORDER By Created_At limit :offset, :limit ',

	// 		{
	// 			replacements: {
	// 				limit: limit,
	// 				offset: offset,
	// 				search: '%' + searchString + '%',
	// 			},
	// 			type: QueryTypes.SELECT,
	// 		}
	// 	)
	// 	.catch((e) => {
	// 		res.status(500).json({
	// 			error: true,
	// 			message: 'Server error..!!',
	// 		});
	// 	});
	if (flag == true) {
		openingData = await db.sequelize
			.query(
				' SELECT `inward`.`Challan_No` AS Voucher_No,`inward`.`Dated_On`,`assets`.`Current_Department` AS Department,`products`.`Name` AS Item_Name,' +
					' SUM(`assets`.`Quantity`) AS `Quantity`,sum(`assets`.`Total_Price`) AS `Amount`,' +
					' sum(`assets`.`Total_Price`) AS `Closing_Amount`,`inward`.`Created_At` FROM `inward` AS `inward` LEFT JOIN `assets`' +
					' AS `assets` ON `inward`.`ID` = `assets`.`Inward_ID` LEFT JOIN `products` AS `products`' +
					' ON `assets`.`Product_ID` = `products`.`ID` WHERE (`inward`.`Deleted_At` IS NULL)' +
					openingCondition +
					' GROUP BY `assets`.`Inward_ID` UNION ALL SELECT `dispatch`.`Gate_Pass_No` AS Voucher_No,' +
					'`dispatch`.`Dated_On`,`asset_transactions`.`Location_To_Department`,`products`.`Name`,' +
					' SUM(`assets`.`Quantity`) AS `Quantity`,sum(`assets`.`Total_Price`) AS `Amount`,' +
					' sum(`assets`.`Total_Price`) AS `Closing_Amount`, `dispatch`.`Created_At` FROM `dispatch` AS `dispatch` LEFT JOIN' +
					' `asset_transactions` AS `asset_transactions` ON `Dispatch`.`ID` =' +
					' `asset_transactions`.`Dispatch_ID` LEFT JOIN `assets` AS `assets` ON' +
					' `asset_transactions`.`Asset_ID` = `assets`.`ID` LEFT JOIN `products` AS `products`' +
					' ON `assets`.`Product_ID` = `products`.`ID` WHERE (`dispatch`.`Deleted_At` IS NULL)' +
					openingDispatchCondition +
					' GROUP BY `asset_transactions`.`Dispatch_ID` ORDER By Created_At ',

				{
					replacements: {
						search: '%' + searchString + '%',
					},
					type: QueryTypes.SELECT,
				}
			)
			.catch((e) => {
				res.status(500).json({
					error: true,
					message: 'Server error..!!',
				});
			});
	}
	const prodoctStockDataCount = await db.sequelize
		.query(
			' SELECT `inward`.`Challan_No` AS Voucher_No,`inward`.`Dated_On`,`assets`.`Current_Department` AS Department,`products`.`Name` AS Item_Name,' +
				' SUM(`assets`.`Quantity`) AS `Quantity`,sum(`assets`.`Total_Price`) AS `Amount`,' +
				' sum(`assets`.`Total_Price`) AS `Closing_Amount`,`inward`.`Created_At` FROM `inward` AS `inward` LEFT JOIN `assets`' +
				' AS `assets` ON `inward`.`ID` = `assets`.`Inward_ID` LEFT JOIN `products` AS `products`' +
				' ON `assets`.`Product_ID` = `products`.`ID` WHERE (`inward`.`Deleted_At` IS NULL)' +
				condition +
				' GROUP BY `assets`.`Inward_ID` UNION ALL SELECT `dispatch`.`Gate_Pass_No` AS Voucher_No,' +
				'`dispatch`.`Dated_On`,`asset_transactions`.`Location_To_Department` AS Department,`products`.`Name` AS Item_Name,' +
				' SUM(`assets`.`Quantity`) AS `Quantity`,sum(`assets`.`Total_Price`) AS `Amount`,' +
				' sum(`assets`.`Total_Price`) AS `Closing_Amount`, `dispatch`.`Created_At` FROM `dispatch` AS `dispatch` LEFT JOIN' +
				' `asset_transactions` AS `asset_transactions` ON `Dispatch`.`ID` =' +
				' `asset_transactions`.`Dispatch_ID` LEFT JOIN `assets` AS `assets` ON' +
				' `asset_transactions`.`Asset_ID` = `assets`.`ID` LEFT JOIN `products` AS `products`' +
				' ON `assets`.`Product_ID` = `products`.`ID` WHERE (`dispatch`.`Deleted_At` IS NULL)' +
				dispatchCondition +
				' GROUP BY `asset_transactions`.`Dispatch_ID` ORDER By Created_At ',

			{
				replacements: {
					search: '%' + searchString + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});
	const prodoctStockData = await db.sequelize
		.query(
			' SELECT `inward`.`Challan_No` AS Voucher_No,`inward`.`Dated_On`,`assets`.`Current_Department` AS Department,`products`.`Name`  AS Item_Name,' +
				' SUM(`assets`.`Quantity`) AS `Quantity`,sum(`assets`.`Total_Price`) AS `Amount`,0 AS `Closing_Quantity`,' +
				' sum(`assets`.`Total_Price`) AS `Closing_Amount`,`inward`.`Created_At` FROM `inward` AS `inward` LEFT JOIN `assets`' +
				' AS `assets` ON `inward`.`ID` = `assets`.`Inward_ID` LEFT JOIN `products` AS `products`' +
				' ON `assets`.`Product_ID` = `products`.`ID` WHERE (`inward`.`Deleted_At` IS NULL)' +
				condition +
				' GROUP BY `assets`.`Inward_ID` UNION ALL SELECT `dispatch`.`Gate_Pass_No` AS Voucher_No,' +
				'`dispatch`.`Dated_On`,`asset_transactions`.`Location_To_Department` AS Department,`products`.`Name`  AS Item_Name,' +
				' SUM(`assets`.`Quantity`) AS `Quantity`,sum(`assets`.`Total_Price`) AS `Amount`,0 AS `Closing_Quantity`,' +
				' sum(`assets`.`Total_Price`) AS `Closing_Amount`, `dispatch`.`Created_At` FROM `dispatch` AS `dispatch` LEFT JOIN' +
				' `asset_transactions` AS `asset_transactions` ON `Dispatch`.`ID` =' +
				' `asset_transactions`.`Dispatch_ID` LEFT JOIN `assets` AS `assets` ON' +
				' `asset_transactions`.`Asset_ID` = `assets`.`ID` LEFT JOIN `products` AS `products`' +
				' ON `assets`.`Product_ID` = `products`.`ID` WHERE (`dispatch`.`Deleted_At` IS NULL)' +
				dispatchCondition +
				' GROUP BY `asset_transactions`.`Dispatch_ID` ORDER By Created_At limit :offset, :limit ',

			{
				replacements: {
					limit: limit,
					offset: offset,
					search: '%' + searchString + '%',
				},
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});

	let open = [];
	let closingQuantity = 0;
	let closingAmount = 0;
	if (flag == true) {
		//calculating opening amount and quantity
		for (let j = 0; j < openingData.length; j++) {
			let VoucherNo = openingData[j].Voucher_No;
			if (j == 0) {
				closingQuantity = parseInt(openingData[j].Quantity);
				closingAmount += parseFloat(openingData[j].Closing_Amount);
			} else if (VoucherNo.includes(process.env.PREFIX)) {
				ClosingQuantity =
					closingQuantity > 0
						? closingQuantity - parseInt(openingData[j].Quantity)
						: parseInt(openingData[j - 1].Closing_Quantity) -
						  parseInt(openingData[j].Quantity);

				closingQuantity = ClosingQuantity;
				closingAmount += parseFloat(openingData[j].Closing_Amount);
			} else {
				let ClosingQuantity =
					closingQuantity > 0
						? closingQuantity + parseInt(openingData[j].Quantity)
						: parseInt(openingData[j - 1].Closing_Quantity) +
						  parseInt(openingData[j].Quantity);

				closingQuantity = ClosingQuantity;
				closingAmount += parseFloat(openingData[j].Closing_Amount);
			}
		}
	}
	open.push({
		Opening_Quantity: parseInt(closingQuantity),
		Opening_Amount: parseFloat(closingAmount),
	});
	let overallReceivedQuantity = 0;
	let overallReceivedAmount = 0;
	let overallIssueQuantity = 0;
	let overallIssueAmount = 0;
	let overallClosingQuantity = 0;
	let overallClosingAmount = 0;

	// calculating real response
	for (let i = 0; i < prodoctStockData.length; i++) {
		let VoucherNo = prodoctStockData[i].Voucher_No;
		if (i == 0 && VoucherNo.includes(process.env.PREFIX)) {
			prodoctStockData[i].Received_Quantity = 0;
			prodoctStockData[i].Received_Amount = 0;
			prodoctStockData[i].Issue_Quantity = parseInt(
				prodoctStockData[i].Quantity
			);
			prodoctStockData[i].Issue_Amount = parseFloat(prodoctStockData[i].Amount);
			prodoctStockData[i].Closing_Quantity =
				closingQuantity > 0
					? closingQuantity - parseInt(prodoctStockData[i].Quantity)
					: parseInt(prodoctStockData[i].Quantity);
			prodoctStockData[i].Closing_Amount = -prodoctStockData[i].Closing_Amount;

			overallIssueQuantity += parseInt(prodoctStockData[i].Quantity);
			overallIssueAmount += parseFloat(prodoctStockData[i].Amount);
			overallClosingQuantity =
				closingQuantity > 0
					? closingQuantity - parseInt(prodoctStockData[i].Quantity)
					: parseInt(prodoctStockData[i].Quantity);
			overallClosingAmount -= parseFloat(prodoctStockData[i].Amount);
		} else if (i == 0) {
			prodoctStockData[i].Received_Quantity = parseInt(
				prodoctStockData[i].Quantity
			);
			prodoctStockData[i].Received_Amount = parseFloat(
				prodoctStockData[i].Amount
			);
			prodoctStockData[i].Issue_Quantity = 0;
			prodoctStockData[i].Issue_Amount = 0;
			prodoctStockData[i].Closing_Quantity =
				closingQuantity > 0
					? closingQuantity + parseInt(prodoctStockData[i].Quantity)
					: parseInt(prodoctStockData[i].Quantity);
			prodoctStockData[i].Closing_Amount = prodoctStockData[i].Closing_Amount;

			overallReceivedQuantity += parseInt(prodoctStockData[i].Quantity);
			overallReceivedAmount += parseFloat(prodoctStockData[i].Amount);
			overallClosingQuantity =
				closingQuantity > 0
					? closingQuantity - parseInt(prodoctStockData[i].Quantity)
					: parseInt(prodoctStockData[i].Quantity);
			overallClosingAmount += parseFloat(prodoctStockData[i].Amount);
		} else if (VoucherNo.includes(process.env.PREFIX)) {
			let issueQuantity = parseInt(prodoctStockData[i].Quantity);
			let issueAmount = parseFloat(prodoctStockData[i].Amount);
			let ClosingQuantity =
				parseInt(prodoctStockData[i - 1].Closing_Quantity) -
				parseInt(prodoctStockData[i].Quantity);

			prodoctStockData[i].Received_Quantity = 0;
			prodoctStockData[i].Received_Amount = 0.0;
			prodoctStockData[i].Issue_Quantity = issueQuantity;
			prodoctStockData[i].Issue_Amount = issueAmount;
			prodoctStockData[i].Closing_Quantity = ClosingQuantity;
			prodoctStockData[i].Closing_Amount = -prodoctStockData[i].Closing_Amount;

			overallIssueQuantity += parseInt(prodoctStockData[i].Quantity);
			overallIssueAmount += parseFloat(prodoctStockData[i].Amount);
			overallClosingQuantity = ClosingQuantity;
			overallClosingAmount -= parseFloat(prodoctStockData[i].Amount);
		} else {
			let receivedQuantity = parseInt(prodoctStockData[i].Quantity);
			let receivedAmount = parseFloat(prodoctStockData[i].Amount);
			let ClosingQuantity =
				parseInt(prodoctStockData[i - 1].Closing_Quantity) +
				parseInt(prodoctStockData[i].Quantity);

			prodoctStockData[i].Received_Quantity = receivedQuantity;
			prodoctStockData[i].Received_Amount = receivedAmount;
			prodoctStockData[i].Issue_Quantity = 0;
			prodoctStockData[i].Issue_Amount = 0;
			prodoctStockData[i].Closing_Quantity = ClosingQuantity;

			overallReceivedQuantity += parseInt(prodoctStockData[i].Quantity);
			overallReceivedAmount += parseFloat(prodoctStockData[i].Amount);
			overallClosingQuantity = ClosingQuantity;
			overallClosingAmount += parseFloat(prodoctStockData[i].Amount);
		}
	}
	let openingQuantity;
	let openingAmount = 0.0;
	if (open.length > 0) {
		openingQuantity = open[0].Opening_Quantity;
		openingAmount = open[0].Opening_Amount;
	}

	for (let k = 0; k < prodoctStockData.length; k++) {
		if (k == 0 && flag == true) {
			// prodoctStockData[0].open = open;
			prodoctStockData[k].open = [];
		} else {
			prodoctStockData[k].open = [];
		}
	}
	totalData = {
		Sr_No: 'TOTAL',
		// Date: moment(itemStock[i].Dated_On).format('DD-MM-YYYY'),
		Voucher_No: ' ',
		Date: ' ',
		Department: ' ',
		Item_Name: ' ',
		Open_Qty: open.length > 0 ? Number(openingQuantity) : 0,
		// Open_Qty: Number(prodoctStockLedgerData[i].Opening_Quantity)
		// 	? Number(prodoctStockLedgerData[i].Opening_Quantity)
		// 	: 0.0,
		Open_Amount: open.length > 0 ? Number(openingAmount) : 0.0,
		Received_Qty: Number(overallReceivedQuantity)
			? Number(overallReceivedQuantity)
			: 0,
		Received_Amount: overallReceivedAmount ? overallReceivedAmount : 0.0,
		Issue_Qty: Number(overallIssueQuantity) ? Number(overallIssueQuantity) : 0,
		Issue_Amount: overallIssueAmount ? overallIssueAmount : 0.0,
		Closing_Qty: Number(overallClosingQuantity)
			? Number(overallClosingQuantity)
			: 0,
		Closing_Amount:
			open.length > 0
				? Number(openingAmount) + overallReceivedAmount - overallIssueAmount
				: overallReceivedAmount - overallIssueAmount,
		// Closing_Amount:
		// 	Number(overallClosingAmount) != null ? Number(overallClosingAmount) : 0,
	};
	// prodoctStockData.push(totalData);

	prodoctStockData.count = prodoctStockDataCount.length;
	prodoctStockData.rows = prodoctStockData;

	if (prodoctStockData) {
		let { total, data, totalPages, currentPage } = getPagingData(
			prodoctStockData,
			req.body.pageNumber,
			req.body.numberOfRows
		);
		res.status(200).json({
			error: false,
			total,
			data,
			totalData,
			totalPages,
			currentPage,
		});
	} else {
		res.status(200).json({
			error: false,
			data: {},
		});
	}

	// if (prodoctStockData) {
	// res.status(200).json({
	// 	success: true,
	// 	data: prodoctStockData,
	// 	// prodoctStockDispatchData,
	// });
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
