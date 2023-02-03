const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { validateInput } = require('../validations/validation_result');
const EmailSender = require('../utils/sendEmail');
const { QueryTypes, Op } = require('sequelize');
const { getPagination, getPagingData } = require('./pagination');

function diff_minutes(seconds) {
	var totalseconds;

	var day = 86400;
	var hour = 3600;
	var minute = 60;

	var totalseconds = seconds;

	var daysout = Math.floor(totalseconds / day);
	var hoursout = Math.floor((totalseconds - daysout * day) / hour);
	var minutesout = Math.floor(
		(totalseconds - daysout * day - hoursout * hour) / minute
	);
	var secondsout =
		totalseconds - daysout * day - hoursout * hour - minutesout * minute;

	console.log(daysout, 'days');
	console.log(hoursout, 'hours');
	console.log(minutesout, 'minutes');
	return (string = `${daysout} days ${hoursout} hours ${minutesout} minutes`);
}

function countdown(s) {
	const d = Math.floor(s / (3600 * 24));

	s -= d * 3600 * 24;

	const h = Math.floor(s / 3600);

	s -= h * 3600;

	const m = Math.floor(s / 60);

	s -= m * 60;

	const tmp = [];

	d && tmp.push(d + 'd');

	(d || h) && tmp.push(h + 'h');

	(d || h || m) && tmp.push(m + 'm');

	tmp.push(s + 's');

	return tmp.join(' ');
}

// @desc Register user
// @route POST /api/support/changeSupportRequestStatus
// @access public
exports.changeSupportRequestStatus = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	const errors = validateInput(req);
	if (!errors.isEmpty()) {
		return res.status(200).jsonp({ error: true, data: errors.array() });
	} else {
		let request = await db.request.update(
			{
				Status: req.body.Status,
				Support_Comment: req.body.Support_Comment,
				Resolved_Date:
					req.body.Status == process.env.RESOLVED ? new Date() : null,
			},
			{
				where: {
					ID: req.body.id,
					Request_Type: process.env.SERVICEREQUEST,
					Assigned_To: req.user.ID,
				},
			}
		);
		if (request[0] === 0) {
			return next(new ErrorResponse(`Request details not found.`, 404));
		}

		const getRequest = await db.request.findOne({
			where: {
				ID: req.body.id,
			},
		});
		var assignedDate = new Date(getRequest.dataValues.Assigned_Date);
		var reslvedDate = new Date(getRequest.dataValues.Resolved_Date);

		var seconds = (reslvedDate.getTime() - assignedDate.getTime()) / 1000;

		// let TAT = diff_minutes(seconds);
		let TAT = countdown(seconds);
		console.log('TAT value====', TAT);

		if (process.env.EMAIL_FLAG) {
			const findUser = await db.user.findOne({
				where: {
					ID: getRequest.dataValues.User_ID,
				},
			});
			console.log('findUser email===', findUser.dataValues.Email);
			let userEmail = findUser.dataValues.Email;
			if (userEmail && req.body.Status == 'Resolved') {
				new EmailSender().sendSupportRequestResponse(
					userEmail,
					getRequest.dataValues.Request_Number
				);
			}
		}
		if (getRequest.dataValues.Resolved_Date != null) {
			let updateTAT = await db.request.update(
				{
					TAT: TAT,
				},
				{
					where: {
						ID: req.body.id,
					},
				}
			);
		}
		res.status(200).json({
			success: true,
			message: `Request details updated.`,
		});
	}
});
