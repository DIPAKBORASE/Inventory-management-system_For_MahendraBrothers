const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const bcrypt = require('bcryptjs');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');
const getCurrentFinancialYear = require('../utils/get_financial_year');
const { getPassNOPDF } = require('../utils/pdf_generator');
const moment = require('moment');
const excel = require('node-excel-export');
const { stylesData } = require('../utils/style');
const { JSONCookie } = require('cookie-parser');

async function getNextDispatchNumber(req, requestPrefix) {
	//For autogenerating invoice no
	var nextID;
	const data = await db.dispatch.findOne({
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
	return `${process.env.PREFIX}/${twoDigitYear}/${String(nextID).padStart(
		6,
		'0'
	)}`;
}

// @desc Register user
// @route POST /api/dispatch/addDispatch
// @access public

exports.addDispatch = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		return db.sequelize
			.transaction()
			.then(async function (t) {
				let userType = req.user.User_Type;
				let nextDispatchNumber = await getNextDispatchNumber(
					req
					// requestPrefix
				);

				req.body.Gate_Pass_No = nextDispatchNumber;
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

				req.body.Cost_Center = req.body.Cost_Center
					? req.body.Cost_Center
					: null;
				let productsData = req.body.assets;
				req.body.Dispatch_By = req.user.Name;

				let overallQuantity = 0;
				let toLocation = await db.location.findOne(
					{
						where: { ID: req.body.To_Location },
					},
					{ transaction: t }
				);

				let assetsStatus = req.body.Type_Of_Issue;
				let assetTxnStatus = req.body.Type_Of_Issue;
				let issueName = req.body.Type_Of_Issue;

				if (req.body.Type_Of_Issue == 'Issue') {
					assetTxnStatus =
						req.body.To_Location == req.body.From_Location
							? process.env.DEPTTODEPT
							: process.env.OFFICETRANSFER;

					assetsStatus = process.env.ASSIGNED;
				} else if (
					req.body.Type_Of_Issue == process.env.LOST ||
					req.body.Type_Of_Issue == process.env.SCRAP
				) {
					assetsStatus =
						req.body.Type_Of_Issue == process.env.LOST
							? process.env.LOST
							: process.env.SCRAP;

					assetTxnStatus =
						req.body.Type_Of_Issue == process.env.LOST
							? process.env.LOST
							: process.env.SCRAP;
				} else if (
					req.body.Type_Of_Issue == process.env.RETURN ||
					req.body.Type_Of_Issue == process.env.REPAIR
				) {
					assetTxnStatus =
						req.body.Type_Of_Issue == process.env.RETURN
							? process.env.RETURN
							: process.env.REPAIR;
					assetsStatus =
						req.body.Type_Of_Issue == process.env.RETURN
							? process.env.UNASSIGNED
							: process.env.REPAIR;
				}

				let flag = 0;
				let IDs = [];

				if (toLocation) {
					req.body.Type_Of_Issue = assetTxnStatus;
					let dispatch = await db.dispatch.create(req.body, { transaction: t });
					let count = 0;
					let count1 = 0;
					for (let i = 0; i < productsData.length; i++) {
						let countProductQuantity = await db.asset.sum('Quantity', {
							where: {
								Current_Location: {
									[Op.eq]: req.body.From_Location,
								},
								Product_ID: {
									[Op.eq]: productsData[i].Product_ID,
								},
							},
						});

						if (countProductQuantity >= productsData[i].Quantity) {
						} else {
							count1++;
						}
					}

					if (count1 == 0) {
						let dispatchDataList = [];
						for (let i = 0; i < productsData.length; i++) {
							overallQuantity += productsData[i].Quantity;
							if (
								productsData[i].Is_Individual_Tracking &&
								productsData[i].Quantity == 1
							) {
								let assetItem = await db.asset.findOne(
									{
										where: {
											Product_ID: productsData[i].Product_ID,
											Barcode: productsData[i].Barcode,
											Current_Location: req.body.From_Location,
										},
									},
									{ transaction: t }
								);

								if (assetItem) {
									dispatchData = {
										Dispatch_ID: dispatch.ID,
										Asset_ID: assetItem.ID,
										Name: productsData[i].Name,
										ALT_Code: productsData[i].ALT_Code,
										Location_From: req.body.From_Location,
										Location_From_Department: assetItem.Current_Department,
										Location_From_Cost_Center: assetItem.Current_Cost_Center,
										Location_To: req.body.To_Location,
										Location_To_Department: req.body.Department,
										Location_To_Cost_Center: req.body.Cost_Center,
										Type_Of_Issue: assetTxnStatus,
										Dated_On: req.body.Dated_On,
										Collected_By: req.body.Collected_By,
										Mode_Of_Transport: req.body.Mode_Of_Transport,
										Quantity: 1,
										UOM: productsData[i].UOM,
										Remark: productsData[i].Remark,
										User_Name: productsData[i].Username,
									};

									IDs.push(assetItem.dataValues.ID);
									dispatchDataList.push(dispatchData);
								} else {
									t.rollback();
									return next(new ErrorResponse(`No stock available.`, 500));
								}
							} else if (!productsData[i].Is_Individual_Tracking) {
								console.log('Individual false');
								let countQuantity = await db.asset.sum('Quantity', {
									where: {
										Current_Location: {
											[Op.eq]: req.body.From_Location,
										},
									},
								});

								if (countQuantity >= productsData[i].Quantity) {
									let assetItem = await db.asset.findAll({
										where: {
											Product_ID: productsData[i].Product_ID,
											Current_Location: req.body.From_Location,
										},
										attributes: [
											'ID',
											'Current_Department',
											'Current_Cost_Center',
										],
									});

									for (let j = 0; j < productsData[i].Quantity; j++) {
										if (assetItem.length > 0) {
											dispatchData = {
												Dispatch_ID: dispatch.ID,
												Asset_ID: assetItem[j].ID,
												Name: productsData[i].Name,
												ALT_Code: productsData[i].ALT_Code,
												Location_From: req.body.From_Location,
												Location_From_Department:
													assetItem[j].Current_Department,
												Location_From_Cost_Center:
													assetItem[j].Current_Cost_Center,
												Location_To: req.body.To_Location,
												Location_To_Department: req.body.Department,
												Location_To_Cost_Center: req.body.Cost_Center,
												Type_Of_Issue: assetTxnStatus,
												Dated_On: req.body.Dated_On,
												Collected_By: req.body.Collected_By,
												Mode_Of_Transport: req.body.Mode_Of_Transport,
												Quantity: 1,
												UOM: productsData[i].UOM,
												Remark: productsData[i].Remark,
												User_Name: productsData[i].Username,
											};

											IDs.push(assetItem[j].ID);
											dispatchDataList.push(dispatchData);
										} else {
											return next(
												new ErrorResponse(`No stock available.`, 500)
											);
										}
									}
								} else {
									t.rollback();
									return next(new ErrorResponse(`No stock available.`, 500));
								}
							} else {
								return next(new ErrorResponse(`Invalid Data Provided.`, 500));
							}
							console.log('IDs print==', IDs);

							count++;
						}
						db.dispatch.update(
							{
								Quantity: overallQuantity,
							},
							{
								where: {
									ID: dispatch.ID,
								},
							},
							{ transaction: t }
						);
						getPassNOPDF(
							req.body.Dated_On,
							dispatch.Created_At,
							dispatch.Gate_Pass_No,
							productsData,
							dispatch.Collected_By,
							dispatch.Mode_Of_Transport,
							toLocation.dataValues.Name,
							dispatch.Department,
							dispatch.Cost_Center,
							req.user.Name
						);
						await db.asset.update(
							{
								Status: assetsStatus,
								Current_Location: req.body.To_Location,
								Current_Department: req.body.Department,
								Current_Cost_Center: req.body.Cost_Center,
							},
							{
								where: {
									ID: IDs,
								},
							},
							{ transaction: t }
						);

						await db.asset_transaction.bulkCreate(dispatchDataList, {
							transaction: t,
						});

						t.commit();
						return res.status(200).json({
							success: true,
							message: 'Your dispatch submitted.',
						});
					} else {
						return next(new ErrorResponse(`No stock available`, 500));
					}
				} else {
					return next(new ErrorResponse(`Invalid Location Provided.`, 500));
				}
			})
			.catch((e) => {
				t.rollback();
				// console.log('Exception =======', e);
				return next(new ErrorResponse(`No stock available`, 500));
			});
	}
});

