const db = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
var nodemailer = require('nodemailer');
var Request = require('request');
const { route } = require('./user');
const router = require('./user');

var smtpConfig = {
	host: 'smtp.gmail.com',
	port: 587,
	secure: false, // use SSL
	auth: {
		user: 'borasedipak9107@gmail.com',
		pass: 'bcbytjdawczywfvj',
	},
};
var transporter = nodemailer.createTransport(smtpConfig);

exports.sendEmails = asyncHandler(async (user, requestData, req, res, next) => {
	console.log('mailOptions typeOfMail =======', user);
	let findHodEmail = await db.user.findOne({
		where: {
			id: user.HOD,
		},
	});

	console.log('request data', requestData);
	let foundHOD = findHodEmail.dataValues.Email;
	var mailOptions = {
		from: 'borasedipak9107@gmail.com',
		to: 'sumitsakpal02@gmail.com',
		subject: 'Approval Request',
		// text: 'Test',
		// html: `<a href="https://approval.io/#/projects/${user.Hash_ID}">https://approval.io/#/projects/${user.Hash_ID}</a>`,
		html: `<a href="http://localhost:5000/api/request/getHODApprovalLink/${user.Hash_ID}">https://approval.io/#/projects/${user.Hash_ID}</a>`,
		rateLimit: 100,
	};
	console.log('mailOptions typeOfMail =======', mailOptions);

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log('Email error--------------------------', error);
			res.status(200).json({
				success: false,
				info: info,
				message: 'Email error--------------------------' + error,
			});
		} else {
			res.status(200).json({
				success: false,
				data: requestData,
				message: 'Email Send--------------------------',
			});
			console.log('Email Send--------------------------');
		}
	});
});
exports.sendHeadEmails = asyncHandler(async (user, req, res, next) => {
	console.log('mailOptions typeOfMail =======', user);
	let findHEADEmail = await db.user.findOne({
		where: {
			id: user.HEAD,
		},
	});

	// console.log('request data', requestData);
	let foundHEAD = findHEADEmail.dataValues.Email;
	console.log('HEAD email found', foundHEAD);
	var mailOptions = {
		from: 'borasedipak9107@gmail.com',
		to: 'borasedipak18@gmail.com',
		subject: 'Approval Request',
		// text: 'Test',
		// html: `<a href="https://approval.io/#/projects/${user.Hash_ID}">https://approval.io/#/projects/${user.Hash_ID}</a>`,
		html: `<b>HOD Approval this request.</b><br /><a href="http://localhost:5000/api/request/getHEADApprovalLink/${user.Hash_ID}">https://approval.io/#/projects/${user.Hash_ID}</a>`,
		rateLimit: 100,
	};
	console.log('mailOptions typeOfMail =======', mailOptions);

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log('Email error--------------------------', error);
			res.status(200).json({
				success: false,
				info: info,
				message: 'Email error--------------------------' + error,
			});
		} else {
			res.status(200).json({
				success: false,
				// data: requestData,
				message: 'Email Send--------------------------',
			});
			console.log('Email Send--------------------------');
		}
	});
});

const sendMail = async (user, statusCode, res, type, OTP) => {
	let message = '';
	let resmsg = '';
	if (user.mobile_no && user.mobile_no != '' && user.mobile_no != null) {
		if (type == 'reg') {
			resmsg = 'OTP sent on your registered mobile number';
			message =
				'Dear User,We welcome you to our Pristine Academy family, Your OTP is ' +
				OTP +
				" Please don't share it with anyone else.";
		} else {
			message =
				'Dear User,  Your Password is ' +
				OTP +
				" Please don't share it with anyone else.";
			resmsg = 'Paasword sent on your registered mobile no';
		}

		Request.get(
			process.env.SMS_URL +
				'number=' +
				user.mobile_no +
				'&text=' +
				message +
				'&route=clickhere',
			(error, response, body) => {
				if (error) {
					return console.dir(error);
				}
				console.dir(JSON.parse(body));
			}
		);

		// const OTPResponce = Request.post({
		//     "headers": { "content-type": "application/json", "authkey": process.env.SMS_AUTHKEY },
		//     "url": process.env.SMS_API,
		//     "body": JSON.stringify({
		//         "sender": "BSTFIT",
		//         "route": "4",
		//         "country": "91",
		//         "sms": [{
		//             "message": message,
		//             "to": [
		//                 user.mobile_no,
		//             ]
		//         }]
		//     })
		// }, (error, response, body) => {
		//     if (error) {
		//         return console.dir(error);
		//     }
		//     console.dir(JSON.parse(body));
		// });

		if (type == 'reg') {
			const salt = bcrypt.genSaltSync(10);
			let password = bcrypt.hashSync(OTP, salt);
			await db.user.update(
				{ otp: OTP },
				{
					where: {
						id: user.id,
					},
				}
			);
		} else {
			const salt = bcrypt.genSaltSync(10);
			let password = bcrypt.hashSync(OTP, salt);
			await db.user.update(
				{ otp: OTP },
				{
					where: {
						id: user.id,
					},
				}
			);
			res.status(200).json({
				success: true,
				otp: OTP,
				message: resmsg,
			});
		}
	}
};
exports.sendMail = sendMail;
module.exports= router
