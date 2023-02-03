const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const bcrypt = require('bcryptjs');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');
const EmailSender = require('../utils/sendEmail');
const { request } = require('express');
const getCurrentFinancialYear = require('../utils/get_financial_year');
const excel = require('node-excel-export');
const { stylesData } = require('../utils/style');

function hashString(length) {
	var result = '';
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

async function getNextRequestNumber(req, requestPrefix) {
	//For autogenerating invoice no
	var nextID;
	const data = await db.request.findOne({
		paranoid: false,
		attributes: ['ID'],
		order: [['ID', 'DESC']],
	});

	if (data == null) {
		nextID = 1;
	} else {
		nextID = data['dataValues']['ID'] + 1;
	}
	// let twoDigitYear = getCurrentFinancialYear();
	// return `${requestPrefix}${twoDigitYear}/${String(nextID).padStart(6, '0')}`;
	return `${String(nextID).padStart(6, '0')}`;
}
// @desc add raise procurement request
// @route POST /api/request/addRequest
// @access public
exports.addRequest = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		// let requestPrefix;
		// if (req.body.Request_Department === process.env.DEPT_ADMIN) {
		// 	requestPrefix = `${process.env.PREFIX}/${process.env.DEPT_ADMIN}/`;
		// } else if (req.body.Request_Department === process.env.DEPT_IT) {
		// 	requestPrefix = `${process.env.PREFIX}/${process.env.DEPT_IT}/`;
		// } else {
		// 	return next(new ErrorResponse(`Invalid department`, 404));
		// }
		let nextRequestNumber = await getNextRequestNumber(req);
		req.body.User_ID = req.user.ID;
		req.body.Request_Number = nextRequestNumber;

		let productsData = req.body.products;

		let requestItems = [];
		let requestData;
		let isVerified;
		let requestAmmount = 0.0;
		for (let i = 0; i < productsData.length; i++) {
			let getProductsData = await db.products.findOne({
				where: {
					ID: productsData[i].ID,
				},
			});

			if (
				productsData[i].Price == getProductsData.dataValues.Price &&
				productsData[i].TAX_Percentage ==
					getProductsData.dataValues.TAX_Percentage
			) {
				let calTAXValue =
					(parseFloat(productsData[i].TAX_Percentage) *
						(parseFloat(productsData[i].Price) *
							parseInt(productsData[i].Quantity))) /
					100;
				productsData[i].TAX_Value = calTAXValue;

				requestAmmount =
					parseFloat(requestAmmount) +
					(parseFloat(productsData[i].Price) *
						parseInt(productsData[i].Quantity) +
						calTAXValue);

				isVerified = true;
			} else {
				isVerified = false;
				break;
			}
		}
		req.body.Request_Amount = requestAmmount;
		let requesterData = await db.user.findOne({
			where: {
				ID: req.user.ID,
			},
		});
		if (requestAmmount > process.env.AMOUNT) {
			if (
				requesterData.dataValues.HOD == 0 &&
				requesterData.dataValues.HEAD == 0
			) {
				return next(new ErrorResponse(`HOD and Head is not configured.`, 500));
			}
		} else {
			if (requesterData.dataValues.HOD == 0) {
				return next(new ErrorResponse(`HOD is not configured.`, 500));
			}
		}

		let request;

		if (isVerified === true) {
			req.body.HOD_Hash_ID = hashString(process.env.HASH_LENGTH);

			if (requestAmmount > process.env.AMOUNT) {
				req.body.Head_Hash_ID = hashString(process.env.HASH_LENGTH);
			}
			request = await db.request.create(req.body);

			let getProductData = await productsData.map(async (item) => {
				requestData = {
					Request_ID: request.ID,
					Product_ID: item.ID,
					Quantity: parseInt(item.Quantity),
					UOM: item.UOM,
					Per_Unit_Price: parseFloat(item.Price),
					Total_Price: parseFloat(item.Price) * parseInt(item.Quantity),
					TAX_Percentage: parseFloat(item.TAX_Percentage),
					TAX_Value: item.TAX_Value,
					Sub_Total:
						parseFloat(item.Price) * parseInt(item.Quantity) + item.TAX_Value,
					Created_By: req.user.ID,
				};
				requestItems.push(requestData);
			});

			let requestItemsList = await db.request_items.bulkCreate(requestItems);
			if (process.env.EMAIL_FLAG) {
				const findHodEmail = await db.user.findOne({
					where: {
						ID: req.user.HOD,
					},
				});

				let hodEmail = findHodEmail.dataValues.Email;
				if (hodEmail) {
					new EmailSender().sendApprovalEmail(
						hodEmail,
						request.ID,
						request.Request_Number,
						req.body.HOD_Hash_ID
					);
				}
			}
			return res.status(200).json({
				success: true,
				message: 'Your request submitted.',
			});
		} else {
			return next(new ErrorResponse(`Product details are wrong.`, 500));
		}
	}
});
// @desc update raise procurement request
// @route POST /api/request/updateRequest
// @access public
exports.updateRequest = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let userType = req.user.User_Type;
		let condition = { ID: req.body.id };
		if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
			condition.Request_Department = process.env.DEPT_IT;
		} else if (
			userType == process.env.ADMIN ||
			userType == process.env.ADMIN_SYSTEM_ADMIN
		) {
			condition.Request_Department = process.env.DEPT_ADMIN;
		}
		let requestItem = await db.request.findOne({
			where: condition,
		});
		if (requestItem) {
			// req.body.User_ID = req.user.ID;

			let productsData = req.body.products;

			let requestItems = [];
			let requestData;
			let isVerified;
			let requestAmmount = 0.0;
			for (let i = 0; i < productsData.length; i++) {
				let getProductsData = await db.products.findOne({
					where: {
						ID: productsData[i].Product_ID,
					},
				});

				if (
					productsData[i].Price == getProductsData.dataValues.Price ||
					productsData[i].TAX_Percentage ==
						getProductsData.dataValues.TAX_Percentage
				) {
					let calTAXValue =
						(parseFloat(getProductsData.dataValues.TAX_Percentage) *
							(parseFloat(getProductsData.dataValues.Price) *
								parseInt(productsData[i].Quantity))) /
						100;
					productsData[i].TAX_Value = calTAXValue;

					requestAmmount =
						parseFloat(requestAmmount) +
						(parseFloat(getProductsData.dataValues.Price) *
							parseInt(productsData[i].Quantity) +
							calTAXValue);

					isVerified = true;
				} else {
					isVerified = false;
					break;
				}
			}
			req.body.Request_Amount = requestAmmount;
			req.body.Updated_At = new Date();
			let request;

			if (isVerified === true) {
				request = await db.request.update(req.body, {
					where: {
						ID: req.body.id,
					},
				});

				await productsData.map(async (item) => {
					let getProductsData = await db.products.findOne({
						where: {
							ID: item.Product_ID,
						},
					});
					let calTAXValue =
						(parseFloat(getProductsData.dataValues.TAX_Percentage) *
							(parseFloat(getProductsData.dataValues.Price) *
								parseInt(item.Quantity))) /
						100;
					requestData = {
						Quantity: parseInt(item.Quantity),
						Total_Price: parseFloat(item.Price) * parseInt(item.Quantity),
						Sub_Total:
							parseFloat(item.Price) * parseInt(item.Quantity) + calTAXValue,
						TAX_Percentage: getProductsData.dataValues.TAX_Percentage,
						TAX_Value: calTAXValue,
						Updated_At: new Date(),
					};
					await db.request_items.update(requestData, {
						where: {
							ID: item.ID,
							Product_ID: item.Product_ID,
						},
					});
				});
				if (process.env.EMAIL_FLAG) {
					const getRequest = await db.request.findOne({
						where: {
							ID: req.body.id,
						},
					});
					const findUser = await db.user.findOne({
						where: {
							ID: getRequest.dataValues.User_ID,
						},
					});
					let userEmail = findUser.dataValues.Email;

					if (userEmail && req.body.Status == 'Dispatched') {
						new EmailSender().requestDispatchedEmail(
							userEmail,
							getRequest.dataValues.Request_Number
						);
					}
				}
				return res.status(200).json({
					success: true,
					message: `Request status changed to ${
						req.body.Status == 'Ready To Dispatch'
							? 'Ready To Dispatch'
							: 'Dispatched'
					}`,
				});
			} else {
				return next(new ErrorResponse(`Product details are wrong.`, 404));
			}
		} else {
			return next(new ErrorResponse(`Request not found`, 404));
		}
	}
});

