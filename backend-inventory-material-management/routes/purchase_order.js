const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const bcrypt = require('bcryptjs');
const { QueryTypes, Op } = require('sequelize');
const excel = require('node-excel-export');
const moment = require('moment');

// let d = require('../file/htmlFiles/po.html');
const { getPagination, getPagingData } = require('./pagination');
const getCurrentFinancialYear = require('../utils/get_financial_year');
const EmailSender = require('../utils/sendEmail');
const { getPOPDF } = require('../utils/pdf_generator');
const { stylesData } = require('../utils/style');

async function getNextPONumber(req, requestPrefix) {
	var nextID;
	const data = await db.purchase_order.findOne({
		paranoid: false,
		attributes: ['ID'],
		order: [['ID', 'DESC']],
	});

	if (data == null) {
		nextID = 1;
	} else {
		nextID = data['dataValues']['ID'] + 1;
	}
	let twoDigitYear = getCurrentFinancialYear();
	return `${requestPrefix}${twoDigitYear}/${String(nextID).padStart(6, '0')}`;
}

// @desc Register user
// @route POST /api/purchase/addPurchaseOrder
// @access public
exports.addPurchaseOrder = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let requestPrefix;
		if (
			req.user.User_Type === process.env.DEPT_ADMIN ||
			req.user.User_Type == process.env.ADMIN_SYSTEM_ADMIN
		) {
			requestPrefix = `${process.env.PREFIX}/PO/${process.env.DEPT_ADMIN}/`;
		} else if (
			req.user.User_Type === process.env.DEPT_IT ||
			req.user.User_Type == process.env.IT_SYSTEM_ADMIN
		) {
			requestPrefix = `${process.env.PREFIX}/PO/${process.env.DEPT_IT}/`;
		} else {
			requestPrefix = `${process.env.PREFIX}/PO/${req.body.department}/`;
		}
		let nextPONumber = await getNextPONumber(req, requestPrefix);

		// let userType = req.user.User_Type;
		// let autoID = await purchaseCustomID(req, process.env.PREFIX, userType);

		// req.body.PO_Raised_By = req.user.ID;
		let userType = req.user.User_Type;
		let department = req.body.department;

		if (department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
			req.body.User_Type = process.env.IT;
		} else if (department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
			req.body.User_Type = process.env.ADMIN;
		} else if (
			userType == process.env.IT ||
			userType == process.env.IT_SYSTEM_ADMIN
		) {
			req.body.User_Type = process.env.IT;
		} else if (
			userType == process.env.ADMIN ||
			userType == process.env.ADMIN_SYSTEM_ADMIN
		) {
			req.body.User_Type = process.env.ADMIN;
		} else {
			return next(new ErrorResponse(`Enter Invalid Data.`, 500));
		}

		// req.body.User_Type = req.body.Department
		// 	? req.body.Department
		// 	: req.user.User_Type;
		req.body.PO_Raised_By = req.user.ID;
		req.body.PO_Number = nextPONumber;

		let productsData = req.body.products;
		let purchase_order;
		let poItems = [];

		let quantity = 0;
		let subTotal = 0.0;
		let total = 0.0;
		let tax = 0.0;

		await productsData.map(async (item) => {
			let totalPrice = parseFloat(item.Price) * parseInt(item.Quantity);
			let taxValue = (totalPrice * parseFloat(item.TAX_Percentage)) / 100;
			let totalValue = totalPrice + taxValue;
			quantity += parseInt(item.Quantity);
			subTotal += totalPrice;
			tax += taxValue;
			total += totalValue;

			poItem = {
				Purchase_Order_ID: 0,
				Product_ID: item.ID,
				ALT_Code: item.ALT_Code,
				Name: item.Name,
				Description: item.Description,
				Quantity: parseInt(item.Quantity),
				UOM: item.UOM,
				Per_Unit_Price: parseFloat(item.Price),
				Total_Price: totalPrice,
				TAX_Percentage: parseFloat(item.TAX_Percentage),
				TAX_Value: taxValue,
				Sub_Total: totalValue,
			};

			poItems.push(poItem);
		});

		req.body.Quantity = quantity;
		req.body.Sub_Total = subTotal;
		req.body.Tax_value = tax;
		req.body.PO_Total = total;
		purchase_order = await db.purchase_order.create(req.body);
		poItems.map(async (item) => {
			item.Purchase_Order_ID = purchase_order.ID;
			let productItem = await db.products.findOne({
				where: {
					ID: item.Product_ID,
				},
			});
			// if (productItem.dataValues.Price != item.Per_Unit_Price) {
			// 	await db.products.update(
			// 		{
			// 			Price: item.Per_Unit_Price,
			// 		},
			// 		{
			// 			where: {
			// 				ID: item.Product_ID,
			// 			},
			// 		}
			// 	);
			// }
		});

		await db.purchase_order_item.bulkCreate(poItems);

		const findVendor = await db.vendors.findOne({
			where: {
				ID: req.body.Vendor_ID,
			},
			attributes: ['ID', 'Name', 'Email', 'Address', 'GST_No', 'Phone'],
		});

		let POPath = await getPOPDF(
			req.body.PO_Date,
			purchase_order.PO_Number,
			poItems,
			subTotal,
			tax,
			total,
			findVendor.dataValues.Name,
			findVendor.dataValues.Address,
			findVendor.dataValues.GST_No,
			findVendor.dataValues.Email,
			findVendor.dataValues.Phone,
			req.body.TermsAndCondition,
			req.user.Name
		);

		if (process.env.EMAIL_FLAG) {
			let vendorEmail = findVendor.dataValues.Email;
			if (vendorEmail != null) {
				console.log('Vendor Email ======', vendorEmail);
				new EmailSender().sendPOToVendor(
					vendorEmail,
					findVendor.dataValues.Name,
					purchase_order.PO_Number,
					POPath
				);
			}
		}
		return res.status(200).json({
			success: true,
			message: 'Purchase Order Generated.',
		});
	}
});

