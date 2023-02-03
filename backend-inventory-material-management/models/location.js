'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'location',
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
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			City: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Address: {
				type: DataTypes.STRING(1000),
				allowNull: true,
			},
			Is_Active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: 1,
			},
			Is_Default: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: 0,
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
