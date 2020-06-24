import React, { useState } from 'react';
import { Col, Pagination } from 'react-bootstrap';
import Paginator from '../../utils/Paginator';

const GetDeliveryManPaginator = ({
	data,
	context,
	setPData,
	range,
	page,
	setPage
}) => {
	const [totalPage, setTotalPage] = useState(0);

	const paginator = new Paginator(data, range);

	React.useEffect(() => {
		setTotalPage(paginator.getTotalPages());
	}, [page, data]);

	React.useEffect(() => {
		changePage();
	}, [page, data]);

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
			if (page !== totalPage) {
				setPage(page + 1);
			}
		} else if (before) {
			setPage(1);
		} else if (after) {
			setPage(totalPage);
		}
		setPData(paginator.getDataForPage(page));
	};

	return (
		<>
			<Col md="9">
				<p className="text-black-50">{`Existen ${
					data.length
				} ${context} y ${paginator.getTotalPages()} páginas en total`}</p>
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

export default GetDeliveryManPaginator;
