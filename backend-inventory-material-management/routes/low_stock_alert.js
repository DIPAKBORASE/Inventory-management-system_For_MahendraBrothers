const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const bcrypt = require('bcryptjs');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');
const EmailSender = require('../utils/sendEmail');

// @desc low stock alert
// @route POST /api/stock/getLowStockAlert
// @access public
exports.getLowStockAlert = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	const department = req.body.User_Type;
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	// let condition = {
	// 	Name: { [Op.like]: `${req.body.search}%` },
	// };

	let condition = '';
	if (req.body.search != '') {
		condition += ' and Name Like "' + req.body.search + '%" ';
	}

	if (department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
		condition += ' and Asset_Holder = "' + process.env.DEPT_IT + '"';
	} else if (department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
		condition += ' and Asset_Holder = "' + process.env.DEPT_ADMIN + '"';
	} else if (
		userType == process.env.IT ||
		userType == process.env.IT_SYSTEM_ADMIN
	) {
		condition += ' and Asset_Holder = "' + process.env.DEPT_IT + '"';
	} else if (
		userType == process.env.ADMIN ||
		userType == process.env.ADMIN_SYSTEM_ADMIN
	) {
		condition += ' and Asset_Holder = "' + process.env.DEPT_ADMIN + '"';
	} else {
		return next(new ErrorResponse(`Enter Invalid Data.`, 500));
	}

	// if (userType == process.env.IT) {
	// 	condition += ' and Asset_Holder = "' + process.env.DEPT_IT + '"';
	// } else if (userType == process.env.ADMIN) {
	// 	condition += ' and Asset_Holder = "' + process.env.DEPT_ADMIN + '"';
	// }
	// if (userType == process.env.IT) {
	// 	condition.Asset_Holder = process.env.DEPT_IT;
	// } else if (userType == process.env.ADMIN) {
	// 	condition.Asset_Holder = process.env.DEPT_ADMIN;
	// }

	// const stockAlert = await db.asset.findAndCountAll({
	// 	// limit,
	// 	// offset,
	// 	group: ['Product_ID'],
	// 	attributes: [
	// 		// [
	// 		// 	// 'Name',
	// 		// 	db.sequelize.literal(
	// 		// 		"count(IF(Status = 'Unassigned'<=`product`.`Low_Stock_Quantity`, 1, NULL))"
	// 		// 	),
	// 		// 	'Current_Quantity',
	// 		// ],
	// 		// 'product.Name',
	// 		// 'product.Low_Stock_Quantity',
	// 		[
	// 			db.Sequelize.literal(
	// 				` SUM(CASE WHEN Status = 'Unassigned' THEN 1 ELSE 0 END)`
	// 			),
	// 			'Current_Quantity',
	// 		],
	// 	],
	// 	include: [
	// 		{
	// 			model: db.products,
	// 			as: 'product',
	// 			// where: condition,
	// 			attributes: ['Name', 'Low_Stock_Quantity'],
	// 			nested: false,
	// 		},
	// 	],
	// 	raw: true,
	// 	// having: {[ db.Sequelize.col('Current_Quantity'), { $lt: db.Sequelize.col('Low_Stock_Quantity') } ]},
	// 	// having: db.Sequelize.literal(
	// 	// 	` SUM(CASE WHEN Status = 'Unassigned' THEN 1 ELSE 0 END) < Low_Stock_Quantity`
	// 	// ),
	// 	// having: db.sequelize.where(
	// 	// 	db.sequelize.fn('sum', db.sequelize.col('Current_Quantity')),
	// 	// 	{
	// 	// 		$lte: db.sequelize.col('Low_Stock_Quantity'),
	// 	// 	}
	// 	// ),
	// 	// having: {
	// 	// 	'$"product"."Current_Quantity"$': { $lte: db.sequelize.col('Low_Stock_Quantity') },
	// 	// },

	// 	having: db.Sequelize.literal(
	// 		`Current_Quantity < product.Low_Stock_Quantity`
	// 	),

	// 	// distinct: true,
	// 	// order: [{ model: db.products, as: 'product' }, 'Name', 'ASC'],
	// 	// order: [db.products, 'Name', 'asc'],
	// });

	// console.log('hiiiiii', stockAlert.length);
	// console.log('hiiiiii', total.length);
	// const stockAlert = await db.products.findAndCountAll({
	// 	where: condition,
	// 	limit,
	// 	offset,
	// 	group: ['assets.Product_ID'],
	// 	attributes: [],
	// 	include: [
	// 		{
	// 			model: db.asset,
	// 			attributes: [
	// 				[
	// 					// 'Name',
	// 					// 'Low_Stock_Quantity',
	// 					db.sequelize.literal(
	// 						"count(IF(assets.Status = 'Unassigned', 1, NULL))"
	// 					),
	// 					'Current_Quantity',
	// 				],
	// 			],
	// 		},
	// 	],
	// 	raw: true,
	// 	// distinct: true,
	// 	// order: [{ model: db.products, as: 'product' }, 'Name', 'ASC'],
	// 	// order: [db.products, 'Name', 'asc'],
	// });
	const stockAlert1 = await db.sequelize
		.query(
			'SELECT SUM(CASE WHEN Status = "Unassigned" THEN 1 ELSE 0 END) AS `Current_Quantity`,`product`.`ID` AS `ID`, `product`.`Name` AS `Name`,' +
				' `product`.`Low_Stock_Quantity` AS `Low_Stock_Quantity` FROM `assets` AS `asset` right OUTER JOIN `products` AS `product`' +
				' ON `asset`.`Product_ID` = `product`.`ID` AND (`product`.`Deleted_At` IS NULL) WHERE (`asset`.`Deleted_At` IS NULL) ' +
				condition +
				'GROUP BY `ID` HAVING Current_Quantity < product.Low_Stock_Quantity',
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
	const stockAlert = await db.sequelize
		.query(
			'SELECT SUM(CASE WHEN Status = "Unassigned" THEN 1 ELSE 0 END) AS `Current_Quantity`,`product`.`ID` AS `ID`,`product`.`Name` AS `Name`,' +
				' `product`.`Low_Stock_Quantity` AS `Low_Stock_Quantity` FROM `assets` AS `asset` right OUTER JOIN `products` AS `product`' +
				' ON `asset`.`Product_ID` = `product`.`ID` AND (`product`.`Deleted_At` IS NULL) WHERE (`asset`.`Deleted_At` IS NULL) ' +
				condition +
				'GROUP BY `ID` HAVING Current_Quantity < product.Low_Stock_Quantity limit :offset, :limit',
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

	stockAlert.count = stockAlert1.length;
	stockAlert.rows = stockAlert;

	if (stockAlert) {
		// const { count: totalData, rows: dataItems } = stockAlert;
		// stockAlert.count = stockAlert ? totalData.length : 0;
		// console.log(stockAlert);
		let { total, data, totalPages, currentPage } = getPagingData(
			stockAlert,
			req.body.pageNumber,
			req.body.numberOfRows
		);
		console.log(data);
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

	// if (stockAlert) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: stockAlert,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});

exports.getLowStockAlertEmail = asyncHandler(async (req, res, next) => {
	const stockAlert = await db.sequelize
		.query(
			'SELECT SUM(CASE WHEN Status = "Unassigned" THEN 1 ELSE 0 END) AS `Current_Quantity`, `product`.`Name` AS `Name`,' +
				' `product`.`Low_Stock_Quantity` AS `Low_Stock_Quantity` FROM `assets` AS `asset` LEFT OUTER JOIN `products` AS `product`' +
				' ON `asset`.`Product_ID` = `product`.`ID` AND (`product`.`Deleted_At` IS NULL) WHERE (`asset`.`Deleted_At` IS NULL) ' +
				'GROUP BY `Product_ID` HAVING Current_Quantity < product.Low_Stock_Quantity',
			{
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});
	let SAEmail = await db.user.findAll({
		where: {
			User_Type: { [Op.eq]: process.env.SYSTEM_ADMIN },
		},
		attributes: ['Email'],
	});

	let mailList = [];
	SAEmail.forEach((element) => {
		console.log(element.Email);
		mailList.push(element.Email);
	});
	console.log(mailList);
	email = 'sumitsakpal02@gmail.com';
	if (process.env.EMAIL_FLAG) {
		// if (email) {
		new EmailSender().sendLowStockAlert(mailList, stockAlert);
		// }
	}

	return res.status(200).json({
		success: true,
		data: stockAlert,
	});
});
exports.cronJob = asyncHandler(async (req, res, next) => {
	const stockAlert = await db.sequelize
		.query(
			'SELECT SUM(CASE WHEN Status = "Unassigned" THEN 1 ELSE 0 END) AS `Current_Quantity`,,`product`.`ID` AS `ID`, `product`.`Name` AS `Name`,' +
				' `product`.`Low_Stock_Quantity` AS `Low_Stock_Quantity` FROM `assets` AS `asset` right OUTER JOIN `products` AS `product`' +
				' ON `asset`.`Product_ID` = `product`.`ID` AND (`product`.`Deleted_At` IS NULL) WHERE (`asset`.`Deleted_At` IS NULL) ' +
				'GROUP BY `ID` HAVING Current_Quantity < product.Low_Stock_Quantity',
			{
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});
	let saEmail = await db.user.findAll({
		where: {
			User_Type: { [Op.eq]: process.env.SYSTEM_ADMIN },
		},
		attributes: ['Email'],
	});

	let mailList = [];
	saEmail.forEach((element) => {
		mailList.push(element.Email);
	});
	if (process.env.EMAIL_FLAG) {
		if (saEmail) {
			new EmailSender().sendLowStockAlert(mailList, stockAlert);
		}
	}
	// console.log(stockAlert);
	// console.log(res);
	// res.status(200).json({
	// 	success: true,
	// 	message: 'Data subbce',
	// });
});
