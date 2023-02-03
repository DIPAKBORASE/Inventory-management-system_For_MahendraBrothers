exports.stylesData = () => {
	const styles = {
		topHeader: {
			fill: {
				fgColor: {
					rgb: 'FFFFFF',
				},
			},
			font: {
				color: {
					rgb: '000000',
				},
				sz: 26,
				bold: true,
			},
			alignment: {
				horizontal: 'center',
			},
			border: {
				top: { style: 'thin' },
				left: { style: 'thin' },
				bottom: { style: 'thin' },
				right: { style: 'thin' },
			},
		},
		tableHeader: {
			fill: {
				fgColor: {
					rgb: 'd6ad63 ',
				},
			},
			font: {
				color: {
					rgb: '000000',
				},
				sz: 14,
				bold: true,
			},
			alignment: {
				horizontal: 'left',
			},
			border: {
				top: { style: 'thin' },
				left: { style: 'thin' },
				bottom: { style: 'thin' },
				right: { style: 'thin' },
			},
		},
		cellBorder: {
			border: {
				top: { style: 'thin' },
				left: { style: 'thin' },
				bottom: { style: 'thin' },
				right: { style: 'thin' },
			},
		},
		cellInteger: {
			border: {
				top: { style: 'thin' },
				left: { style: 'thin' },
				bottom: { style: 'thin' },
				right: { style: 'thin' },
			},
			numFmt: '0',
		},
		cellDecimal: {
			border: {
				top: { style: 'thin' },
				left: { style: 'thin' },
				bottom: { style: 'thin' },
				right: { style: 'thin' },
			},
			numFmt: '0.000',
		},
		cellDate: {
			border: {
				top: { style: 'thin' },
				left: { style: 'thin' },
				bottom: { style: 'thin' },
				right: { style: 'thin' },
			},
			numFmt: 'dd-mm-yyyy',
		},
		cellDateTime: {
			border: {
				top: { style: 'thin' },
				left: { style: 'thin' },
				bottom: { style: 'thin' },
				right: { style: 'thin' },
			},
			numFmt: 'dd/mm/yyyy\\ hh:mm:ss\\ AM/PM',
		},
		cellGreen: {
			fill: {
				fgColor: {
					rgb: 'FF00FF00',
				},
			},
		},
	};
	return styles;
};
