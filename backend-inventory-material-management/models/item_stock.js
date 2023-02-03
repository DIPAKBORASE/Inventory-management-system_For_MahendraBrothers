'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'item_stock',
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
			Dated_On: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			Price: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			Opening_Quantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			Opening_Amount: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: true,
				defaultValue: 0,
			},
			Received_Quantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			Received_Amount: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: true,
				defaultValue: 0,
			},
			Returned_Quantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			Returned_Amount: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: true,
				defaultValue: 0,
			},
			Issue_Quantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			Issue_Amount: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: true,
				defaultValue: 0,
			},
			Closing_Quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			Closing_Amount: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
				defaultValue: 0,
			},
			Scrap_Lost_Quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			Scrap_Lost_Amount: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
				defaultValue: 0,
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