// @desc Register user
// @route POST /api/request/addRequestForService
// @access public
exports.addRequestForService = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let requestPrefix;
		if (req.body.Request_Department === process.env.DEPT_ADMIN) {
			requestPrefix = `${process.env.PREFIX}/${process.env.DEPT_ADMIN}/`;
		} else if (req.body.Request_Department === process.env.DEPT_IT) {
			requestPrefix = `${process.env.PREFIX}/${process.env.DEPT_IT}/`;
		} else {
			return next(new ErrorResponse(`Invalid department`, 404));
		}
		let nextRequestNumber = await getNextRequestNumber(req, requestPrefix);
		req.body.Request_Number = nextRequestNumber;
		req.body.Created_By = req.user.ID;
		req.body.User_ID = req.user.ID;
		req.body.HOD_Approved = 1;
		req.body.HOD_Approved_Date = new Date();
		req.body.Head_Approved = 1;
		req.body.Head_Approved_Date = new Date();
		if (req.body.Request_Type == 'Service Request') {
			const requestForService = await db.request.create(req.body);
			res.status(200).json({
				success: true,
				message: `Your request submitted.`,
			});
		}
	}
});

// @desc Register user
// @route POST /api/request/changeRequestStatus
// @access public
exports.changeRequestStatus = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		req.body.User_ID = req.user.ID;
		let productsData = req.body.products;

		let requestItems = [];
		let requestData;
		let isVerified;
		let requestAmmount = 0;

		for (let i = 0; i < productsData.length; i++) {
			let getProductsData = await db.products.findOne({
				where: {
					ID: productsData[i].ID,
				},
			});

			if (
				productsData[i].Price == getProductsData.dataValues.Price &&
				productsData[i].TAX_Percentage ==
					getProductsData.dataValues.TAX_Percentage
			) {
				let calTAXValue =
					(parseFloat(productsData[i].TAX_Percentage) *
						(parseFloat(productsData[i].Price) *
							parseInt(productsData[i].Quantity))) /
					100;
				productsData[i].TAX_Value = calTAXValue;

				requestAmmount =
					requestAmmount +
					(parseFloat(productsData[i].Price) *
						parseInt(productsData[i].Quantity) +
						calTAXValue);

				isVerified = true;
			} else {
				isVerified = false;
				break;
			}
		}

		req.body.Request_Amount = requestAmmount;
		req.body.Status = req.body.status;

		if (isVerified === true) {
			let request = await db.request.update(req.body, {
				where: {
					ID: req.body.id,
				},
			});

			let getProductData = await productsData.map(async (item) => {
				requestData = {
					Product_ID: item.ID,
					Quantity: parseInt(item.Quantity),
					UOM: item.UOM,
					Per_Unit_Price: parseFloat(item.Price),
					Total_Price:
						parseFloat(productsData[i].Price) *
						parseInt(productsData[i].Quantity),
					TAX_Percentage: parseFloat(item.TAX_Percentage),
					TAX_Value: item.TAX_Value,
					Sub_Total:
						parseFloat(productsData[i].Price) *
							parseInt(productsData[i].Quantity) +
						item.TAX_Value,
					Created_By: req.user.ID,
				};
				requestItems.push(requestData);
			});

			let requestItemsList = await db.request_items.update(requestItems, {
				where: {
					Request_ID: req.body.id,
				},
			});

			if (process.env.EMAIL_FLAG) {
				const getRequest = await db.request.findOne({
					where: {
						ID: req.body.id,
					},
				});
				const findUser = await db.user.findOne({
					where: {
						ID: req.user.ID,
					},
				});
				let userEmail = findUser.dataValues.Email;

				if (userEmail && req.body.Status == 'Dispatched') {
					new EmailSender().requestDispatchedEmail(
						userEmail,
						getRequest.dataValues.Request_Number
					);
				}
			}
			return res.status(200).json({
				success: true,
				message: `Request status changed to ${req.body.Status}`,
			});
		} else {
			return next(new ErrorResponse(`Product details are wrong.`, 404));
		}
	}
});
// @desc Register user
// @route POST /api/request/changeRequestStatus
// @access public
exports.markRequestAsDispatch = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		// req.body.User_ID = req.user.ID;
		req.body.Status = process.env.DISPATCHED;
		let request = await db.request.update(req.body, {
			where: {
				ID: req.body.id,
			},
		});

		if (process.env.EMAIL_FLAG) {
			const getRequest = await db.request.findOne({
				where: {
					ID: req.body.id,
				},
			});
			const findRequester = await db.user.findOne({
				where: {
					ID: getRequest.dataValues.User_ID,
				},
			});
			let requesterEmail = findRequester.dataValues.Email;

			if (requesterEmail && req.body.Status == 'Dispatched') {
				new EmailSender().requestDispatchedEmail(
					requesterEmail,
					getRequest.dataValues.Request_Number
				);
			}
		}
		return res.status(200).json({
			success: true,
			message: `Request status changed to ${
				req.body.Status == 'Ready To Dispatch'
					? 'Ready To Dispatch'
					: 'Dispatched'
			}`,
		});
	}
});

// @desc Register user
// @route POST /api/request/deleteRequest
// @access public
// exports.deleteRequest = asyncHandler(async (req, res, next) => {
// 	const errors = validateInput(req);
// 	if (!errors.isEmpty()) {
// 		return res.status(200).jsonp({ error: true, data: errors.array() });
// 	} else {
// 		const request = await db.request.destroy({
// 			where: {
// 				ID: req.body.id,
// 			},
// 		});
// 		const request_items = await db.request_items.destroy({
// 			where: {
// 				Request_ID: req.body.id,
// 			},
// 		});

// 		if (request === 0) {
// 			return next(new ErrorResponse(`Request Details not found`, 404));
// 		}

// 		res.status(200).json({
// 			success: true,
// 			message: `Request deleted`,
// 			data: [request, request_items],
// 		});
// 	}
// });