// @desc delete dispatch by id
// @route DELETE /api/dispatch/deleteDispatch
// @access private
exports.deleteDispatch = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let findProduct;
		//find dispatch by id
		const findDispatch = await db.dispatch.findOne({
			where: {
				ID: req.body.id,
			},
			attributes: ['ID', 'Gate_Pass_No', 'Type_Of_Issue'],
		});
		//find asset product ID
		if (findDispatch != null) {
			findProduct = await db.product_stock_ledger.findAll({
				where: {
					Voucher_No: findDispatch.dataValues.Gate_Pass_No,
				},
				attributes: ['Product_ID'],
			});

			//update assets
			// if (findDispatch.dataValues.Type_Of_Issue == process.env.DEPTTODEPT) {
			let findAssetTransaction = await db.asset_transaction.findAll({
				where: {
					Dispatch_ID: findDispatch.dataValues.ID,
				},
				attributes: ['ID', 'Dispatch_ID', 'Asset_ID', 'Location_From'],
			});
			for (let k = 0; k < findAssetTransaction.length; k++) {
				let findAsset = await db.asset.findOne({
					where: {
						ID: findAssetTransaction[k].Asset_ID,
					},
					attributes: ['ID', 'Inward_ID'],
				});
				let findInward = await db.inward.findOne({
					where: {
						ID: findAsset.dataValues.Inward_ID,
					},
					attributes: ['ID', 'Current_Location'],
				});
				if (
					findInward.dataValues.Current_Location ==
					findAssetTransaction[k].Location_From
				) {
					let updateAsset = await db.asset.update(
						{
							Status: process.env.UNASSIGNED,
							Current_Location: findInward.dataValues.Current_Location,
							Current_Department: null,
							Current_Cost_Center: null,
						},
						{
							where: {
								ID: findAssetTransaction[k].Asset_ID,
							},
						}
					);
				} else {
					let updateAsset = await db.asset.update(
						{
							Current_Location: findAssetTransaction[k].Location_From,
						},
						{
							where: {
								ID: findAssetTransaction[k].Asset_ID,
							},
						}
					);
				}
			}
			// } else if (
			// 	findDispatch.dataValues.Type_Of_Issue == process.env.OFFICETRANSFER
			// ) {
			// }

			// const dispatch = await db.dispatch.destroy({
			// 	where: {
			// 		ID: req.body.id,
			// 	},
			// });
			let assetsID = [];
			let getDispatchNos = [];
			for (let l = 0; l < findAssetTransaction.length; l++) {
				assetsID.push(findAssetTransaction[l].Asset_ID);
				let findDispatchID = await db.asset_transaction.findOne({
					where: {
						Dispatch_ID: {
							[Op.gte]: req.body.id,
						},
						Asset_ID: findAssetTransaction[l].Asset_ID,
					},
					attributes: ['Dispatch_ID'],
				});
				let findGatePassNo = await db.dispatch.findOne({
					where: {
						ID: findDispatchID.dataValues.Dispatch_ID,
					},
					attributes: ['Gate_Pass_No'],
				});

				getDispatchNos.push(findGatePassNo.dataValues.Gate_Pass_No);
			}

			const dispatch_items = await db.asset_transaction.destroy({
				where: {
					Dispatch_ID: {
						[Op.gte]: req.body.id,
					},
					Asset_ID: assetsID,
				},
				force: true,
			});
			const deleteDisptch = await db.dispatch.destroy({
				where: {
					ID: req.body.id,
				},
				force: true,
			});

			let uniqueVoucherNos = [...new Set(getDispatchNos)];
			const product_stock_ledger = await db.product_stock_ledger.destroy({
				where: {
					Voucher_No: uniqueVoucherNos,
				},
				force: true,
			});

			// //update product stock ledger
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
		}
		if (findDispatch == null) {
			return next(new ErrorResponse(`dispatch Details not found.`, 500));
		}

		res.status(200).json({
			success: true,
			message: `dispatch deleted.`,
		});
	}
});
// @desc get dispatch by id
// @route POST /api/dispatch/getDispatch
// @access public
exports.getDispatch = asyncHandler(async (req, res, next) => {
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
		const dispatch = await db.dispatch.findAll({
			where: condition,
			attributes: {
				exclude: ['User_Type', 'Created_At', 'Updated_At', 'Deleted_At'],
			},
			include: [
				{
					model: db.location,
					as: 'fromLocation',
					attributes: ['Name'],
				},
				{
					model: db.location,
					as: 'toLocation',
					attributes: ['Name'],
				},
				{
					model: db.asset_transaction,
					attributes: [
						'Remark',
						'User_Name',
						[
							db.Sequelize.fn(
								'SUM',
								db.Sequelize.col('asset_transactions.Quantity')
							),
							'Quantity',
						],
					],

					include: [
						{
							model: db.asset,
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
							],

							include: [
								{
									model: db.products,
									attributes: ['ALT_Code', 'Name', 'Description', 'UOM'],
								},
							],
						},
					],
				},
			],
			distinct: true,
			group: [
				'asset_transactions.asset.Product_ID',
				'asset_transactions.asset.Barcode',
			],
		});

		if (dispatch) {
			res.status(200).json({
				success: true,
				data: dispatch[0],
			});
		} else {
			return next(new ErrorResponse(`dispatch details not found.`, 404));
		}
	}
});

