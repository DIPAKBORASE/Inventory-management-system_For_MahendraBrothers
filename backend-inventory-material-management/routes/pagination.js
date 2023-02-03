const getPagingData = (items, page, limit) => {
	// console.log('Data===getpaginationdata=', items, page, limit);
	const { count: total, rows: data } = items;
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(total / limit);

	return { total, data, totalPages, currentPage };
};
const getPagination = (page, size) => {
	// console.log('data=====', page, size);
	const limit = size ? +size : 3;

	const offset = page ? (page - 1) * limit : 0;

	return { limit, offset };
};
exports.getPagingData = getPagingData;
exports.getPagination = getPagination;