// @desc Register user
// @route POST /api/request/getRequest
// @access public
exports.getRequest = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		const userType = req.user.User_Type;
		let condition = { ID: req.body.id };
		let approveCondition = {
			// Request_Type: {
			// 	[Op.eq]: `${req.body.Request_Type}`,
			// },
			ID: req.body.id,
			Status: {
				[Op.eq]: process.env.OPEN,
			},
			[Op.or]: [
				{
					[Op.and]: [
						{ HOD_Approved: 0 },
						{
							[Op.or]: [{ Head_Approved: 0 }, { Head_Approved: 1 }],
						},
					],
				},
				{
					[Op.and]: [{ HOD_Approved: 1 }, { Head_Approved: 0 }],
				},
			],

			// [Op.or]: [process.env.OPEN, process.env.IN_PROGRESS],
		};
		if (userType == process.env.REQUESTER) {
			condition.User_ID = req.user.ID;
		} else if (
			userType == process.env.IT ||
			userType == process.env.IT_SYSTEM_ADMIN
		) {
			condition.Request_Department = process.env.DEPT_IT;
			approveCondition.Request_Department = process.env.DEPT_IT;
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		} else if (
			userType == process.env.ADMIN ||
			userType == process.env.ADMIN_SYSTEM_ADMIN
		) {
			condition.Request_Department = process.env.DEPT_ADMIN;
			approveCondition.Request_Department = process.env.DEPT_ADMIN;
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		} else if (userType == process.env.SUPPORT) {
			condition.Assigned_To = req.user.ID;
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		}

		let locationID;
		if (req.body.Location_ID) {
			locationID = req.body.Location_ID;
		} else {
			let requestData = await db.request.findOne({
				where: {
					ID: req.body.id,
				},
			});
			locationID = requestData.dataValues.Location_ID;
		}
		//demy code add
		let approvalRequest = await db.request.findOne({
			where: {
				ID: req.body.id,
				HOD_Approved: {
					[Op.ne]: 1,
				},
				Head_Approved: {
					[Op.ne]: 1,
				},
			},
			attributes: ['ID'],
		});
		//demy code end
		let request;
		if (approvalRequest != null) {
			request = await db.request.findOne({
				where: approveCondition,
				include: [
					{
						model: db.request_items,
						include: [
							{
								model: db.products,
								attributes: [
									'ALT_Code',
									'Name',
									['ID', 'Product_ID'],
									[
										db.sequelize.literal(
											'(SELECT COUNT(IF(Barcode, 1, 0)) FROM assets where assets.Product_ID =  `request_items.product.Product_ID` AND assets.Deleted_At IS NULL and assets.Status = "' +
												process.env.UNASSIGNED +
												'" and Current_Location = "' +
												locationID +
												'")'
										),
										'AvailableQuantity',
									],
								],
								// include: [
								// 	{
								// 		model: db.asset,
								// 		as: 'assets',
								// 		where: {
								// 			Current_Location: {
								// 				[Op.eq]: locationID,
								// 			},
								// 			Status: process.env.UNASSIGNED,
								// 		},
								// 		attributes: [
								// 			// 'ID',
								// 			// 'Product_ID',
								// 			'Barcode',
								// 			// 'Status',
								// 			// 'Current_Location',
								// 			// 'Current_Department',
								// 			// 'Current_Cost_Center',
								// 			// [db.sequelize.fn('COUNT', 'Product_ID'), 'ProductQuantity'],
								// 			// [
								// 			// 	db.sequelize.literal("count(IF(Status = 'Unassigned', 1, NULL))"),
								// 			// 	'AvailableQuantity',
								// 			// ],
								// 			// [
								// 			// 	db.sequelize.literal(
								// 			// 		'(SELECT COUNT(IF(Barcode, 1, 0)) FROM assets where assets.Product_ID =  `request_items.product.Product_ID` AND assets.Deleted_At IS NULL)'
								// 			// 	),
								// 			// 	'AvailableQuantity',
								// 			// ],
								// 		],
								// 		required: false,
								// 	},
								// ],
							},
						],
					},
					{
						model: db.user,
						attributes: [
							'ID',
							'Name',
							'HOD',
							'HEAD',
							'Department',
							'Cost_Center',
						],
					},
					{
						model: db.location,
						attributes: ['Name'],
					},
					{
						model: db.issue_type,
						attributes: ['Name'],
					},
					{
						model: db.user,
						as: 'assignUser',
						attributes: ['ID', 'Name'],
					},
				],
			});
		} else {
			request = await db.request.findOne({
				where: condition,
				include: [
					{
						model: db.request_items,
						include: [
							{
								model: db.products,
								attributes: [
									'ALT_Code',
									'Name',
									['ID', 'Product_ID'],
									[
										db.sequelize.literal(
											'(SELECT COUNT(IF(Barcode, 1, 0)) FROM assets where assets.Product_ID =  `request_items.product.Product_ID` AND assets.Deleted_At IS NULL and assets.Status = "' +
												process.env.UNASSIGNED +
												'" and Current_Location = "' +
												locationID +
												'")'
										),
										'AvailableQuantity',
									],
								],
								// include: [
								// 	{
								// 		model: db.asset,
								// 		as: 'assets',
								// 		where: {
								// 			Current_Location: {
								// 				[Op.eq]: locationID,
								// 			},
								// 			Status: process.env.UNASSIGNED,
								// 		},
								// 		attributes: [
								// 			// 'ID',
								// 			// 'Product_ID',
								// 			'Barcode',
								// 			// 'Status',
								// 			// 'Current_Location',
								// 			// 'Current_Department',
								// 			// 'Current_Cost_Center',
								// 			// [db.sequelize.fn('COUNT', 'Product_ID'), 'ProductQuantity'],
								// 			// [
								// 			// 	db.sequelize.literal("count(IF(Status = 'Unassigned', 1, NULL))"),
								// 			// 	'AvailableQuantity',
								// 			// ],
								// 		],
								// 		required: false,
								// 	},
								// ],
							},
						],
					},
					{
						model: db.user,
						attributes: [
							'ID',
							'Name',
							'HOD',
							'HEAD',
							'Department',
							'Cost_Center',
						],
					},
					{
						model: db.location,
						attributes: ['Name'],
					},
					{
						model: db.issue_type,
						attributes: ['Name'],
					},
					{
						model: db.user,
						as: 'assignUser',
						attributes: ['ID', 'Name'],
					},
				],
			});
		}

		if (request == null) {
			return next(new ErrorResponse(`Request not found`, 500));
		}

		let HODDetails = await db.user.findOne({
			where: {
				ID: request.user.HOD,
			},
			attributes: ['Name'],
		});
		let HEADDetails = await db.user.findOne({
			where: {
				ID: request.user.HEAD,
			},
			attributes: ['Name'],
		});
		request.dataValues.HODName = HODDetails.dataValues.Name;
		request.dataValues.HEADName = HEADDetails.dataValues.Name;

		if (request) {
			res.status(200).json({
				success: true,
				data: request,
			});
		} else {
			return next(new ErrorResponse(`Request not found`, 500));
		}
	}
});

exports.approveRequestByAdmin = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let ID = req.body.id;
		const updateRequest = await db.request.update(
			{
				HOD_Approved: 1,
				HOD_Approved_Date: new Date(),
				Head_Approved: 1,
				Head_Approved_Date: new Date(),
			},
			{
				where: {
					ID: ID,
				},
			}
		);
		res.status(200).json({
			success: true,
			message: `Request Approved successfully.`,
		});
	}
});

