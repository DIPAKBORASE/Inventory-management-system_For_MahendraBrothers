const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { QueryTypes, Op } = require('sequelize');
const excel = require('node-excel-export');
const { stylesData } = require('../utils/style');
const moment = require('moment');

// @desc get material receipt export
// @route POST /api/excel/getMaterialReceiptExport
// @access public
exports.getMaterialReceiptExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [
		[{ value: 'Material Receipt Report', style: styles.topHeader }],
	];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 50,
		},
		Vendor_Name: {
			displayName: 'Vendor Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Challan_No: {
			displayName: 'Challan No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Date: {
			displayName: 'Date',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 150,
		},
		Item_Category: {
			displayName: 'Item Category',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Item_Code: {
			displayName: 'Item Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Item_Name: {
			displayName: 'Item Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Item_Description: {
			displayName: 'Item Description',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		UOM: {
			displayName: 'UOM',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Qty: {
			displayName: 'Qty',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Price: {
			displayName: 'Price',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Sub_Total: {
			displayName: 'Sub Total',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		GST_Percentage: {
			displayName: 'GST %',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		GST_Amount: {
			displayName: 'GST Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Total_Amount: {
			displayName: 'Total Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
	};

	const userType = req.user.User_Type;
	// let condition = {};
	// if (req.body.search != '') {
	// 	condition.Challan_No = { [Op.like]: `${req.body.search}%` };
	// }
	// if (req.body.startDate != '' && req.body.endDate != '') {
	// 	condition.Dated_On = {
	// 		[Op.gte]: Date.parse(req.body.startDate),
	// 		[Op.lte]: Date.parse(req.body.endDate),
	// 	};
	// } else if (req.body.startDate != '') {
	// 	condition.Dated_On = {
	// 		[Op.gte]: Date.parse(req.body.startDate),
	// 	};
	// } else if (req.body.endDate != '') {
	// 	condition.Dated_On = {
	// 		[Op.lte]: Date.parse(req.body.endDate),
	// 	};
	// }
	// if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
	// 	condition.User_Type = process.env.DEPT_IT;
	// } else if (
	// 	userType == process.env.ADMIN_SYSTEM_ADMIN ||
	// 	userType == process.env.ADMIN
	// ) {
	// 	condition.User_Type = process.env.DEPT_ADMIN;
	// }
	// let vendorCondition = '';
	// if (req.body.Vendor_Name != '') {
	// 	vendorCondition = { Name: { [Op.eq]: `${req.body.Vendor_Name}` } };
	// }
	// let productCondition = '';
	// if (req.body.ALT_Code != '') {
	// 	productCondition = { ALT_Code: { [Op.eq]: `${req.body.ALT_Code}` } };
	// }
	// if (req.body.ALT_Code != '' && req.body.Product_Group != '') {
	// 	productCondition.Product_Group = { [Op.eq]: `${req.body.Product_Group}` };
	// }
	// if (!req.body.ALT_Code != '' && req.body.Product_Group != '') {
	// 	productCondition = {
	// 		Product_Group: { [Op.eq]: `${req.body.Product_Group}` },
	// 	};
	// }
	// let materialData = await db.inward.findAll({
	// 	where: condition,
	// 	group: ['assets.Product_ID', 'Challan_No'],
	// 	order: [
	// 		['Dated_On', 'DESC'],
	// 		['ID', 'DESC'],
	// 	],
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
	// 					db.sequelize.fn('SUM', db.sequelize.col('assets.Sub_Total')),
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
	// 							db.Sequelize.col('assets.Sub_Total'),
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
				' GROUP BY `assets`.`Product_ID`,`Challan_No`,`Vendor_ID` Order By `Dated_On` desc, `inward`.`ID` DESC ',
			{
				replacements: {
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

	let materialDataList = [];
	let count = 1;
	for (let i = 0; i < materialData.length; i++) {
		// for (let j = 0; j < materialData[i].dataValues.assets.length; j++) {
		materialDataItem = {
			Sr_No: count,
			Challan_No: materialData[i].Challan_No,
			Date: materialData[i].Dated_On,
			Vendor_Name: materialData[i].Vendor_Name,
			Item_Category: materialData[i].Product_Group,
			Item_Code: materialData[i].ALT_Code,
			Item_Name: materialData[i].Product_Name,
			Item_Description: materialData[i].Description,
			UOM: materialData[i].UOM,
			Qty: Number(materialData[i].Quantity),
			Price: Number(materialData[i].Per_Unit_Price),
			Sub_Total: Number(materialData[i].Sub_Total),
			GST_Percentage: Number(materialData[i].TAX_Percentage),
			GST_Amount: Number(materialData[i].TAX_Value),
			Total_Amount: Number(materialData[i].Total_Price),
		};
		materialDataList.push(materialDataItem);
		count = count + 1;
		// }
	}
	// console.log(materialDataList);
	const dataset = materialDataList;

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
	res.attachment('MaterialReceipt.xlsx');
	return res.send(report);
	// if (materialData) {
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
// @desc get material receipt export
// @route POST /api/excel/getMaterialReceiptExport
// @access public
exports.getConsumptionExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [[{ value: 'Consumption Report', style: styles.topHeader }]];

	const specificationDateWise = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Dispatch_No: {
			displayName: 'Dispatch No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Date: {
			displayName: 'Date',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 150,
		},
		Barcode: {
			displayName: 'Barcode',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Item_Category: {
			displayName: 'Item Category',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Item_Code: {
			displayName: 'Item Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Item_Name: {
			displayName: 'Item Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Item_Description: {
			displayName: 'Item Description',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Qty: {
			displayName: 'Qty',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		// Price: {
		// 	displayName: 'Price',
		// 	headerStyle: styles.tableHeader,
		// 	cellStyle: styles.cellDecimal,
		// 	width: 150,
		// },
		Sub_Total: {
			displayName: 'Sub Total',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		GST_Percentage: {
			displayName: 'GST %',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		GST_Amount: {
			displayName: 'GST Amt',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Amt: {
			displayName: 'Total Amt',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Dept: {
			displayName: 'Dept',
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
		Location: {
			displayName: 'Location',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
	};
	const specificationConsolidate = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Item_Category: {
			displayName: 'Item Category',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Item_Code: {
			displayName: 'Item Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Item_Name: {
			displayName: 'Item Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Item_Description: {
			displayName: 'Item Description',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Qty: {
			displayName: 'Qty',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Sub_Total: {
			displayName: 'Sub Total',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		GST_Percentage: {
			displayName: 'GST %',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		GST_Amount: {
			displayName: 'GST Amt',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Amt: {
			displayName: 'Total Amt',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
	};

	const userType = req.user.User_Type;
	// let condition = {};
	// if (req.body.search != '') {
	// 	condition.Gate_Pass_No = { [Op.like]: `${req.body.search}%` };
	// }
	// if (req.body.Department != '') {
	// 	condition = { Department: { [Op.eq]: `${req.body.Department}` } };
	// }
	// if (!req.body.search != '' && req.body.Department != '') {
	// 	condition = {
	// 		Department: { [Op.eq]: `${req.body.Department}` },
	// 	};
	// }

	// if (req.body.startDate != '' && req.body.endDate != '') {
	// 	condition.Dated_On = {
	// 		[Op.gte]: Date.parse(req.body.startDate),
	// 		[Op.lte]: Date.parse(req.body.endDate),
	// 	};
	// } else if (req.body.startDate != '') {
	// 	condition.Dated_On = {
	// 		[Op.gte]: Date.parse(req.body.startDate),
	// 	};
	// } else if (req.body.endDate != '') {
	// 	condition.Dated_On = {
	// 		[Op.lte]: Date.parse(req.body.endDate),
	// 	};
	// }
	// if (userType == process.env.IT) {
	// 	condition.User_Type = process.env.DEPT_IT;
	// } else if (userType == process.env.ADMIN) {
	// 	condition.User_Type = process.env.DEPT_ADMIN;
	// }
	// let locationCondition = '';
	// if (req.body.Location_Name != '') {
	// 	locationCondition = { Name: { [Op.eq]: `${req.body.Location_Name}` } };
	// }
	// let productCondition = {};
	// if (req.body.Department != '') {
	// 	productCondition = {
	// 		Asset_Holder: { [Op.eq]: `${req.body.Department}` },
	// 	};
	// }

	// let productCondition = '';
	// if (req.body.ALT_Code != '') {
	// 	productCondition = { ALT_Code: { [Op.eq]: `${req.body.ALT_Code}` } };
	// }
	// if (req.body.ALT_Code != '' && req.body.Product_Group != '') {
	// 	productCondition.Product_Group = { [Op.eq]: `${req.body.Product_Group}` };
	// }
	// if (!req.body.ALT_Code != '' && req.body.Product_Group != '') {
	// 	productCondition = {
	// 		Product_Group: { [Op.eq]: `${req.body.Product_Group}` },
	// 	};
	// }

	// if (req.body.Department != '' && req.body.Product_Group != '') {
	// 	productCondition.Product_Group = { [Op.eq]: `${req.body.Product_Group}` };
	// }
	// if (!req.body.Department != '' && req.body.Product_Group != '') {
	// 	productCondition = {
	// 		Product_Group: { [Op.eq]: `${req.body.Product_Group}` },
	// 	};
	// }
	// let consumptionData = await db.dispatch.findAll({
	// 	where: condition,
	// 	attributes: ['Gate_Pass_No', 'Dated_On', 'Department', 'Cost_Center'],
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
	// 							// where: productCondition,
	// 							attributes: [
	// 								'ID',
	// 								'ALT_Code',
	// 								'Name',
	// 								'Description',
	// 								'Product_Group',
	// 								'Asset_Holder',
	// 							],
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
	let consumptionDataList = [];
	let consumptionData;
	let report;
	if (req.body.type == 'datewise') {
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
					' GROUP BY `Gate_Pass_No`, `asset_transactions->asset`.`Product_ID`, `asset_transactions->asset`.`Barcode` Order By `Dated_On` desc, `ID` DESC',
				{
					replacements: {
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
		let count = 1;
		for (let i = 0; i < consumptionData.length; i++) {
			consumptionDataItem = {
				Sr_No: count,
				Dispatch_No: consumptionData[i].Gate_Pass_No,
				Date: consumptionData[i].Dated_On,
				Barcode: consumptionData[i].Barcode ? consumptionData[i].Barcode : ' ',
				Item_Category: consumptionData[i].Product_Group
					? consumptionData[i].Product_Group
					: ' ',
				Item_Code: consumptionData[i].ALT_Code
					? consumptionData[i].ALT_Code
					: ' ',
				Item_Name: consumptionData[i].product_Name
					? consumptionData[i].product_Name
					: ' ',

				Item_Description: consumptionData[i].Description
					? consumptionData[i].Description
					: ' ',
				Qty: Number(consumptionData[i].Quantity),
				// Price: Number(consumptionData[i].Price),
				Sub_Total: Number(consumptionData[i].Sub_Total),
				Dept: consumptionData[i].Department,
				Cost_Center: consumptionData[i].Cost_Center,
				GST_Percentage: consumptionData[i].TAX_Percentage
					? Number(consumptionData[i].TAX_Percentage)
					: ' ',
				GST_Amount: consumptionData[i].TAX_Value
					? Number(consumptionData[i].TAX_Value)
					: ' ',
				Amt: consumptionData[i].Total_Price
					? Number(consumptionData[i].Total_Price)
					: ' ',
				Location: consumptionData[i].Location_Name,
			};
			consumptionDataList.push(consumptionDataItem);
			count = count + 1;
		}

		const dataset = consumptionDataList;

		const merges = [
			{
				start: { row: 1, column: 1 },
				end: { row: 1, column: Object.keys(specificationDateWise).length },
			},
		];

		report = excel.buildExport([
			{
				name: 'Report',
				heading: heading,
				merges: merges,
				specification: specificationDateWise,
				data: dataset,
			},
		]);

		res.attachment('ConsumptionReport.xlsx');
		return res.send(report);
	} else if (req.body.type == 'consolidate') {
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
					' GROUP BY `asset_transactions->asset`.`Product_ID` Order By `Dated_On` desc, `ID` DESC',
				{
					replacements: {
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

		let count = 1;
		for (let i = 0; i < consumptionData.length; i++) {
			consumptionDataItem = {
				Sr_No: count,
				// Dispatch_No: consumptionData[i].Gate_Pass_No,
				// Date: consumptionData[i].Dated_On,
				// Barcode: consumptionData[i].Barcode ? consumptionData[i].Barcode : ' ',
				Item_Category: consumptionData[i].Product_Group
					? consumptionData[i].Product_Group
					: ' ',
				Item_Code: consumptionData[i].ALT_Code
					? consumptionData[i].ALT_Code
					: ' ',
				Item_Name: consumptionData[i].product_Name
					? consumptionData[i].product_Name
					: ' ',

				Item_Description: consumptionData[i].Description
					? consumptionData[i].Description
					: ' ',
				Qty: Number(consumptionData[i].Quantity),
				// Price: Number(consumptionData[i].Price),
				Sub_Total: Number(consumptionData[i].Sub_Total),
				// Dept: consumptionData[i].Department,
				// Cost_Center: consumptionData[i].Cost_Center,
				GST_Percentage: consumptionData[i].TAX_Percentage
					? Number(consumptionData[i].TAX_Percentage)
					: ' ',
				GST_Amount: consumptionData[i].TAX_Value
					? Number(consumptionData[i].TAX_Value)
					: ' ',
				Amt: consumptionData[i].Total_Price
					? Number(consumptionData[i].Total_Price)
					: ' ',
				// Location: consumptionData[i].Location_Name,
			};
			consumptionDataList.push(consumptionDataItem);
			count = count + 1;
		}
		console.log('Consolidate ====', consumptionDataList);
		const dataset = consumptionDataList;

		const merges = [
			{
				start: { row: 1, column: 1 },
				end: { row: 1, column: Object.keys(specificationConsolidate).length },
			},
		];

		report = excel.buildExport([
			{
				name: 'Report',
				heading: heading,
				merges: merges,
				specification: specificationConsolidate,
				data: dataset,
			},
		]);

		res.attachment('ConsumptionReport.xlsx');
		return res.send(report);
	}

	// res.attachment('ConsumptionReport.xlsx');
	// return res.send(report);
	// if (consumptionDataList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: consumptionDataList,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
// @desc get challan summary export
// @route POST /api/excel/getChallanSummaryExport
// @access public
exports.getChallanSummaryExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [
		[{ value: 'Challan Summary Report', style: styles.topHeader }],
	];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Challan_No: {
			displayName: 'Challan No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Vendor_Name: {
			displayName: 'Vendor Name',
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
		Date: {
			displayName: 'Date',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 150,
		},
		Item_Code: {
			displayName: 'Item Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Item_Name: {
			displayName: 'Item Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Item_Description: {
			displayName: 'Item Description',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		UOM: {
			displayName: 'UOM',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Qty: {
			displayName: 'Qty',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Rate: {
			displayName: 'Price',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Sub_Total: {
			displayName: 'Sub Total',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		GST_Percentage: {
			displayName: 'GST %',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		GST_Amount: {
			displayName: 'GST Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Total_Amount: {
			displayName: 'Total Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,

			width: 150,
		},
	};

	const userType = req.user.User_Type;
	let condition = {};
	if (req.body.search != '') {
		condition.Challan_No = {
			[Op.like]: `${req.body.search}%`,
		};
	}
	if (req.body.startDate != '' && req.body.endDate != '') {
		condition.Dated_On = {
			[Op.gte]: Date.parse(req.body.startDate),
			[Op.lte]: Date.parse(req.body.endDate),
		};
	} else if (req.body.startDate != '') {
		condition.Dated_On = {
			[Op.gte]: Date.parse(req.body.startDate),
		};
	} else if (req.body.endDate != '') {
		condition.Dated_On = {
			[Op.lte]: Date.parse(req.body.endDate),
		};
	}
	if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
		condition.User_Type = process.env.DEPT_IT;
	} else if (
		userType == process.env.ADMIN_SYSTEM_ADMIN ||
		userType == process.env.ADMIN
	) {
		condition.User_Type = process.env.DEPT_ADMIN;
	}
	let locationCondition = '';
	if (req.body.Location_Name != '') {
		locationCondition = {
			Name: {
				[Op.eq]: `${req.body.Location_Name}`,
			},
		};
	}
	let productCondition = '';
	if (req.body.Product_Name != '') {
		productCondition = {
			Name: {
				[Op.eq]: `${req.body.Product_Name}`,
			},
		};
	}
	let challanData = await db.inward.findAll({
		where: condition,
		group: ['assets.Product_ID', 'Challan_No', 'Vendor_ID'],
		order: [
			['Dated_On', 'DESC'],
			['ID', 'DESC'],
		],
		attributes: ['Challan_No', 'Dated_On'],
		include: [
			{
				model: db.vendors,
				attributes: ['Name'],
			},
			{
				model: db.asset,
				as: 'assets',
				attributes: [
					'ID',
					'Per_Unit_Price',
					'TAX_Percentage',
					[
						db.sequelize.fn('SUM', db.sequelize.col('assets.Quantity')),
						'Quantity',
					],
					[
						db.sequelize.fn('SUM', db.sequelize.col('assets.Sub_Total')),
						'Sub_Total',
					],
					[
						db.sequelize.fn('SUM', db.sequelize.col('assets.TAX_Value')),
						'TAX_Value',
					],
					[
						db.sequelize.fn('SUM', db.sequelize.col('assets.Total_Price')),
						'Total_Price',
					],
				],
				include: [
					{
						model: db.location,
						attributes: ['Name'],
						where: locationCondition,
					},
					{
						model: db.products,
						attributes: [
							'ID',
							'ALT_Code',
							'Name',
							'Description',
							'UOM',
							'TAX_Percentage',
						],
						where: productCondition,
					},
				],
			},
		],
		distinct: true,
	});

	let challanDataList = [];
	let count = 1;
	for (let i = 0; i < challanData.length; i++) {
		for (let j = 0; j < challanData[i].dataValues.assets.length; j++) {
			challanDataItem = {
				Sr_No: count,
				Challan_No: challanData[i].dataValues.Challan_No,
				Vendor_Name: challanData[i].dataValues.vendor.Name,
				Date: challanData[i].dataValues.Dated_On,
				Location: challanData[i].dataValues.assets[j].location.Name,
				Item_Code: challanData[i].dataValues.assets[j].product.ALT_Code,
				Item_Name: challanData[i].dataValues.assets[j].product.Name,
				Item_Description:
					challanData[i].dataValues.assets[j].product.Description,
				UOM: challanData[i].dataValues.assets[j].product.UOM,
				Qty: Number(challanData[i].dataValues.assets[j].Quantity),
				Rate: challanData[i].dataValues.assets[j].Per_Unit_Price,
				Sub_Total: challanData[i].dataValues.assets[j].Sub_Total,
				GST_Percentage: challanData[i].dataValues.assets[j].TAX_Percentage,
				GST_Amount: challanData[i].dataValues.assets[j].TAX_Value,
				Total_Amount: challanData[i].dataValues.assets[j].Total_Price,
			};
			challanDataList.push(challanDataItem);
			count = count + 1;
		}
	}
	console.log(challanDataList);

	const dataset = challanDataList;

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
	res.attachment('ChallanSummary.xlsx');
	return res.send(report);

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
// @desc get challan summary export
// @route POST /api/excel/getStockSummaryExport
// @access public
exports.getStockSummaryExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [
		[{ value: 'Stock Summary  Report', style: styles.topHeader }],
	];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Item_Code: {
			displayName: 'Item Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Item_Name: {
			displayName: 'Item Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Item_Category: {
			displayName: 'Item Category',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Date: {
			displayName: 'Date',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 150,
		},
		Item_Description: {
			displayName: 'Item Description',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		UOM: {
			displayName: 'UOM',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Received_Qty: {
			displayName: 'Received Qty',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Recent_Rate: {
			displayName: 'Recent Rate',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Total_Amount: {
			displayName: 'Total Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Issue_Qty: {
			displayName: 'Issue Qty',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Issue_Amount: {
			displayName: 'Issue Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Balance_Qty: {
			displayName: 'Balance Qty',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Balance_Amount: {
			displayName: 'Balance Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
	};

	const userType = req.user.User_Type;
	// let condition = '';
	// // if (req.body.search != '') {
	// // 	condition = { '$product.Name$': { [Op.like]: `${req.body.search}%` } };
	// // }

	// // if (req.body.startDate != '' && req.body.endDate != '') {
	// // 	condition.Dated_On = {
	// // 		[Op.gte]: Date.parse(req.body.startDate),
	// // 		[Op.lte]: Date.parse(req.body.endDate),
	// // 	};
	// // } else if (req.body.startDate != '') {
	// // 	condition.Dated_On = {
	// // 		[Op.gte]: Date.parse(req.body.startDate),
	// // 	};
	// // } else if (req.body.endDate != '') {
	// // 	condition.Dated_On = {
	// // 		[Op.lte]: Date.parse(req.body.endDate),
	// // 	};
	// // }
	// if (userType == process.env.IT) {
	// 	// condition.Asset_Holder = process.env.DEPT_IT;
	// 	condition = { '$product.Asset_Holder$': { [Op.eq]: process.env.DEPT_IT } };
	// } else if (userType == process.env.ADMIN) {
	// 	// condition.Asset_Holder = process.env.DEPT_ADMIN;
	// 	condition = {
	// 		'$product.Asset_Holder$': { [Op.eq]: process.env.DEPT_ADMIN },
	// 	};
	// }

	// let productCondition = '';
	// if (req.body.search != '') {
	// 	productCondition = { Name: { [Op.like]: `${req.body.search}%` } };
	// }
	// if (req.body.ALT_Code != '') {
	// 	productCondition = { ALT_Code: { [Op.eq]: `${req.body.ALT_Code}` } };
	// }
	// if (req.body.ALT_Code != '' && req.body.Product_Group != '') {
	// 	productCondition.Product_Group = { [Op.eq]: `${req.body.Product_Group}` };
	// }
	// if (!req.body.ALT_Code != '' && req.body.Product_Group != '') {
	// 	productCondition = {
	// 		Product_Group: { [Op.eq]: `${req.body.Product_Group}` },
	// 	};
	// }

	// // console.log('Stockdetails ================');
	// let request = await db.asset.findAll({
	// 	where: condition,
	// 	group: ['Product_ID'],
	// 	attributes: [
	// 		'Product_ID',
	// 		[db.sequelize.fn('SUM', db.sequelize.col('Quantity')), 'Receipt_Qty'],
	// 		[db.sequelize.fn('SUM', db.sequelize.col('Total_Price')), 'Total_Amount'],
	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN Status = 'Assigned' OR Status = 'Scrap' OR Status = 'Lost' OR Status = 'Repair' THEN Quantity ELSE 0 END)`
	// 			),
	// 			'Issue_Qty',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN Status = 'Assigned' OR Status = 'Scrap' OR Status = 'Lost' OR Status = 'Repair' THEN Total_Price ELSE 0 END)`
	// 			),
	// 			'Issue_Amount',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN Status = 'Unassigned' THEN Quantity ELSE 0 END)`
	// 			),
	// 			'Balance_Qty',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN Status = 'Unassigned' THEN Total_Price ELSE 0 END)`
	// 			),
	// 			'Balance_Amount',
	// 		],
	// 	],
	// 	// [db.sequelize.fn('COUNT', 'Status'), 'StatusCount'],

	// 	include: [
	// 		{
	// 			model: db.products,
	// 			attributes: [
	// 				'ID',
	// 				'ALT_Code',
	// 				'Name',
	// 				'Description',
	// 				'Product_Group',
	// 				'UOM',
	// 				'Price',
	// 				'Asset_Holder',
	// 			],
	// 			where: productCondition,
	// 		},
	// 	],
	// });
	let condition = '';
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
	const stockData = await db.sequelize
		.query(
			'SELECT `asset`.`ID`,`asset`.`Product_ID`,`asset`.`Created_At`, SUM(`Quantity`) AS `Received_Qty`, SUM(`Total_Price`) AS `Total_Amount`, ' +
				' SUM(CASE WHEN Status = "Assigned" OR Status = "Scrap" OR Status = "Lost" OR Status = "Repair" ' +
				' THEN Quantity ELSE 0 END) AS `Issue_Qty`,  SUM(CASE WHEN Status = "Assigned" OR Status = "Scrap" OR Status = "Lost" ' +
				' OR Status = "Repair" THEN Total_Price ELSE 0 END) AS `Issue_Amount`,  SUM(CASE WHEN Status = "Unassigned" ' +
				' THEN Quantity ELSE 0 END) AS `Balance_Qty`,  SUM(CASE WHEN Status = "Unassigned" THEN Total_Price ELSE 0 END) AS `Balance_Amount`,' +
				' `product`.`ID` AS `product.ID`, `product`.`ALT_Code` AS `ALT_Code`, `product`.`Name` AS `Product_Name`,' +
				' `product`.`Description` AS `Description`, `product`.`Product_Group` AS `Product_Group`, `product`.`UOM` AS `UOM`,' +
				' `product`.`Price` AS `Price`, `product`.`Asset_Holder` AS `Asset_Holder` FROM `assets` AS `asset`' +
				' LEFT OUTER JOIN `products` AS `product` ON `asset`.`Product_ID` = `product`.`ID` AND (`product`.`Deleted_At` IS NULL) WHERE (`asset`.`Deleted_At` IS NULL)' +
				condition +
				' GROUP BY `Product_ID` order by `asset`.`Created_At` desc,`asset`.`ID` DESC ',
			{
				replacements: {
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

	let stockDataList = [];
	let count = 1;
	for (let i = 0; i < stockData.length; i++) {
		// 	// for (let j = 0; j < stockData[i].dataValues.assets.length; j++) {
		stockDataItem = {
			Sr_No: count,
			Item_Code: stockData[i].ALT_Code,
			Item_Name: stockData[i].Product_Name,
			Item_Category: stockData[i].Product_Group,
			Date: stockData[i].Created_At,
			Item_Description: stockData[i].Description,
			UOM: stockData[i].UOM,
			Received_Qty: Number(stockData[i].Received_Qty),
			Recent_Rate: stockData[i].Price,
			Total_Amount: stockData[i].Total_Amount,
			Issue_Qty: Number(stockData[i].Issue_Qty),
			Issue_Amount: stockData[i].Issue_Amount,
			Balance_Qty: Number(stockData[i].Balance_Qty),
			Balance_Amount: stockData[i].Balance_Amount,
		};
		stockDataList.push(stockDataItem);
		count = count + 1;
		// 	// }
	}
	const dataset = stockDataList;

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
	res.attachment('StockSummary.xlsx');
	return res.send(report);

	// if (stockData) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: stockData,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
// @desc get issue tracker export excel
// @route POST /api/excel/getIssueTrackerExport
// @access public
exports.getIssueTrackerExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [
		[{ value: 'Issue Tracker Report', style: styles.topHeader }],
	];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Date: {
			displayName: 'Date',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 150,
		},
		Department: {
			displayName: 'Department',
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
		Issue_type: {
			displayName: 'Issue Type',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Current_Status: {
			displayName: 'Current Status',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Assigned_Date: {
			displayName: 'Assigned Time',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDateTime,
			width: 200,
		},
		Resolved_Date: {
			displayName: 'Resolved Time',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDateTime,
			width: 200,
		},
		TAT: {
			displayName: 'TAT',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Remark: {
			displayName: 'Remark',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
	};

	const userType = req.user.User_Type;
	// let condition = {
	// 	Request_Type: process.env.SERVICEREQUEST,
	// 	Type_Of_Issue: { [Op.ne]: null },
	// };

	// if (req.body.search != '') {
	// 	condition.Request_Number = { [Op.like]: `${req.body.search}%` };
	// }

	// if (req.body.startDate != '' && req.body.endDate != '') {
	// 	condition.Request_Date = {
	// 		[Op.gte]: new Date(req.body.startDate),
	// 		[Op.lte]: new Date(req.body.endDate),
	// 	};
	// } else if (req.body.startDate != '') {
	// 	condition.Request_Date = {
	// 		[Op.gte]: Date.parse(req.body.startDate),
	// 	};
	// } else if (req.body.endDate != '') {
	// 	condition.Request_Date = {
	// 		[Op.lte]: Date.parse(req.body.endDate),
	// 	};
	// }
	// if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
	// 	condition.Request_Department = process.env.DEPT_IT;
	// } else if (
	// 	userType == process.env.ADMIN_SYSTEM_ADMIN ||
	// 	userType == process.env.ADMIN
	// ) {
	// 	condition.Request_Department = process.env.DEPT_ADMIN;
	// }
	// let locationCondition = '';
	// if (req.body.Location_Name != '') {
	// 	locationCondition = { Name: { [Op.eq]: `${req.body.Location_Name}` } };
	// }
	// let issueTypeCondition = '';
	// if (req.body.Issue_Type_Name != '') {
	// 	issueTypeCondition = { Name: { [Op.eq]: `${req.body.Issue_Type_Name}` } };
	// }

	// if (req.body.Department != '') {
	// 	condition.Request_Department = { [Op.eq]: `${req.body.Department}` };
	// }
	// if (req.body.Status != '') {
	// 	condition.Status = { [Op.eq]: `${req.body.Status}` };
	// }

	// let issueTracker = await db.request.findAll({
	// 	where: condition,
	// 	order: [
	// 		['Request_Date', 'DESC'],
	// 		['ID', 'DESC'],
	// 	],
	// 	attributes: [
	// 		'ID',
	// 		'Request_Number',
	// 		'Request_Department',
	// 		'Request_Date',
	// 		'Status',
	// 		'Support_Comment',
	// 	],
	// 	include: [
	// 		{
	// 			model: db.location,
	// 			where: locationCondition,
	// 			attributes: ['Name'],
	// 		},
	// 		{
	// 			model: db.issue_type,
	// 			where: issueTypeCondition,
	// 			attributes: ['Name'],
	// 		},
	// 	],
	// 	distinct: true,
	// });
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
		condition += ' and Request_Department = "' + process.env.DEPT_IT + '"';
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
	const issueTracker = await db.sequelize
		.query(
			'SELECT `request`.`ID`, `request`.`Request_Number`, `users`.`Department` AS `Department`,`request`.`Request_Department`,`request`.`Support_Comment`, `request`.`Request_Date`, `request`.`Status`,' +
				' `location`.`ID` AS `location.ID`, `location`.`Name` AS `location_Name`, `issue_type`.`ID` AS `issue_type.ID`, ' +
				'`issue_type`.`Name` AS `issue_type_Name`,`request`.`Assigned_Date` AS `Assigned_Time`,`request`.`Resolved_Date` AS `Resolved_Time`,`request`.`TAT` AS `TAT` FROM `request` AS `request` LEFT OUTER JOIN `location` AS `location` ON `request`.`Location_ID` = `location`.`ID`' +
				' AND (`location`.`Deleted_At` IS NULL) LEFT OUTER JOIN `issue_types` AS `issue_type` ON `request`.`Type_Of_Issue` = `issue_type`.`ID` ' +
				'AND (`issue_type`.`Deleted_At` IS NULL) LEFT OUTER JOIN `users` AS `users` ON `request`.`User_ID` = `users`.`ID` AND (`users`.`Deleted_At` IS NULL) WHERE `request`.`Deleted_At` IS NULL ' +
				condition +
				' order by Request_Date desc, `request`.`ID` DESC ',
			{
				replacements: {
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

	let issueTrackerList = [];
	for (let i = 0; i < issueTracker.length; i++) {
		issueTrackerItem = {
			Sr_No: i + 1,
			Date: issueTracker[i].Request_Date,
			Department: issueTracker[i].Department,
			Location: issueTracker[i].location_Name,
			Issue_type: issueTracker[i].issue_type_Name,
			Current_Status: issueTracker[i].Status,
			Assigned_Date:
				issueTracker[i].Assigned_Time != null
					? moment(issueTracker[i].Assigned_Time).format(
							'DD/MM/YYYY hh:mm:ss A'
					  )
					: ' ',
			Resolved_Date:
				issueTracker[i].Resolved_Time != null
					? moment(issueTracker[i].Resolved_Time).format(
							'DD/MM/YYYY hh:mm:ss A'
					  )
					: ' ',
			TAT: issueTracker[i].TAT != null ? issueTracker[i].TAT : ' ',
			Remark: issueTracker[i].Support_Comment
				? issueTracker[i].Support_Comment
				: ' ',
		};
		issueTrackerList.push(issueTrackerItem);
	}
	const dataset = issueTrackerList;

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
	res.attachment('IssueTracker.xlsx');
	return res.send(report);

	// if (issueTrackerList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: issueTrackerList,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});

// @desc get consumption report
// @route POST /api/excel/getConsumptionExportYTDAndMTD
// @access public
exports.getConsumptionExportYTDAndMTD = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [[{ value: 'YTD and MTD Report', style: styles.topHeader }]];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Department: {
			displayName: 'Department',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Location: {
			displayName: 'Location Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Item_Category: {
			displayName: 'Item Category',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Item_Code: {
			displayName: 'Item Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Item_Description: {
			displayName: 'Item Description',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Current_YTD_Qty: {
			displayName: 'Current YTD Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Current_YTD_Amt: {
			displayName: 'Current YTD Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Current_MTD_Qty: {
			displayName: 'Current MTD Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Current_MTD_Amt: {
			displayName: 'Current MTD Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Last_YTD_Qty: {
			displayName: 'Last YTD Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Last_YTD_Amt: {
			displayName: 'Last YTD Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Last_MTD_Qty: {
			displayName: 'Last MTD Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Last_MTD_Amt: {
			displayName: 'Last MTD Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
	};
	const userType = req.user.User_Type;
	// let condition = {};
	// let productCondition = '';
	// if (req.body.search != '') {
	// 	// condition = {Name:{ [Op.like]: `${req.body.search}%` }},
	// 	condition = {Name:{Op.like}}
	// 	// Challan_No: {
	// 	// 	[Op.like]: `${req.body.search}%`,
	// 	// },
	// }
	// let condition = {
	// 	Challan_No: {
	// 		[Op.like]: `${req.body.search}%`,
	// 	},
	// };
	// if (req.body.startDate != '' && req.body.endDate != '') {
	// 	condition.Dated_On = {
	// 		[Op.gte]: Date.parse(req.body.startDate),
	// 		[Op.lte]: Date.parse(req.body.endDate),
	// 	};
	// } else if (req.body.startDate != '') {
	// 	condition.Dated_On = {
	// 		[Op.gte]: Date.parse(req.body.startDate),
	// 	};
	// } else if (req.body.endDate != '') {
	// 	condition.Dated_On = {
	// 		[Op.lte]: Date.parse(req.body.endDate),
	// 	};
	// }

	// if (userType == process.env.IT) {
	// 	productCondition.Asset_Holder = process.env.DEPT_IT;
	// } else if (userType == process.env.ADMIN) {
	// 	productCondition.Asset_Holder = process.env.DEPT_ADMIN;
	// }
	// let locationCondition = '';
	// if (req.body.Location_Name != '') {
	// 	locationCondition = { Name: { [Op.eq]: `${req.body.Location_Name}` } };
	// }
	// let productCondition = '';
	// if (req.body.Department != '') {
	// 	productCondition = {
	// 		Asset_Holder: { [Op.eq]: `${req.body.Department}` },
	// 	};
	// }
	// let productCondition = '';
	// if (req.body.ALT_Code != '') {
	// 	productCondition = { ALT_Code: { [Op.eq]: `${req.body.ALT_Code}` } };
	// }
	// if (req.body.ALT_Code != '' && req.body.Product_Group != '') {
	// 	productCondition.Product_Group = { [Op.eq]: `${req.body.Product_Group}` };
	// }
	// if (!req.body.ALT_Code != '' && req.body.Product_Group != '') {
	// 	productCondition = {
	// 		Product_Group: { [Op.eq]: `${req.body.Product_Group}` },
	// 	};
	// }
	// if (req.body.Product_Name != '') {
	// 	productCondition.Name = { [Op.eq]: `${req.body.Product_Name}` };
	// }

	// let currentYear = moment().format('YYYY');
	// let previousYear = moment().subtract(1, 'year').format('YYYY');
	// let currentMonth = moment().format('M');
	// let previousMonth = moment().subtract(1, 'year').format('M');

	// let request = await db.asset_transaction.findAll({
	// 	group: [
	// 		'asset.Product_ID',
	// 		'asset.Current_Location',
	// 		'asset.Current_Department',
	// 	],
	// 	attributes: [
	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN (Type_Of_Issue = 'Office Transfer' OR Type_Of_Issue = 'Dept to Dept') AND YEAR(Dated_On) = '${currentYear}' THEN asset.Quantity ELSE 0 END)`
	// 			),
	// 			'Current_YTD_Qty',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN (Type_Of_Issue = 'Office Transfer' OR Type_Of_Issue = 'Dept to Dept') AND YEAR(Dated_On) = '${currentYear}' AND MONTH(Dated_On) = '${currentMonth}' THEN asset.Quantity ELSE 0 END)`
	// 			),
	// 			'Current_MTD_Qty',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN (Type_Of_Issue = 'Office Transfer' OR Type_Of_Issue = 'Dept to Dept') AND YEAR(Dated_On) = '${previousYear}' THEN asset.Quantity ELSE 0 END)`
	// 			),
	// 			'Last_YTD_Qty',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN (Type_Of_Issue = 'Office Transfer' OR Type_Of_Issue = 'Dept to Dept') AND YEAR(Dated_On) = '${previousYear}' AND MONTH(Dated_On) = '${previousMonth}' THEN asset.Quantity ELSE 0 END)`
	// 			),
	// 			'Last_MTD_Qty',
	// 		],

	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN (Type_Of_Issue = 'Office Transfer' OR Type_Of_Issue = 'Dept to Dept') AND YEAR(Dated_On) = '${currentYear}' THEN asset.Total_Price ELSE 0 END)`
	// 			),
	// 			'Current_YTD_Amt',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN (Type_Of_Issue = 'Office Transfer' OR Type_Of_Issue = 'Dept to Dept') AND YEAR(Dated_On) = '${currentYear}' AND MONTH(Dated_On) = '${currentMonth}' THEN asset.Total_Price ELSE 0 END)`
	// 			),
	// 			'Current_MTD_Amt',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN (Type_Of_Issue = 'Office Transfer' OR Type_Of_Issue = 'Dept to Dept') AND YEAR(Dated_On) = '${previousYear}' THEN asset.Total_Price ELSE 0 END)`
	// 			),
	// 			'Last_YTD_Amt',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN (Type_Of_Issue = 'Office Transfer' OR Type_Of_Issue = 'Dept to Dept') AND YEAR(Dated_On) = '${previousYear}' AND MONTH(Dated_On) = '${previousMonth}' THEN asset.Total_Price ELSE 0 END)`
	// 			),
	// 			'Last_MTD_Amt',
	// 		],
	// 	],
	// 	// [db.sequelize.fn('COUNT', 'Status'), 'StatusCount'],

	// 	// where: condition,

	// 	include: [
	// 		{
	// 			model: db.asset,
	// 			// as: 'asset_transaction',
	// 			attributes: ['ID', 'Current_Department'],
	// 			// required: true,
	// 			include: [
	// 				{ model: db.location, attributes: ['Name'] },
	// 				{
	// 					model: db.products,
	// 					attributes: [
	// 						'ID',
	// 						'ALT_Code',
	// 						'Name',
	// 						'Description',
	// 						'Product_Group',
	// 						'UOM',
	// 						'Price',
	// 						'Asset_Holder',
	// 					],
	// 					// where: productCondition,
	// 					// where: condition,
	// 				},
	// 			],
	// 		},
	// 	],

	// 	// raw: true,
	// });
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
				' GROUP BY `asset`.`Product_ID`, `asset`.`Current_Location`, `asset`.`Current_Department` ',
			{
				replacements: {
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

	console.log(consumptionYTDAndMTDData[0]);
	let consumptionYTDAndMTDDataList = [];
	let count = 1;
	for (let i = 0; i < consumptionYTDAndMTDData.length; i++) {
		// 	// 	// for (let j = 0; j < consumptionYTDAndMTDData[i].dataValues.assets.length; j++) {
		consumptionYTDAndMTDDataItem = {
			Sr_No: count,
			Department: consumptionYTDAndMTDData[i].Current_Department
				? consumptionYTDAndMTDData[i].Current_Department
				: ' ',
			Location: consumptionYTDAndMTDData[i].Location_Name
				? consumptionYTDAndMTDData[i].Location_Name
				: ' ',
			Item_Category: consumptionYTDAndMTDData[i].Product_Group
				? consumptionYTDAndMTDData[i].Product_Group
				: ' ',
			Item_Code: consumptionYTDAndMTDData[i].ALT_Code
				? consumptionYTDAndMTDData[i].ALT_Code
				: ' ',
			Item_Description: consumptionYTDAndMTDData[i].Description
				? consumptionYTDAndMTDData[i].Description
				: ' ',
			Current_YTD_Qty: consumptionYTDAndMTDData[i].Current_YTD_Qty
				? Number(consumptionYTDAndMTDData[i].Current_YTD_Qty)
				: 0,
			Current_YTD_Amt: consumptionYTDAndMTDData[i].Current_YTD_Amt
				? Number(consumptionYTDAndMTDData[i].Current_YTD_Amt)
				: 0,
			Current_MTD_Qty: consumptionYTDAndMTDData[i].Current_MTD_Qty
				? Number(consumptionYTDAndMTDData[i].Current_MTD_Qty)
				: 0,
			Current_MTD_Amt: consumptionYTDAndMTDData[i].Current_MTD_Amt
				? Number(consumptionYTDAndMTDData[i].Current_MTD_Amt)
				: 0,
			Last_YTD_Qty: consumptionYTDAndMTDData[i].Last_YTD_Qty
				? Number(consumptionYTDAndMTDData[i].Last_YTD_Qty)
				: 0,
			Last_YTD_Amt: consumptionYTDAndMTDData[i].Last_YTD_Amt
				? Number(consumptionYTDAndMTDData[i].Last_YTD_Amt)
				: 0,
			Last_MTD_Qty: consumptionYTDAndMTDData[i].Last_MTD_Qty
				? Number(consumptionYTDAndMTDData[i].Last_MTD_Qty)
				: 0,
			Last_MTD_Amt: consumptionYTDAndMTDData[i].Last_MTD_Amt
				? Number(consumptionYTDAndMTDData[i].Last_MTD_Amt)
				: 0,
		};
		consumptionYTDAndMTDDataList.push(consumptionYTDAndMTDDataItem);
		count = count + 1;
		// 	// 	// }
	}

	const dataset = consumptionYTDAndMTDDataList;

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
	res.attachment('YTDandMTD.xlsx');
	return res.send(report);

	// if (request) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: request,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
// @desc get issue tracker export excel
// @route POST /api/excel/getIssueTrackerExport
// @access public
exports.getItemWiseStockExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [
		[{ value: 'Item Wise Stock Report', style: styles.topHeader }],
	];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 50,
		},
		Item_Name: {
			displayName: 'Item Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Open_Qty: {
			displayName: 'Opening Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Open_Amount: {
			displayName: 'Opening Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Received_Qty: {
			displayName: 'Received Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Received_Amount: {
			displayName: 'Received Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Issue_Qty: {
			displayName: 'Issue Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Issue_Amount: {
			displayName: 'Issue Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Scrap_Lost_Qty: {
			displayName: 'Scrap/Lost Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Scrap_Lost_Amount: {
			displayName: 'Scrap/Lost Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Closing_Qty: {
			displayName: 'Closing Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Closing_Amount: {
			displayName: 'Closing Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
	};
	const userType = req.user.User_Type;
	let condition = ' and `asset`.`Created_At` <= CURDATE()';
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

	// const itemStock = await db.sequelize
	// 	.query(
	// 		'SELECT `item_stock`.`ID`, `item_stock`.`Dated_On`, `item_stock`.`Price`, `item_stock`.`Opening_Quantity`,' +
	// 			' `item_stock`.`Opening_Amount`, `item_stock`.`Received_Quantity`, `item_stock`.`Received_Amount`,`item_stock`.`Returned_Quantity`,`item_stock`.`Returned_Amount`,' +
	// 			' `item_stock`.`Issue_Quantity`, `item_stock`.`Issue_Amount`, `item_stock`.`Closing_Quantity`,`item_stock`.`Closing_Amount`,`item_stock`.`Scrap_Lost_Quantity`,`item_stock`.`Scrap_Lost_Amount`,' +
	// 			' `product`.`ID` AS `product_ID`, `product`.`Name` AS `product_Name` FROM `item_stocks` AS `item_stock`' +
	// 			' LEFT OUTER JOIN `products` AS `product` ON `item_stock`.`Product_ID` = `product`.`ID`' +
	// 			' AND (`product`.`Deleted_At` IS NULL) WHERE (`item_stock`.`Deleted_At` IS NULL)' +
	// 			condition +
	// 			'Order By Dated_On desc,`item_stock`.`ID` DESC',
	// 		{
	// 			replacements: {
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

	const itemStock = await db.sequelize
		.query(
			' SELECT "0" As `Opening_Quantity`,"0.00" AS `Opening_Amount`,Product_ID,Current_Department,`product`.`Category` AS `product_Category`,SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN 1 ELSE 0 END) AS `Received_Quantity`,' +
				' SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN Total_Price ELSE 0 END) AS `Received_Amount`,' +
				' SUM(CASE WHEN Status = "Assigned" THEN 1 ELSE 0 END) AS `Issue_Quantity`, ' +
				' SUM(CASE WHEN Status = "Assigned" THEN Total_Price ELSE 0 END) AS `Issue_Amount`,' +
				' SUM(CASE WHEN Status = "Scrap" OR Status = "Lost" THEN 1 ELSE 0 END) AS `Scrap_Lost_Quantity`,' +
				' SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") THEN Total_Price ELSE 0 END) AS `Scrap_Lost_Amount`,' +
				' SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN 1 ELSE 0 END) - SUM(CASE WHEN Status = "Assigned" THEN 1 ELSE 0 END)' +
				' - SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") THEN 1 ELSE -0 END)  AS `Closing_Quantity`,' +
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

	let itemStockList = [];
	let count = 1;
	for (let i = 0; i < itemStock.length; i++) {
		stockItems = {
			Sr_No: count,
			// Date: moment(itemStock[i].Dated_On).format('DD-MM-YYYY'),
			Item_Name: itemStock[i].product_Name,
			Open_Qty: Number(itemStock[i].Opening_Quantity),
			Open_Amount: Number(itemStock[i].Opening_Amount),
			Received_Qty: Number(itemStock[i].Received_Quantity),
			Received_Amount: Number(itemStock[i].Received_Amount),
			Issue_Qty: Number(itemStock[i].Issue_Quantity),
			Issue_Amount: Number(itemStock[i].Issue_Amount),
			Scrap_Lost_Qty: Number(itemStock[i].Scrap_Lost_Quantity),
			Scrap_Lost_Amount: Number(itemStock[i].Scrap_Lost_Amount),
			Closing_Qty: Number(itemStock[i].Closing_Quantity),
			Closing_Amount: Number(itemStock[i].Closing_Amount),
		};
		itemStockList.push(stockItems);
		count = count + 1;
	}
	console.log(itemStockList);
	const dataset = itemStockList;

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
	res.attachment('item stock report.xlsx');
	return res.send(report);

	// let itemStock = await db.asset.findAll({
	// 	// where: condition,

	// 	attributes: [
	// 		[
	// 			db.Sequelize.literal(
	// 				'SUM(CASE WHEN Status = "Unassigned" THEN 1 ELSE 0 END)'
	// 			),
	// 			'Received_Quantity',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				'SUM(CASE WHEN Status = "Unassigned" THEN Total_Price ELSE 0 END)'
	// 			),
	// 			'Received_Amount',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				'SUM(CASE WHEN Status = "Assigned" THEN 1 ELSE 0 END)'
	// 			),
	// 			'Issue_Quantity',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				'SUM(CASE WHEN Status = "Assigned" THEN Total_Price ELSE 0 END)'
	// 			),
	// 			'Issue_Amount',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				'SUM(CASE WHEN Status = "Scrap" OR Status = "Lost" THEN 1 ELSE 0 END)'
	// 			),
	// 			'Scrap_Lost_Quantity',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				'SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") THEN Total_Price ELSE 0 END)'
	// 			),
	// 			'Scrap_Lost_Amount',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				'SUM(CASE WHEN Status = "Unassigned" THEN 1 ELSE 0 END) - SUM(CASE WHEN Status = "Assigned" THEN 1 ELSE 0 END) - SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") THEN 1 ELSE 0 END) '
	// 			),
	// 			'Closing_Quantity',
	// 		],
	// 		[
	// 			db.Sequelize.literal(
	// 				'SUM(CASE WHEN Status = "Unassigned" THEN Total_Price ELSE 0 END) - SUM(CASE WHEN Status = "Assigned" THEN Total_Price ELSE 0 END) - SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") THEN Total_Price ELSE 0 END) '
	// 			),
	// 			'Closing_Amount',
	// 		],
	// 	],

	// 	include: [
	// 		{
	// 			model: db.products,
	// 			attributes: ['Name'],
	// 		},
	// 		{
	// 			model: db.location,
	// 			attributes: ['Name'],
	// 		},
	// 	],
	// 	group: ['Product_ID'],
	// 	// raw: true,
	// 	// order: ['Request_Number'],
	// });
	// if (itemStock) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: itemStock,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});

// @desc get product issue ledger export excel
// @route POST /api/excel/getProductStockLedgerExport
// @access public
// exports.getProductStockLedgerExport = asyncHandler(async (req, res, next) => {
// 	const styles = stylesData();
// 	const heading = [
// 		[{ value: 'Product Stock Ledger Report', style: styles.topHeader }],
// 	];

// 	const specification = {
// 		Sr_No: {
// 			displayName: 'Sr No',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellBorder,
// 			width: 50,
// 		},
// 		Voucher_No: {
// 			displayName: 'Voucher No',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellBorder,
// 			width: 150,
// 		},
// 		Date: {
// 			displayName: 'Date',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellDate,
// 			width: 150,
// 		},
// 		Department: {
// 			displayName: 'Department',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellBorder,
// 			width: 150,
// 		},
// 		Item_Name: {
// 			displayName: 'Item Name',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellBorder,
// 			width: 150,
// 		},
// 		Open_Qty: {
// 			displayName: 'Opening Quantity',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellInteger,
// 			width: 150,
// 		},
// 		Open_Amount: {
// 			displayName: 'Opening Amount',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellDecimal,
// 			width: 150,
// 		},
// 		Received_Qty: {
// 			displayName: 'Received Quantity',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellInteger,
// 			width: 150,
// 		},
// 		Received_Amount: {
// 			displayName: 'Received Amount',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellDecimal,
// 			width: 150,
// 		},
// 		Issue_Qty: {
// 			displayName: 'Issue Quantity',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellInteger,
// 			width: 150,
// 		},
// 		Issue_Amount: {
// 			displayName: 'Issue Amount',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellDecimal,
// 			width: 150,
// 		},
// 		Closing_Qty: {
// 			displayName: 'Closing Quantity',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellInteger,
// 			width: 150,
// 		},
// 		Closing_Amount: {
// 			displayName: 'Closing Amount',
// 			headerStyle: styles.tableHeader,
// 			cellStyle: styles.cellDecimal,
// 			width: 150,
// 		},
// 	};
// 	const userType = req.user.User_Type;
// 	let condition = '';
// 	let openingCondition = '';
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
// 		// condition += 'and `Dated_On` >= CURDATE() ';
// 		// openingCondition += ' `product_stock_ledger`.`Dated_On` < curdate() ';
// 		condition += 'and `Dated_On` >= "1970-01-01" ';
// 		openingCondition += ' `product_stock_ledger`.`Dated_On` <= "1970-01-01" ';
// 		productCondition = {
// 			Name: {
// 				[Op.eq]: `${req.body.search}`,
// 			},
// 		};
// 		// otherCondition = {
// 		// 	Dated_On: {
// 		// 		[Op.lt]: new Date(),
// 		// 	},
// 		// };
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

// 	// if (req.body.startDate != '' && req.body.endDate != '') {
// 	// 	condition +=
// 	// 		' and Dated_On >= "' +
// 	// 		req.body.startDate +
// 	// 		'" and Dated_On <= "' +
// 	// 		req.body.endDate +
// 	// 		'"';
// 	// } else if (req.body.startDate != '') {
// 	// 	condition += ' and Dated_On >= "' + req.body.startDate + '"';
// 	// } else if (req.body.endDate != '') {
// 	// 	condition += ' and Dated_On <= "' + req.body.endDate + '"';
// 	// }

// 	// if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
// 	// 	condition +=
// 	// 		' and `product`.`Asset_Holder` = "' + process.env.DEPT_IT + '"';
// 	// } else if (
// 	// 	userType == process.env.ADMIN_SYSTEM_ADMIN ||
// 	// 	userType == process.env.ADMIN
// 	// ) {
// 	// 	condition +=
// 	// 		' and`product`.`Asset_Holder` = "' + process.env.DEPT_ADMIN + '"';
// 	// }

// 	// const itemStock = await db.sequelize
// 	// 	.query(
// 	// 		' SELECT "0" As `Opening_Quantity`,"0.00" AS `Opening_Amount`,Product_ID,Current_Department,`product`.`Category` AS `product_Category`,SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN 1 ELSE 0 END) AS `Received_Quantity`,' +
// 	// 			' SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN Total_Price ELSE 0 END) AS `Received_Amount`,' +
// 	// 			' SUM(CASE WHEN Status = "Assigned" THEN 1 ELSE 0 END) AS `Issue_Quantity`, ' +
// 	// 			' SUM(CASE WHEN Status = "Assigned" THEN Total_Price ELSE 0 END) AS `Issue_Amount`,' +
// 	// 			' SUM(CASE WHEN Status = "Scrap" OR Status = "Lost" THEN 1 ELSE 0 END) AS `Scrap_Lost_Quantity`,' +
// 	// 			' SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") THEN Total_Price ELSE 0 END) AS `Scrap_Lost_Amount`,' +
// 	// 			' SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN 1 ELSE 0 END) - SUM(CASE WHEN Status = "Assigned" THEN 1 ELSE 0 END)' +
// 	// 			' - SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") THEN 1 ELSE -0 END)  AS `Closing_Quantity`,' +
// 	// 			' SUM(CASE WHEN (Status = "Unassigned" OR Status = "Assigned" OR Status = "Repair" OR Status = "Scrap" OR Status = "Lost" OR Status = "Return")  THEN Total_Price ELSE 0 END) - SUM(CASE WHEN Status = "Assigned" ' +
// 	// 			' THEN Total_Price ELSE 0 END) - SUM(CASE WHEN (Status = "Scrap" OR Status = "Lost") ' +
// 	// 			' THEN Total_Price ELSE 0 END)  AS `Closing_Amount`, `product`.`ID` AS `product.ID`,' +
// 	// 			' `product`.`Name` AS `product_Name`, `location`.`ID` AS `location.ID`, `location`.`Name` AS `location_Name`' +
// 	// 			' FROM `assets` AS `asset` LEFT OUTER JOIN `products` AS `product` ON ' +
// 	// 			' `asset`.`Product_ID` = `product`.`ID` AND (`product`.`Deleted_At` IS NULL)' +
// 	// 			' LEFT OUTER JOIN `location` AS `location` ON `asset`.`Current_Location` = `location`.`ID`' +
// 	// 			' AND (`location`.`Deleted_At` IS NULL) WHERE (`asset`.`Deleted_At` IS NULL)' +
// 	// 			condition +
// 	// 			'GROUP BY `Product_ID`',
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

// 	// let itemStockList = [];
// 	// let count = 1;
// 	// for (let i = 0; i < itemStock.length; i++) {
// 	// 	stockItems = {
// 	// 		Sr_No: count,
// 	// 		// Date: moment(itemStock[i].Dated_On).format('DD-MM-YYYY'),
// 	// 		Item_Name: itemStock[i].product_Name,
// 	// 		Open_Qty: Number(itemStock[i].Opening_Quantity),
// 	// 		Open_Amount: Number(itemStock[i].Opening_Amount),
// 	// 		Received_Qty: Number(itemStock[i].Received_Quantity),
// 	// 		Received_Amount: Number(itemStock[i].Received_Amount),
// 	// 		Issue_Qty: Number(itemStock[i].Issue_Quantity),
// 	// 		Issue_Amount: Number(itemStock[i].Issue_Amount),
// 	// 		Scrap_Lost_Qty: Number(itemStock[i].Scrap_Lost_Quantity),
// 	// 		Scrap_Lost_Amount: Number(itemStock[i].Scrap_Lost_Amount),
// 	// 		Closing_Qty: Number(itemStock[i].Closing_Quantity),
// 	// 		Closing_Amount: Number(itemStock[i].Closing_Amount),
// 	// 	};
// 	// 	itemStockList.push(stockItems);
// 	// 	count = count + 1;
// 	// }
// 	// console.log(itemStockList);
// 	// const dataset = itemStockList;

// 	// const merges = [
// 	// 	{
// 	// 		start: { row: 1, column: 1 },
// 	// 		end: { row: 1, column: Object.keys(specification).length },
// 	// 	},
// 	// ];

// 	// const report = excel.buildExport([
// 	// 	{
// 	// 		name: 'Report',
// 	// 		heading: heading,
// 	// 		merges: merges,
// 	// 		specification: specification,
// 	// 		data: dataset,
// 	// 	},
// 	// ]);
// 	// res.attachment('item stock report.xlsx');
// 	// return res.send(report);

// 	// const prodoctStockLedgerData1 = await db.sequelize
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
// 	// let prodoctStockLedgerData1 = await db.product_stock_ledger.findAll({
// 	// 	where: otherCondition,
// 	// 	order: [['ID', 'DESC']],
// 	// 	limit: 1,
// 	// 	attributes: [
// 	// 		// [
// 	// 		// 	db.Sequelize.literal(
// 	// 		// 		'SUM(CASE WHEN Status = "Unassigned" THEN 1 ELSE 0 END)'
// 	// 		// 	),
// 	// 		// 	'Received_Quantity',
// 	// 		// ],
// 	// 		['Closing_Quantity', 'Opening_Quantity'],
// 	// 		[
// 	// 			db.Sequelize.literal(
// 	// 				'(select SUM(Closing_Amount)  FROM `product_stock_ledgers` AS `product_stock_ledger` ' +
// 	// 					' INNER JOIN `products` AS `product` ON `product_stock_ledger`.`Product_ID` = ' +
// 	// 					' `product`.`ID` AND (`product`.`Deleted_At` IS NULL AND `product`.`Name` ' +
// 	// 					' = "' +
// 	// 					req.body.search +
// 	// 					'") WHERE (`product_stock_ledger`.`Deleted_At` IS NULL AND ' +
// 	// 					' `product_stock_ledger`.`Dated_On` < curdate() OR `product_stock_ledger`.`Dated_On` < "' +
// 	// 					req.body.startDate +
// 	// 					'") )'
// 	// 			),
// 	// 			'Received_Quantity',
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
// 				condition,
// 			{
// 				replacements: {
// 					// limit: limit,
// 					// offset: offset,
// 					// search: '%' + req.body.search + '%',
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
// 	const openingData = await db.product_stock_ledger.findAll({
// 		where: otherCondition,
// 		order: [['ID', 'DESC']],
// 		limit: 1,
// 		attributes: [
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
// 		],
// 		include: [
// 			{
// 				model: db.products,
// 				where: productCondition,
// 				attributes: ['Name'],
// 			},
// 		],
// 	});
// 	let totalData = await db.product_stock_ledger.findAll({
// 		where: {
// 			Deleted_At: {
// 				[Op.eq]: null,
// 			},
// 		},
// 		order: [['ID', 'DESC']],
// 		limit: 1,
// 		attributes: [
// 			[
// 				db.Sequelize.literal(
// 					'(SELECT SUM(`product_stock_ledger`.`Received_Quantity`) FROM `product_stock_ledgers`' +
// 						' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 						'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 						condition +
// 						' )'
// 				),
// 				'Received_Quantity',
// 			],
// 			[
// 				db.Sequelize.literal(
// 					'(SELECT SUM(`product_stock_ledger`.`Received_Amount`) FROM `product_stock_ledgers`' +
// 						' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 						'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 						condition +
// 						' )'
// 				),
// 				'Received_Amount',
// 			],
// 			[
// 				db.Sequelize.literal(
// 					'(SELECT SUM(`product_stock_ledger`.`Issue_Quantity`)  FROM `product_stock_ledgers`' +
// 						' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 						'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 						condition +
// 						' )'
// 				),
// 				'Issue_Quantity',
// 			],
// 			[
// 				db.Sequelize.literal(
// 					'(SELECT SUM(`product_stock_ledger`.`Issue_Amount`)  FROM `product_stock_ledgers`' +
// 						' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 						'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 						condition +
// 						' )'
// 				),
// 				'Issue_Amount',
// 			],
// 			[
// 				db.Sequelize.literal(
// 					'(SELECT `product_stock_ledger`.`Closing_Quantity` ' +
// 						' FROM `product_stock_ledgers` AS `product_stock_ledger` LEFT JOIN `products` AS ' +
// 						' `product` ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE ' +
// 						' (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 						condition +
// 						'Order by `product_stock_ledger`.`ID` DESC limit 1)'
// 				),
// 				'Overall_Closing_Quantity',
// 			],
// 			[
// 				db.Sequelize.literal(
// 					'(SELECT SUM(`product_stock_ledger`.`Closing_Amount`)  FROM `product_stock_ledgers`' +
// 						' AS `product_stock_ledger` LEFT JOIN `products` AS `product` ' +
// 						'ON `product_stock_ledger`.`Product_ID` = `product`.`ID` WHERE (`product_stock_ledger`.`Deleted_At` IS NULL) ' +
// 						condition +
// 						' )'
// 				),
// 				'Closing_Amount',
// 			],
// 		],
// 		// include: [
// 		// 	{
// 		// 		model: db.products,
// 		// 		where: productCondition,
// 		// 		attributes: ['Name'],
// 		// 	},
// 		// ],
// 	});
// 	let openDataList = [];
// 	for (let i = 0; i < prodoctStockLedgerData.length; i++) {
// 		if (i == 0) {
// 			prodoctStockLedgerData[0].open = openingData;
// 			openDataList = prodoctStockLedgerData[0].open;
// 		} else {
// 			prodoctStockLedgerData[i].open = [];
// 		}
// 	}
// 	// stockData = prodoctStockLedgerData.concat(openingData);
// 	//  openDataList = prodoctStockLedgerData[0].open;
// 	let openingQuantity;
// 	let openingAmount = 0.0;
// 	if (openDataList.length > 0) {
// 		openingQuantity = openingData[0].dataValues.Opening_Quantity;
// 		openingAmount = openingData[0].dataValues.Opening_Amount;
// 	}
// 	let prodoctStockLedgerDataList = [];
// 	let count = 1;
// 	for (let i = 0; i < prodoctStockLedgerData.length; i++) {
// 		let openData = prodoctStockLedgerData[i].open;

// 		stockItems = {
// 			Sr_No: count,
// 			// Date: moment(itemStock[i].Dated_On).format('DD-MM-YYYY'),
// 			Voucher_No: prodoctStockLedgerData[i].Voucher_No,
// 			Date: moment(prodoctStockLedgerData[i].Dated_On).format('DD-MM-YYYY'),
// 			Department: prodoctStockLedgerData[i].Department
// 				? prodoctStockLedgerData[i].Department
// 				: ' ',
// 			Item_Name: prodoctStockLedgerData[i].Item_Name,
// 			Open_Qty: openData.length > 0 ? Number(openingQuantity) : 0,
// 			// Open_Qty: Number(prodoctStockLedgerData[i].Opening_Quantity)
// 			// 	? Number(prodoctStockLedgerData[i].Opening_Quantity)
// 			// 	: 0.0,
// 			Open_Amount: openData.length > 0 ? Number(openingAmount) : 0.0,
// 			Received_Qty: Number(prodoctStockLedgerData[i].Received_Quantity)
// 				? Number(prodoctStockLedgerData[i].Received_Quantity)
// 				: 0,
// 			Received_Amount: Number(prodoctStockLedgerData[i].Received_Amount)
// 				? Number(prodoctStockLedgerData[i].Received_Amount)
// 				: 0.0,
// 			Issue_Qty: Number(prodoctStockLedgerData[i].Issue_Quantity)
// 				? Number(prodoctStockLedgerData[i].Issue_Quantity)
// 				: 0,
// 			Issue_Amount: Number(prodoctStockLedgerData[i].Issue_Amount)
// 				? Number(prodoctStockLedgerData[i].Issue_Amount)
// 				: 0.0,
// 			Closing_Qty: Number(prodoctStockLedgerData[i].Closing_Quantity)
// 				? Number(prodoctStockLedgerData[i].Closing_Quantity)
// 				: 0,
// 			Closing_Amount: Number(prodoctStockLedgerData[i].Closing_Amount)
// 				? Number(prodoctStockLedgerData[i].Closing_Amount)
// 				: 0.0,
// 		};
// 		prodoctStockLedgerDataList.push(stockItems);
// 		count = count + 1;
// 	}
// 	let totalReceivedAmount = Number(totalData[0].Received_Amount)
// 		? Number(totalData[0].Received_Amount)
// 		: 0.0;
// 	let totalIssueAmount = Number(totalData[0].Issue_Amount)
// 		? Number(totalData[0].Issue_Amount)
// 		: 0.0;
// 	let overallClosingQuantity =
// 		openingAmount + totalReceivedAmount - totalIssueAmount;

// 	stockItems = {
// 		Sr_No: 'TOTAL',
// 		// Date: moment(itemStock[i].Dated_On).format('DD-MM-YYYY'),
// 		Voucher_No: ' ',
// 		Date: ' ',
// 		Department: ' ',
// 		Item_Name: ' ',
// 		Open_Qty: openDataList.length > 0 ? Number(openingQuantity) : 0,
// 		// Open_Qty: Number(prodoctStockLedgerData[i].Opening_Quantity)
// 		// 	? Number(prodoctStockLedgerData[i].Opening_Quantity)
// 		// 	: 0.0,
// 		Open_Amount: openDataList.length > 0 ? Number(openingAmount) : 0.0,
// 		Received_Qty: Number(totalData[0].Received_Quantity)
// 			? Number(totalData[0].Received_Quantity)
// 			: 0,
// 		Received_Amount: totalData[0].Received_Amount
// 			? totalData[0].Received_Amount
// 			: 0.0,
// 		Issue_Qty: Number(totalData[0].Issue_Quantity)
// 			? Number(totalData[0].Issue_Quantity)
// 			: 0,
// 		Issue_Amount: totalData[0].Issue_Amount ? totalData[0].Issue_Amount : 0.0,
// 		Closing_Qty:
// 			Number(totalData[0].dataValues.Overall_Closing_Quantity) != null
// 				? Number(totalData[0].dataValues.Overall_Closing_Quantity)
// 				: 0,
// 		Closing_Amount:
// 			Number(overallClosingQuantity) != null
// 				? Number(overallClosingQuantity)
// 				: 0,
// 	};
// 	prodoctStockLedgerDataList.push(stockItems);

// 	// const dataset = prodoctStockLedgerDataList;

// 	// const merges = [
// 	// 	{
// 	// 		start: { row: 1, column: 1 },
// 	// 		end: { row: 1, column: Object.keys(specification).length },
// 	// 	},
// 	// ];

// 	// const report = excel.buildExport([
// 	// 	{
// 	// 		name: 'Report',
// 	// 		heading: heading,
// 	// 		merges: merges,
// 	// 		specification: specification,
// 	// 		data: dataset,
// 	// 	},
// 	// ]);
// 	// res.attachment('product stock ledger.xlsx');
// 	// return res.send(report);

// 	if (prodoctStockLedgerDataList) {
// 		res.status(200).json({
// 			success: true,
// 			data: prodoctStockLedgerDataList,
// 			// data: prodoctStockLedgerData,
// 		});
// 	} else {
// 		res.status(200).json({
// 			success: true,
// 			data: [],
// 		});
// 	}
// });
// @desc get product issue ledger export excel
// @route POST /api/excel/getProductStockLedgerExport
// @access public
exports.getProductStockLedgerExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [
		[{ value: 'Product Stock Ledger Report', style: styles.topHeader }],
	];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 50,
		},
		Voucher_No: {
			displayName: 'Voucher No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Date: {
			displayName: 'Date',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 150,
		},
		Department: {
			displayName: 'Department',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Item_Name: {
			displayName: 'Item Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Open_Qty: {
			displayName: 'Opening Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Open_Amount: {
			displayName: 'Opening Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Received_Qty: {
			displayName: 'Received Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Received_Amount: {
			displayName: 'Received Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Issue_Qty: {
			displayName: 'Issue Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Issue_Amount: {
			displayName: 'Issue Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Closing_Qty: {
			displayName: 'Closing Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Closing_Amount: {
			displayName: 'Closing Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
	};
	const userType = req.user.User_Type;
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

	const prodoctStockLedgerData = await db.sequelize
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
				' GROUP BY `asset_transactions`.`Dispatch_ID` ORDER By Created_At',

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

	let openDataList = [];

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
				let ClosingQuantity =
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
	openDataList.push({
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
	for (let i = 0; i < prodoctStockLedgerData.length; i++) {
		let VoucherNo = prodoctStockLedgerData[i].Voucher_No;
		if (i == 0 && VoucherNo.includes(process.env.PREFIX)) {
			prodoctStockLedgerData[i].Received_Quantity = 0;
			prodoctStockLedgerData[i].Received_Amount = 0;
			prodoctStockLedgerData[i].Issue_Quantity = parseInt(
				prodoctStockLedgerData[i].Quantity
			);
			prodoctStockLedgerData[i].Issue_Amount = parseFloat(
				prodoctStockLedgerData[i].Amount
			);
			prodoctStockLedgerData[i].Closing_Quantity =
				closingQuantity > 0
					? closingQuantity - parseInt(prodoctStockLedgerData[i].Quantity)
					: parseInt(prodoctStockLedgerData[i].Quantity);
			prodoctStockLedgerData[i].Closing_Amount =
				-prodoctStockLedgerData[i].Closing_Amount;

			overallIssueQuantity += parseInt(prodoctStockLedgerData[i].Quantity);
			overallIssueAmount += parseFloat(prodoctStockLedgerData[i].Amount);
			overallClosingQuantity =
				closingQuantity > 0
					? closingQuantity - parseInt(prodoctStockLedgerData[i].Quantity)
					: parseInt(prodoctStockLedgerData[i].Quantity);
			overallClosingAmount -= parseFloat(prodoctStockLedgerData[i].Amount);
		} else if (i == 0) {
			prodoctStockLedgerData[i].Received_Quantity = parseInt(
				prodoctStockLedgerData[i].Quantity
			);
			prodoctStockLedgerData[i].Received_Amount = parseFloat(
				prodoctStockLedgerData[i].Amount
			);
			prodoctStockLedgerData[i].Issue_Quantity = 0;
			prodoctStockLedgerData[i].Issue_Amount = 0;
			prodoctStockLedgerData[i].Closing_Quantity =
				closingQuantity > 0
					? closingQuantity + parseInt(prodoctStockLedgerData[i].Quantity)
					: parseInt(prodoctStockLedgerData[i].Quantity);
			prodoctStockLedgerData[i].Closing_Amount =
				prodoctStockLedgerData[i].Closing_Amount;

			overallReceivedQuantity += parseInt(prodoctStockLedgerData[i].Quantity);
			overallReceivedAmount += parseFloat(prodoctStockLedgerData[i].Amount);
			overallClosingQuantity =
				closingQuantity > 0
					? closingQuantity - parseInt(prodoctStockLedgerData[i].Quantity)
					: parseInt(prodoctStockLedgerData[i].Quantity);
			overallClosingAmount += parseFloat(prodoctStockLedgerData[i].Amount);
		} else if (VoucherNo.includes(process.env.PREFIX)) {
			let issueQuantity = parseInt(prodoctStockLedgerData[i].Quantity);
			let issueAmount = parseFloat(prodoctStockLedgerData[i].Amount);
			let ClosingQuantity =
				parseInt(prodoctStockLedgerData[i - 1].Closing_Quantity) -
				parseInt(prodoctStockLedgerData[i].Quantity);

			prodoctStockLedgerData[i].Received_Quantity = 0;
			prodoctStockLedgerData[i].Received_Amount = 0.0;
			prodoctStockLedgerData[i].Issue_Quantity = issueQuantity;
			prodoctStockLedgerData[i].Issue_Amount = issueAmount;
			prodoctStockLedgerData[i].Closing_Quantity = ClosingQuantity;
			prodoctStockLedgerData[i].Closing_Amount =
				-prodoctStockLedgerData[i].Closing_Amount;

			overallIssueQuantity += parseInt(prodoctStockLedgerData[i].Quantity);
			overallIssueAmount += parseFloat(prodoctStockLedgerData[i].Amount);
			overallClosingQuantity = ClosingQuantity;
			overallClosingAmount -= parseFloat(prodoctStockLedgerData[i].Amount);
		} else {
			let receivedQuantity = parseInt(prodoctStockLedgerData[i].Quantity);
			let receivedAmount = parseFloat(prodoctStockLedgerData[i].Amount);
			let ClosingQuantity =
				parseInt(prodoctStockLedgerData[i - 1].Closing_Quantity) +
				parseInt(prodoctStockLedgerData[i].Quantity);

			prodoctStockLedgerData[i].Received_Quantity = receivedQuantity;
			prodoctStockLedgerData[i].Received_Amount = receivedAmount;
			prodoctStockLedgerData[i].Issue_Quantity = 0;
			prodoctStockLedgerData[i].Issue_Amount = 0;
			prodoctStockLedgerData[i].Closing_Quantity = ClosingQuantity;

			overallReceivedQuantity += parseInt(prodoctStockLedgerData[i].Quantity);
			overallReceivedAmount += parseFloat(prodoctStockLedgerData[i].Amount);
			overallClosingQuantity = ClosingQuantity;
			overallClosingAmount += parseFloat(prodoctStockLedgerData[i].Amount);
		}
	}

	for (let k = 0; k < prodoctStockLedgerData.length; k++) {
		if (k == 0 && flag == true) {
			// prodoctStockLedgerData[0].open = openingData;
			prodoctStockLedgerData[k].open = [];
			// openDataList = prodoctStockLedgerData[0].open;
		} else {
			prodoctStockLedgerData[k].open = [];
		}
	}
	// stockData = prodoctStockLedgerData.concat(openingData);
	//  openDataList = prodoctStockLedgerData[0].open;
	let openingQuantity;
	let openingAmount = 0.0;
	if (openDataList.length > 0) {
		openingQuantity = openDataList[0].Opening_Quantity;
		openingAmount = openDataList[0].Opening_Amount;
	}

	let prodoctStockLedgerDataList = [];
	let count = 1;
	for (let i = 0; i < prodoctStockLedgerData.length; i++) {
		let openData = prodoctStockLedgerData[i].open;

		stockItems = {
			Sr_No: count,
			// Date: moment(itemStock[i].Dated_On).format('DD-MM-YYYY'),
			Voucher_No: prodoctStockLedgerData[i].Voucher_No,
			Date: moment(prodoctStockLedgerData[i].Dated_On).format('DD-MM-YYYY'),
			Department: prodoctStockLedgerData[i].Department
				? prodoctStockLedgerData[i].Department
				: ' ',
			Item_Name: prodoctStockLedgerData[i].Item_Name,
			Open_Qty: openData.length > 0 ? Number(openingQuantity) : 0,
			// Open_Qty: Number(prodoctStockLedgerData[i].Opening_Quantity)
			// 	? Number(prodoctStockLedgerData[i].Opening_Quantity)
			// 	: 0.0,
			Open_Amount: openData.length > 0 ? Number(openingAmount) : 0.0,
			Received_Qty: Number(prodoctStockLedgerData[i].Received_Quantity)
				? Number(prodoctStockLedgerData[i].Received_Quantity)
				: 0,
			Received_Amount: Number(prodoctStockLedgerData[i].Received_Amount)
				? Number(prodoctStockLedgerData[i].Received_Amount)
				: 0.0,
			Issue_Qty: Number(prodoctStockLedgerData[i].Issue_Quantity)
				? Number(prodoctStockLedgerData[i].Issue_Quantity)
				: 0,
			Issue_Amount: Number(prodoctStockLedgerData[i].Issue_Amount)
				? Number(prodoctStockLedgerData[i].Issue_Amount)
				: 0.0,
			Closing_Qty: Number(prodoctStockLedgerData[i].Closing_Quantity)
				? Number(prodoctStockLedgerData[i].Closing_Quantity)
				: 0,
			Closing_Amount: Number(prodoctStockLedgerData[i].Closing_Amount)
				? Number(prodoctStockLedgerData[i].Closing_Amount)
				: 0.0,
		};
		prodoctStockLedgerDataList.push(stockItems);
		count = count + 1;
	}

	stockItems = {
		Sr_No: 'TOTAL',
		// Date: moment(itemStock[i].Dated_On).format('DD-MM-YYYY'),
		Voucher_No: ' ',
		Date: ' ',
		Department: ' ',
		Item_Name: ' ',
		Open_Qty: openDataList.length > 0 ? Number(openingQuantity) : 0,
		// Open_Qty: Number(prodoctStockLedgerData[i].Opening_Quantity)
		// 	? Number(prodoctStockLedgerData[i].Opening_Quantity)
		// 	: 0.0,
		Open_Amount: openDataList.length > 0 ? Number(openingAmount) : 0.0,
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
			openDataList.length > 0
				? Number(openingAmount) + overallReceivedAmount - overallIssueAmount
				: overallReceivedAmount - overallIssueAmount,
		// Closing_Amount:
		// 	Number(overallClosingAmount) != null ? Number(overallClosingAmount) : 0,
	};
	prodoctStockLedgerDataList.push(stockItems);
	console.log('hi====', prodoctStockLedgerDataList);

	const dataset = prodoctStockLedgerDataList;

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
	res.attachment('product stock ledger.xlsx');
	return res.send(report);

	// if (prodoctStockLedgerDataList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: prodoctStockLedgerDataList,
	// 		// data: prodoctStockLedgerData,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});

// @desc get product issue ledger export excel
// @route POST /api/excel/getProductStockLedgerExport
// @access public
exports.getCapexExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [[{ value: 'CAPEX Report', style: styles.topHeader }]];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 50,
		},
		Name: {
			displayName: 'Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Barcode: {
			displayName: 'Barcode',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Manufacturer: {
			displayName: 'Manufacturer',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Serial_Number: {
			displayName: 'Serial Number',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Model: {
			displayName: 'Model',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		AMC_Expiry: {
			displayName: 'AMC Expiry',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 150,
		},
		AMC_Vendor: {
			displayName: 'AMC Vendor',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Product_Expiry: {
			displayName: 'Product Warranty',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 150,
		},
		Status: {
			displayName: 'Status',
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
			displayName: 'Department (Cost Center)',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Remark: {
			displayName: 'Remark',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		User_Name: {
			displayName: 'User Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
	};

	const userType = req.user.User_Type;
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

	const assetItems = await db.asset.findAll({
		where: condition,
		attributes: [
			'ID',
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
				attributes: ['Name'],
				where: innerCondition,
			},
			{
				model: db.location,
				attributes: ['Name'],
				where: innerCondition2,
			},
			{
				model: db.asset_transaction,
				attributes: ['User_Name', 'Remark'],
			},
		],
	});
	console.log('assetItems==', assetItems);

	let assetItemsList = [];
	let count = 1;
	for (let i = 0; i < assetItems.length; i++) {
		let assetTransactions = assetItems[i].asset_transactions;
		console.log('assetTransactions=====', assetTransactions.length);
		if (assetTransactions.length > 0) {
			for (let j = 0; j < assetTransactions.length; j++) {
				stockItems = {
					Sr_No: count,
					// Date: moment(itemStock[i].Dated_On).format('DD-MM-YYYY'),
					Name: assetItems[i].product.Name,
					Barcode: assetItems[i].Barcode,
					Manufacturer: assetItems[i].Manufacturer
						? assetItems[i].Manufacturer
						: '',
					Serial_Number: assetItems[i].Serial_Number
						? assetItems[i].Serial_Number
						: '',
					Model: assetItems[i].Model ? assetItems[i].Model : '',
					AMC_Expiry: assetItems[i].AMC_Expiry
						? moment(assetItems[i].AMC_Expiry).format('DD-MM-YYYY')
						: '',
					AMC_Vendor: assetItems[i].AMC_Vendor ? assetItems[i].AMC_Vendor : '',
					Product_Expiry: assetItems[i].Product_Expiry
						? moment(assetItems[i].Product_Expiry).format('DD-MM-YYYY')
						: '',
					Status: assetItems[i].Status,
					Location: assetItems[i].location.Name,
					Department: assetItems[i].Current_Department
						? assetItems[i].Current_Department +
						  ' (' +
						  assetItems[i].Current_Cost_Center +
						  ')'
						: '',
					Remark: assetTransactions[j].Remark
						? assetTransactions[j].Remark
						: '',
					User_Name: assetTransactions[j].User_Name
						? assetTransactions[j].User_Name
						: '',
				};
				assetItemsList.push(stockItems);
				count = count + 1;
			}
		} else {
			stockItems = {
				Sr_No: count,
				// Date: moment(itemStock[i].Dated_On).format('DD-MM-YYYY'),
				Name: assetItems[i].product.Name,
				Barcode: assetItems[i].Barcode,
				Manufacturer: assetItems[i].Manufacturer
					? assetItems[i].Manufacturer
					: '',
				Serial_Number: assetItems[i].Serial_Number
					? assetItems[i].Serial_Number
					: '',
				Model: assetItems[i].Model ? assetItems[i].Model : '',
				AMC_Expiry: assetItems[i].AMC_Expiry
					? moment(assetItems[i].AMC_Expiry).format('DD-MM-YYYY')
					: '',
				AMC_Vendor: assetItems[i].AMC_Vendor ? assetItems[i].AMC_Vendor : '',
				Product_Expiry: assetItems[i].Product_Expiry
					? moment(assetItems[i].Product_Expiry).format('DD-MM-YYYY')
					: '',
				Status: assetItems[i].Status,
				Location: assetItems[i].location.Name,
				Department: assetItems[i].Current_Department
					? assetItems[i].Current_Department +
					  ' (' +
					  assetItems[i].Current_Cost_Center +
					  ')'
					: '',
				Remark: '',
				User_Name: '',
			};
			assetItemsList.push(stockItems);
			count = count + 1;
		}
	}
	console.log('assetItemsList==', assetItemsList);

	const dataset = assetItemsList;

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
	res.attachment('CAPEX Stock.xlsx');
	return res.send(report);

	// if (assetItemsList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: assetItemsList,
	// 		// data: prodoctStockLedgerData,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
