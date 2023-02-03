'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'inward',
		{
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			Challan_No: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			PO_Number: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Dated_On: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			Vendor_ID: {
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
			Total_Price: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			User_Type: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			Inward_By: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			Current_Location: {
				type: DataTypes.INTEGER,
				allowNull: true,
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
