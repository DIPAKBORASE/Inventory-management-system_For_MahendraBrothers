const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');
const excel = require('node-excel-export');
const { stylesData } = require('../utils/style');

async function getUpdateRequestDetails(productsData) {
	console.log(productsData.id);
	let requestItem = await db.request_items.findAll({
		where: {
			Product_ID: productsData.id,
		},
	});
	await Promise.all(
		requestItem.map(async (item) => {
			let findRequest = await db.request.findOne({
				where: {
					ID: item.Request_ID,
					Status: {
						[Op.or]: [process.env.OPEN, process.env.READY_TO_DISPATCH],
					},
				},
			});
			if (findRequest != null) {
				let calTAXValue =
					(parseFloat(productsData.TAX_Percentage) *
						(parseFloat(productsData.Price) * parseInt(item.Quantity))) /
					100;
				requestData = {
					Per_Unit_Price: parseFloat(productsData.Price),
					TAX_Percentage: parseFloat(productsData.TAX_Percentage),
					Total_Price: parseFloat(productsData.Price) * parseInt(item.Quantity),
					TAX_Value: calTAXValue,
					Sub_Total:
						parseFloat(productsData.Price) * parseInt(item.Quantity) +
						calTAXValue,
					Updated_At: new Date(),
				};
				await db.request_items.update(requestData, {
					where: {
						Product_ID: productsData.id,
						Request_ID: item.Request_ID,
					},
				});
			}
		})
	);
	await Promise.all(
		requestItem.map(async (item) => {
			let findRequestDetails = await db.request_items.findAll({
				where: {
					Request_ID: item.Request_ID,
					// Product_ID: productsData.id,
				},
				attributes: [
					[db.sequelize.fn('SUM', db.sequelize.col('Sub_Total')), 'Sub_Total'],
				],
			});
			request = await db.request.update(
				{
					Request_Amount: findRequestDetails[0].Sub_Total,
				},
				{
					where: {
						ID: item.Request_ID,
						Status: {
							[Op.or]: [process.env.OPEN, process.env.READY_TO_DISPATCH],
						},
					},
				}
			);
		})
	);
}

// @desc Register user
// @route POST /api/product/addProduct
// @access public
exports.addProduct = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let userType = req.user.User_Type;
		let Department = req.body.Asset_Holder;

		if (Department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
			req.body.Asset_Holder = process.env.IT;
		} else if (Department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
			req.body.Asset_Holder = process.env.ADMIN;
		} else if (userType == process.env.IT_SYSTEM_ADMIN) {
			req.body.Asset_Holder = process.env.IT;
		} else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
			req.body.Asset_Holder = process.env.ADMIN;
		} else {
			return next(new ErrorResponse(`Enter Invalid Data.`, 500));
		}

		// if (!req.body.Manufacturer_Name)
		// 	return next(new ErrorResponse(`Please provide manufacturer name`), 400);
		if (req.body.Category == 'CAPEX') {
			req.body.Is_Individual_Tracking = 1;
		}
		// if(req.body.Category == 'OPEX'){

		// }
		let manufacturerData;
		let manufacturer, abc;
		let product = await db.products.create(req.body);
		let manufacturerItemList = [];
		if (req.body.Manufacturer_Name) {
			manufacturerData = req.body.Manufacturer_Name;
			let manufacturerItem = await manufacturerData.map(async (item) => {
				ds = {
					Name: item,
					Product_ID: product.ID,
				};
				manufacturerItemList.push(ds);
			});
			manufacturer = await db.manufacturers.bulkCreate(manufacturerItemList);
		}

		// let arr = [];
		// for (let i = 0; i < manufacturer.length; i++) {
		// 	arr.push(manufacturer[i].dataValues);
		// }

		// product.dataValues.manufacturer = arr;

		// Promise.all(manufacturerItem).then(() => {
		res.status(200).json({
			success: true,
			message: `New product added`,
		});
		// });
	}
});

