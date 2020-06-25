import React from 'react';
import {
	Modal,
	Row,
	Col,
	FormLabel,
	FormControl,
	FormGroup,
	Button
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import HelperConstants from '../../constants/Helper';

const OrderInformation = () => {
	const dispatch = useDispatch();
	const helperStore = useSelector((state) => state.helper);

	return (
		<Modal
			scrollable
			onHide={() =>
				dispatch({
					type: HelperConstants.ORDER_INFORMATION_MODAL,
					payload: {
						state: false
					}
				})
			}
			show={helperStore.orderInformationModal}>
			<Modal.Header closeButton>
				<Modal.Title>
					<i className="fas fa-info-circle mr-2"></i>
					Información de la orden
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className="justify-content-center">
					<Col md="4">
						<FormGroup>
							<FormLabel>Espera:</FormLabel>
							<FormControl
								className="bg-primary text-white"
								readOnly
								value={`${helperStore.orderInfo.tiempoespera} minutos`}
							/>
						</FormGroup>
					</Col>
					<Col md="4">
						<FormGroup>
							<FormLabel>Tarifa:</FormLabel>
							<FormControl
								className="bg-primary text-white"
								readOnly
								value={`${helperStore.orderInfo.tarifa} Q`}
							/>
						</FormGroup>
					</Col>

					<Col md="4">
						<FormGroup>
							<FormLabel>Distancia:</FormLabel>
							<FormControl
								className="bg-primary text-white"
								readOnly
								value={`${helperStore.orderInfo.distancia} km`}
							/>
						</FormGroup>
					</Col>
					<Col md="6">
						<FormGroup>
							<FormLabel>Hora estimada:</FormLabel>
							<FormControl
								className="bg-primary text-white"
								readOnly
								value={
									helperStore.orderInfo.horaestimada
								}
							/>
						</FormGroup>
					</Col>

					<Col md="6">
						<FormGroup>
							<FormLabel>Fecha estimada:</FormLabel>
							<FormControl
								className="bg-primary text-white"
								readOnly
								value={
									helperStore.orderInformationModal
										? format(
												new Date(
													helperStore.orderInfo.fechaestimada
												),
												'dd-MM-yyyy'
										  )
										: ''
								}
							/>
						</FormGroup>
					</Col>
					<Col md="12">
						<FormGroup>
							<FormLabel>
								Identificación de la orden:
							</FormLabel>
							<FormControl
								className="bg-primary text-white"
								readOnly
								value={helperStore.orderInfo.idorden}
							/>
						</FormGroup>
					</Col>

					<Col md="12">
						<FormGroup>
							<FormLabel>Origen del pedido:</FormLabel>
							<FormControl
								className="bg-primary text-white"
								readOnly
								value={
									helperStore.orderInfo.direccionorg
								}
							/>
						</FormGroup>
					</Col>
					<Col md="12">
						<FormGroup>
							<FormLabel>Origen del destino:</FormLabel>
							<FormControl
								className="bg-primary text-white"
								readOnly
								value={
									helperStore.orderInfo.direcciondes
								}
							/>
						</FormGroup>
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="danger"
					size="sm"
					onClick={() => {
						dispatch({
							type:
								HelperConstants.ORDER_INFORMATION_MODAL,
							payload: {
								state: false
							}
						});
					}}>
					<i className="fas fa-times mr-2"></i>
					Cerrar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default OrderInformation;
