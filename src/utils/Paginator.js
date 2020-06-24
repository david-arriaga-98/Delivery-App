export default class Paginator {
	data = [];
	range = 0;
	currentPage = 0;
	totalPages = 0;

	constructor(data, range = 10, currentPage = 1) {
		this.data = data;
		this.range = range;
		this.currentPage = currentPage;
		this.setTotalPages();
	}

	setTotalPages() {
		this.totalPages = Math.ceil(this.data.length / this.range);
	}

	getTotalPages() {
		return this.totalPages;
	}

	getRangeOfData(page) {
		let max = page * this.range - 1;
		let min = max - (this.range - 1);
		return {
			min,
			max
		};
	}

	getDataForPage(page) {
		const range = this.getRangeOfData(page);
		return this.data.filter(
			(item, index) => index >= range.min && index <= range.max
		);
	}

	getNextPage() {
		this.currentPage++;
		return this.getDataForPage(this.currentPage);
	}

	getPrevPage() {
		this.currentPage--;
		return this.getDataForPage(this.currentPage);
	}

	getLastPage() {
		return this.getDataForPage(this.totalPages);
	}

	getFirsPage() {
		return this.getDataForPage(1);
	}
}