// @desc get dispatch list
// @route POST /api/dispatch/getDispatches
// @access public
exports.getDispatches = asyncHandler(async (req, res, next) => {
	const userType = req.user.User_Type;
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	let condition = {
		Gate_Pass_No: {
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

	const dispatches = await db.dispatch.findAndCountAll({
		where: condition,
		limit,
		offset,
		include: [
			{
				model: db.location,
				as: 'fromLocation',
				attributes: ['Name'],
			},
			{
				model: db.location,
				as: 'toLocation',
				attributes: ['Name'],
			},
		],
		order: [
			['Dated_On', 'DESC'],
			['ID', 'DESC'],
		],
	});

	if (dispatches) {
		// dispatches.count = taskitems ? taskitems.length : 0;
		console.log(dispatches);
		let { total, data, totalPages, currentPage } = getPagingData(
			dispatches,
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

// @desc Get all Department
// @route POST /api/products/getALLDepartment
// @access public
exports.getALLDepartment = asyncHandler(async (req, res, next) => {
	const allDepartment = await db.dispatch.findAll({
		order: ['Department'],
		attributes: [
			[
				db.Sequelize.fn('DISTINCT', db.Sequelize.col('Department')),
				'Department',
			],
		],
	});
	res.status(200).json({
		success: true,
		data: allDepartment,
	});
});
// @desc Get Dispatch Request
// @route POST /api/dispatch/getDispatchFromRequest
// @access public
exports.getDispatchFromRequest = asyncHandler(async (req, res, next) => {
	let requestID = req.body.ID;
	let locationID = req.body.Location_ID;
	// let defaultLocation = await db.location.findOne({
	// 	where: {
	// 		Is_Default: 1,
	// 	},
	// });
	let requestData = await db.request.findOne({
		where: {
			ID: requestID,
		},
	});

	let requesterData = await db.user.findOne({
		where: {
			ID: requestData.dataValues.User_ID,
		},
	});

	let requestItemsList = await db.request_items.findAll({
		where: {
			Request_ID: requestID,
		},
	});

	let IDs = [];

	for (let i = 0; i < requestItemsList.length; i++) {
		IDs.push(requestItemsList[i].Product_ID);
	}
	let userType = req.user.User_Type;
	let condition = {
		ID: {
			[Op.in]: IDs,
		},
	};
	if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.DEPT_IT;
	} else if (
		userType == process.env.ADMIN ||
		userType == process.env.ADMIN_SYSTEM_ADMIN
	) {
		condition.Asset_Holder = process.env.DEPT_ADMIN;
	}
	const searchAssets = await db.products.findAll({
		where: condition,
		// group: ['ID'],
		attributes: ['ID', 'ALT_Code', 'Name', 'UOM', 'Is_Individual_Tracking'],
		include: [
			{
				model: db.asset,
				as: 'assets',
				where: {
					Current_Location: {
						[Op.eq]: locationID
							? locationID
							: requestData.dataValues.Location_ID,
					},
				},
				attributes: ['Barcode'],
				required: false,
			},
		],
		distinct: true,
		// plain: true,
	});
	let searchAssetsList = searchAssets.map((node) => node.get({ plain: true }));

	let flag = true;
	for (let j = 0; j < searchAssetsList.length; j++) {
		for (let i = 0; i < requestItemsList.length; i++) {
			// IDs.push(requestItemsList[i].Product_ID);
			if (requestItemsList[i].Product_ID == searchAssetsList[j].ID) {
				searchAssetsList[j].Request_Quantity = requestItemsList[i].Quantity;
				if (requestItemsList[i].Quantity > searchAssetsList[j].assets.length) {
					flag = false;
				}
			}
		}
	}

	// if (searchAssetsList.length == IDs.length && flag) {
	if (searchAssetsList.length && flag) {
		res.status(200).json({
			error: false,
			fromLocation: locationID
				? locationID
				: requestData.dataValues.Location_ID,
			toLocation: requestData.dataValues.Location_ID,
			date: moment().format('YYYY-MM-DD'),
			collected_By: requesterData.dataValues.Name,
			department: requesterData.dataValues.Department,
			costCenter: requesterData.dataValues.Cost_Center,
			modeOfTransport: 'Road',

			items: searchAssetsList,
		});
	} else {
		res.status(500).json({
			error: false,
			message: 'No stock available.',
		});
	}
});

// @desc get issue type export
// @route POST /api/issuetype/getDispatchExport
// @access public
exports.getDispatchExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [[{ value: 'Dispatch Report', style: styles.topHeader }]];
	let userType = req.user.User_Type;
	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Gate_Pass_No: {
			displayName: 'Gate Pass No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Date: {
			displayName: 'Date',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 150,
		},
		From_Location: {
			displayName: 'From Location Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		To_Location: {
			displayName: 'To Location Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Type_Of_Issue: {
			displayName: 'Type Of Issue',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Department: {
			displayName: 'Department',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Cost_Center: {
			displayName: 'Cost_Center',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Collected_By: {
			displayName: 'Collected By',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Mode_Of_Transport: {
			displayName: 'Mode Of Transport',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Product_Name: {
			displayName: 'Product Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
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
		Barcode: {
			displayName: 'Barcode',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 100,
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
			width: 200,
		},
		Product_Expiry: {
			displayName: 'Product Expiry',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 150,
		},
		User_Type: {
			displayName: 'User Type',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
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
			width: 150,
		},
		Dispatch_By: {
			displayName: 'Dispatch By',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
	};

	// let condition = {};
	// if (req.body.search != '') {
	// 	condition.Name = { [Op.like]: `${req.body.search}%` };
	// }
	let condition = {
		Gate_Pass_No: {
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
	const dispatchData = await db.dispatch.findAll({
		where: condition,
		attributes: [
			'Gate_Pass_No',
			'Dated_On',
			'Type_Of_Issue',
			'Department',
			'Cost_Center',
			'Collected_By',
			'Mode_Of_Transport',
			'User_Type',
			'Dispatch_By',
		],
		include: [
			{
				model: db.location,
				as: 'fromLocation',
				attributes: ['Name'],
			},
			{
				model: db.location,
				as: 'toLocation',
				attributes: ['Name'],
			},
			{
				model: db.asset_transaction,
				attributes: [
					'Remark',
					'User_Name',
					// [
					// 	db.Sequelize.fn(
					// 		'SUM',
					// 		db.Sequelize.col('asset_transactions.Quantity')
					// 	),
					// 	'Quantity',
					// ],
				],
				include: [
					{
						model: db.asset,
						attributes: [
							'ID',
							'Barcode',
							'Manufacturer',
							'Serial_Number',
							'Model',
							'AMC_Expiry',
							'AMC_Vendor',
							'Product_Expiry',
						],

						include: [
							{
								model: db.products,
								attributes: ['ALT_Code', 'Name', 'Description', 'UOM'],
								where: {
									Deleted_At: null,
								},
							},
						],
					},
				],
			},
		],
		order: [
			['Dated_On', 'DESC'],
			['ID', 'DESC'],
		],
	});

	let dispatchDataList = [];
	let count = 1;
	for (let i = 0; i < dispatchData.length; i++) {
		for (
			let j = 0;
			j < dispatchData[i].dataValues.asset_transactions.length;
			j++
		) {
			let dispatchDataItem = {
				Sr_No: count,
				Gate_Pass_No: dispatchData[i].dataValues.Gate_Pass_No,
				Date: dispatchData[i].dataValues.Dated_On,
				From_Location: dispatchData[i].dataValues.fromLocation.Name,
				To_Location: dispatchData[i].dataValues.toLocation.Name,
				Type_Of_Issue: dispatchData[i].dataValues.Type_Of_Issue,
				Department: dispatchData[i].dataValues.Department,
				Cost_Center: dispatchData[i].dataValues.Cost_Center,
				Collected_By: dispatchData[i].dataValues.Collected_By,
				Mode_Of_Transport: dispatchData[i].dataValues.Mode_Of_Transport,

				Product_Name: dispatchData[i].asset_transactions[j].asset
					? dispatchData[i].asset_transactions[j].asset.product.Name
						? dispatchData[i].asset_transactions[j].asset.product.Name
						: ''
					: '',
				Description: dispatchData[i].asset_transactions[j].asset
					? dispatchData[i].asset_transactions[j].asset.dataValues.product
							.Description
						? dispatchData[i].asset_transactions[j].asset.dataValues.product
								.Description
						: ''
					: '',
				UOM: dispatchData[i].asset_transactions[j].asset
					? dispatchData[i].asset_transactions[j].asset.dataValues.product.UOM
						? dispatchData[i].asset_transactions[j].asset.dataValues.product.UOM
						: ''
					: '',
				Barcode: dispatchData[i].asset_transactions[j].asset
					? dispatchData[i].asset_transactions[j].asset.Barcode
						? dispatchData[i].asset_transactions[j].asset.Barcode
						: ''
					: '',
				Manufacturer: dispatchData[i].asset_transactions[j].asset
					? dispatchData[i].asset_transactions[j].asset.Manufacturer
						? dispatchData[i].asset_transactions[j].asset.Manufacturer
						: ''
					: '',
				Serial_Number: dispatchData[i].asset_transactions[j].asset
					? Number(dispatchData[i].asset_transactions[j].asset.Serial_Number)
						? Number(dispatchData[i].asset_transactions[j].asset.Serial_Number)
						: ''
					: '',
				Model: dispatchData[i].asset_transactions[j].asset
					? dispatchData[i].asset_transactions[j].asset.Model
						? dispatchData[i].asset_transactions[j].asset.Model
						: ''
					: '',
				AMC_Expiry: dispatchData[i].asset_transactions[j].asset
					? dispatchData[i].asset_transactions[j].asset.AMC_Expiry
						? dispatchData[i].asset_transactions[j].asset.AMC_Expiry
						: ''
					: '',
				AMC_Vendor: dispatchData[i].asset_transactions[j].asset
					? dispatchData[i].asset_transactions[j].asset.AMC_Vendor
						? dispatchData[i].asset_transactions[j].asset.AMC_Vendor
						: ''
					: '',
				Product_Expiry: dispatchData[i].asset_transactions[j].asset
					? dispatchData[i].asset_transactions[j].asset.Product_Expiry
						? dispatchData[i].asset_transactions[j].asset.Product_Expiry
						: ''
					: '',

				User_Type: dispatchData[i].dataValues.User_Type,
				Remark: dispatchData[i].asset_transactions[j].Remark,
				User_Name: dispatchData[i].asset_transactions[j].User_Name,
				Dispatch_By: dispatchData[i].dataValues.Dispatch_By,
			};
			dispatchDataList.push(dispatchDataItem);
			count = count + 1;
		}
	}
	const dataset = dispatchDataList;

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
	res.attachment('Dispatch.xlsx');
	return res.send(report);
	// if (dispatchDataList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: dispatchDataList,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});

// @desc Get tracking assets
// @route POST /api/dispatch/trackEmployee
// @access public
exports.trackEmployee = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		// const { limit, offset } = getPagination(
		// 	req.body.pageNumber,
		// 	req.body.numberOfRows
		// );
		const userType = req.user.User_Type;

		let condition = {};
		if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
			condition.Asset_Holder = process.env.DEPT_IT;
		} else if (
			userType == process.env.ADMIN ||
			userType == process.env.ADMIN_SYSTEM_ADMIN
		) {
			condition.Asset_Holder = process.env.DEPT_ADMIN;
		}

		const trackEmployee = await db.dispatch.findAll({
			// limit,
			// offset,
			attributes: {
				exclude: ['User_Type', 'Created_At', 'Updated_At', 'Deleted_At'],
			},
			include: [
				{
					model: db.asset_transaction,
					attributes: {
						exclude: ['Created_At', 'Updated_At', 'Deleted_At'],
					},
					where: {
						User_Name: req.body.Username,
					},
					include: [
						{
							model: db.location,
							as: 'fromLocation',
							attributes: ['Name'],
						},
						{
							model: db.location,
							as: 'toLocation',
							attributes: ['Name'],
						},
						{
							model: db.asset,
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
							],
							include: [
								{
									model: db.products,
									where: condition,
									attributes: ['ALT_Code', 'Name', 'Description', 'UOM'],
								},
							],
						},
					],
				},
			],
		});
		if (trackEmployee.length == 0) {
			return next(new ErrorResponse(`employee details not found.`, 500));
		}
		res.status(200).json({
			success: true,
			data: trackEmployee,
		});
		// if (trackEmployee) {
		// 	let { total, data, totalPages, currentPage } = getPagingData(
		// 		trackEmployee,
		// 		req.body.pageNumber,
		// 		req.body.numberOfRows
		// 	);
		// 	res.status(200).json({
		// 		error: false,
		// 		total,
		// 		data,
		// 		totalPages,
		// 		currentPage,
		// 	});
		// } else {
		// 	res.status(200).json({
		// 		error: false,
		// 		data: {},
		// 	});
		// }
	}
});

// @desc get track Employee export
// @route POST /api/units/trackEmployeeExport
// @access public
exports.getTrackEmployeeExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [
		[{ value: 'Track Employee Report', style: styles.topHeader }],
	];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Gate_Pass_No: {
			displayName: 'Gate Pass No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Date: {
			displayName: 'Date',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 200,
		},
		Type_Of_Issue: {
			displayName: 'Type Of Issue',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		From_Location: {
			displayName: 'From Location',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		From_Department: {
			displayName: 'From Department',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		From_Cost_Center: {
			displayName: 'From Cost Center',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		To_Location: {
			displayName: 'To Location',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		To_Department: {
			displayName: 'To Department',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		To_Cost_Center: {
			displayName: 'To Cost Center',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		ALT_Code: {
			displayName: 'ALT Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Product_Name: {
			displayName: 'Item Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Description: {
			displayName: 'Description',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		UOM: {
			displayName: 'UOM',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
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
			width: 200,
		},
		AMC_Expiry: {
			displayName: 'AMC Expiry',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 200,
		},
		AMC_Vendor: {
			displayName: 'AMC Vendor',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Product_Warranty: {
			displayName: 'Product Warranty',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 200,
		},
		Collected_By: {
			displayName: 'Collected By',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Mode_Of_Transport: {
			displayName: 'Mode Of Transport',
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
		Username: {
			displayName: 'Username',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
	};

	const userType = req.user.User_Type;

	let condition = {};
	if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.DEPT_IT;
	} else if (
		userType == process.env.ADMIN ||
		userType == process.env.ADMIN_SYSTEM_ADMIN
	) {
		condition.Asset_Holder = process.env.DEPT_ADMIN;
	}

	const trackEmployee = await db.dispatch.findAll({
		// limit,
		// offset,
		attributes: {
			exclude: ['User_Type', 'Created_At', 'Updated_At', 'Deleted_At'],
		},
		order: [
			['Dated_On', 'DESC'],
			['ID', 'DESC'],
		],
		include: [
			{
				model: db.asset_transaction,
				attributes: {
					exclude: ['Created_At', 'Updated_At', 'Deleted_At'],
				},
				where: {
					User_Name: req.body.Username,
				},
				include: [
					{
						model: db.location,
						as: 'fromLocation',
						attributes: ['Name'],
					},
					{
						model: db.location,
						as: 'toLocation',
						attributes: ['Name'],
					},
					{
						model: db.asset,
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
						],
						include: [
							{
								model: db.products,
								where: condition,
								attributes: ['ALT_Code', 'Name', 'Description', 'UOM'],
							},
						],
					},
				],
			},
		],
	});
	let trackEmployeeList = [];
	let count = 1;
	for (let i = 0; i < trackEmployee.length; i++) {
		assetTXNData = trackEmployee[i].dataValues.asset_transactions;
		for (let j = 0; j < assetTXNData.length; j++) {
			trackEmployeeItem = {
				Sr_No: count,
				Gate_Pass_No: trackEmployee[i].dataValues.Gate_Pass_No,
				Date: trackEmployee[i].dataValues.Dated_On,
				Type_Of_Issue: trackEmployee[i].dataValues.Type_Of_Issue
					? trackEmployee[i].dataValues.Type_Of_Issue
					: ' ',

				From_Location: assetTXNData[j].fromLocation.Name,
				From_Department: assetTXNData[j].Location_From_Department
					? assetTXNData[j].Location_From_Department
					: ' ',
				From_Cost_Center: assetTXNData[j].Location_From_Cost_Center
					? assetTXNData[j].Location_From_Cost_Center
					: ' ',
				To_Location: assetTXNData[j].toLocation.Name,
				To_Department: assetTXNData[j].Location_To_Department
					? assetTXNData[j].Location_To_Department
					: ' ',
				To_Cost_Center: assetTXNData[j].Location_To_Cost_Center
					? assetTXNData[j].Location_To_Cost_Center
					: ' ',
				ALT_Code: assetTXNData[j].asset.product.ALT_Code
					? assetTXNData[j].asset.product.ALT_Code
					: ' ',
				Product_Name: assetTXNData[j].asset.product.Name
					? assetTXNData[j].asset.product.Name
					: ' ',
				Description: assetTXNData[j].asset.product.Description
					? assetTXNData[j].asset.product.Description
					: ' ',
				UOM: assetTXNData[j].asset.product.UOM
					? assetTXNData[j].asset.product.UOM
					: ' ',
				Barcode: assetTXNData[j].asset.Barcode
					? assetTXNData[j].asset.Barcode
					: ' ',
				Manufacturer: assetTXNData[j].asset.Manufacturer
					? assetTXNData[j].asset.Manufacturer
					: ' ',
				Serial_Number: assetTXNData[j].asset.Serial_Number
					? Number(assetTXNData[j].asset.Serial_Number)
					: ' ',
				Model: assetTXNData[j].asset.Model ? assetTXNData[j].asset.Model : ' ',
				AMC_Expiry: assetTXNData[j].asset.AMC_Expiry
					? assetTXNData[j].asset.AMC_Expiry
					: ' ',
				AMC_Vendor: assetTXNData[j].asset.AMC_Vendor
					? assetTXNData[j].asset.AMC_Vendor
					: ' ',
				Product_Warranty: assetTXNData[j].asset.Product_Expiry
					? assetTXNData[j].asset.Product_Expiry
					: ' ',

				Collected_By: assetTXNData[j].Collected_By
					? assetTXNData[j].Collected_By
					: ' ',
				Mode_Of_Transport: assetTXNData[j].Mode_Of_Transport
					? assetTXNData[j].Mode_Of_Transport
					: ' ',
				Remark: assetTXNData[j].Remark ? assetTXNData[j].Remark : ' ',
				Username: assetTXNData[j].User_Name ? assetTXNData[j].User_Name : ' ',
			};
			trackEmployeeList.push(trackEmployeeItem);
			count = count + 1;
		}
	}
	const dataset = trackEmployeeList;

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
	res.attachment('Track_Employee.xlsx');
	return res.send(report);
	// if (trackEmployeeList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: trackEmployeeList,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
// @desc get search inwards
// @route POST /api/asset/getSearchAssets
// @access public
exports.searchEmployee = asyncHandler(async (req, res, next) => {
	// const errors = validateInput(req);
	// if (!errors.isEmpty()) {
	// 	return res.status(200).jsonp({ error: true, data: errors.array() });
	// } else {
	let userType = req.user.User_Type;
	let condition = {
		User_Name: { [Op.like]: `${req.body.search}%` },
	};
	let testCondition = {};

	if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
		testCondition.User_Type = process.env.DEPT_IT;
	} else if (
		userType == process.env.ADMIN ||
		userType == process.env.ADMIN_SYSTEM_ADMIN
	) {
		testCondition.User_Type = process.env.DEPT_ADMIN;
	}
	const searchEmployee = await db.asset_transaction.findAll({
		where: condition,
		attributes: [
			[db.Sequelize.fn('DISTINCT', db.Sequelize.col('User_Name')), 'User_Name'],
			// 'ID',
		],
		include: [
			{
				model: db.dispatch,
				where: testCondition,
				attributes: {
					exclude: [
						'ID',
						'Gate_Pass_No',
						'Dated_On',
						'From_Location',
						'To_Location',
						'Type_Of_Issue',
						'Department',
						'Cost_Center',
						'Collected_By',
						'Mode_Of_Transport',
						'Quantity',
						'File_Name',
						'User_Type',
						'Dispatch_By',
						'Created_At',
						'Updated_At',
						'Deleted_At',
					],
				},
			},
		],
		group: ['User_Name'],
	});

	if (searchEmployee) {
		res.status(200).json({
			error: false,
			data: searchEmployee,
		});
	} else {
		res.status(200).json({
			error: false,
			data: {},
		});
	}
	// }
});
