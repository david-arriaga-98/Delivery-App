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
	const [loadData, setLoadData] = useState(true);

	React.useEffect(() => {
		const exectAction = async () => {
			if (loadData) {
				try {
					setError(false);
					setCharging(true);
					const rData = await getOrders();
					setData(rData);
				} catch (error) {
					setError(true);
				}
				setCharging(false);
				setLoadData(false);
			}
		};
		exectAction();
	}, [loadData]);

	return (
		<>
			<Row className="justify-content-center">
				{charging ? (
					<EstaCargandoLosDatos />
				) : error ? (
					<HuboUnErrorAlObtenerLosDatos />
				) : (
					<OrderPagination
						data={data}
						setLoadData={setLoadData}
					/>
				)}
			</Row>
		</>
	);
};

export default Index;
