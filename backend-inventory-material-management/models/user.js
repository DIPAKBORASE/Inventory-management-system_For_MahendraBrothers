'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'user',
		{
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			Employee_Code: {
				type: DataTypes.STRING(20),
				allowNull: false,
				unique: true,
			},
		
			Name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			Email: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			Mobile: {
				type: DataTypes.STRING(20),
				allowNull: true,
			},
			Password: {
				type: DataTypes.STRING,
				isAlphaNumeric: true,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Password is required',
					},
				},
			},
			User_Type: {
				type: DataTypes.ENUM(
					'System Admin',
					'IT',
					'IT System Admin',
					'Admin',
					'Admin System Admin',
					'Requester',
					'Support',
					'Approver'
				),
				allowNull: false,
				validate: {
					notNull: {
						msg: 'User_Type is required',
					},
				},
			},
			HOD: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			HEAD: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},

			Location: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Department: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Cost_Center: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			OTP: {
				type: DataTypes.INTEGER,
				allowNull: true,
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
			individualHooks: true,
		}
	);

	// hooks (crete hash password)
	model.beforeCreate(async (user, options) => {
		const salt = bcrypt.genSaltSync(10);
		user.Password = bcrypt.hashSync(user.Password, salt);
	});

	// hooks (crete hash Password)
	model.beforeBulkUpdate(async (user, options) => {
		console.log('update', user.attributes.Password);
		if (user.attributes.Password) {
			const salt = bcrypt.genSaltSync(10);
			user.attributes.Password = bcrypt.hashSync(
				user.attributes.Password,
				salt
			);
		}
	});

	// instance methods (crete jwt token)
	model.prototype.getSignedJwtToken = (userId) => {
		return jwt.sign(
			{
				id: userId,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRE,
			}
		);
	};

	// instance methods (match password)
	model.prototype.matchPassword = async (enteredPassword, Password) => {
		// console.log(this.password);
		return bcrypt.compareSync(enteredPassword, Password);
	};

	return model;
};
