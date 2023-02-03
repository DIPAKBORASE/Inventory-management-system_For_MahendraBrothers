function getCurrentFinancialYear() {
	let strDate = new Date();
	let next_year;
	if (strDate.getMonth() + 1 <= 3) {
		financial_year = strDate.getFullYear() - 1;
		next_year = strDate.getFullYear();
	} else {
		financial_year = strDate.getFullYear();
		next_year = strDate.getFullYear() + 1;
	}
	// Add this line
	let firstYear = financial_year.toString();
	let secondYear = next_year.toString().substr(-2);
	let twoDigitYear = firstYear + '-' + secondYear;
	return twoDigitYear;
}

module.exports = getCurrentFinancialYear;
