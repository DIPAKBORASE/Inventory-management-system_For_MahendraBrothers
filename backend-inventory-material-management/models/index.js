'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		dialect: process.env.DB_DIALECT,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		logging: true,
	}
);

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		);
	})
	.forEach((file) => {
		const model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

//Associations

//permissions
// db.query.hasMany(db.query_log);
db.products.hasMany(db.manufacturers, { foreignKey: 'Product_ID' });
db.request.hasMany(db.request_items, { foreignKey: 'Request_ID' });
db.request.belongsTo(db.location, {
	foreignKey: 'Location_ID',
	sourceKey: 'ID',
});
db.request.belongsTo(db.user, { foreignKey: 'User_ID', sourceKey: 'ID' });
db.request.belongsTo(db.user, {
	as: 'assignUser',
	foreignKey: 'Assigned_To',
	sourceKey: 'ID',
});
db.request.belongsTo(db.issue_type, {
	foreignKey: 'Type_Of_Issue',
	sourceKey: 'ID',
});
db.request_items.belongsTo(db.products, {
	foreignKey: 'Product_ID',
	sourceKey: 'ID',
});
db.purchase_order.belongsTo(db.vendors, {
	foreignKey: 'Vendor_ID',
	sourceKey: 'ID',
});
db.purchase_order.hasMany(db.purchase_order_item, {
	foreignKey: 'Purchase_Order_ID',
});
db.purchase_order.belongsTo(db.user, {
	foreignKey: 'PO_Raised_By',
	sourceKey: 'ID',
});
db.purchase_order_item.belongsTo(db.products, {
	foreignKey: 'Product_ID',
	sourceKey: 'ID',
});
db.inward.hasMany(db.asset, {
	foreignKey: 'Inward_ID',
	// sourceKey: 'ID',
});
db.inward.belongsTo(db.vendors, {
	foreignKey: 'Vendor_ID',
	sourceKey: 'ID',
});
// db.asset.hasOne(db.products, {
// 	foreignKey: 'ID',
// 	sourceKey: 'Product_ID',
// });
db.asset.belongsTo(db.products, {
	foreignKey: 'Product_ID',
	sourceKey: 'ID',
});
db.asset.belongsTo(db.location, {
	foreignKey: 'Current_Location',
	sourceKey: 'ID',
});
db.inward.belongsTo(db.location, {
	foreignKey: 'Current_Location',
	sourceKey: 'ID',
});
db.products.hasMany(db.asset, {
	foreignKey: 'Product_ID',
});
db.dispatch.hasMany(db.asset_transaction, {
	foreignKey: 'Dispatch_ID',
});
db.asset.hasMany(db.asset_transaction, {
	foreignKey: 'Asset_ID',
});

db.dispatch.belongsTo(db.location, {
	foreignKey: 'From_Location',
	sourceKey: 'ID',
	as: 'fromLocation',
});
db.dispatch.belongsTo(db.location, {
	foreignKey: 'To_Location',
	sourceKey: 'ID',
	as: 'toLocation',
});
db.asset_transaction.belongsTo(db.dispatch, {
	foreignKey: 'Dispatch_ID',
	sourceKey: 'ID',
});
db.asset_transaction.belongsTo(db.asset, {
	foreignKey: 'Asset_ID',
	sourceKey: 'ID',
});
db.asset_transaction.belongsTo(db.location, {
	foreignKey: 'Location_From',
	sourceKey: 'ID',
	as: 'fromLocation',
});
db.asset_transaction.belongsTo(db.location, {
	foreignKey: 'Location_To',
	sourceKey: 'ID',
	as: 'toLocation',
});
db.item_stock.belongsTo(db.products, {
	foreignKey: 'Product_ID',
	sourceKey: 'ID',
});
db.product_stock_ledger.belongsTo(db.products, {
	foreignKey: 'Product_ID',
	sourceKey: 'ID',
});

// db.products.hasMany(db.manufacturers, {
// 	foreignKey: 'ID',
// 	sourceKey: 'Product_ID',
// });
// db.purchase_order_items.belongsTo(db.purchase_order, {
// 	foreignKey: 'Purchase_Order_ID',
// 	targetKey: 'ID',
// });
// db.purchase_order.hasMany(db.purchase_order_items, {
// 	foreignKey: 'Purchase_Order_ID',
// });
// db.purchase_order.hasMany(db.purchase_order_items);
// db.purchase_order_items.belongsTo(db.purchase_order);
// db.products.hasMany(db.request_items, { foreignKey: 'Product_ID' });
// db.request_items.belongsTo(db.products);
//db.config_matrix.hasMany(db.master_customers);
//db.master_customer_group.hasMany(db.master_customers);
//db.master_customers.hasMany(db.master_customer_contracts);

//users
//db.master_customer_group.belongsTo(db.config_matrix);
//db.master_customers.belongsTo(db.config_matrix);
//db.master_customers.belongsTo(db.master_customer_group);
//db.master_customer_contracts.belongsTo(db.master_customers);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
