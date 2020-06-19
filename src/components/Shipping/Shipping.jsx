import React, { useEffect, useState, Fragment } from 'react';
import { Row } from 'react-bootstrap';
import axios from '../../utils/Axios';
import { useSelector, useDispatch } from 'react-redux';

// Components
import {
	EstaCargandoLosDatos,
	HuboUnErrorAlObtenerLosDatos
} from './ShippingResponses';

import ObtuvoLosDatos from './ShippingMain';

export default () => {
	const [orders, setOrders] = useState([]);
	const [gotData, setGotData] = useState(false);
	const [respError, setRespError] = useState('');
	const helperStore = useSelector((state) => state.helper);
	const sessionStore = useSelector((state) => state.session);
	const dispatch = useDispatch();

	useEffect(() => {
		if (orders.length === 0 && !gotData && respError === '') {
			getOrder();
		}
	});

	const reRenderComponent = () => {
		setRespError('');
		setGotData(false);
		setOrders([]);
		getOrder();
	};

	const getOrder = async () => {
		try {
			const dataToSend = {
				interfaz: 'U',
				idusuario: sessionStore.data.idusuario,
				limitederegistros: 0
			};
			const { data } = await axios.post(
				'/Entregas/Listar',
				dataToSend
			);

			setOrders(data);
		} catch (error) {
			setRespError(
				'Ha ocurrido un error al tratar de recuperar su información'
			);
		}
		setGotData(true);
	};

	return (
		<Fragment>
			<Row className="justify-content-center ">
				{!gotData ? (
					<EstaCargandoLosDatos />
				) : respError === '' ? (
					<ObtuvoLosDatos
						orders={orders}
						dispatch={dispatch}
						helperStore={helperStore}
						sessionStore={sessionStore}
						reRenderComponent={reRenderComponent}
					/>
				) : (
					<HuboUnErrorAlObtenerLosDatos />
				)}
			</Row>
		</Fragment>
	);
};
