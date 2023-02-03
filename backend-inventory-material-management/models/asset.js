'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'asset',
		{
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			Product_ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Inward_ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Per_Unit_Price: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			Sub_Total: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			TAX_Percentage: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			TAX_Value: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			Total_Price: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			Barcode: {
				type: DataTypes.STRING(50),
				allowNull: true,
				unique: true,
			},
			Manufacturer: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Serial_Number: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Model: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			AMC_Expiry: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			AMC_Vendor: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Product_Expiry: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			Status: {
				type: DataTypes.ENUM(
					'Unassigned',
					'Assigned',
					'Repair',
					'Scrap',
					'Lost',
					'Return'
				),
				defaultValue: 'Unassigned',
				allowNull: false,
			},
			Current_Location: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			Current_Department: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Current_Cost_Center: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
		},
		{
			// freezeTableName: true,
			engine: 'InnoDB',
			charset: 'utf8mb4',
			// underscored: true,
			paranoid: true,
			timestamps: true,
			createdAt: 'Created_At',
			updatedAt: 'Updated_At',
			deletedAt: 'Deleted_At',
		}
	);

	return model;
};
