const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const bcrypt = require('bcryptjs');
const { QueryTypes, Op } = require('sequelize');
const EmailSender = require('../utils/sendEmail');

// @desc Register user
// @route post /api/approval/approveRequest
// @access public

exports.approveRequest = asyncHandler(async (req, res, next) => {
	let id = req.body.id;
	let hashID = req.body.hash;
	let findUser;
	const HODRequestAction = await db.request.findOne({
		where: {
			ID: id,
			HOD_Hash_ID: hashID,
			HOD_Approved: 0,
		},
	});
	const HeadRequestAction = await db.request.findOne({
		where: {
			ID: id,
			Head_Hash_ID: hashID,
			HOD_Approved: 1,
			Head_Approved: 0,
		},
	});

	if (HODRequestAction !== null) {
		req.body.HOD_Approved = 1;
		req.body.HOD_Approved_Date = new Date();

		const requestHOD = await db.request.update(req.body, {
			where: {
				ID: HODRequestAction.dataValues.ID,
			},
		});
		if (
			HODRequestAction.dataValues.Head_Hash_ID != null &&
			HODRequestAction.dataValues.Request_Amount >= process.env.AMOUNT
		) {
			if (process.env.EMAIL_FLAG) {
				findUser = await db.user.findOne({
					where: {
						ID: HODRequestAction.dataValues.User_ID,
					},
				});
				const findHeadEmail = await db.user.findOne({
					where: {
						ID: findUser.dataValues.HEAD,
					},
				});

				let headEmail = findHeadEmail.dataValues.Email;

				new EmailSender().sendApprovalEmail(
					headEmail,
					HODRequestAction.dataValues.ID,
					HODRequestAction.dataValues.Request_Number,
					HODRequestAction.dataValues.Head_Hash_ID
				);
			}
		} else {
			req.body.Head_Approved = 1;
			req.body.Head_Approved_Date = new Date();

			const updateHead = await db.request.update(req.body, {
				where: {
					ID: HODRequestAction.dataValues.ID,
				},
			});
			if (process.env.EMAIL_FLAG) {
				findUser = await db.user.findOne({
					where: {
						ID: HODRequestAction.dataValues.User_ID,
					},
				});
				findHODEmail = await db.user.findOne({
					where: {
						ID: findUser.dataValues.HOD,
					},
				});
				new EmailSender().sendApprovalEmailToRequester(
					findUser.dataValues.Email,
					HODRequestAction.dataValues.Request_Number,
					findHODEmail.dataValues.Name
				);
			}
		}

		res.status(200).json({
			success: true,
			message: `Request Approved successfully.`,
		});
	} else if (HeadRequestAction !== null) {
		req.body.Head_Approved = 1;
		req.body.Head_Approved_Date = new Date();
		const requestHEAD = await db.request.update(req.body, {
			where: {
				ID: HeadRequestAction.dataValues.ID,
			},
		});
		if (process.env.EMAIL_FLAG) {
			findUser = await db.user.findOne({
				where: {
					ID: HeadRequestAction.dataValues.User_ID,
				},
			});
			findHeadEmail = await db.user.findOne({
				where: {
					ID: findUser.dataValues.HEAD,
				},
			});
			new EmailSender().sendApprovalEmailToRequester(
				findUser.dataValues.Email,
				HeadRequestAction.dataValues.Request_Number,
				findHeadEmail.dataValues.Name
			);
		}
		res.status(200).json({
			success: true,
			message: `Request Approved SuccessFully.`,
		});
	} else {
		return next(new ErrorResponse(`Request details not found.`, 404));
	}
});

// @desc Register user
// @route post /api/approval/rejectRequest
// @access public

exports.rejectRequest = asyncHandler(async (req, res, next) => {
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let id = req.body.id;
		let hashID = req.body.hash;
		let reason = req.body.Reject_Reason;

		const HODRequestAction = await db.request.findOne({
			where: {
				ID: id,
				HOD_Hash_ID: hashID,
				HOD_Approved: 0,
			},
		});
		const HeadRequestAction = await db.request.findOne({
			where: {
				ID: id,
				Head_Hash_ID: hashID,
				HOD_Approved: 1,
				Head_Approved: 0,
			},
		});

		if (HODRequestAction !== null) {
			req.body.HOD_Approved = 2;
			req.body.HOD_Approved_Date = new Date();
			req.body.HOD_Reject_Reason = reason;
			const requestHOD = await db.request.update(req.body, {
				where: {
					ID: HODRequestAction.dataValues.ID,
				},
			});
			if (process.env.EMAIL_FLAG) {
				findUser = await db.user.findOne({
					where: {
						ID: HODRequestAction.dataValues.User_ID,
					},
				});
				findHODEmail = await db.user.findOne({
					where: {
						ID: findUser.dataValues.HOD,
					},
				});
				new EmailSender().sendRejectedEmailToRequester(
					findUser.dataValues.Email,
					HODRequestAction.dataValues.Request_Number,
					findHODEmail.dataValues.Name,
					req.body.Reject_Reason
				);
			}
			res.status(200).json({
				success: true,
				message: `Request Rejected.`,
			});
		} else if (HeadRequestAction !== null) {
			req.body.Head_Approved = 2;
			req.body.Head_Approved_Date = new Date();
			req.body.Head_Reject_Reason = reason;

			const requestHEAD = await db.request.update(req.body, {
				where: {
					ID: HeadRequestAction.dataValues.ID,
				},
			});
			if (process.env.EMAIL_FLAG) {
				findUser = await db.user.findOne({
					where: {
						ID: HeadRequestAction.dataValues.User_ID,
					},
				});

				findHeadEmail = await db.user.findOne({
					where: {
						ID: findUser.dataValues.HEAD,
					},
				});
				new EmailSender().sendRejectedEmailToRequester(
					findUser.dataValues.Email,
					HeadRequestAction.dataValues.Request_Number,
					findHeadEmail.dataValues.Name,
					req.body.Reject_Reason
				);
			}

			res.status(200).json({
				success: true,
				message: `Request Rejected.`,
			});
		} else {
			return next(new ErrorResponse(`Request details not found.`, 404));
		}
	}
});