// @desc Register user
// @route POST /api/product/updateProduct
// @access public
exports.updateProduct = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let userType = req.user.User_Type;
		let Department = req.body.Asset_Holder;
		let currentPrice = req.body.Price;

		if (Department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
			req.body.Asset_Holder = process.env.IT;
		} else if (Department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
			req.body.Asset_Holder = process.env.ADMIN;
		} else if (userType == process.env.IT_SYSTEM_ADMIN) {
			req.body.Asset_Holder = process.env.IT;
		} else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
			req.body.Asset_Holder = process.env.ADMIN;
		} else {
			return next(new ErrorResponse(`Enter Invalid Data.`, 500));
		}
		// if (!req.body.Manufacturer_Name)
		// 	return next(new ErrorResponse(`Please provide manufacturer name`), 400);
		let oldProduct = await db.products.findOne({
			where: {
				ID: req.body.id,
				Asset_Holder: req.body.Asset_Holder,
			},
		});

		if (currentPrice != oldProduct.dataValues.Price) {
			await getUpdateRequestDetails(req.body);
		}
		let requestBodyData;
		const product = await db.products.update(req.body, {
			where: {
				ID: req.body.id,
				Asset_Holder: req.body.Asset_Holder,
			},
		});
		if (product == 0)
			return next(new ErrorResponse(`product details not found`, 500));

		let manufacturers = await db.manufacturers.findAll({
			where: {
				Product_ID: req.body.id,
			},
			paranoid: false,
		});
		if (req.body.Manufacturer_Name) {
			requestBodyData = req.body.Manufacturer_Name;
			for (let i = 0; i < manufacturers.length; i++) {
				if (requestBodyData.includes(manufacturers[i].Name)) {
					if (manufacturers[i].Deleted_At !== null) {
						let manufacturerItem = await db.manufacturers.findAll({
							where: {
								Product_ID: req.body.id,
								Name: manufacturers[i].Name,
							},
							paranoid: false,
						});

						db.manufacturers.restore({
							where: {
								Product_ID: req.body.id,
								Name: manufacturers[i].Name,
							},
						});
					}
					requestBodyData.splice(
						requestBodyData.indexOf(manufacturers[i].Name),
						1
					);
				} else {
					let manufacturerItem = await db.manufacturers.destroy({
						where: {
							Product_ID: req.body.id,
							Name: manufacturers[i].Name,
						},
					});
				}
			}
			for (let j = 0; j < requestBodyData.length; j++) {
				let manufacturerItem = await db.manufacturers.create({
					Name: requestBodyData[j],
					Product_ID: req.body.id,
				});
			}
		}

		res.status(200).json({
			success: true,
			message: `product details updated`,
		});
	}
});

// @desc Register user
// @route POST /api/product/deleteProduct
// @access public
exports.deleteProduct = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let userType = req.user.User_Type;
		// let Department = req.body.Asset_Holder;
		let condition = {
			ID: req.body.id,
		};
		// if (Department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
		// 	condition.Asset_Holder = process.env.IT;
		// } else if (Department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
		// 	condition.Asset_Holder = process.env.ADMIN;
		// } else
		if (userType == process.env.IT_SYSTEM_ADMIN) {
			condition.Asset_Holder = process.env.IT;
		} else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
			condition.Asset_Holder = process.env.ADMIN;
		}
		// else {
		// 	return next(new ErrorResponse(`Enter Invalid Data.`, 500));
		// }

		const Product = await db.products.destroy({
			where: condition,
		});
		if (Product === 0) {
			return next(new ErrorResponse(`Product not found`, 500));
		}
		const manufacturer = await db.manufacturers.destroy({
			where: {
				Product_ID: req.body.id,
			},
		});

		res.status(200).json({
			success: true,
			message: `Product deleted`,
			data: [Product, manufacturer],
		});
	}
});

// @desc Register user
// @route POST /api/product/getProduct
// @access public
exports.getProduct = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let userType = req.user.User_Type;
		let condition = {
			ID: req.body.id,
		};

		if (userType == process.env.IT_SYSTEM_ADMIN) {
			condition.Asset_Holder = process.env.IT;
		} else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
			condition.Asset_Holder = process.env.ADMIN;
		}

		let product = await db.products.findOne({
			where: condition,
		});
		if (product == null) {
			return next(new ErrorResponse(`Product not found`, 500));
		}
		let manufacturer = await db.manufacturers.findAll({
			where: {
				Product_ID: req.body.id,
			},
		});

		if (manufacturer.length > 0) {
			let arr = [];
			for (let i = 0; i < manufacturer.length; i++) {
				arr.push(manufacturer[i].dataValues);
			}

			product.dataValues.manufacturer = arr;
		}

		// if (product) {
		res.status(200).json({
			success: true,
			message: `Product Found`,
			data: product,
		});
		// } else {
		// return next(new ErrorResponse(`Product not found`, 500));
		// }
	}
});

