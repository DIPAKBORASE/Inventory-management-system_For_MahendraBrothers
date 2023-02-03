const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');
const moment = require('moment');
const excel = require('node-excel-export');
const { stylesData } = require('../utils/style');

async function getNextBarcodeNumber() {
	let start = 100000;
	var nextID;
	const data = await db.asset.findOne({
		where: {
			Barcode: { [Op.ne]: null, [Op.regexp]: `^[0-9]+$` },
		},
		paranoid: false,
		attributes: ['Barcode'],
		order: [['ID', 'DESC']],
		limit: 1,
	});

	if (data == null) {
		nextID = start + 1;
	} else {
		nextID = parseInt(data['dataValues']['Barcode']) + 1;
	}
	return `${String(nextID)}`;
}
// @desc add inward user
// @route POST /api/asset/addInward
// @access public
exports.addInward = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		return db.sequelize
			.transaction()
			.then(async function (t) {
				req.body.PO_Number = req.body.PO_Number ? req.body.PO_Number : null;
				let productsData = req.body.products;
				let assets = [];
				let overallQuantity = 0;
				let overallSubTotal = 0.0;
				let overallTaxValue = 0.0;
				let overallTotal = 0.0;
				let barcode = await getNextBarcodeNumber();

				let userType = req.user.User_Type;
				req.body.Inward_By = req.user.Name;
				let department = req.body.User_Type;

				if (department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
					req.body.User_Type = process.env.IT;
				} else if (
					department == 'Admin' &&
					userType == process.env.SYSTEM_ADMIN
				) {
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

				await productsData.map(async (item) => {
					for (let i = 1; i <= item.Quantity; i++) {
						let quantity = 1;
						let subTotal = quantity * parseFloat(item.Price);
						let taxValue = (parseFloat(item.TAX_Percentage) * subTotal) / 100;
						let total = subTotal + taxValue;

						overallQuantity += quantity;
						overallSubTotal += subTotal;
						overallTaxValue += taxValue;
						overallTotal += total;
						assetItem = {
							Inward_ID: 0,
							User_Type: req.user.User_Type,
							Vendor_ID: req.body.Vendor_ID,
							Manufacturer: item.Manufacturer ? item.Manufacturer : null,
							Serial_Number: item.Serial_Number ? item.Serial_Number : null,
							Model: item.Model ? item.Model : null,
							AMC_Expiry: item.AMC_Expiry ? item.AMC_Expiry : null,
							AMC_Vendor: item.AMC_Vendor ? item.AMC_Vendor : null,
							Product_Expiry: item.Product_Expiry ? item.Product_Expiry : null,
							Product_ID: item.ID,
							Quantity: quantity,
							Barcode: item.Is_Individual_Tracking === true ? barcode++ : null,
							Per_Unit_Price: parseFloat(item.Price),
							Sub_Total: subTotal,
							TAX_Percentage: parseFloat(item.TAX_Percentage),
							TAX_Value: taxValue,
							Total_Price: total,
							Current_Location: req.body.Location_ID,
						};
						assets.push(assetItem);
					}
				});
				req.body.Quantity = overallQuantity;
				req.body.Sub_Total = overallSubTotal;
				req.body.Tax_value = overallTaxValue;
				req.body.Total_Price = overallTotal;
				req.body.Current_Location = req.body.Location_ID;

				inward = await db.inward.create(req.body, { transaction: t });
				assets.map((item) => {
					item.Inward_ID = inward.ID;
				});

				await db.asset.bulkCreate(assets, {
					transaction: t,
				});

				console.log('HIIIIii');
				t.commit();
				return res.status(200).json({
					success: true,
					message: 'Inward added.',
				});
			})
			.catch((e) => {
				t.rollback();
				return next(new ErrorResponse(`No stock available`, 500));
			});
	}
});

