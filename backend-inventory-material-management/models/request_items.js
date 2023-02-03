'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'request_items',
		{
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			Request_ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Product_ID: {
				type: DataTypes.INTEGER,
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
			Per_Unit_Price: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: false,
			},
			Total_Price: {
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
			Sub_Total: {
				type: DataTypes.DOUBLE(25, 3),
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
