const nodemailer = require('nodemailer');

class EmailSender {
	transport;
	from;

	constructor() {
		this.transport = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			secure: false, // use SSL
			auth: {
				user: process.env.MAIL_USERNAME,
				pass: process.env.MAIL_PASSWORD,
			},
		});
		this.from = process.env.MAIL_USERNAME;
	}
	async sendMessage(from, to, subject, text, html) {
		let mailOptions = {
			from,
			to,
			subject,
			text,
			html,
		};

		await this.transport.sendMail(mailOptions);
	}
	sendApprovalEmail(to, id, REQUEST_ID, hash) {
		let mailOptions = {
			from: this.from,
			to,
			subject: `Request ${REQUEST_ID} approval required`,
			html: `
			<p>Dear Approver,</p>

<p>Request ${REQUEST_ID} is needs your approval.</p>

<p><a href="${process.env.FRONT_URL}#/approve/${id}/${hash}">CLICK HERE FOR DETAILS</a></p>`,
		};

		this.transport.sendMail(mailOptions);
	}
	requestDispatchedEmail(to, REQUEST_ID) {
		let mailOptions = {
			from: this.from,
			to,
			subject: `Request ${REQUEST_ID} dispatched`,
			html: `<p>Dear Requester,</p>

			<p>Request ${REQUEST_ID} is dispatched and will reach to you soon.</p>
			
			<p>Once you received it please acknowledge same on the portal.</p>`,
		};

		this.transport.sendMail(mailOptions);
	}
	sendServiceRequestToSupport(to, REQUEST_ID) {
		let mailOptions = {
			from: this.from,
			to,
			subject: `Request ${REQUEST_ID} assigned`,
			html: `<p>Dear Support User,</p>

			<p>Request ${REQUEST_ID} is assigned to you.</p>
			
			<p>Please update the status on the portal.</p>`,
		};

		this.transport.sendMail(mailOptions);
	}
	sendServiceRequestToRequster(
		to,
		REQUEST_ID,
		SUPPORT_NAME,
		SUPPORT_EMAIL,
		SUPPORT_PHONE
	) {
		let mailOptions = {
			from: this.from,
			to,
			subject: `Request ${REQUEST_ID} assigned`,
			html: `<p>Dear Request User,</p>

			<p>Your Request ID ${REQUEST_ID} is assigned to ${SUPPORT_NAME}.</p>
			
			<p>You can contact on this Email ${SUPPORT_EMAIL} or this Mobile NO ${SUPPORT_PHONE}.</p>`,
		};

		this.transport.sendMail(mailOptions);
	}
	sendSupportRequestResponse(to, REQUEST_ID) {
		let mailOptions = {
			from: this.from,
			to,
			subject: `Request ${REQUEST_ID} resolved`,
			html: `<p>Dear Requester,</p>

			<p>Request ${REQUEST_ID} is resolved.</p>
			
			<p>In case of any issue do contact.</p>`,
		};

		this.transport.sendMail(mailOptions);
	}
	sendApprovalEmailToRequester(to, REQUEST_ID, HOD_OR_HEAD_NAME) {
		let mailOptions = {
			from: this.from,
			to,
			subject: `Request ${REQUEST_ID} approved`,
			html: `<p>Dear Requester,</p>

			<p>Your Request ${REQUEST_ID} is approved by ${HOD_OR_HEAD_NAME}.</p>`,
		};

		this.transport.sendMail(mailOptions);
	}
	sendRejectedEmailToRequester(to, REQUEST_ID, HOD_OR_HEAD_NAME, REASON) {
		let mailOptions = {
			from: this.from,
			to,
			subject: `Request ${REQUEST_ID} rejected`,
			html: `<p>Dear Requester,</p>

			<p>Your Request ${REQUEST_ID} is rejected by ${HOD_OR_HEAD_NAME}.</p>
			
			<p>Reason: ${REASON}</p>`,
		};

		this.transport.sendMail(mailOptions);
	}
	sendPOToVendor(to, VENDOR_NAME, PO_NUMBER, POPath) {
		let mailOptions = {
			from: this.from,
			to,
			subject: `Purchase Order ${PO_NUMBER}`,
			html: `<p>Dear ${VENDOR_NAME},</p>

			<p>Please find attached Purchase Order ${PO_NUMBER}.</p>`,
			attachments: [
				{
					// utf-8 string as an attachment
					filename: POPath,
					path: __dirname + `/../${process.env.DOCS}/PO/${POPath}`,
				},
			],
		};

		this.transport.sendMail(mailOptions);
	}
	sendOTPToUser(to, USER_NAME, OTP) {
		let mailOptions = {
			from: this.from,
			to,
			subject: `Forgot Password`,
			html: `<p>Dear ${USER_NAME},</p>

			<p>Your forgot password OTP is <h1 style="color:green;font-size:40px;">${OTP}</h1>.</p>`,
		};

		this.transport.sendMail(mailOptions);
	}
	sendLowStockAlert(to, items) {
		let mailOptions;
		let message = `
		<table border="1" width="100%">
                <thead>

                    <th style="width: 80px;">Name</th>
                    <th style="width: 40px;">Current Quantity</th>
                    <th style="width: 40px;">Low Stock Quantity</th>
                </thead>
		`;

		for (const { Current_Quantity, Name, Low_Stock_Quantity } of items) {
			message +=
				'<tr>' +
				'<td>' +
				Name +
				'</td>' +
				'<td>' +
				Current_Quantity +
				'</td>' +
				'<td>' +
				Low_Stock_Quantity +
				'</td>' +
				'</tr>';
		}
		message += '</table>';

		mailOptions = {
			from: this.from,
			to,
			subject: `Low Stock Alert`,
			html: message,
		};

		this.transport.sendMail(mailOptions);
	}
}

module.exports = EmailSender;
