import React, { useState } from 'react';
import { Col, Pagination } from 'react-bootstrap';

const GetDeliveryManPaginator = ({
	data,
	context,
	setPData,
	range,
	page,
	setPage
}) => {
	const [totalPages, setTotalPages] = useState(0);

	const getRangeOfData = (page) => {
		let max = page * range - 1;
		let min = max - (range - 1);
		return {
			min,
			max
		};
	};

	const getDataForPage = (page) => {
		const range = getRangeOfData(page);
		return data.filter(
			(item, index) => index >= range.min && index <= range.max
		);
	};
	// eslint-disable-next-line
	const changePage = (
		previous = false,
		next = false,
		before = false,
		after = false
	) => {
		if (previous) {
			if (page !== 1) {
				setPage(page - 1);
			}
		} else if (next) {
			if (page !== totalPages) {
				setPage(page + 1);
			}
		} else if (before) {
			setPage(1);
		} else if (after) {
			setPage(totalPages);
		}
		setPData(getDataForPage(page));
	};

	React.useEffect(() => {
		setPage(1);
	}, [data, setPage]);

	React.useEffect(() => {
		setTotalPages(Math.ceil(data.length / range));
	}, [data, range]);

	React.useEffect(() => {
		changePage();
	}, [page, data, totalPages, changePage]);

	return (
		<>
			<Col md="9">
				<p className="text-black-50">{`Existen ${data.length} ${context} y ${totalPages}  páginas en total`}</p>
			</Col>
			<Col md="3">
				<Pagination size="sm" style={{ paddingRight: '0' }}>
					<Pagination.First
						onClick={() => {
							changePage(false, false, true, false);
						}}
					/>
					<Pagination.Prev
						onClick={() => {
							changePage(true, false, false, false);
						}}
					/>
					<Pagination.Item>{page}</Pagination.Item>
					<Pagination.Next
						onClick={() => {
							changePage(false, true, false, false);
						}}
					/>
					<Pagination.Last
						onClick={() => {
							changePage(false, false, false, true);
						}}
					/>
				</Pagination>
			</Col>
		</>
	);
};

export default React.memo(GetDeliveryManPaginator);
