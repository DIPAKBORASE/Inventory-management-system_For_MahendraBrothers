'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'vendors',
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
			Contact_Person: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Email: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Phone: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			State: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			Country: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			City: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			Address: {
				type: DataTypes.STRING(1000),
				allowNull: false,
			},
			Pincode: {
				type: DataTypes.STRING(6),
				allowNull: false,
			},
			Description: {
				type: DataTypes.STRING(1000),
				allowNull: true,
			},
			GST_No: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			PAN_No: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			Bank_Name: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Account_Number: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			Bank_Branch: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			IFSC_Code: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			Bank_Address: {
				type: DataTypes.STRING(250),
				allowNull: true,
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
			individualHooks: true,
		}
	);

	return model;
};
