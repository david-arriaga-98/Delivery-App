import React from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';

import Map from './Maps/MapWindow/Map';
import Confirm from './Maps/Confirm';

import MapConstants from '../constants/Map';

import { useSelector, useDispatch } from 'react-redux';

export default () => {
	const store = useSelector((store) => store.map);
	const dispatch = useDispatch();

	const buttonState =
		store.origin.position.lat === undefined ||
		store.origin.position.lng === undefined ||
		store.destiny.position.lng === undefined ||
		store.destiny.position.lat === undefined
			? false
			: true;

	const originText =
		store.origin.direcction === ''
			? 'Dirección de Origen'
			: store.origin.direcction;

	const destinyText =
		store.destiny.direcction === ''
			? 'Dirección de Destino'
			: store.destiny.direcction;
	return (
		<React.Fragment>
			<Row className="justify-content-center mt-5">
				<Col md="4" className="text-center mb-2">
					<Button
						variant="outline-secondary"
						block
						onClick={() =>
							dispatch({
								type:
									MapConstants.OPEN_CLOSE_ORIGIN_MODAL
							})
						}>
						{originText}
					</Button>
				</Col>
				<Col md="2" className="text-center mb-2">
					<Button
						block
						variant="success"
						disabled={!buttonState}
						onClick={() =>
							dispatch({
								type:
									MapConstants.OPEN_CLOSE_CONFIRM_MODAL
							})
						}>
						<i className="fas fa-calculator mr-2"></i>
						Calcular
					</Button>
				</Col>
				<Col md="4" className="text-center mb-2">
					<Button
						variant="outline-secondary"
						block
						onClick={() =>
							dispatch({
								type:
									MapConstants.OPEN_CLOSE_DESTINY_MODAL
							})
						}>
						{destinyText}
					</Button>
				</Col>
			</Row>

			{/* Modales */}

			<Modal
				size="lg"
				show={store.originModalState}
				onHide={() =>
					dispatch({
						type: MapConstants.OPEN_CLOSE_ORIGIN_MODAL
					})
				}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-globe mr-2"></i>
						Ingrese el origen
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Map type={'ORIGIN'} />
				</Modal.Body>
			</Modal>

			<Modal
				size="lg"
				show={store.destinyModalState}
				onHide={() =>
					dispatch({
						type: MapConstants.OPEN_CLOSE_DESTINY_MODAL
					})
				}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-globe mr-2"></i>
						Ingrese el destino
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Map type={'DESTINY'} />
				</Modal.Body>
			</Modal>

			<Modal
				show={store.confirmModalState}
				size="xl"
				backdrop="static"
				scrollable
				onHide={() =>
					dispatch({
						type: MapConstants.OPEN_CLOSE_CONFIRM_MODAL
					})
				}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-check mr-2"></i>
						Confirma tu entrega
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Confirm />
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
};
