'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'purchase_order',
		{
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			PO_Number: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
			},
			Vendor_ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			PO_Date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			PO_Raised_By: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Sub_Total: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			Tax_value: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			PO_Total: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			File_Name: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			User_Type: {
				type: DataTypes.STRING(20),
				allowNull: false,
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
