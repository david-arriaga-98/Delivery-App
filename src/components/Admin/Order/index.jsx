import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { getOrders } from '../../../services/Admin/orderService';
import {
	EstaCargandoLosDatos,
	HuboUnErrorAlObtenerLosDatos
} from '../../Shipping/ShippingResponses';

import OrderPagination from './OrderPagination';

const Index = () => {
	const [data, setData] = useState([]);
	const [charging, setCharging] = useState(true);
	const [error, setError] = useState(false);

	React.useEffect(() => {
		const exectAction = async () => {
			try {
				const rData = await getOrders();
				setData(rData);
			} catch (error) {
				setError(true);
			}
			setCharging(false);
		};
		exectAction();
	}, []);

	return (
		<>
			<Row className="justify-content-center">
				{charging ? (
					<EstaCargandoLosDatos />
				) : error ? (
					<HuboUnErrorAlObtenerLosDatos />
				) : (
					<OrderPagination data={data} />
				)}
			</Row>
		</>
	);
};

export default Index;