// @desc Register user
// @route POST /api/product/getProducts
// @access public

// exports.getProducts = asyncHandler(async (req, res, next) => {
// 	console.log(req.body);
// 	let abc;

// 	const { page, pageSize } = req.body;
// 	const products = await db.products.findAndCountAll({
// 		offset: page * pageSize,
// 		limit: pageSize,
// 		include: [{ model: db.manufacturers, attributes: ['ID', 'Name'] }],
// 	});
// 	// const manufacturer = await db.manufacturers.findAndCountAll({
// 	// 	offset: page * pageSize,
// 	// 	limit: pageSize,

// 	// });

// 	res.status(200).json({
// 		success: true,
// 		data: products,
// 	});
// });

// @desc Register user
// @route POST /api/product/getProducts
// @access public
exports.getProducts = asyncHandler(async (req, res, next) => {
	const { limit, offset } = getPagination(
		req.body.pageNumber,
		req.body.numberOfRows
	);
	let userType = req.user.User_Type;
	let condition = {
		Name: {
			[Op.like]: `${req.body.search}%`,
		},
	};
	// if (req.body.hasOwnProperty('search')) {
	// 	if (req.body.search != '') {
	// 		condition = req.body.search
	// 			? { Name: { [Op.like]: `${req.body.search}%` } }
	// 			: null;
	// 	}
	// }
	if (userType == process.env.IT_SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.IT;
	} else if (userType == process.env.ADMIN_SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.ADMIN;
	}
	const products = await db.products.findAndCountAll({
		where: condition,
		limit,
		offset,
		include: [{ model: db.manufacturers, attributes: ['ID', 'Name'] }],
		distinct: true,
		order: ['Name'],
	});

	if (products) {
		let { total, data, totalPages, currentPage } = getPagingData(
			products,
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

// @desc searchProducts
// @route POST /api/product/getSearchProducts
// @access public
exports.getSearchProducts = asyncHandler(async (req, res, next) => {
	let department = req.body.department;
	let userType = req.user.User_Type;

	let condition = {
		// Asset_Holder: {
		// 	[Op.eq]: `${req.body.department}`,
		// },
		Name: {
			[Op.like]: `${req.body.search}%`,
		},
	};

	if (department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.DEPT_IT;
	} else if (department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.DEPT_ADMIN;
	} else if (department == 'IT' && userType == process.env.REQUESTER) {
		condition.Asset_Holder = process.env.DEPT_IT;
	} else if (department == 'Admin' && userType == process.env.REQUESTER) {
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

	const searchProducts = await db.products.findAll({
		where: condition,
		order: ['Name'],
		include: [{ model: db.manufacturers, attributes: ['ID', 'Name'] }],
	});

	if (searchProducts) {
		res.status(200).json({
			error: false,
			data: searchProducts,
		});
	} else {
		res.status(200).json({
			error: false,
			data: {},
		});
	}
});

// @desc searchProducts
// @route POST /api/product/getSearchInwardProducts
// @access public
exports.getSearchInwardProducts = asyncHandler(async (req, res, next) => {
	// let condition = '';
	let condition = {
		Name: {
			[Op.like]: `${req.body.search}%`,
		},
	};
	let userType = req.user.User_Type;
	let department = req.body.User_Type;

	if (department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.IT;
	} else if (department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.ADMIN;
	} else if (
		userType == process.env.IT ||
		userType == process.env.IT_SYSTEM_ADMIN
	) {
		condition.Asset_Holder = process.env.IT;
	} else if (
		userType == process.env.ADMIN ||
		userType == process.env.ADMIN_SYSTEM_ADMIN
	) {
		condition.Asset_Holder = process.env.ADMIN;
	} else {
		return next(new ErrorResponse(`Enter Invalid Data.`, 500));
	}
	const searchProducts = await db.products.findAll({
		where: condition,
		order: ['Name'],
		include: [{ model: db.manufacturers, attributes: ['ID', 'Name'] }],
		limit: 10,
	});

	if (searchProducts) {
		res.status(200).json({
			error: false,
			data: searchProducts,
		});
	} else {
		res.status(200).json({
			error: false,
			data: {},
		});
	}
});
// @desc Get all products
// @route POST /api/products/getALLProducts
// @access public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
	const allProducts = await db.products.findAll({ order: ['Name'] });
	res.status(200).json({
		success: true,
		data: allProducts,
	});
});
// @desc Get all products Group
// @route POST /api/products/getALLProductGroup
// @access public
exports.getALLProductGroup = asyncHandler(async (req, res, next) => {
	const allProductGroup = await db.products.findAll({
		order: ['Product_Group'],
		attributes: [
			[
				db.Sequelize.fn('DISTINCT', db.Sequelize.col('Product_Group')),
				'Product_Group',
			],
		],
	});
	res.status(200).json({
		success: true,
		data: allProductGroup,
	});
});
// @desc Get all products ALT Code
// @route POST /api/products/getALLProductALT_Code
// @access public
exports.getALLProductALTCode = asyncHandler(async (req, res, next) => {
	const allProductALTCode = await db.products.findAll({
		order: ['ALT_Code'],
		attributes: [
			[db.Sequelize.fn('DISTINCT', db.Sequelize.col('ALT_Code')), 'ALT_Code'],
		],
	});
	res.status(200).json({
		success: true,
		data: allProductALTCode,
	});
});

// @desc Get tracking assets
// @route POST /api/products/trackAssets
// @access public
exports.trackAsset = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
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
		const trackAssets = await db.asset.findOne({
			where: {
				Barcode: req.body.Barcode,
			},
			attributes: [
				'Total_Price',
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
					attributes: ['ALT_Code', 'Name', 'Description', 'Asset_Holder'],
				},
				{
					model: db.asset_transaction,
					attributes: [
						'Dated_On',
						'Location_From',
						'Location_From_Department',
						'Location_From_Cost_Center',
						'Location_To',
						'Location_To_Department',
						'Location_To_Cost_Center',
						'Type_Of_Issue',
						'Collected_By',
						'Mode_Of_Transport',
						'Remark',
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
					],
				},
			],
		});
		if (trackAssets == null) {
			return next(new ErrorResponse(`product details not found.`, 500));
		}
		res.status(200).json({
			success: true,
			data: trackAssets,
		});
	}
});