// @desc delete Inward
// @route DELETE /api/users/:id
// @access private
exports.deleteInward = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		//find inward by id
		const findInward = await db.inward.findOne({
			where: {
				ID: req.body.id,
			},
			attributes: ['ID', 'Challan_No'],
		});
		//find Assets associated with Inward ID
		const findAssets = await db.asset.findAll({
			where: {
				Inward_ID: req.body.id,
			},
			attributes: ['ID', 'Product_ID'],
		});
		let dispatchIDs = [];
		//find asset transactions
		for (let k = 0; k < findAssets.length; k++) {
			let findDispatch;
			let deleteAssetTransaction;
			const findAssetTransaction = await db.asset_transaction.findOne({
				where: {
					Asset_ID: findAssets[k].ID,
				},
				attributes: ['ID', 'Dispatch_ID'],
			});

			if (findAssetTransaction != null) {
				findDispatch = await db.dispatch.findOne({
					where: {
						ID: findAssetTransaction.dataValues.Dispatch_ID,
					},
					attributes: ['ID', 'Gate_Pass_No'],
				});
				dispatchIDs.push(findDispatch.dataValues.ID);

				deleteAssetTransaction = await db.asset_transaction.destroy({
					where: {
						Asset_ID: findAssets[k].ID,
					},
					force: true,
				});
				if (findDispatch != null) {
					let deleteProductStock = await db.product_stock_ledger.destroy({
						where: {
							Voucher_No: findDispatch.dataValues.Gate_Pass_No,
							Product_ID: findAssets[k].Product_ID,
						},
						force: true,
					});
				}
			}
		}

		// let uniqueDispatchIDs = [...new Set(dispatchIDs)];
		// let deleteDispatch = await db.dispatch.destroy({
		// 	where: {
		// 		ID: uniqueDispatchIDs,
		// 	},
		// });

		//find asset product ID
		const findProduct = await db.product_stock_ledger.findAll({
			where: {
				Voucher_No: findInward.dataValues.Challan_No,
			},
			attributes: ['Product_ID'],
		});

		const inward = await db.inward.destroy({
			where: {
				ID: req.body.id,
			},
			force: true,
		});
		const inward_items = await db.asset.destroy({
			where: {
				Inward_ID: req.body.id,
			},
			force: true,
		});

		const product_stock_ledger = await db.product_stock_ledger.destroy({
			where: {
				Voucher_No: findInward.dataValues.Challan_No,
			},
			force: true,
		});

		//update product stock ledger
		let productStockLedgerItem;
		for (let i = 0; i < findProduct.length; i++) {
			let stockData = await db.product_stock_ledger.findAll({
				where: {
					Product_ID: findProduct[i].Product_ID,
				},
				attributes: [
					'Voucher_No',
					'Product_ID',
					'Received_Quantity',
					'Received_Amount',
					'Issue_Quantity',
					'Issue_Amount',
					'Closing_Quantity',
					'Closing_Amount',
				],
			});

			if (stockData != null) {
				for (let j = 0; j < stockData.length - 1; j++) {
					let closingQuantity = 0;
					let total = 0.0;

					if (stockData[j + 1].Received_Quantity != 0) {
						closingQuantity =
							stockData[j].Closing_Quantity +
							stockData[j + 1].Received_Quantity;

						if (closingQuantity != stockData[j + 1].Closing_Quantity) {
							productStockLedgerItem = {
								Closing_Quantity: closingQuantity,
							};

							let updateStockLedger = await db.product_stock_ledger.update(
								productStockLedgerItem,
								{
									where: {
										Voucher_No: stockData[j + 1].Voucher_No,
										Product_ID: stockData[j + 1].Product_ID,
									},
								}
							);
							stockData = await db.product_stock_ledger.findAll({
								where: {
									Product_ID: findProduct[i].Product_ID,
								},
								attributes: [
									'Voucher_No',
									'Product_ID',
									'Received_Quantity',
									'Received_Amount',
									'Issue_Quantity',
									'Issue_Amount',
									'Closing_Quantity',
									'Closing_Amount',
								],
							});
						}
					} else if (stockData[j + 1].Issue_Quantity != 0) {
						closingQuantity =
							stockData[j].Closing_Quantity - stockData[j + 1].Issue_Quantity;

						if (closingQuantity != stockData[j + 1].Closing_Quantity) {
							productStockLedgerItem = {
								Closing_Quantity: closingQuantity,
							};

							let updateStockLedger = await db.product_stock_ledger.update(
								productStockLedgerItem,
								{
									where: {
										Voucher_No: stockData[j + 1].Voucher_No,
										Product_ID: stockData[j + 1].Product_ID,
									},
								}
							);
							stockData = await db.product_stock_ledger.findAll({
								where: {
									Product_ID: findProduct[i].Product_ID,
								},
								attributes: [
									'Voucher_No',
									'Product_ID',
									'Received_Quantity',
									'Received_Amount',
									'Issue_Quantity',
									'Issue_Amount',
									'Closing_Quantity',
									'Closing_Amount',
								],
							});
						}
					}
				}
			}
		}

		if (findInward === 0) {
			return next(new ErrorResponse(`inward Details not found.`, 500));
		}

		res.status(200).json({
			success: true,
			message: `inward deleted.`,
		});
	}
});
// @desc get inward by id
// @route POST /api/asset/getInward
// @access public
exports.getInward = asyncHandler(async (req, res, next) => {
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

		const inward = await db.inward.findAll({
			where: condition,
			attributes: {
				exclude: ['Created_At', 'Updated_At', 'Deleted_At'],
			},
			include: [
				{
					model: db.vendors,
					attributes: ['ID', 'Name'],
				},
				{
					model: db.location,
					attributes: ['ID', 'Name'],
				},
				{
					model: db.asset,
					attributes: {
						include: [
							'ID',
							'Product_ID',
							'Inward_ID',
							[
								db.Sequelize.fn('SUM', db.Sequelize.col('assets.Quantity')),
								'Quantity',
							],
							'Per_Unit_Price',
							[
								db.Sequelize.fn('SUM', db.Sequelize.col('assets.Sub_Total')),
								'Sub_Total',
							],
							'TAX_Percentage',
							[
								db.Sequelize.fn('SUM', db.Sequelize.col('assets.TAX_Value')),
								'TAX_Value',
							],
							[
								db.Sequelize.fn('SUM', db.Sequelize.col('assets.Total_Price')),
								'Total_Price',
							],
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
						exclude: ['Created_At', 'Updated_At', 'Deleted_At'],
					},
					include: [
						{
							model: db.products,
							attributes: ['Name'],
							where: {
								Deleted_At: null,
							},
						},
					],
				},
			],
			group: ['assets.Product_ID', 'assets.Barcode'],
		});
		if (inward.length > 0) {
			res.status(200).json({
				success: true,
				data: inward[0],
			});
		} else {
			return next(new ErrorResponse(`No data found.`, 404));
		}
	}
});

