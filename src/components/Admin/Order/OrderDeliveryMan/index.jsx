import React, { useState } from 'react';
import { Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
	EstaCargandoLosDatos,
	HuboUnErrorAlObtenerLosDatos,
	NoHayDatos
} from '../../../Shipping/ShippingResponses';
import { getDelivery } from '../../../../services/Admin/orderService';
import MainGetDeliveryMan from './MainGetDeliveryMan';

export default ({ modal, setModal, dataInfo }) => {
	const [data, setData] = useState([]);
	const [charging, setCharging] = useState(true);
	const [error, setError] = useState(false);
	const [gotTheData, setGotTheData] = useState(false);

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
			setGotTheData(true);
		};
		exectAction();
	}, []);

	return (
		<>
			<Modal
				scrollable
				size="lg"
				show={modal}
				onHide={() => setModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-motorcycle mr-2"></i>
						Asigne un repartidor
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row className="justify-content-center">
						{charging ? (
							<EstaCargandoLosDatos />
						) : error ? (
							<HuboUnErrorAlObtenerLosDatos />
						) : gotTheData && data.length === 0 ? (
							<NoHayDatos />
						) : (
							<MainGetDeliveryMan
								data={data}
								dataInfo={dataInfo}
								setModal={setModal}
								userStore={userStore}
							/>
						)}
					</Row>
				</Modal.Body>
			</Modal>
		</>
	);
};
