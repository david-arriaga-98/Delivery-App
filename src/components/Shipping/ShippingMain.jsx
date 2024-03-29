import React, { useState, Fragment } from 'react';
import {
	Row,
	Col,
	Button,
	FormControl,
	FormGroup,
	FormLabel
} from 'react-bootstrap';

import HelperConstants from '../../constants/Helper';
import InputGroup from 'react-bootstrap/InputGroup';

import { format } from 'date-fns';

import Validator from 'validator';

import Modal from 'react-bootstrap/Modal';
import axios from '../../utils/Axios';
import { QualifyShipping } from '../../services/Map/shippingService';

import {
	EstaCargandoLosDatos,
	NoHayDatos
} from './ShippingResponses';

import ShippingPaginator from './ShippingPaginator';

export default ({
	dispatch,
	orders,
	helperStore,
	sessionStore,
	reRenderComponent
}) => {
	const [orderId, setOrderID] = useState('');

	const [
		dataFromThisComponent,
		setDataFromThisComponent
	] = useState([]);

	const [error, setError] = useState('');

	const [charging, setCharging] = useState(false);

	const [isCharged, setIsCharget] = useState(false);

	const [
		useDataFromThisComponent,
		setUseDataFromThisComponent
	] = useState(false);

	const [disableInput, setDisableInput] = useState(false);

	const onChange = (e) => {
		setOrderID(e.target.value);
	};

	const onClick = async () => {
		setError('');
		setCharging(true);
		// Validamos que por lo menos haya escrito algo
		if (!Validator.isEmpty(orderId)) {
			setUseDataFromThisComponent(true);
			setDisableInput(true);
			const newOrders = [];
			let len = orderId.length;
			for (let i in orders) {
				let order = orders[i].idorden;
				let str = order.substring(0, len);

				if (
					orderId.length <= order.length &&
					orderId.length !== 0 &&
					order.length !== 0
				) {
					if (orderId === str) {
						newOrders.push(orders[i]);
					}
				}
			}
			setDataFromThisComponent(newOrders);
		} else {
			setError('Este campo no puede estar vacío');
		}
		setIsCharget(true);
		setCharging(false);
	};

	const onKeyUp = () => {
		if (orderId.length === 0) {
			clearOrder();
		} else {
			onClick();
		}
	};

	const clearOrder = () => {
		setDisableInput(false);
		setUseDataFromThisComponent(false);
		setDataFromThisComponent([]);
		setOrderID('');
		setError('');
	};

	const cancelOrder = async () => {
		try {
			let idToSend = undefined;
			if (useDataFromThisComponent) {
				idToSend =
					dataFromThisComponent[
						helperStore.cancelOrderPosition
					].idpedido;
			} else {
				idToSend =
					orders[helperStore.cancelOrderPosition].idpedido;
			}

			await axios.post('/Pedido/Cancelar', {
				idpedido: idToSend
			});

			dispatch({
				type: HelperConstants.CANCEL_ORDER_MODAL
			});
			dispatch({
				type: HelperConstants.SHOW_SUCCESS_MODAL,
				payload: 'Tu orden ha sido cancelada correctamente'
			});
			reRenderComponent();
		} catch (error) {}
	};
	const [calify, setCalify] = useState({
		calificacion: '3',
		comentarios: ''
	});
	const onChangeRange = (e) => {
		setCalify({
			...calify,
			[e.target.name]: e.target.value
		});
	};

	const onClickRange = async () => {
		try {
			const obj = {
				...calify,
				idpedido: helperStore.qualifyId,
				idusuario: sessionStore.data.idusuario
			};
			obj.calificacion = Number.parseInt(obj.calificacion);

			await QualifyShipping(obj);

			setCalify({
				...calify,
				calificacion: '3',
				comentarios: ''
			});
			dispatch({
				type: HelperConstants.QUALIFY_MODAL
			});
			dispatch({
				type: HelperConstants.SHOW_SUCCESS_MODAL,
				payload: 'Calificación ingresada correctamente'
			});
		} catch (error) {}
		// dispatch({
		// 	type: HelperConstants.QUALIFY_MODAL
		// });
		//
	};

	return (
		<Fragment>
			<Col md="9" className="mb-4">
				<Row className="justify-content-end">
					<Col md="7">
						<InputGroup>
							<FormControl
								type="text"
								placeholder="Ingrese el ID de su orden"
								onChange={onChange}
								onKeyUp={onKeyUp}
								value={orderId}
							/>

							<InputGroup.Append>
								{!disableInput ? (
									<SearchSearch />
								) : (
									<TrashSearch
										action={clearOrder}
									/>
								)}
							</InputGroup.Append>
						</InputGroup>
						<span className="error-message">{error}</span>
					</Col>
				</Row>
			</Col>

			{useDataFromThisComponent ? (
				charging ? (
					<EstaCargandoLosDatos />
				) : !charging &&
				  isCharged &&
				  dataFromThisComponent.length === 0 ? (
					<NoHayDatos action={clearOrder} />
				) : (
					<ShippingPaginator
						data={dataFromThisComponent}
						dispatch={dispatch}
					/>
				)
			) : orders.length === 0 ? (
				<NoHayDatos action={clearOrder} />
			) : (
				<ShippingPaginator
					data={orders}
					dispatch={dispatch}
				/>
			)}

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
										helperStore.orderInfo
											.horaestimada
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
									value={
										helperStore.orderInfo.idorden
									}
								/>
							</FormGroup>
						</Col>

						<Col md="12">
							<FormGroup>
								<FormLabel>
									Origen del pedido:
								</FormLabel>
								<FormControl
									className="bg-primary text-white"
									readOnly
									value={
										helperStore.orderInfo
											.direccionorg
									}
								/>
							</FormGroup>
						</Col>
						<Col md="12">
							<FormGroup>
								<FormLabel>
									Origen del destino:
								</FormLabel>
								<FormControl
									className="bg-primary text-white"
									readOnly
									value={
										helperStore.orderInfo
											.direcciondes
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

			<Modal
				scrollable
				onHide={() =>
					dispatch({
						type: HelperConstants.CANCEL_ORDER_MODAL
					})
				}
				show={helperStore.cancelOrderModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-info-circle mr-2"></i>
						Confirmar
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					<p className="text-black-50">
						¿Seguro que deseas cancelar tu pedido?
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						size="sm"
						onClick={cancelOrder}>
						<i className="fas fa-check mr-2"></i>
						Si
					</Button>

					<Button
						className="ml-2"
						onClick={() => {
							dispatch({
								type:
									HelperConstants.CANCEL_ORDER_MODAL
							});
						}}
						variant="danger"
						size="sm">
						<i className="fas fa-times mr-2"></i>
						No
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal
				onHide={() =>
					dispatch({
						type: HelperConstants.QUALIFY_MODAL
					})
				}
				show={helperStore.qualifyModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-file-alt mr-2"></i>
						Califica tu servicio
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col md="12">
							<FormGroup>
								<FormLabel>
									Calificación{' '}
									<span>{calify.calificacion}</span>
								</FormLabel>
								<FormControl
									name="calificacion"
									type="range"
									min="1"
									max="5"
									step="1"
									custom
									onChange={onChangeRange}
								/>
							</FormGroup>
							<FormGroup>
								<FormLabel>
									Ingrese una reseña
								</FormLabel>
								<FormControl
									name="comentarios"
									as="textarea"
									rows="3"
									onChange={onChangeRange}
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
								type: HelperConstants.QUALIFY_MODAL
							});
						}}>
						<i className="fas fa-times mr-2"></i>
						Cancelar
					</Button>
					<Button
						variant="info"
						size="sm"
						onClick={onClickRange}>
						<i className="fas fa-share-square mr-2"></i>
						Enviar
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
};

const TrashSearch = ({ action }) => (
	<InputGroup.Text onClick={action} className="bg-danger put-hand">
		<i className="far fa-trash-alt text-white"></i>
	</InputGroup.Text>
);

const SearchSearch = () => (
	<InputGroup.Text className="bg-primary">
		<i className="fas fa-search text-white"></i>
	</InputGroup.Text>
);