// @desc Register user
// @route POST /api/request/getRequests
// @access public
exports.getRequests = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let flag = 0;
		const userType = req.user.User_Type;
		const { limit, offset } = getPagination(
			req.body.pageNumber,
			req.body.numberOfRows
		);
		let condition = {
			Request_Type: {
				[Op.eq]: `${req.body.Request_Type}`,
			},
			Request_Number: {
				[Op.like]: `${req.body.search}%`,
			},
		};
		let approveCondition = {
			Request_Type: {
				[Op.eq]: `${req.body.Request_Type}`,
			},
			Request_Number: {
				[Op.like]: `${req.body.search}%`,
			},
			Status: {
				[Op.eq]: process.env.OPEN,
			},
			[Op.or]: [
				{
					[Op.and]: [
						{ HOD_Approved: 0 },
						{
							[Op.or]: [{ Head_Approved: 0 }, { Head_Approved: 1 }],
						},
					],
				},
				{
					[Op.and]: [{ HOD_Approved: 1 }, { Head_Approved: 0 }],
				},
			],

			// [Op.or]: [process.env.OPEN, process.env.IN_PROGRESS],
		};
		//((HOD_Approved = '0' and (Head_Approved='1' OR Head_Approved = '0')) OR (HOD_Approved = '1' and Head_Approved = '0'))

		if (userType == process.env.REQUESTER) {
			condition.User_ID = req.user.ID;
		} else if (
			userType == process.env.IT ||
			userType == process.env.IT_SYSTEM_ADMIN
		) {
			condition.Request_Department = process.env.DEPT_IT;
			approveCondition.Request_Department = process.env.DEPT_IT;
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		} else if (
			userType == process.env.ADMIN ||
			userType == process.env.ADMIN_SYSTEM_ADMIN
		) {
			condition.Request_Department = process.env.DEPT_ADMIN;
			approveCondition.Request_Department = process.env.DEPT_ADMIN;
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		} else if (userType == process.env.SUPPORT) {
			flag = 1;
			condition.Assigned_To = req.user.ID;
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		} else if (userType == process.env.SYSTEM_ADMIN) {
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		}

		if (
			(userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) &&
			req.body.approval == true
		) {
			approveCondition.Request_Department = process.env.DEPT_IT;
		} else if (
			(userType == process.env.ADMIN ||
				userType == process.env.ADMIN_SYSTEM_ADMIN) &&
			req.body.approval == true
		) {
			approveCondition.Request_Department = process.env.DEPT_ADMIN;
		}

		//(HOD_Approved = '0' and (Head_Approved='1' OR Head_Approved = '0')) OR (HOD_Approved = '1' and Head_Approved = '0'))
		if (req.body.Status != '') {
			if (req.body.Request_Type == process.env.SERVICEREQUEST) {
				var today = new Date();
				today.setDate(today.getDate() - 3); //number of days to add, e.x. 3 days
				var dateFormated = today.toISOString().substr(0, 10);

				if (req.body.Status === process.env.OPEN) {
					if (flag == 1) {
						condition.Status = process.env.OPEN;
					} else {
						condition.Status = {
							[Op.or]: [process.env.OPEN, process.env.IN_PROGRESS],
						};
						condition.Request_Date = {
							[Op.gte]: Date.parse(dateFormated),
						};
					}
					// condition.Request_Date = {
					// 	[Op.gte]: Date.parse(dateFormated),
					// };
				} else if (req.body.Status === 'Overdue') {
					// condition.Status = process.env.OPEN;
					condition.Status = {
						[Op.or]: [process.env.OPEN, process.env.IN_PROGRESS],
					};
					condition.Request_Date = {
						[Op.lt]: Date.parse(dateFormated),
					};
				} else {
					condition.Status = req.body.Status;
				}
			} else {
				condition.Status = req.body.Status;
			}
		}
		let requests;
		if (userType == process.env.REQUESTER) {
			requests = await db.request.findAndCountAll({
				where: condition,
				limit,
				offset,
				order: [
					['Request_Date', 'DESC'],
					['ID', 'DESC'],
				],
				include: [
					{
						model: db.request_items,
						attributes: [
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
								attributes: ['ALT_Code', 'Name'],
								// include: [
								// 	{
								// 		model: db.asset,
								// 		as: 'assets',
								// 		// where: {
								// 		// 	Current_Location: {
								// 		// 		[Op.eq]: `${req.body.From_Location}`,
								// 		// 	},
								// 		// },
								// 		attributes: [
								// 			// 'ID',
								// 			// 'Product_ID',
								// 			// 'Barcode',
								// 			// 'Status',
								// 			// 'Current_Location',
								// 			// 'Current_Department',
								// 			// 'Current_Cost_Center',
								// 			// [db.sequelize.fn('COUNT', 'Product_ID'), 'ProductQuantity'],
								// 			// [
								// 			// 	db.sequelize.literal("count(IF(Status = 'Unassigned', 1, NULL))"),
								// 			// 	'AvailableQuantity',
								// 			// ],
								// 		],
								// 	},
								// ],
							},
						],
					},
					{
						model: db.user,
						attributes: ['Name', 'Department', 'Cost_Center'],
					},
					{
						model: db.location,
						attributes: ['Name'],
					},
					{
						model: db.issue_type,
						attributes: ['Name'],
					},
					{
						model: db.user,
						as: 'assignUser',
						attributes: ['ID', 'Name'],
					},
				],
				distinct: true,
				// order: ['Name'],
			});
		} else if (
			req.body.Status == 'Deviation Approval' &&
			req.body.Request_Type == 'Procurement'
		) {
			requests = await db.request.findAndCountAll({
				where: approveCondition,
				limit,
				offset,
				order: [
					['Request_Date', 'DESC'],
					['ID', 'DESC'],
				],
				include: [
					{
						model: db.request_items,
						attributes: [
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
								attributes: ['ALT_Code', 'Name'],
								// include: [
								// 	{
								// 		model: db.asset,
								// 		as: 'assets',
								// 		// where: {
								// 		// 	Current_Location: {
								// 		// 		[Op.eq]: `${req.body.From_Location}`,
								// 		// 	},
								// 		// },
								// 		attributes: [
								// 			// 'ID',
								// 			// 'Product_ID',
								// 			'Barcode',
								// 			// 'Status',
								// 			// 'Current_Location',
								// 			// 'Current_Department',
								// 			// 'Current_Cost_Center',
								// 			// [db.sequelize.fn('COUNT', 'Product_ID'), 'ProductQuantity'],
								// 			// [
								// 			// 	db.sequelize.literal("count(IF(Status = 'Unassigned', 1, NULL))"),
								// 			// 	'AvailableQuantity',
								// 			// ],
								// 			// [
								// 			// 	db.sequelize.fn('COUNT', 'Barcode'),
								// 			// 	'AvailableQuantity',
								// 			// ],
								// 			// [
								// 			// 	db.sequelize.literal(
								// 			// 		'(SELECT COUNT(IF(Barcode, 1, 0)) FROM assets left outer join products on where assets.Product_ID =  products.ID)'
								// 			// 	),
								// 			// 	'AvailableQuantity',
								// 			// ],
								// 			[
								// 				db.sequelize.literal(
								// 					'(SELECT COUNT(IF(Barcode, 1, 0)) FROM assets where assets.Product_ID =  `request_items.product.Product_ID` AND assets.Deleted_At IS NULL)'
								// 				),
								// 				'AvailableQuantity',
								// 			],
								// 		],
								// 	},
								// ],
							},
						],
					},
					{
						model: db.user,
						attributes: ['Name', 'Department', 'Cost_Center'],
					},
					{
						model: db.location,
						attributes: ['Name'],
					},
					{
						model: db.issue_type,
						attributes: ['Name'],
					},
					{
						model: db.user,
						as: 'assignUser',
						attributes: ['ID', 'Name'],
					},
				],
				distinct: true,
				// order: ['Name'],
			});
		} else {
			requests = await db.request.findAndCountAll({
				where: condition,
				limit,
				offset,
				order: [
					['Request_Date', 'DESC'],
					['ID', 'DESC'],
				],
				include: [
					{
						model: db.request_items,
						attributes: [
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
								attributes: ['ALT_Code', 'Name'],
								// include: [
								// 	{
								// 		model: db.asset,
								// 		as: 'assets',
								// 		// where: {
								// 		// 	Current_Location: {
								// 		// 		[Op.eq]: `${req.body.From_Location}`,
								// 		// 	},
								// 		// },
								// 		attributes: [
								// 			// 'ID',
								// 			// 'Product_ID',
								// 			'Barcode',
								// 			// 'Status',
								// 			// 'Current_Location',
								// 			// 'Current_Department',
								// 			// 'Current_Cost_Center',
								// 			// [db.sequelize.fn('COUNT', 'Product_ID'), 'ProductQuantity'],
								// 			// [
								// 			// 	db.sequelize.literal("count(IF(Status = 'Unassigned', 1, NULL))"),
								// 			// 	'AvailableQuantity',
								// 			// ],
								// 			// [
								// 			// 	db.sequelize.literal(
								// 			// 		"count(IF(Status = 'Unassigned', 1, NULL))"
								// 			// 	),
								// 			// 	'AvailableQuantity',
								// 			// ],
								// 			[
								// 				db.sequelize.literal(
								// 					'(SELECT COUNT(IF(Barcode IS NOT NULL , 1, NULL)) FROM assets LEFT JOIN products ON assets.Product_ID = products.ID)'
								// 				),
								// 				'AvailableQuantity',
								// 			],
								// 			// [
								// 			// 	db.sequelize.fn('COUNT', 'Barcode'),
								// 			// 	'AvailableQuantity',
								// 			// ],
								// 		],
								// 	},
								// ],
							},
						],
					},
					{
						model: db.user,
						attributes: ['Name', 'Department', 'Cost_Center'],
					},
					{
						model: db.location,
						attributes: ['Name'],
					},
					{
						model: db.issue_type,
						attributes: ['Name'],
					},
					{
						model: db.user,
						as: 'assignUser',
						attributes: ['ID', 'Name'],
					},
				],
				distinct: true,
				// order: ['Name'],
			});
		}

		if (requests) {
			let { total, data, totalPages, currentPage } = getPagingData(
				requests,
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
// @route get /api/request/details/:id/:hash
// @access public
exports.getRequestByHash = asyncHandler(async (req, res, next) => {
	let request;

	let id = req.params.id;
	let hashID = req.params.hash;

	let checkHOD = await db.request.findOne({
		where: {
			ID: id,
			HOD_Hash_ID: hashID,
		},
	});
	let checkHead = await db.request.findOne({
		where: {
			ID: id,
			Head_Hash_ID: hashID,
		},
	});

	if (checkHOD !== null) {
		request = await db.request.findOne({
			where: {
				ID: id,
				HOD_Approved: 0,
			},
			include: [
				{
					model: db.user,
					attributes: ['Name'],
				},
				{
					model: db.location,
					attributes: ['Name'],
				},
				{
					model: db.request_items,
					include: [
						{
							model: db.products,
							attributes: ['Name'],
						},
					],
				},
			],
		});
	} else if (checkHead !== null) {
		request = await db.request.findOne({
			where: {
				ID: id,
				Head_Approved: 0,
			},
			include: [
				{
					model: db.user,
					attributes: ['Name'],
				},
				{
					model: db.location,
					attributes: ['Name'],
				},
				{
					model: db.request_items,
					include: [
						{
							model: db.products,
							attributes: ['Name'],
						},
					],
					include: [
						{
							model: db.products,
							attributes: ['Name'],
						},
					],
				},
			],
		});
	}

	let history = await db.request.findAll({
		where: {
			User_ID: request.dataValues.User_ID,
			Request_Type: 'Procurement',
			// Request_Date :
			Request_Number: {
				[Op.ne]: request.dataValues.Request_Number,
			},
			[Op.and]: [
				db.Sequelize.literal(
					`Request_Date > DATE_FORMAT(CURDATE(), '%Y-%m-01') - INTERVAL 3 month`
				),
			],
		},
		order: [['Request_Date', 'DESC']],
		include: [
			{
				model: db.user,
				attributes: ['Name'],
			},
			{
				model: db.location,
				attributes: ['Name'],
			},
			{
				model: db.request_items,
				include: [
					{
						model: db.products,
						attributes: ['Name'],
					},
				],
				include: [
					{
						model: db.products,
						attributes: ['Name'],
					},
				],
			},
		],
	});
	var monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	for (let i = 0; i < history.length; i++) {
		requestDate = new Date(history[i].Request_Date);
		var month = requestDate.getMonth();
		history[i].dataValues.month = monthNames[month];
		history[i].dataValues.monthNo = month + 1;
	}

	if (request) {
		res.status(200).json({
			success: true,
			data: request,
			history: history,
		});
	} else {
		return next(new ErrorResponse(`Request not found`, 404));
	}
});

// @desc Register user
// @route post /api/request/acknowledgeRequestDelivery
// @access public
exports.acknowledgeRequestDelivery = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let id = req.body.id;

		let request = await db.request.update(
			{
				Rating: req.body.rating,
				Requester_Remark: req.body.remark,
				Status: process.env.DELIVERED,
			},
			{
				where: {
					ID: id,
					User_ID: req.user.ID,
				},
			}
		);

		if (request) {
			res.status(200).json({
				success: true,
				message: 'Request Acknowledged.',
			});
		} else {
			return next(new ErrorResponse(`Request not found`, 404));
		}
	}
});
// @desc Register user
// @route post /api/request/ratingRemark
// @access public
exports.ratingRemark = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let id = req.body.id;

		let request = await db.request.update(
			{
				Rating: req.body.rating,
				Requester_Remark: req.body.remark,
				// Status: process.env.RESOLVED,
			},
			{
				where: {
					ID: id,
					User_ID: req.user.ID,
					Request_Type: {
						[Op.eq]: process.env.SERVICEREQUEST,
					},
				},
			}
		);

		if (request == 1) {
			res.status(200).json({
				success: true,
				message: 'Request Rating Added.',
			});
		} else {
			return next(new ErrorResponse(`Request not found`, 500));
		}
	}
});