// @desc Register user
// @route POST /api/purchase/updatePurchaseOrder
// @access public
exports.updatePurchaseOrder = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		// req.body.Updated_By = req.user.ID;
		const purchase_order = await db.purchase_order.update(req.body, {
			where: {
				ID: req.body.id,
			},
		});
		const purchase_order_item = await db.purchase_order_item.update(req.body, {
			where: {
				Purchase_Order_ID: req.body.id,
			},
		});

		if (purchase_order == 0)
			return next(new ErrorResponse(`purchase order details not found`, 404));

		res.status(200).json({
			success: true,
			message: `purchase order details updated`,
			data: purchase_order,
		});
	}
});

// @desc Register user
// @route POST /api/purchase/deletePurchaseOrder
// @access public
exports.deletePurchaseOrder = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let findPONumber = await db.purchase_order.findOne({
			where: {
				ID: req.body.id,
			},
			attributes: ['PO_Number'],
		});
		let findInwardByPONumber = await db.inward.findOne({
			where: {
				PO_Number: {
					[Op.eq]: findPONumber.dataValues.PO_Number,
				},
			},
		});
		if (findInwardByPONumber != null) {
			return next(new ErrorResponse(`You can not delete this PO.`, 404));
		}
		const purchase_order = await db.purchase_order.destroy({
			where: {
				ID: req.body.id,
			},
		});
		const purchase_order_item = await db.purchase_order_item.destroy({
			where: {
				Purchase_Order_ID: req.body.id,
			},
		});

		if (purchase_order === 0) {
			return next(new ErrorResponse(`purchase order Details not found.`, 404));
		}

		res.status(200).json({
			success: true,
			message: `purchase order deleted.`,
			data: [purchase_order, purchase_order_item],
		});
	}
});

// @desc Register user
// @route POST /api/purchase/getPurchaseOrder
// @access public
exports.getPurchaseOrder = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const userType = req.user.User_Type;
		let condition = {
			ID: {
				[Op.eq]: `${req.body.id}`,
			},
		};
		if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
			condition.User_Type = process.env.DEPT_IT;
		} else if (
			userType == process.env.ADMIN ||
			userType == process.env.ADMIN_SYSTEM_ADMIN
		) {
			condition.User_Type = process.env.DEPT_ADMIN;
		}

		const PO = await db.purchase_order.findOne({
			where: condition,
			include: [
				{
					model: db.vendors,
					attributes: ['Name'],
				},
				{
					model: db.purchase_order_item,
					include: [
						{
							model: db.products,
							attributes: ['Name'],
						},
					],
				},
			],
			distinct: true,
		});

		if (PO) {
			res.status(200).json({
				success: true,
				data: PO,
			});
		} else {
			return next(new ErrorResponse(`purchase order not found.`, 404));
		}
	}
});

