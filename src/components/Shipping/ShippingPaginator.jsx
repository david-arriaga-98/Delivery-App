import React, { useState, useEffect } from 'react';
import { Pagination, Col } from 'react-bootstrap';
import ShippingCard from './ShippingCard';
import { format } from 'date-fns';

export default ({ data, dispatch, renderPaginator }) => {
	let totalPages = Math.ceil(data.length / 5);
	let paginationItems = [];

	const [page, setPage] = useState(1);
	const [dataToPaint, setDataToPaint] = useState([]);
	const [isPaint, setIsPaint] = useState(false);

	for (let i = 1; i <= totalPages; i++) {
		paginationItems.push(
			<Pagination.Item
				onClick={() => {
					changePage(i);
				}}
				key={i}
				active={i === page}>
				{i}
			</Pagination.Item>
		);
	}
	// eslint-disable-next-line
	useEffect(() => {
		if (page === 1 && !isPaint) {
			changePage(1);
			setIsPaint(true);
		}
	});

	const changePage = (page) => {
		setPage(page);
		const ranges = getRange(page);

		const newData = data.filter(
			(item, index) =>
				index >= ranges.min && index <= ranges.max
		);
		setDataToPaint(newData);
	};

	return (
		<React.Fragment>
			<Col md="9">
				<Pagination size="sm">{paginationItems}</Pagination>
			</Col>
			{dataToPaint.map((item, index) => {
				let hour = dataToPaint[index].horaprogramada.split(
					':'
				);
				let hour2 = dataToPaint[index].horadestino.split(':');

				return (
					<ShippingCard
						info={item}
						dispatch={dispatch}
						key={index}
						position={index}
						date={
							item.esprogramado
								? format(
										new Date(
											item.fechaprogramada
										),
										'dd-MM-yyyy'
								  )
								: format(
										new Date(item.fechadestino),
										'dd-MM-yyyy'
								  )
						}
						hour={
							item.esprogramado
								? `${hour[0]}:${hour[1]}`
								: `${hour2[0]}:${hour2[1]}`
						}
						distance={item.distancia}
						from={item.direccionorg}
						to={item.direcciondes}
					/>
				);
			})}

			<Col md="9">
				<Pagination size="sm">{paginationItems}</Pagination>
			</Col>
		</React.Fragment>
	);
};

const getRange = (index) => {
	let max = index * 5 - 1;
	let min = max - 4;
	return {
		min,
		max
	};
};