// @desc Register user
// @route post /api/request/getKPIs
// @access public
exports.getKPIs = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let flag = 0;
		let request;
		const userType = req.user.User_Type;
		let condition = {
			Request_Type: {
				[Op.eq]: `${req.body.Request_Type}`,
			},
		};
		let approveCondition = {
			Request_Type: {
				[Op.eq]: `${req.body.Request_Type}`,
			},
			Status: {
				[Op.eq]: process.env.OPEN,
			},
			[Op.or]: [
				{
					[Op.and]: [
						{ HOD_Approved: 0 },
						{
							[Op.or]: [{ Head_Approved: 0 }, { Head_Approved: 1 }],
						},
					],
				},
				{
					[Op.and]: [{ HOD_Approved: 1 }, { Head_Approved: 0 }],
				},
			],

			// [Op.or]: [process.env.OPEN, process.env.IN_PROGRESS],
		};
		if (userType == process.env.REQUESTER) {
			condition.User_ID = req.user.ID;
		} else if (
			userType == process.env.IT ||
			userType == process.env.IT_SYSTEM_ADMIN
		) {
			condition.Request_Department = process.env.DEPT_IT;
			approveCondition.Request_Department = process.env.DEPT_IT;
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		} else if (
			userType == process.env.ADMIN ||
			userType == process.env.ADMIN_SYSTEM_ADMIN
		) {
			condition.Request_Department = process.env.DEPT_ADMIN;
			approveCondition.Request_Department = process.env.DEPT_ADMIN;
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		} else if (userType == process.env.SUPPORT) {
			condition.Assigned_To = req.user.ID;
			flag = 1;
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		} else if (userType == process.env.SYSTEM_ADMIN) {
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		}

		requestData = [];
		var today = new Date();
		today.setDate(today.getDate() - 3); //number  of days to minus, e.x. 3 days
		var dateFormated = today.toISOString().substr(0, 10);

		if (flag == 1) {
			// console.log('hiiii');
			// request = await db.request.findAll({
			// 	group: [
			// 		db.Sequelize.literal(
			// 			` CASE WHEN Status = 'Open' AND Request_Type = 'Service Request' AND DATE(Request_Date) >= '${dateFormated}' THEN 'Open' WHEN Status = 'Open' AND Request_Type = 'Service Request' AND DATE(Request_Date) < '${dateFormated}' THEN 'Overdue' ELSE Status END`
			// 		),
			// 	],
			// 	attributes: [
			// 		[
			// 			db.Sequelize.literal(
			// 				` CASE WHEN Status = 'Open' AND Request_Type = 'Service Request' AND DATE(Request_Date) >= '${dateFormated}' THEN 'Open' WHEN Status = 'Open' AND Request_Type = 'Service Request' AND DATE(Request_Date) < '${dateFormated}' THEN 'Overdue' ELSE Status END`
			// 			),
			// 			'Status',
			// 		],
			// 		[db.sequelize.fn('COUNT', 'Status'), 'StatusCount'],
			// 	],
			// 	where: condition,
			// });
			request = await db.request.findAll({
				group: [
					db.Sequelize.literal(
						` CASE WHEN Status = 'Open' AND Request_Type = 'Service Request' THEN 'Open' ELSE Status END`
					),
				],
				attributes: [
					[
						db.Sequelize.literal(
							` CASE WHEN Status = 'Open' AND Request_Type = 'Service Request' THEN 'Open' ELSE Status END`
						),
						'Status',
					],
					[db.sequelize.fn('COUNT', 'Status'), 'StatusCount'],
				],
				where: condition,
			});
		} else {
			request = await db.request.findAll({
				group: [
					db.Sequelize.literal(
						` CASE WHEN (Status = 'Open' OR Status =  'In Progress') AND Request_Type = 'Service Request' AND DATE(Request_Date) >= '${dateFormated}' THEN 'Open' WHEN (Status = 'Open' OR Status =  'In Progress') AND Request_Type = 'Service Request' AND DATE(Request_Date) < '${dateFormated}' THEN 'Overdue' ELSE Status END`
					),
				],
				attributes: [
					[
						db.Sequelize.literal(
							` CASE WHEN (Status = 'Open' OR Status =  'In Progress') AND Request_Type = 'Service Request' AND DATE(Request_Date) >= '${dateFormated}' THEN 'Open' WHEN (Status = 'Open' OR Status = 'In Progress') AND Request_Type = 'Service Request' AND DATE(Request_Date) < '${dateFormated}' THEN 'Overdue' ELSE Status END`
						),
						'Status',
					],
					[db.sequelize.fn('COUNT', 'Status'), 'StatusCount'],
				],
				where: condition,
			});
		}

		if (req.body.Request_Type == 'Procurement') {
			console.log('Request data');
			approve = await db.request.findAll({
				where: approveCondition,
				attributes: [
					[
						db.Sequelize.literal(
							`CASE WHEN Status = 'Open' and ((HOD_Approved = '0' and (Head_Approved='1' OR Head_Approved = '0')) OR (HOD_Approved = '1' and Head_Approved = '0')) THEN 'Deviation Approval' ELSE Status END`
						),
						'Status',
					],
					[db.sequelize.fn('COUNT', 'Status'), 'StatusCount'],
					// [
					// 	db.Sequelize.literal(
					// 		`count(CASE WHEN Status = 'Open' and ((HOD_Approved = '0' and (Head_Approved='1' OR Head_Approved = '0')) OR (HOD_Approved = '1' and Head_Approved = '0')) THEN 1 ELSE Status END)`
					// 	),
					// 	'Approve1',
					// ],
				],
				raw: true,
			});

			requestData = request.concat(approve);
		}

		if (request) {
			res.status(200).json({
				success: true,
				data: requestData.length > 0 ? requestData : request,
			});
		} else {
			res.status(200).json({
				success: true,
				data: [],
			});
		}
	}
});