// @desc Register user
// @route POST /api/purchase/getPurchaseOrders
// @access public
exports.getPurchaseOrders = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const userType = req.user.User_Type;
		const { limit, offset } = getPagination(
			req.body.pageNumber,
			req.body.numberOfRows
		);
		let condition = {
			PO_Number: {
				[Op.like]: `${req.body.search}%`,
			},
		};
		if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
			condition.User_Type = process.env.DEPT_IT;
		} else if (
			userType == process.env.ADMIN ||
			userType == process.env.ADMIN_SYSTEM_ADMIN
		) {
			condition.User_Type = process.env.DEPT_ADMIN;
		}

		const PO = await db.purchase_order.findAndCountAll({
			where: condition,
			limit,
			offset,
			include: [
				{
					model: db.vendors,
					attributes: ['Name', 'Address', 'GST_No'],
				},
				{
					model: db.user,
					attributes: ['Name'],
				},
				{
					model: db.purchase_order_item,
					attributes: [],
					include: [
						{
							model: db.products,
							attributes: ['Name'],
						},
					],
				},
			],
			distinct: true,
			order: [
				['PO_Date', 'DESC'],
				['ID', 'DESC'],
			],
		});

		if (PO) {
			// PO.count = taskitems ? taskitems.length : 0;
			console.log(PO);
			let { total, data, totalPages, currentPage } = getPagingData(
				PO,
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
	}
});
// @desc Register user
// @route POST /api/purchase/getPurchaseOrderByPONumber
// @access public
exports.getPurchaseOrderByPONumber = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	let department;
	let condition = '';
	if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
		condition.User_Type = process.env.DEPT_IT;
		department = process.env.DEPT_IT;
	} else if (userType == process.env.ADMIN || process.env.ADMIN_SYSTEM_ADMIN) {
		condition.User_Type = process.env.DEPT_ADMIN;
		department = process.env.DEPT_ADMIN;
	}
	// condition = {
	// 	User_Type: {
	// 		[Op.eq]:
	// 			req.user.User_Type == process.env.SYSTEM_ADMIN
	// 				? `${req.user.User_Type}`
	// 				: `${req.user.User_Type}`,
	// 	},
	// };
	if (!req.body.PO_Number) {
		return next(new ErrorResponse(`Enter PONumber`, 404));
	}
	let po = req.body.PO_Number;
	let splitedPONumber = po.split('/')[2];
	req.user.User_Type == process.env.SYSTEM_ADMIN ? splitedPONumber : department;
	let findUserType = await db.purchase_order.findOne({
		where: {
			// User_Type: {
			// 	[Op.eq]: `${req.user.User_Type}`,
			// },
			User_Type: {
				[Op.eq]:
					req.user.User_Type == process.env.SYSTEM_ADMIN
						? splitedPONumber
						: department,
			},
			PO_Number: req.body.PO_Number,
		},
	});
	if (!findUserType) {
		return next(new ErrorResponse(`Please Enter Valid PONumber`, 404));
	} else {
		let purchase_order = await db.purchase_order.findOne({
			where: {
				PO_Number: req.body.PO_Number,
			},
			attributes: ['ID', 'PO_Number', 'Sub_Total', 'Tax_value', 'User_Type'],
			include: [
				{
					model: db.vendors,
					attributes: ['ID', 'Name'],
				},
				{
					model: db.purchase_order_item,
					attributes: {
						exclude: [
							'UOM',
							'Description',
							'Created_At',
							'Updated_At',
							'Deleted_At',
						],
					},
					include: [
						{
							model: db.products,
							attributes: [
								'ID',
								'ALT_Code',
								'Name',
								'Is_Individual_Tracking',
								'UOM',
								// 'Price',
								// 'TAX_Percentage',
							],
							include: [
								{
									model: db.manufacturers,
									attributes: ['ID', 'Name'],
								},
							],
						},
					],
				},
			],
		});

		res.status(200).json({
			success: true,
			message: `purchase order Found`,
			data: purchase_order,
		});
	}
});

