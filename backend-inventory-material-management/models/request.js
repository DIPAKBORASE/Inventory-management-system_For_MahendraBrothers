'use strict';

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'request',
		{
			ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			Request_Number: {
				type: DataTypes.STRING(50),
				allowNull: false,
				unique: true,
			},
			User_ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Request_Department: {
				type: DataTypes.ENUM('IT', 'Admin'),
				allowNull: false,
			},
			Request_Type: {
				type: DataTypes.ENUM('Procurement', 'Service Request'),
				allowNull: false,
			},
			Location_ID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Status: {
				type: DataTypes.ENUM(
					'Open',
					'Ready To Dispatch',
					'Dispatched',
					'Delivered',
					'Resolved',
					'Discarded',
					'In Progress'
				),
				defaultValue: 'Open',
				allowNull: false,
			},
			Description: {
				type: DataTypes.STRING(1000),
				allowNull: true,
			},
			Priority: {
				type: DataTypes.ENUM('Low', 'Medium', 'High'),
				allowNull: true,
			},
			Type_Of_Issue: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			Request_Amount: {
				type: DataTypes.DOUBLE(25, 3),
				allowNull: true,
			},
			HOD_Approved: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: 0,
			},
			HOD_Approved_Date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			Head_Approved: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: 0,
			},
			Head_Approved_Date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			HOD_Reject_Reason: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			Head_Reject_Reason: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			Request_Date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			HOD_Hash_ID: {
				type: DataTypes.STRING,
				isAlphaNumeric: true,
				allowNull: true,
			},
			Head_Hash_ID: {
				type: DataTypes.STRING,
				isAlphaNumeric: true,
				allowNull: true,
			},
			Assigned_To: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			Assigned_Date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			Resolved_Date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			TAT: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			Requester_Remark: {
				type: DataTypes.STRING(150),
				allowNull: true,
			},
			Rating: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			Support_Comment: {
				type: DataTypes.STRING(150),
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
			createdAt: 'Request_Date',
			updatedAt: 'Updated_At',
			deletedAt: 'Deleted_At',
		}
	);

	return model;
};