// @desc assining service request to support user
// @route post /api/request/assignedToSupport
// @access public
exports.assignedToSupport = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let userType = req.user.User_Type;
		let Request_Type = req.body.Request_Type;
		let condition = {
			ID: req.body.id,
			Request_Type: process.env.SERVICEREQUEST,
		};
		if (userType == process.env.IT_SYSTEM_ADMIN) {
			condition.Request_Department = process.env.DEPT_IT;
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		} else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
			condition.Request_Department = process.env.DEPT_ADMIN;
			condition.HOD_Approved = 1;
			condition.Head_Approved = 1;
		}
		let request = await db.request.update(
			{
				Assigned_To: req.body.Assigned_To,
				Assigned_Date: new Date(),
			},
			{
				where: condition,
			}
		);
		if (request[0] === 0) {
			return next(new ErrorResponse(`Request details not found`, 404));
		}
		if (process.env.EMAIL_FLAG) {
			const getRequest = await db.request.findOne({
				where: {
					ID: req.body.id,
				},
			});
			const findUser = await db.user.findOne({
				where: {
					ID: getRequest.dataValues.Assigned_To,
				},
			});
			const findRequester = await db.user.findOne({
				where: {
					ID: getRequest.dataValues.User_ID,
				},
			});
			let userEmail = findUser.dataValues.Email;
			let requesterEmail = findRequester.dataValues.Email;

			// if (userEmail && req.body.Status == 'Resolved') {
			new EmailSender().sendServiceRequestToSupport(
				userEmail,
				getRequest.dataValues.Request_Number
			);

			new EmailSender().sendServiceRequestToRequster(
				requesterEmail,
				getRequest.dataValues.Request_Number,
				findUser.dataValues.Name,
				userEmail,
				findUser.dataValues.Mobile
			);

			// }
		}
		res.status(200).json({
			success: true,
			message: `request details updated`,
		});
	}
});

