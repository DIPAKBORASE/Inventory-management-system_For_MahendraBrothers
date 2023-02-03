'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'products',
		{
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			ALT_Code: {
				type: DataTypes.STRING(20),
				allowNull: true,
				unique: true,
			},
			Name: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
			},

			Product_Group: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			UOM: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			Asset_Holder: {
				type: DataTypes.ENUM('IT', 'Admin'),
				allowNull: false,
			},
			Category: {
				type: DataTypes.ENUM('CAPEX', 'OPEX'),
				allowNull: false,
			},
			Description: {
				type: DataTypes.STRING(1000),
				allowNull: true,
			},
			Is_Individual_Tracking: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			Price: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			Low_Stock_Quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Opening_Stock_Quantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			Opening_Stock_Value: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: true,
			},
			Opening_Stock_Tax_Value: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: true,
			},
			TAX_Percentage: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			Is_Active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: 1,
			},
		},
		{
			freezeTableName: true,
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