// @desc get inward list
// @route POST /api/asset/getInwards
// @access public
exports.getInwards = asyncHandler(async (req, res, next) => {
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
			Challan_No: {
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

		const inwards = await db.inward.findAndCountAll({
			where: condition,
			limit,
			offset,
			include: [
				{
					model: db.vendors,
					attributes: ['ID', 'Name'],
				},
			],
			order: [
				['Dated_On', 'DESC'],
				['ID', 'DESC'],
			],
		});

		if (inwards) {
			// inwards.count = taskitems ? taskitems.length : 0;
			console.log(inwards);
			let { total, data, totalPages, currentPage } = getPagingData(
				inwards,
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

// @desc get search inwards
// @route POST /api/asset/getSearchAssets
// @access public
exports.getSearchAssets = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let userType = req.user.User_Type;
		let typeOfIssue = req.body.Type_Of_Issue;
		let condition = {
			// '$assets.Current_Location$': {
			// 	[Op.eq]: `${req.body.From_Location}`,
			// },
			Name: { [Op.like]: `${req.body.search}%` },
			// Current_Location: {
			// 	[Op.eq]: `${req.body.From_Location}`,
			// },
			// '$product.Name$': { [Op.like]: `${req.body.search}%` },
		};

		let department = req.body.User_Type;

		if (department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
			condition.Asset_Holder = process.env.DEPT_IT;
		} else if (department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
			condition.Asset_Holder = process.env.DEPT_ADMIN;
		} else if (
			userType == process.env.IT ||
			userType == process.env.IT_SYSTEM_ADMIN
		) {
			condition.Asset_Holder = process.env.DEPT_IT;
		} else if (
			userType == process.env.ADMIN ||
			userType == process.env.ADMIN_SYSTEM_ADMIN
		) {
			condition.Asset_Holder = process.env.DEPT_ADMIN;
		} else {
			return next(new ErrorResponse(`Enter Invalid Data.`, 500));
		}
		let assetCondition = {
			Current_Location: {
				[Op.eq]: `${req.body.From_Location}`,
			},
		};

		if (typeOfIssue == 'Issue') {
			let productData = await db.products.findOne({
				where: {
					Name: { [Op.like]: `${req.body.search}%` },
				},
				attributes: ['Category'],
			});
			if (productData.dataValues.Category == process.env.OPEX) {
				assetCondition.Status = {
					[Op.eq]: process.env.UNASSIGNED,
				};
			} else {
				assetCondition.Status = {
					[Op.or]: [process.env.UNASSIGNED, process.env.ASSIGNED],
				};
			}
		}
		if (typeOfIssue == process.env.RETURN) {
			assetCondition.Status = process.env.ASSIGNED;
			condition.category = process.env.CAPEX;
		} else if (typeOfIssue == process.env.REPAIR) {
			assetCondition.Status = process.env.REPAIR;
			condition.category = process.env.CAPEX;
		} else if (typeOfIssue == process.env.SCRAP) {
			// assetCondition.Status = process.env.SCRAP;
			assetCondition.Status = {
				[Op.or]: [process.env.UNASSIGNED, process.env.ASSIGNED],
			};
			condition.category = process.env.CAPEX;
		} else if (typeOfIssue == process.env.LOST) {
			assetCondition.Status = {
				[Op.or]: [process.env.UNASSIGNED, process.env.ASSIGNED],
			};
			// assetCondition.Status = process.env.LOST;
			condition.category = process.env.CAPEX;
		}

		const searchAssets = await db.products.findAll({
			where: condition,
			// group: ['ID'],
			attributes: [
				'ID',
				'ALT_Code',
				'Name',
				'UOM',
				'Is_Individual_Tracking',
				'Category',
			],
			limit: 10,
			include: [
				{
					model: db.asset,
					as: 'assets',
					where: assetCondition,
					attributes: [
						'ID',
						// 'Product_ID',
						'Barcode',
						'Status',
						'Per_Unit_Price',
						'TAX_Percentage',
						// 'Status',
						// 'Current_Location',
						// 'Current_Department',
						// 'Current_Cost_Center',
						// [db.sequelize.fn('COUNT', 'Product_ID'), 'ProductQuantity'],
						// [
						// 	db.sequelize.literal("count(IF(Status = 'Unassigned', 1, NULL))"),
						// 	'AvailableQuantity',
						// ],
					],
				},
			],
			distinct: true,
		});

		if (searchAssets) {
			res.status(200).json({
				error: false,
				data: searchAssets,
			});
		} else {
			res.status(200).json({
				error: false,
				data: {},
			});
		}
	}
});

// @desc get search inwards
// @route POST /api/asset/getStatusWiseQuantityAndValue
// @access public
exports.getStatusWiseQuantityAndValue = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	const category = req.body.Category;
	let condition = {};
	if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.DEPT_IT;
	} else if (
		userType == process.env.ADMIN ||
		userType == process.env.ADMIN_SYSTEM_ADMIN
	) {
		condition.Asset_Holder = process.env.DEPT_ADMIN;
	}
	if (category == process.env.CAPEX) {
		condition.Category = process.env.CAPEX;
	} else if (category == process.env.OPEX) {
		condition.Category = process.env.OPEX;
	}
	let products = await db.asset.findAll({
		group: ['Status'],
		attributes: [
			'Status',
			[db.sequelize.fn('SUM', db.sequelize.col('Quantity')), 'Quantity'],
			[db.sequelize.fn('SUM', db.sequelize.col('Total_Price')), 'Value'],
			// [
			// 	db.sequelize.literal(
			// 		"sum(case when product.Category = 'CAPEX' then 1 else 0 end)"
			// 	),
			// 	'CAPEX',
			// ],
			// [
			// 	db.sequelize.literal(
			// 		"sum(case when product.Category = 'OPEX' then 1 else 0 end)"
			// 	),
			// 	'OPEX',
			// ],
		],
		include: [
			{
				model: db.products,
				as: 'product',
				where: condition,
				attributes: [
					// [
					// 	db.sequelize.literal(
					// 		"sum(case when Category = 'CAPEX' then 1 else 0 end)"
					// 	),
					// 	'CAPEX',
					// ],
					// [
					// 	db.sequelize.literal(
					// 		"sum(case when Category = 'OPEX' then 1 else 0 end)"
					// 	),
					// 	'OPEX',
					// ],
				],
			},
		],
		// distinct: true,
	});

	if (products) {
		res.status(200).json({
			success: true,
			data: products,
		});
	} else {
		res.status(200).json({
			success: true,
			data: [],
		});
	}
});
// @desc get search inwards
// @route POST /api/inward/getCategoryWiseQuantityAndValue
// @access public
exports.getCategoryWiseQuantityAndValue = asyncHandler(
	async (req, res, next) => {
		const userType = req.user.User_Type;
		// const category = req.body.Category;
		let condition = {};
		if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
			condition.Asset_Holder = process.env.DEPT_IT;
		} else if (
			userType == process.env.ADMIN ||
			userType == process.env.ADMIN_SYSTEM_ADMIN
		) {
			condition.Asset_Holder = process.env.DEPT_ADMIN;
		}
		// if (category == process.env.CAPEX) {
		// 	condition.Category = process.env.CAPEX;
		// } else if (category == process.env.OPEX) {
		// 	condition.Category = process.env.OPEX;
		// }
		let products = await db.asset.findAll({
			group: ['product.Category'],
			attributes: [
				[db.sequelize.col('product.Category'), 'category'],
				[db.sequelize.fn('SUM', db.sequelize.col('Quantity')), 'Quantity'],
				[db.sequelize.fn('SUM', db.sequelize.col('Total_Price')), 'Value'],
			],
			include: [
				{
					model: db.products,
					as: 'product',
					where: condition,
					attributes: [
						// [
						// 	db.sequelize.literal(
						// 		"sum(case when Category = 'CAPEX' then 1 else 0 end)"
						// 	),
						// 	'CAPEX',
						// ],
						// [
						// 	db.sequelize.literal(
						// 		"sum(case when Category = 'OPEX' then 1 else 0 end)"
						// 	),
						// 	'OPEX',
						// ],
					],
				},
			],
			// distinct: true,
			// raw: true,
		});

		if (products) {
			res.status(200).json({
				success: true,
				data: products,
			});
		} else {
			res.status(200).json({
				success: true,
				data: [],
			});
		}
	}
);
// @desc get search inwards
// @route POST /api/inward/getLocationWiseQuantityAndValue
// @access public
exports.getLocationWiseQuantityAndValue = asyncHandler(
	async (req, res, next) => {
		const userType = req.user.User_Type;
		const category = req.body.Category;
		let condition = {};
		if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
			condition.Asset_Holder = process.env.DEPT_IT;
		} else if (
			userType == process.env.ADMIN ||
			userType == process.env.ADMIN_SYSTEM_ADMIN
		) {
			condition.Asset_Holder = process.env.DEPT_ADMIN;
		}
		if (category == process.env.CAPEX) {
			condition.Category = process.env.CAPEX;
		} else if (category == process.env.OPEX) {
			condition.Category = process.env.OPEX;
		}
		let products = await db.asset.findAll({
			group: ['Current_Location'],
			where: {
				Current_Location: {
					[Op.ne]: null,
				},
			},
			attributes: [
				// 	[db.sequelize.col('location.Name'), 'Location'],
				// 	// 'Current_Location',
				[db.sequelize.fn('SUM', db.sequelize.col('Quantity')), 'Quantity'],
				[db.sequelize.fn('SUM', db.sequelize.col('Total_Price')), 'Value'],
			],
			include: [
				{
					model: db.products,
					as: 'product',
					where: condition,
					attributes: [
						// [
						// 	db.sequelize.literal(
						// 		"sum(case when Category = 'CAPEX' then 1 else 0 end)"
						// 	),
						// 	'CAPEX',
						// ],
						// [
						// 	db.sequelize.literal(
						// 		"sum(case when Category = 'OPEX' then 1 else 0 end)"
						// 	),
						// 	'OPEX',
						// ],
					],
				},
				{
					model: db.location,
					attributes: ['Name'],
				},
			],

			// distinct: true,
			// raw: true,
		});

		if (products) {
			res.status(200).json({
				success: true,
				data: products,
			});
		} else {
			res.status(200).json({
				success: true,
				data: [],
			});
		}
	}
);

