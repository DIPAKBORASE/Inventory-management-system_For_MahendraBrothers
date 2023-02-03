var otpGenerator = require('otp-generator');

function getOTP() {
	let OTP = otpGenerator.generate(4, {
		upperCase: false,
		specialChars: false,
		alphabets: false,
		digits: true,
	});
	return OTP;
}

module.exports = getOTP;
