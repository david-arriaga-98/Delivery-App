import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { getDelivery } from '../../../services/Admin/orderService';
import {
	EstaCargandoLosDatos,
	HuboUnErrorAlObtenerLosDatos
} from '../../Shipping/ShippingResponses';
import { useSelector } from 'react-redux';
import DeliveryManPagination from './DeliveryManPagination';

const Index = () => {
	const [data, setData] = useState([]);
	const [charging, setCharging] = useState(true);
	const [error, setError] = useState(false);

	const userStore = useSelector(
		(state) => state.session.data.idusuario
	);

	React.useEffect(() => {
		const exectAction = async () => {
			try {
				const rData = await getDelivery(userStore);
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
					<DeliveryManPagination data={data} />
				)}
			</Row>
		</>
	);
};

export default Index;
