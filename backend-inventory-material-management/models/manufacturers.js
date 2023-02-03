'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'manufacturers',
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
			Name: {
				type: DataTypes.STRING(50),
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
