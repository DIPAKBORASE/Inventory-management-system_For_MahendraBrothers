// const db = require('../models');
const cron = require('node-cron');
const EmailSender = require('../utils/sendEmail');
const asyncHandler = require('../middleware/async');
exports.cronJob1 = asyncHandler(async (req, res, next) => {
	const stockAlert = await db.sequelize
		.query(
			'SELECT SUM(CASE WHEN Status = "Unassigned" THEN 1 ELSE 0 END) AS `Current_Quantity`, `product`.`Name` AS `Name`,' +
				' `product`.`Low_Stock_Quantity` AS `Low_Stock_Quantity` FROM `assets` AS `asset` LEFT OUTER JOIN `products` AS `product`' +
				' ON `asset`.`Product_ID` = `product`.`ID` AND (`product`.`Deleted_At` IS NULL) WHERE (`asset`.`Deleted_At` IS NULL) ' +
				'GROUP BY `Product_ID` HAVING Current_Quantity < product.Low_Stock_Quantity',
			{
				type: QueryTypes.SELECT,
			}
		)
		.catch((e) => {
			res.status(500).json({
				error: true,
				message: 'Server error..!!',
			});
		});
	let saEmail = await db.user.findAll({
		where: {
			User_Type: { [Op.eq]: process.env.SYSTEM_ADMIN },
		},
		attributes: ['Email'],
	});

	let mailList = [];
	saEmail.forEach((element) => {
		mailList.push(element.Email);
	});
	if (process.env.EMAIL_FLAG) {
		if (saEmail) {
			new EmailSender().sendLowStockAlert(mailList, stockAlert);
		}
	}
	console.log(stockAlert);

	res.status(200).json({
		success: true,
		data: stockAlert,
	});
});