// @desc get products export
// @route POST /api/products/getPrductsExport
// @access public
exports.getPrductsExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [[{ value: 'Products Master', style: styles.topHeader }]];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		ALT_Code: {
			displayName: 'Product Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Product_Name: {
			displayName: 'Product Name',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Product_Group: {
			displayName: 'Product Group',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		UOM: {
			displayName: 'UOM',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Asset_Holder: {
			displayName: 'Asset Holder',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 150,
		},
		Category: {
			displayName: 'Category',
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
		Is_Individual_Tracking: {
			displayName: 'Is Individual Tracking',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 250,
		},
		Price: {
			displayName: 'Price',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 100,
		},
		Low_Stock_Quantity: {
			displayName: 'Low Stock Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 200,
		},
		Opening_Stock_Quantity: {
			displayName: 'Opening Stock Quantity',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 200,
		},
		Opening_Stock_Value: {
			displayName: 'Opening Stock Value',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 200,
		},
		Opening_Stock_Tax_Value: {
			displayName: 'Opening Stock Tax Value',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 200,
		},
		TAX_Percentage: {
			displayName: 'TAX Percentage',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDecimal,
			width: 200,
		},
	};

	let condition = {};
	if (req.body.search != '') {
		condition.Name = {
			[Op.like]: `${req.body.search}%`,
		};
	}
	const productsData = await db.products.findAll({
		where: condition,
		order: ['Name'],
	});

	let productsDataList = [];
	let count = 1;
	for (let i = 0; i < productsData.length; i++) {
		productsDataItem = {
			Sr_No: count,
			ALT_Code: productsData[i].dataValues.ALT_Code,
			Product_Name: productsData[i].dataValues.Name,
			Product_Group: productsData[i].dataValues.Product_Group,
			UOM: productsData[i].dataValues.UOM,
			Asset_Holder: productsData[i].dataValues.Asset_Holder,
			Category: productsData[i].dataValues.Category,
			Description: productsData[i].dataValues.Description,
			Is_Individual_Tracking: productsData[i].dataValues.Is_Individual_Tracking,
			Price: Number(productsData[i].dataValues.Price),
			Low_Stock_Quantity: Number(productsData[i].dataValues.Low_Stock_Quantity),
			Opening_Stock_Quantity: Number(
				productsData[i].dataValues.Opening_Stock_Quantity != null
					? productsData[i].dataValues.Opening_Stock_Quantity
					: ' '
			),
			Opening_Stock_Value: Number(
				productsData[i].dataValues.Opening_Stock_Value != null
					? productsData[i].dataValues.Opening_Stock_Value
					: ' '
			),
			Opening_Stock_Tax_Value: Number(
				productsData[i].dataValues.Opening_Stock_Tax_Value != null
					? productsData[i].dataValues.Opening_Stock_Tax_Value
					: ' '
			),
			TAX_Percentage: Number(productsData[i].dataValues.TAX_Percentage),
		};
		productsDataList.push(productsDataItem);
		count = count + 1;
	}
	console.log(productsDataList);
	const dataset = productsDataList;

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
	res.attachment('Products.xlsx');
	return res.send(report);
	// if (productsData) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: productsData,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});

// @desc get track assets export
// @route POST /api/products/trackAssetExport
// @access public
exports.getTrackAssetExport = asyncHandler(async (req, res, next) => {
	const styles = stylesData();
	const heading = [[{ value: 'Track Asset Report', style: styles.topHeader }]];

	const specification = {
		Sr_No: {
			displayName: 'Sr No',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 50,
		},
		Barcode: {
			displayName: 'Barcode',
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
		ALT_Code: {
			displayName: 'Product_Code',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Product_Name: {
			displayName: 'Product_Name',
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
		Asset_Holder: {
			displayName: 'Asset_Holder',
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
		Model: {
			displayName: 'Model',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Serial_Number: {
			displayName: 'Serial_Number',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellInteger,
			width: 200,
		},
		AMC_Expiry: {
			displayName: 'AMC_Expiry',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
			width: 200,
		},
		AMC_Vendor: {
			displayName: 'AMC_Vendor',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		Product_Expiry: {
			displayName: 'Product_Expiry',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellDate,
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
			displayName: 'From Location',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		To_Department: {
			displayName: 'From Department',
			headerStyle: styles.tableHeader,
			cellStyle: styles.cellBorder,
			width: 200,
		},
		To_Cost_Center: {
			displayName: 'From Cost Center',
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
	const trackAssets = await db.asset.findOne({
		where: {
			Barcode: req.body.Barcode,
		},
		attributes: [
			'Total_Price',
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
				attributes: ['ALT_Code', 'Name', 'Description', 'Asset_Holder'],
			},
			{
				model: db.asset_transaction,
				attributes: [
					'Dated_On',
					'Location_From',
					'Location_From_Department',
					'Location_From_Cost_Center',
					'Location_To',
					'Location_To_Department',
					'Location_To_Cost_Center',
					'Type_Of_Issue',
					'Collected_By',
					'Mode_Of_Transport',
					'Remark',
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
				],
			},
		],
	});
	let trackAssetsList = [];
	let count = 1;
	let asset_transaction = trackAssets.dataValues.asset_transactions;
	for (let i = 0; i < asset_transaction.length; i++) {
		trackAssetsItem = {
			Sr_No: count,
			Barcode: trackAssets.dataValues.Barcode
				? trackAssets.dataValues.Barcode
				: ' ',
			Date: asset_transaction[i].Dated_On,
			ALT_Code: trackAssets.product.ALT_Code,
			Product_Name: trackAssets.product.Name,
			Description: trackAssets.product.Description
				? trackAssets.product.Description
				: ' ',
			Asset_Holder: trackAssets.product.Asset_Holder,

			Manufacturer: trackAssets.dataValues.Manufacturer
				? trackAssets.dataValues.Manufacturer
				: ' ',
			Model: trackAssets.dataValues.Model ? trackAssets.dataValues.Model : ' ',
			Serial_Number: trackAssets.dataValues.Serial_Number
				? Number(trackAssets.dataValues.Serial_Number)
				: ' ',
			AMC_Expiry: trackAssets.dataValues.AMC_Expiry
				? trackAssets.dataValues.AMC_Expiry
				: ' ',
			AMC_Vendor: trackAssets.dataValues.AMC_Vendor
				? trackAssets.dataValues.AMC_Vendor
				: ' ',
			Product_Expiry: trackAssets.dataValues.Product_Expiry
				? trackAssets.dataValues.Product_Expiry
				: ' ',

			From_Location: asset_transaction[i].fromLocation.Name,
			From_Department: asset_transaction[i].Location_From_Department
				? asset_transaction[i].Location_From_Department
				: ' ',
			From_Cost_Center: asset_transaction[i].Location_From_Cost_Center
				? asset_transaction[i].Location_From_Cost_Center
				: ' ',

			To_Location: asset_transaction[i].toLocation.Name,
			To_Department: asset_transaction[i].Location_To_Department
				? asset_transaction[i].Location_To_Department
				: ' ',
			To_Cost_Center: asset_transaction[i].Location_To_Cost_Center
				? asset_transaction[i].Location_To_Cost_Center
				: ' ',

			Type_Of_Issue: asset_transaction[i].Type_Of_Issue,
			Collected_By: asset_transaction[i].Collected_By
				? asset_transaction[i].Collected_By
				: ' ',
			Mode_Of_Transport: asset_transaction[i].Mode_Of_Transport
				? asset_transaction[i].Mode_Of_Transport
				: ' ',
			Remark: asset_transaction[i].Remark ? asset_transaction[i].Remark : ' ',
		};
		trackAssetsList.push(trackAssetsItem);
		count = count + 1;
	}
	const dataset = trackAssetsList;

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
	res.attachment('Track_Assets.xlsx');
	return res.send(report);
	// if (trackAssetsList) {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: trackAssetsList,
	// 	});
	// } else {
	// 	res.status(200).json({
	// 		success: true,
	// 		data: [],
	// 	});
	// }
});

// @desc searchProducts
// @route POST /api/product/getSearchOpexProducts
// @access public
exports.getSearchOpexProducts = asyncHandler(async (req, res, next) => {
	// let condition = '';
	let condition = {
		Name: {
			[Op.like]: `${req.body.search}%`,
		},
		Category: {
			[Op.eq]: process.env.OPEX,
		},
	};
	let userType = req.user.User_Type;
	// let department = req.body.User_Type;

	// if (department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
	// 	condition.Asset_Holder = process.env.IT;
	// } else if (department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
	// 	condition.Asset_Holder = process.env.ADMIN;
	// } else
	if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.IT;
	} else if (
		userType == process.env.ADMIN ||
		userType == process.env.ADMIN_SYSTEM_ADMIN
	) {
		condition.Asset_Holder = process.env.ADMIN;
	}
	// else {
	// 	return next(new ErrorResponse(`Enter Invalid Data.`, 500));
	// }
	const searchProducts = await db.products.findAll({
		where: condition,
		order: ['Name'],
		attributes: ['ID', 'Name'],
		// limit: 10,
	});

	if (searchProducts) {
		res.status(200).json({
			error: false,
			data: searchProducts,
		});
	} else {
		res.status(200).json({
			error: false,
			data: {},
		});
	}
});

// @desc searchProducts
// @route POST /api/product/getSearchOpexProducts
// @access public
exports.getSearchCapexProducts = asyncHandler(async (req, res, next) => {
	// let condition = '';
	let condition = {
		Name: {
			[Op.like]: `${req.body.search}%`,
		},
		Category: {
			[Op.eq]: process.env.CAPEX,
		},
	};
	let userType = req.user.User_Type;
	// let department = req.body.User_Type;

	// if (department == 'IT' && userType == process.env.SYSTEM_ADMIN) {
	// 	condition.Asset_Holder = process.env.IT;
	// } else if (department == 'Admin' && userType == process.env.SYSTEM_ADMIN) {
	// 	condition.Asset_Holder = process.env.ADMIN;
	// } else
	if (userType == process.env.IT || userType == process.env.IT_SYSTEM_ADMIN) {
		condition.Asset_Holder = process.env.IT;
	} else if (
		userType == process.env.ADMIN ||
		userType == process.env.ADMIN_SYSTEM_ADMIN
	) {
		condition.Asset_Holder = process.env.ADMIN;
	}
	// else {
	// 	return next(new ErrorResponse(`Enter Invalid Data.`, 500));
	// }
	const searchProducts = await db.products.findAll({
		where: condition,
		order: ['Name'],
		attributes: ['ID', 'Name'],
		// limit: 10,
	});

	if (searchProducts) {
		res.status(200).json({
			error: false,
			data: searchProducts,
		});
	} else {
		res.status(200).json({
			error: false,
			data: {},
		});
	}
});
