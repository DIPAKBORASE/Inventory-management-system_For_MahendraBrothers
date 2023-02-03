'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'dispatch',
		{
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			Gate_Pass_No: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			Dated_On: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			From_Location: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			To_Location: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Type_Of_Issue: {
				type: DataTypes.ENUM(
					'Dept To Dept',
					'Office Transfer',
					'Repair',
					'Scrap',
					'Return'
				),
				defaultValue: 'Dept To Dept',
				allowNull: false,
			},
			Department: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Cost_Center: {
				type: DataTypes.STRING(50),
				allowNull: true,
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
				allowNull: true,
			},
			File_Name: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			User_Type: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			Dispatch_By: {
				type: DataTypes.STRING(20),
				allowNull: false,
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
