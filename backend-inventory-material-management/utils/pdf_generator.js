const db = require('../models');
var pdf = require('pdf-creator-node');
var Handlebars = require('handlebars');
const moment = require('moment');
let fs = require('fs');
const { changeDateFormat } = require('./date_formatter');
const { changeTimeFormat } = require('./time_formatter');
//for pdf
Handlebars.registerHelper('inc', function (value, options) {
	return parseInt(value) + 1;
});

Handlebars.registerHelper('amountFixed', function (value) {
	return value.toFixed(2);
});

Handlebars.registerHelper('ifEmpty', function (arg1, arg2, options) {
	return arg1 != arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('times', function (n, block) {
	var accum = '';
	for (var i = 0; i < n; ++i) accum += block.fn(i);
	return accum;
});

// @desc get Purchase Order pdf
// @route get /api/purchase/getPOPDF
// @access public
exports.getPOPDF = async (
	PODate,
	PONumber,
	poItems,
	subTotal,
	tax,
	total,
	vendorName,
	vendorAddress,
	vendorGST,
	vendorEmail,
	vendorContact,
	termsAndCondition,
	name
) => {
	var html = fs.readFileSync(__dirname + '/../public/po.html', 'utf8');

	var options = {
		format: 'A4',
		orientation: 'portrait',
		border: '10mm',
		// timeout: '100000',
		// header: {
		//     height: "45mm",
		//     contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
		// },
		// footer: {
		//     height: "28mm",
		//     contents: {
		//         first: 'Cover page',
		//         2: 'Second page', // Any page number is working. 1-based index
		//         default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
		//         last: 'Last Page'
		//     }
		// }
	};

	let path = PONumber.split('/').join('_') + '.pdf';
	var document = {
		html: html,
		data: {
			PODate: changeDateFormat(PODate),
			PONo: PONumber,
			vendor: vendorName,
			vendorAddress: vendorAddress,
			vendorGST: vendorGST,
			vendorEmail: vendorEmail,
			vendorContact: vendorContact,
			termsAndCondition: termsAndCondition,
			items: poItems,
			subtotal: subTotal,
			tax: tax,
			total: total,
			blankRows: 5 - (poItems.length - 1),
			preparedBy: name,
			checkedBy: name,
			authorizedBy: name,
		},
		path: __dirname + `/../${process.env.DOCS}/PO/${path}`,
		type: '',
	};
	await db.purchase_order.update(
		{ File_Name: path },
		{
			where: {
				PO_Number: PONumber,
			},
		}
	);
	// By default a file is created but you could switch between Buffer and Streams by using "buffer" or "stream" respectively.
	// try {
	await pdf.create(document, options);
	// } catch (error) {
	// 	console.log('error ==', error);
	// }

	return `${path}`;
};

// @desc get pass no pdf
// @route get /api/purchase/getPassNOPDF
// @access public
exports.getPassNOPDF = async (
	DatedOn,
	Created_At,
	GatePassNo,
	DispatchItems,
	CollectedBy,
	ModeOfTransport,
	LocationName,
	Department,
	CostCenter,
	name
) => {
	var html = fs.readFileSync(__dirname + '/../public/gatepass.html', 'utf8');

	var options = {
		format: 'A4',
		orientation: 'portrait',
		border: '10mm',
		// timeout: '100000',
		// header: {
		//     height: "45mm",
		//     contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
		// },
		// footer: {
		//     height: "28mm",
		//     contents: {
		//         first: 'Cover page',
		//         2: 'Second page', // Any page number is working. 1-based index
		//         default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
		//         last: 'Last Page'
		//     }
		// }
	};

	let path = GatePassNo.split('/').join('_') + '.pdf';
	// console.log('Path of pdf', path);
	var document = {
		html: html,
		data: {
			GPDate: changeDateFormat(DatedOn),
			GPTime: moment(Created_At).format('hh:mm:ss A'),
			GPNO: GatePassNo,
			collectedBy: CollectedBy,
			modeOfTransport: ModeOfTransport,
			issueTo: '',
			items: DispatchItems,
			location: LocationName,
			department: Department,
			costcenter: CostCenter,
			blankRows: 13 - (DispatchItems.length - 1),
			issueBy: name,
			storeCollectedBy: name,
			authorizedBy: name,
		},
		path: __dirname + `/../${process.env.DOCS}/Gate-Pass/${path}`,
		type: '',
	};
	await db.dispatch.update(
		{ File_Name: path },
		{
			where: {
				Gate_Pass_No: GatePassNo,
			},
		}
	);
	// By default a file is created but you could switch between Buffer and Streams by using "buffer" or "stream" respectively.

	await pdf.create(document, options);
	return `${path}`;
};