// @desc get search inwards
// @route POST /api/asset/getCostCenterWiseQuantityAndValue
// @access public
exports.getCostCenterWiseQuantityAndValue = asyncHandler(
	async (req, res, next) => {
		const userType = req.user.User_Type;
		const category = req.body.Category;
		let condition = {};
		if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
			condition.Asset_Holder = process.env.DEPT_IT;
		} else if (
			userType == process.env.ADMIN ||
			userType == process.env.ADMIN_SYSTEM_ADMIN
		) {
			condition.Asset_Holder = process.env.DEPT_ADMIN;
		}
		if (category == process.env.CAPEX) {
			condition.Category = process.env.CAPEX;
		} else if (category == process.env.OPEX) {
			condition.Category = process.env.OPEX;
		}
		let products = await db.asset.findAll({
			group: ['Current_Cost_Center'],
			where: {
				Current_Cost_Center: {
					[Op.ne]: null,
				},
			},
			attributes: [
				'Current_Cost_Center',
				[db.sequelize.fn('SUM', db.sequelize.col('Quantity')), 'Quantity'],
				[db.sequelize.fn('SUM', db.sequelize.col('Total_Price')), 'Value'],
			],
			include: [
				{
					model: db.products,
					where: condition,
					attributes: [],
				},
			],
			// distinct: true,
		});

		if (products) {
			res.status(200).json({
				success: true,
				data: products,
			});
		} else {
			res.status(200).json({
				success: true,
				data: [],
			});
		}
	}
);
// @desc get products export
// @route POST /api/inward/getInwardsExport
// @access public
exports.getInwardsExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [[{ value: 'Inward Report', style: styles.topHeader }]];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Challan_No: {
			displayName: 'Challan Number',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		PO_Number: {
			displayName: 'PO Number',
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
		Date: {
			displayName: 'Date',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 200,
		},
		Product_Name: {
			displayName: 'Product Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Quantity: {
			displayName: 'Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 100,
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
			width: 150,
		},
		TAX_Percentage: {
			displayName: 'TAX Percentage',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		TAX_Value: {
			displayName: 'TAX Value',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Total_Price: {
			displayName: 'Total Price',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
		},
		Barcode: {
			displayName: 'Barcode',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Manufacturer: {
			displayName: 'Manufacturer',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Serial_Number: {
			displayName: 'Serial Number',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 200,
		},
		Model: {
			displayName: 'Model',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 100,
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
			displayName: 'Product Expiry',
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
		Current_Location: {
			displayName: 'Current Location',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Current_Department: {
			displayName: 'Current Department',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Current_Cost_Center: {
			displayName: 'Current Cost Center',
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
		Inward_By: {
			displayName: 'Inward By',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
	};
	const userType = req.user.User_Type;
	let condition = {
		Challan_No: {
			[Op.like]: `${req.body.search}%`,
		},
	};
	if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
		condition.User_Type = process.env.DEPT_IT;
	} else if (
		userType == process.env.ADMIN_SYSTEM_ADMIN ||
		userType == process.env.ADMIN
	) {
		condition.User_Type = process.env.DEPT_ADMIN;
	}

	const inwardData = await db.inward.findAll({
		where: condition,
		order: [
			['Dated_On', 'DESC'],
			['ID', 'DESC'],
		],
		attributes: {
			exclude: ['Created_At', 'Updated_At', 'Deleted_At'],
		},
		include: [
			{
				model: db.vendors,
				attributes: ['ID', 'Name'],
			},
			{
				model: db.location,
				attributes: ['Name'],
			},
			{
				model: db.asset,
				attributes: {
					include: [
						'ID',
						'Product_ID',
						'Inward_ID',
						[
							db.Sequelize.fn('SUM', db.Sequelize.col('assets.Quantity')),
							'Quantity',
						],
						'Per_Unit_Price',
						[
							db.Sequelize.fn('SUM', db.Sequelize.col('assets.Sub_Total')),
							'Sub_Total',
						],
						'TAX_Percentage',
						[
							db.Sequelize.fn('SUM', db.Sequelize.col('assets.TAX_Value')),
							'TAX_Value',
						],
						[
							db.Sequelize.fn('SUM', db.Sequelize.col('assets.Total_Price')),
							'Total_Price',
						],
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
					exclude: ['Created_At', 'Updated_At', 'Deleted_At'],
				},
				include: [
					{
						model: db.products,
						attributes: ['Name'],
						where: {
							Deleted_At: null,
						},
					},
				],
			},
		],
		group: ['assets.Product_ID', 'Challan_No', 'Vendor_ID'],
		// group: ['assets.Product_ID'],
	});

	let inwardDataList = [];
	let count = 1;
	for (let i = 0; i < inwardData.length; i++) {
		let assetItemList = inwardData[i].dataValues.assets;
		for (let j = 0; j < assetItemList.length; j++) {
			let inwardDataItem = {
				Sr_No: count,
				Challan_No: inwardData[i].dataValues.Challan_No,
				PO_Number: inwardData[i].dataValues.PO_Number
					? inwardData[i].dataValues.PO_Number
					: ' ',
				Vendor_Name: inwardData[i].dataValues.vendor
					? inwardData[i].dataValues.vendor.Name
					: ' ',
				Date: inwardData[i].dataValues.Dated_On,

				Product_Name: assetItemList[j].product
					? assetItemList[j].product.Name
					: ' ',
				Quantity: Number(assetItemList[j].Quantity),
				Price: Number(assetItemList[j].Per_Unit_Price),
				Sub_Total: Number(assetItemList[j].Sub_Total),
				TAX_Percentage: Number(assetItemList[j].TAX_Percentage),
				TAX_Value: Number(assetItemList[j].TAX_Value),
				Total_Price: Number(assetItemList[j].Total_Price),

				Barcode: assetItemList[j].Barcode ? assetItemList[j].Barcode : ' ',
				Manufacturer: assetItemList[j].Manufacturer
					? assetItemList[j].Manufacturer
					: ' ',
				Serial_Number: assetItemList[j].Serial_Number
					? Number(assetItemList[j].Serial_Number)
					: ' ',
				Model: assetItemList[j].Model ? assetItemList[j].Model : ' ',
				AMC_Expiry: assetItemList[j].AMC_Expiry
					? assetItemList[j].AMC_Expiry
					: ' ',
				AMC_Vendor: assetItemList[j].AMC_Vendor
					? assetItemList[j].AMC_Vendor
					: ' ',
				Product_Expiry: assetItemList[j].Product_Expiry
					? assetItemList[j].Product_Expiry
					: ' ',
				Status: assetItemList[j].Status,
				Current_Location: inwardData[i].dataValues.location
					? inwardData[i].dataValues.location.Name
					: ' ',
				Current_Department: assetItemList[j].Current_Department
					? assetItemList[j].Current_Department
					: ' ',
				Current_Cost_Center: assetItemList[j].Current_Cost_Center
					? assetItemList[j].Current_Cost_Center
					: ' ',

				User_Type: inwardData[i].dataValues.User_Type,
				Inward_By: inwardData[i].dataValues.Inward_By,
			};
			inwardDataList.push(inwardDataItem);
			count = count + 1;
		}
	}
	const dataset = inwardDataList;

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
	res.attachment('Inward_Report.xlsx');
	return res.send(report);
	// if (inwardDataList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: inwardDataList,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
