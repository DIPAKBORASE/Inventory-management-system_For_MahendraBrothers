const express = require('express');
const {
	getPurchaseOrder,
	getPurchaseOrders,
	addPurchaseOrder,
	getPurchaseOrderByPONumber,
	getNextPONumber,
	sendPOPDF,
	getPOFromLowStock,
	getPurchaseOrdersExport,
	deletePurchaseOrder,
} = require('../controllers/purchase_order');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getPOPDF } = require('../utils/pdf_generator');

const purchase_order_valid = require('../validations/purchase_order_validator');

router
	.post(
		'/getPurchaseOrder',
		purchase_order_valid.idValid(),
		protect,
		authorize(
			process.env.IT,
			process.env.ADMIN,
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getPurchaseOrder
	)
	.post(
		'/getPurchaseOrders',
		protect,
		authorize(
			process.env.IT,
			process.env.ADMIN,
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getPurchaseOrders
	)
	.post(
		'/getPurchaseOrderByPONumber',
		protect,
		authorize(
			process.env.IT,
			process.env.ADMIN,
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getPurchaseOrderByPONumber
	)

	.post(
		'/addPurchaseOrder',
		purchase_order_valid.saveValid(),
		protect,
		authorize(
			process.env.IT,
			process.env.ADMIN,
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		addPurchaseOrder
	)
	.post(
		'/nextPONumber',
		protect,
		authorize(
			process.env.IT,
			process.env.ADMIN,
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getNextPONumber
	)
	.post(
		'/sendPOPDF',
		purchase_order_valid.idValid(),
		protect,
		authorize(
			process.env.IT,
			process.env.ADMIN,
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		sendPOPDF
	)
	.post(
		'/getPOFromLowStock',
		protect,
		authorize(
			process.env.IT,
			process.env.ADMIN,
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getPOFromLowStock
	)
	.post(
		'/getPOExport',
		protect,
		authorize(
			process.env.IT_SYSTEM_ADMIN,
			process.env.ADMIN_SYSTEM_ADMIN,
			process.env.SYSTEM_ADMIN
		),
		getPurchaseOrdersExport
	)
	.post(
		'/deletePurchaseOrder',
		purchase_order_valid.idValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		deletePurchaseOrder
	);

module.exports = router;