// @desc Get Next PO Number
// @route POST /api/purchase/getNextPONumber
// @access public
exports.getNextPONumber = asyncHandler(async (req, res, next) => {
	var nextID;
	const data = await db.purchase_order.findOne({
		paranoid: false,
		attributes: ['ID'],
		order: [['ID', 'DESC']],
	});

	if (data == null) {
		nextID = 1;
	} else {
		nextID = data['dataValues']['ID'] + 1;
	}
	let twoDigitYear = getCurrentFinancialYear();

	res.status(200).json({
		success: true,
		data: `${process.env.PREFIX}/${req.user.User_Type}/${twoDigitYear}/${String(
			nextID
		).padStart(6, '0')}`,
	});
});
// @desc Get Next PO Number
// @route POST /api/purchase/getNextPONumber
// @access public
exports.sendPOPDF = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const purchaseOrder = await db.purchase_order.findOne({
			where: {
				ID: req.body.id,
			},
		});
		// const purchaseOrderItems = await db.purchase_order_item.findAll({
		// 	where: {
		// 		Purchase_Order_ID: req.body.id,
		// 	},
		// });
		const findVendor = await db.vendors.findOne({
			where: {
				ID: purchaseOrder.dataValues.Vendor_ID,
			},
		});

		// let date = purchaseOrder.dataValues.PO_Date;
		// let PO_Date = moment(date).format('YYYY-MM-DD');

		// let poItemList = [];
		// for (let i = 0; i < purchaseOrderItems.length; i++) {
		// 	const productData = await db.products.findOne({
		// 		where: {
		// 			ID: purchaseOrderItems[i].Product_ID,
		// 		},
		// 	});
		// 	poItems = {
		// 		Purchase_Order_ID: purchaseOrderItems[i].dataValues.ID,
		// 		Product_ID: purchaseOrderItems[i].dataValues.Product_ID,
		// 		ALT_Code: productData.dataValues.ALT_Code,
		// 		Name: productData.dataValues.Name,
		// 		Description: purchaseOrderItems[i].dataValues.Description,
		// 		Quantity: parseInt(purchaseOrderItems[i].dataValues.Quantity),
		// 		UOM: purchaseOrderItems[i].dataValues.UOM,
		// 		Per_Unit_Price: parseFloat(
		// 			purchaseOrderItems[i].dataValues.Per_Unit_Price
		// 		),
		// 		Total_Price: purchaseOrderItems[i].dataValues.Total_Price,
		// 		TAX_Percentage: parseFloat(
		// 			purchaseOrderItems[i].dataValues.TAX_Percentage
		// 		),
		// 		TAX_Value: purchaseOrderItems[i].dataValues.TAX_Value,
		// 		Sub_Total: purchaseOrderItems[i].dataValues.Sub_Total,
		// 	};
		// 	poItemList.push(poItems);
		// }

		// let POPath = await getPOPDF(
		// 	PO_Date,
		// 	purchaseOrder.PO_Number,
		// 	poItemList,
		// 	purchaseOrder.dataValues.Sub_Total,
		// 	purchaseOrder.dataValues.Tax_value,
		// 	purchaseOrder.dataValues.PO_Total,
		// 	findVendor.dataValues.Name,
		// 	req.user.Name
		// );
		if (process.env.EMAIL_FLAG) {
			let vendorEmail = findVendor.dataValues.Email;
			if (vendorEmail) {
				new EmailSender().sendPOToVendor(
					vendorEmail,
					findVendor.dataValues.Name,
					purchaseOrder.dataValues.PO_Number,
					purchaseOrder.dataValues.File_Name
					// POPath
				);
			}
		}

		res.status(200).json({
			success: true,
			message: 'Send PO pdf successfully.',
		});
	}
});

// @desc get po data from lowstockalert
// @route POST /api/purchase/getPOFromLowStock
// @access public
exports.getPOFromLowStock = asyncHandler(async (req, res, next) => {
	let userType = req.user.User_Type;
	let Department = req.body.User_Type;
	let productsData = req.body.products;
	let productList = [];
	let condition = {};

	if (Department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.IT;
	} else if (Department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.ADMIN;
	} else if (
		userType == process.env.IT_SYSTEM_ADMIN ||
		userType == process.env.IT
	) {
		condition.Asset_Holder = process.env.IT;
	} else if (
		userType == process.env.ADMIN_SYSTEM_ADMIN ||
		userType == process.env.ADMIN
	) {
		condition.Asset_Holder = process.env.ADMIN;
	} else {
		return next(new ErrorResponse(`Product Details not found.`, 500));
	}
	for (let i = 0; i < productsData.length; i++) {
		condition.ID = productsData[i].ID;
		let calculatedQuantity =
			productsData[i].Low_Stock_Quantity - productsData[i].Current_Quantity;

		let productData = await db.products.findOne({
			where: condition,
			attributes: [
				'ID',
				'ALT_Code',
				'Name',
				'Description',
				'UOM',
				'Price',
				'TAX_Percentage',
				'Asset_Holder',
			],
		});
		let result = {
			Quantity: calculatedQuantity,
		};
		productItems = Object.assign(productData.dataValues, result);
		if (productData != null) productList.push(productItems);
	}
	if (productList.length > 0) {
		res.status(200).json({
			error: false,
			data: { productList, Department },
		});
	} else {
		res.status(500).json({
			error: true,
			message: 'Product details not found.',
		});
	}
});

