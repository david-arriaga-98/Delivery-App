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

import { KeyboardDatePicker } from '@material-ui/pickers';

import Modal from 'react-bootstrap/Modal';
import axios from '../../utils/Axios';

import {
	EstaCargandoLosDatos,
	NoHayDatos
} from './ShippingResponses';

import ShippingPaginator from './ShippingPaginator';

export default ({ dispatch, orders, helperStore, sessionStore }) => {
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

	// Dates
	const [destFrom, setDestFrom] = useState(null);
	const [destTo, setDestTo] = useState(null);

	const [orgFrom, setOrgFrom] = useState(null);
	const [orgTo, setOrgTo] = useState(null);
	const [disableInput, setDisableInput] = useState(false);

	const onChange = (e) => {
		setOrderID(e.target.value);
	};

	const onClickFromModal = async () => {
		setError('');
		setCharging(true);
		setUseDataFromThisComponent(true);
		dispatch({
			type: HelperConstants.APPLY_FILTERS_MODAL
		});
		try {
			const dataToSend = {
				interfaz: 'U',
				fechadestino_del:
					destFrom === null
						? undefined
						: format(destFrom, 'dd-MM-yyyy'),
				fechadestino_al:
					destTo === null
						? undefined
						: format(destTo, 'dd-MM-yyyy'),
				idusuario: sessionStore.data.idusuario,
				fecharecibido_del:
					orgFrom === null
						? undefined
						: format(orgFrom, 'dd-MM-yyyy'),
				fecharecibido_al:
					orgTo === null
						? undefined
						: format(orgTo, 'dd-MM-yyyy'),
				limitederegistros: 0
			};
			const { data } = await axios.post(
				'/Entregas/Listar',
				dataToSend
			);
			setDataFromThisComponent(data.reverse());
		} catch (error) {
			setError('Ha ocurrido un error al consultar al servidor');
		}
		setIsCharget(true);
		setCharging(false);
	};

	const onClick = async () => {
		setError('');
		setCharging(true);
		// Validamos que por lo menos haya escrito algo
		if (!Validator.isEmpty(orderId)) {
			// Validamos que el uuid sea válido
			if (Validator.isUUID(orderId)) {
				// Hacemos la peticion al servidor
				setUseDataFromThisComponent(true);
				setDisableInput(true);
				try {
					const dataToSend = {
						interfaz: 'U',
						idorden: orderId,
						idusuario: sessionStore.data.idusuario,
						limitederegistros: 10
					};

					const { data } = await axios.post(
						'/Entregas/Listar',
						dataToSend
					);
					setDataFromThisComponent(data.reverse());
				} catch (e) {
					setError(
						'Ha ocurrido un error al consultar al servidor'
					);
				}
			} else {
				setError('La orden no es válida');
			}
		} else {
			setError('Este campo no puede estar vacío');
		}
		setIsCharget(true);
		setCharging(false);
	};

	const onKeyUp = (e) => {
		if (e.keyCode === 13) {
			onClick();
		}
	};

	const clearOrder = () => {
		setDisableInput(false);
		setUseDataFromThisComponent(false);
		setOrderID('');
		setError('');
	};
	console.log('ejecutando main');

	const cancelOrder = async () => {
		try {
			await axios.post('/Pedido/Cancelar', {
				idpedido:
					orders[helperStore.cancelOrderPosition].idpedido
			});
			orders[helperStore.cancelOrderPosition].nombreestado =
				'Cancelado';
			orders[helperStore.cancelOrderPosition].color = '#ff7851';
		} catch (error) {}
		dispatch({
			type: HelperConstants.CANCEL_ORDER_MODAL
		});
	};

	return (
		<Fragment>
			<Col md="9" className="mb-4">
				<Row className="justify-content-between">
					<Col>
						<Button
							onClick={() => {
								dispatch({
									type:
										HelperConstants.APPLY_FILTERS_MODAL
								});
							}}>
							<i className="fas fa-plus mr-2"></i>
							Aplicar filtros
						</Button>
					</Col>
					<Col>
						<InputGroup className="mb-2">
							<FormControl
								disabled={disableInput}
								type="text"
								placeholder="Ingrese el ID de su orden"
								onChange={onChange}
								onKeyUp={onKeyUp}
								value={orderId}
							/>

							<InputGroup.Append>
								{!disableInput ? (
									<SearchSearch action={onClick} />
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
								<FormLabel>
									Tiempo de espera:
								</FormLabel>
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
									value={`${helperStore.orderInfo.tarifa} $`}
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
						type: HelperConstants.APPLY_FILTERS_MODAL
					})
				}
				show={helperStore.searchSends.filterModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-filter mr-2"></i>
						Filtrar la búsqueda
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col md="12">
							<FormGroup>
								<FormLabel>
									Fecha de destino
								</FormLabel>
								<Row>
									<Col md="5">
										<KeyboardDatePicker
											clearable
											value={destFrom}
											format={'dd-MM-yyyy'}
											helperText="desde"
											onChange={setDestFrom}
										/>
									</Col>
									<Col md="5">
										<KeyboardDatePicker
											clearable
											value={destTo}
											format={'dd-MM-yyyy'}
											helperText="hasta"
											onChange={setDestTo}
										/>
									</Col>
								</Row>
							</FormGroup>
						</Col>
						<Col md="12">
							<FormGroup>
								<FormLabel>Fecha de origen</FormLabel>
								<Row>
									<Col md="5">
										<KeyboardDatePicker
											clearable
											value={orgFrom}
											format={'dd-MM-yyyy'}
											helperText="desde"
											onChange={setOrgFrom}
										/>
									</Col>
									<Col md="5">
										<KeyboardDatePicker
											clearable
											value={orgTo}
											format={'dd-MM-yyyy'}
											helperText="hasta"
											onChange={setOrgTo}
										/>
									</Col>
								</Row>
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
									HelperConstants.APPLY_FILTERS_MODAL
							});
						}}>
						<i className="fas fa-times mr-2"></i>
						Cancelar
					</Button>
					<Button
						variant="info"
						size="sm"
						onClick={onClickFromModal}>
						<i className="fas fa-search mr-2"></i>
						Buscar
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

const SearchSearch = ({ action }) => (
	<InputGroup.Text onClick={action} className="bg-primary put-hand">
		<i className="fas fa-search text-white"></i>
	</InputGroup.Text>
);
