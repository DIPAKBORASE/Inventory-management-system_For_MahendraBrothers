'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'asset_transaction',
		{
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			Dispatch_ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Asset_ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Dated_On: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			Location_From: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Location_From_Department: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Location_From_Cost_Center: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Location_To: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Location_To_Department: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			Location_To_Cost_Center: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Type_Of_Issue: {
				type: DataTypes.ENUM(
					'Dept To Dept',
					'Office Transfer',
					'Repair',
					'Scrap',
					'Return',
					'Lost'
				),
				defaultValue: 'Dept To Dept',
				allowNull: false,
			},
			Collected_By: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			Mode_Of_Transport: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			Quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			UOM: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			Remark: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			User_Name: {
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