// @desc get location export
// @route POST /api/request/getServiceRequestExport
// @access public
exports.getServiceRequestExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const status = req.body.Status;
	// const heading = [[{ value: `${status} Report`, style: styles.topHeader }]];
	let heading;
	if (status == '') {
		heading = [
			[{ value: 'Service Request Excel Report', style: styles.topHeader }],
		];
	} else {
		heading = [[{ value: `${status} Report`, style: styles.topHeader }]];
	}

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Request_Number: {
			displayName: 'Request Number',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Date: {
			displayName: 'Date',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 150,
		},
		Name: {
			displayName: 'Requeter Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Requester_Department: {
			displayName: 'Requeter Department',
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
		Request_Type: {
			displayName: 'Request Type',
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
		Status: {
			displayName: 'Status',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Description: {
			displayName: 'Description',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Priority: {
			displayName: 'Priority',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Type_Of_Issue: {
			displayName: 'Type Of Issue',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Requester_Remark: {
			displayName: 'Requester Remark',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Rating: {
			displayName: 'Rating',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
		Support_Comment: {
			displayName: 'Support Comment',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Assigned_User: {
			displayName: 'Assigned User',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Assigned_Time: {
			displayName: 'Assigned Time',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDateTime,
			width: 150,
		},
		Resolved_Time: {
			displayName: 'Resolved Time',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDateTime,
			width: 150,
		},
		TAT: {
			displayName: 'TAT',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
	};
	let flag = 0;
	const userType = req.user.User_Type;
	let condition = {
		Request_Type: {
			[Op.eq]: `${req.body.Request_Type}`,
		},
		Request_Number: {
			[Op.like]: `${req.body.search}%`,
		},
	};

	if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
		condition.Request_Department = process.env.DEPT_IT;
		condition.HOD_Approved = 1;
		condition.Head_Approved = 1;
	} else if (
		userType == process.env.ADMIN_SYSTEM_ADMIN ||
		userType == process.env.ADMIN
	) {
		condition.Request_Department = process.env.DEPT_ADMIN;
		condition.HOD_Approved = 1;
		condition.Head_Approved = 1;
	} else if (userType == process.env.SUPPORT) {
		flag = 1;
		condition.Assigned_To = req.user.ID;
		condition.HOD_Approved = 1;
		condition.Head_Approved = 1;
	} else if (userType == process.env.REQUESTER) {
		condition.User_ID = req.user.ID;
	}

	// if (req.body.Status != '') {
	// 	if (req.body.Request_Type == process.env.SERVICEREQUEST) {
	// 		var today = new Date();
	// 		today.setDate(today.getDate() - 3); //number  of days to add, e.x. 3 days
	// 		var dateFormated = today.toISOString().substr(0, 10);

	// 		if (req.body.Status === process.env.OPEN) {
	// 			condition.Status = process.env.OPEN;
	// 			condition.Request_Date = {
	// 				[Op.gte]: Date.parse(dateFormated),
	// 			};
	// 		} else if (req.body.Status === 'Overdue') {
	// 			condition.Status = process.env.OPEN;
	// 			condition.Request_Date = {
	// 				[Op.lt]: Date.parse(dateFormated),
	// 			};
	// 		} else {
	// 			condition.Status = req.body.Status;
	// 		}
	// 	} else {
	// 		condition.Status = req.body.Status;
	// 	}
	// }
	if (req.body.Status != '') {
		if (req.body.Request_Type == process.env.SERVICEREQUEST) {
			var today = new Date();
			today.setDate(today.getDate() - 3); //number of days to add, e.x. 3 days
			var dateFormated = today.toISOString().substr(0, 10);

			if (req.body.Status === process.env.OPEN) {
				if (flag == 1) {
					condition.Status = process.env.OPEN;
				} else {
					condition.Status = {
						[Op.or]: [process.env.OPEN, process.env.IN_PROGRESS],
					};
				}
				condition.Request_Date = {
					[Op.gte]: Date.parse(dateFormated),
				};
			} else if (req.body.Status === 'Overdue') {
				// condition.Status = process.env.OPEN;
				condition.Status = {
					[Op.or]: [process.env.OPEN, process.env.IN_PROGRESS],
				};
				condition.Request_Date = {
					[Op.lt]: Date.parse(dateFormated),
				};
			} else if (req.body.Status === process.env.IN_PROGRESS) {
				condition.Status = process.env.IN_PROGRESS;
			} else {
				condition.Status = req.body.Status;
			}
		} else {
			condition.Status = req.body.Status;
		}
	}

	const requestsData = await db.request.findAll({
		where: condition,
		order: [
			['Request_Date', 'DESC'],
			['ID', 'DESC'],
		],
		include: [
			// {
			// 	model: db.request_items,
			// 	attributes: [
			// 		// 'Quantity',
			// 		// 'UOM',
			// 		// 'Per_Unit_Price',
			// 		// 'Total_Price',
			// 		// 'TAX_Percentage',
			// 		// 'TAX_Value',
			// 		// 'Sub_Total',
			// 	],
			// 	include: [
			// 		{
			// 			model: db.products,
			// 			attributes: ['ALT_Code', 'Name'],
			// 			include: [
			// 				{
			// 					model: db.asset,
			// 					as: 'assets',
			// 					attributes: ['Barcode'],
			// 				},
			// 			],
			// 		},
			// 	],
			// },
			{
				model: db.user,
				attributes: ['Name', 'Department', 'Cost_Center'],
			},
			{
				model: db.location,
				attributes: ['Name'],
			},
			{
				model: db.issue_type,
				attributes: ['Name'],
			},
			{
				model: db.user,
				as: 'assignUser',
				attributes: ['ID', 'Name'],
			},
		],
		distinct: true,
		// order: ['Name'],
	});

	let requestsDataList = [];
	let count = 1;
	for (let i = 0; i < requestsData.length; i++) {
		console.log(requestsData[i].dataValues);
		// let requestItemList = requestsData[i].dataValues.request_items;
		// for (let j = 0; j < requestItemList.length; j++) {
		requestsDataItem = {
			Sr_No: count,
			Request_Number: requestsData[i].dataValues.Request_Number,
			Date: requestsData[i].dataValues.Request_Date,
			Name: requestsData[i].dataValues.user.Name,
			Requester_Department:
				requestsData[i].dataValues.user.Department != null
					? requestsData[i].dataValues.user.Department +
					  '(' +
					  requestsData[i].dataValues.user.Cost_Center +
					  ')'
					: ' ',
			Department: requestsData[i].dataValues.Request_Department,
			Request_Type: requestsData[i].dataValues.Request_Type,
			Location: requestsData[i].dataValues.location.Name,
			Status: requestsData[i].dataValues.Status,
			Description: requestsData[i].dataValues.Description
				? requestsData[i].dataValues.Description
				: ' ',
			Priority: requestsData[i].dataValues.Priority
				? requestsData[i].dataValues.Priority
				: ' ',
			Type_Of_Issue:
				requestsData[i].dataValues.issue_type != null
					? requestsData[i].dataValues.issue_type.Name
					: ' ',

			Requester_Remark: requestsData[i].dataValues.Requester_Remark
				? requestsData[i].dataValues.Requester_Remark
				: ' ',
			Rating: requestsData[i].dataValues.Rating
				? Number(requestsData[i].dataValues.Rating)
				: ' ',
			Support_Comment: requestsData[i].dataValues.Support_Comment
				? requestsData[i].dataValues.Support_Comment
				: ' ',
			Assigned_User:
				requestsData[i].dataValues.assignUser != null
					? requestsData[i].dataValues.assignUser.Name
					: ' ',
			Assigned_Time:
				requestsData[i].dataValues.Assigned_Date != null
					? requestsData[i].dataValues.Assigned_Date
					: ' ',
			Resolved_Time:
				requestsData[i].dataValues.Resolved_Date != null
					? requestsData[i].dataValues.Resolved_Date
					: ' ',
			TAT:
				requestsData[i].dataValues.TAT != null
					? requestsData[i].dataValues.TAT
					: ' ',
		};
		requestsDataList.push(requestsDataItem);
		// }
		count = count + 1;
	}
	console.log(requestsDataList);
	const dataset = requestsDataList;

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
	if (status == '') {
		res.attachment('Service_Request.xlsx');
	} else {
		res.attachment(`${status}.xlsx`);
	}
	// res.attachment(`${status}.xlsx`);
	return res.send(report);
	// if (requestsDataList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: requestsDataList,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});

// @desc get location export
// @route POST /api/request/getProcurementExport
// @access public
exports.getProcurementExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const status = req.body.Status;
	let heading;
	// const heading = [[{ value: `${status} Report`, style: styles.topHeader }]];
	if (status == '') {
		heading = [
			[{ value: 'Procurement Excel Report', style: styles.topHeader }],
		];
	} else {
		heading = [[{ value: `${status} Report`, style: styles.topHeader }]];
	}
	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Request_Number: {
			displayName: 'Request Number',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Date: {
			displayName: 'Date',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 150,
		},
		Name: {
			displayName: 'Requester Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Requester_Department: {
			displayName: 'Requester Department',
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
		Request_Type: {
			displayName: 'Request Type',
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
		Status: {
			displayName: 'Status',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Request_Amount: {
			displayName: 'Request Amount',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 150,
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
			width: 150,
		},
		UOM: {
			displayName: 'UOM',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
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
		Requester_Remark: {
			displayName: 'Requester Remark',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Rating: {
			displayName: 'Rating',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 150,
		},
	};

	const userType = req.user.User_Type;
	let condition = {
		Request_Type: {
			[Op.eq]: `${req.body.Request_Type}`,
		},
		Request_Number: {
			[Op.like]: `${req.body.search}%`,
		},
	};

	if (userType == process.env.IT_SYSTEM_ADMIN || userType == process.env.IT) {
		condition.Request_Department = process.env.DEPT_IT;
		condition.HOD_Approved = 1;
		condition.Head_Approved = 1;
	} else if (
		userType == process.env.ADMIN_SYSTEM_ADMIN ||
		userType == process.env.ADMIN
	) {
		condition.Request_Department = process.env.DEPT_ADMIN;
		condition.HOD_Approved = 1;
		condition.Head_Approved = 1;
	} else if (userType == process.env.REQUESTER) {
		condition.User_ID = req.user.ID;
	}

	if (req.body.Status != '') {
		if (req.body.Request_Type == process.env.SERVICEREQUEST) {
			var today = new Date();
			today.setDate(today.getDate() - 3); //number  of days to add, e.x. 3 days
			var dateFormated = today.toISOString().substr(0, 10);

			if (req.body.Status === process.env.OPEN) {
				condition.Status = process.env.OPEN;
				condition.Request_Date = {
					[Op.gte]: Date.parse(dateFormated),
				};
			} else if (req.body.Status === 'Overdue') {
				condition.Status = process.env.OPEN;
				condition.Request_Date = {
					[Op.lt]: Date.parse(dateFormated),
				};
			} else {
				condition.Status = req.body.Status;
			}
		} else {
			condition.Status = req.body.Status;
		}
	}
	const requestsData = await db.request.findAll({
		where: condition,
		order: [
			['Request_Date', 'DESC'],
			['ID', 'DESC'],
		],
		attributes: [
			'Request_Number',
			'Request_Date',
			'Request_Department',
			'Request_Type',
			'Status',
			'Request_Amount',
			'Requester_Remark',
			'Rating',
		],
		include: [
			{
				model: db.request_items,
				attributes: [
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
						attributes: ['ALT_Code', 'Name'],
						where: {
							Deleted_At: null,
						},
						// include: [
						// 	{
						// 		model: db.asset,
						// 		as: 'assets',
						// 		attributes: ['Barcode'],
						// 	},
						// ],
					},
				],
			},
			{
				model: db.user,
				attributes: ['Name', 'Department', 'Cost_Center'],
			},
			{
				model: db.location,
				attributes: ['Name'],
			},
			{
				model: db.issue_type,
				attributes: ['Name'],
			},
			{
				model: db.user,
				as: 'assignUser',
				attributes: ['ID', 'Name'],
			},
		],
		distinct: true,
		// order: ['Name'],
	});

	let requestsDataList = [];
	let count = 1;
	for (let i = 0; i < requestsData.length; i++) {
		let requestItemList = requestsData[i].dataValues.request_items;
		for (let j = 0; j < requestItemList.length; j++) {
			let requestsDataItem = {
				Sr_No: count,
				Request_Number: '' + requestsData[i].dataValues.Request_Number,
				Date: requestsData[i].dataValues.Request_Date,
				Name: requestsData[i].dataValues.user.Name,
				Requester_Department:
					requestsData[i].dataValues.user.Department != null
						? requestsData[i].dataValues.user.Department +
						  '(' +
						  requestsData[i].dataValues.user.Cost_Center +
						  ')'
						: ' ',
				Department: requestsData[i].dataValues.Request_Department,
				Request_Type: requestsData[i].dataValues.Request_Type,
				Location: requestsData[i].dataValues.location.Name,
				Status: requestsData[i].dataValues.Status,
				Request_Amount:
					requestsData[i].dataValues.Request_Amount != null
						? Number(requestsData[i].dataValues.Request_Amount)
						: ' ',

				Product_Name: requestItemList[j].product.Name,
				Quantity: Number(requestItemList[j].Quantity),
				UOM: requestItemList[j].UOM,
				Price: Number(requestItemList[j].Per_Unit_Price),
				Sub_Total: Number(requestItemList[j].Total_Price),
				TAX_Percentage: Number(requestItemList[j].TAX_Percentage),
				TAX_Value: Number(requestItemList[j].TAX_Value),
				Total_Price: Number(requestItemList[j].Sub_Total),

				Requester_Remark: requestsData[i].dataValues.Requester_Remark
					? requestsData[i].dataValues.Requester_Remark
					: ' ',
				Rating: requestsData[i].dataValues.Rating
					? Number(requestsData[i].dataValues.Rating)
					: ' ',
			};
			requestsDataList.push(requestsDataItem);
			count = count + 1;
		}
	}
	const dataset = requestsDataList;

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
	if (status == '') {
		res.attachment('Procurement_Excel.xlsx');
	} else {
		res.attachment(`${status}.xlsx`);
	}
	return res.send(report);
	// if (requestsDataList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: requestsDataList,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});