// @desc get products export
// @route POST /api/products/getPrductsExport
// @access public
exports.getPurchaseOrdersExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [
		[{ value: 'Purchse Orders Report', style: styles.topHeader }],
	];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		PO_Number: {
			displayName: 'PO Number',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Vendor_Name: {
			displayName: 'Vendor Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Vendor_Address: {
			displayName: 'Vendor Address',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Vendor_GST_No: {
			displayName: 'Vendor GST No',
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
		Product_Name: {
			displayName: 'Product Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Description: {
			displayName: 'Description',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		UOM: {
			displayName: 'UOM',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 100,
		},
		Quantity: {
			displayName: 'Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Price: {
			displayName: 'Price',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 100,
		},
		Sub_Total: {
			displayName: 'Sub Total',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 200,
		},
		TAX_Percentage: {
			displayName: 'TAX Percentage',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 200,
		},
		TAX_Value: {
			displayName: 'TAX Value',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 200,
		},
		Total_Price: {
			displayName: 'Total Price',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 200,
		},
		PO_Raised_By: {
			displayName: 'PO Raised By',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		User_Type: {
			displayName: 'User Type',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
	};
	const userType = req.user.User_Type;
	let condition = {
		PO_Number: {
			[Op.like]: `${req.body.search}%`,
		},
	};
	if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
		condition.User_Type = process.env.DEPT_IT;
	} else if (
		userType == process.env.ADMIN ||
		userType == process.env.IT_SYSTEM_ADMIN
	) {
		condition.User_Type = process.env.DEPT_ADMIN;
	}

	const purchaseOrdersData = await db.purchase_order.findAll({
		where: condition,
		order: [
			['PO_Date', 'DESC'],
			['ID', 'DESC'],
		],
		include: [
			{
				model: db.vendors,
				attributes: ['Name', 'Address', 'GST_No'],
			},
			{
				model: db.user,
				attributes: ['Name'],
			},
			{
				model: db.purchase_order_item,
				attributes: [
					'ID',
					'Purchase_Order_ID',
					'Product_ID',
					'Description',
					'Quantity',
					'UOM',
					'Per_Unit_Price',
					'Total_Price',
					'TAX_Percentage',
					'TAX_Value',
					'Sub_Total',
				],
				include: [
					{
						model: db.products,
						attributes: ['Name'],
					},
				],
			},
		],
		distinct: true,
		// raw: true,
	});

	let poDataList = [];
	let count = 1;
	for (let i = 0; i < purchaseOrdersData.length; i++) {
		let purchseOrderItemList =
			purchaseOrdersData[i].dataValues.purchase_order_items;
		for (let j = 0; j < purchseOrderItemList.length; j++) {
			purchaseOrdersDataItem = {
				Sr_No: count,
				PO_Number: purchaseOrdersData[i].dataValues.PO_Number,
				Vendor_Name: purchaseOrdersData[i].dataValues.vendor.Name,
				Vendor_Address: purchaseOrdersData[i].dataValues.vendor.Address,
				Vendor_GST_No: purchaseOrdersData[i].dataValues.vendor.GST_No,

				Date: purchaseOrdersData[i].dataValues.PO_Date,
				Product_Name: purchseOrderItemList[j].product.Name,
				Description: purchseOrderItemList[j].Description
					? purchseOrderItemList[j].Description
					: ' ',
				UOM: purchseOrderItemList[j].UOM,
				Quantity: Number(purchseOrderItemList[j].Quantity),
				Price: Number(purchseOrderItemList[j].Per_Unit_Price),
				Sub_Total: Number(purchseOrderItemList[j].Total_Price),
				TAX_Percentage: Number(purchseOrderItemList[j].TAX_Percentage),
				TAX_Value: Number(purchseOrderItemList[j].TAX_Value),
				Total_Price: Number(purchseOrderItemList[j].Sub_Total),

				PO_Raised_By: purchaseOrdersData[i].dataValues.user.Name,
				User_Type: purchaseOrdersData[i].dataValues.User_Type,
			};
			poDataList.push(purchaseOrdersDataItem);
			count = count + 1;
		}
	}
	const dataset = poDataList;

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
	res.attachment('Purchase_Order.xlsx');
	return res.send(report);
	// if (poDataList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: poDataList,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
