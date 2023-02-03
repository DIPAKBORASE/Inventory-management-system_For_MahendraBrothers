exports.changeDateFormat = (oldDate) => {
	return oldDate.toString().split('-').reverse().join('/');
};
