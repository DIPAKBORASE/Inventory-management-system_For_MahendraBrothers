'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'issue_type',
		{
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			Name: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
			},
			User_Type: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			Is_Active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: 1,
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
