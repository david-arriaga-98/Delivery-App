import React, { useEffect, useState, Fragment } from 'react';
import {
	Row,
	Col,
	Image,
	Button,
	FormControl,
	Spinner,
	FormGroup,
	FormLabel
} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import axios from '../utils/Axios';
import { useSelector, useDispatch } from 'react-redux';
import HelperConstants from '../constants/Helper';

import InputGroup from 'react-bootstrap/InputGroup';

import { format } from 'date-fns';

import Validator from 'validator';

import { KeyboardDatePicker } from '@material-ui/pickers';

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

			setOrders(data.reverse());
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
					/>
				) : (
					<HuboUnErrorAlObtenerLosDatos />
				)}
			</Row>
		</Fragment>
	);
};

const HuboUnErrorAlObtenerLosDatos = () => {
	return (
		<Col md="9" className="mt-4 text-center">
			<h5 className="text-danger">
				Ha ocurrido un error al obtener sus datos del servidor
			</h5>
		</Col>
	);
};

const EstaCargandoLosDatos = () => {
	return (
		<Col md="9" className="mt-4 text-center">
			<h5 className="text-success">
				Espere... Estamos obteniendo sus datos del servidor
			</h5>
			<Spinner
				className="ml-2"
				as="span"
				animation="border"
				size="sm"
				role="status"
				aria-hidden="true"
			/>
		</Col>
	);
};

const NoHayDatos = () => {
	return (
		<Col md="9" className="mt-4 text-center">
			<h5 className="text-dark">No hay datos para mostrar</h5>
		</Col>
	);
};

const ObtuvoLosDatos = ({
	dispatch,
	orders,
	helperStore,
	sessionStore
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

	// Dates
	const [destFrom, setDestFrom] = useState(null);
	const [destTo, setDestTo] = useState(null);

	const [orgFrom, setOrgFrom] = useState(null);
	const [orgTo, setOrgTo] = useState(null);

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
			// Hacemos la peticion al servidor
			setUseDataFromThisComponent(true);

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
			setError('Este campo no puede estar vacío');
		}
		setIsCharget(true);
		setCharging(false);
	};

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
								type="text"
								placeholder="Ingrese el ID de su orden"
								onChange={onChange}
							/>
							<InputGroup.Append>
								<InputGroup.Text
									onClick={onClick}
									className="bg-primary put-hand">
									<i className="fas fa-search text-white"></i>
								</InputGroup.Text>
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
					<NoHayDatos />
				) : (
					dataFromThisComponent.map((item, index) => {
						let hour = dataFromThisComponent[
							index
						].horaprogramada.split(':');
						let hour2 = dataFromThisComponent[
							index
						].horadestino.split(':');

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
												new Date(
													item.fechadestino
												),
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
					})
				)
			) : orders.length === 0 ? (
				<NoHayDatos />
			) : (
				orders.map((item, index) => {
					let hour = orders[index].horaprogramada.split(
						':'
					);
					let hour2 = orders[index].horadestino.split(':');
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
											new Date(
												item.fechadestino
											),
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
				})
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
		</Fragment>
	);
};

const ShippingCard = ({
	date,
	hour,
	distance,
	from,
	to,
	info,
	helperStore,
	dispatch,
	position
}) => {
	let spinn = undefined;

	switch (info.nombreestado) {
		case 'Pendiente':
			spinn = (
				<Spinner
					style={{ backgroundColor: info.color }}
					animation="grow"
					size="sm"
				/>
			);
			break;
		case 'En Progreso':
			spinn = (
				<Spinner
					color={info.color}
					animation="grow"
					size="sm"
				/>
			);
			break;
		case 'Finalizado':
			spinn = (
				<div
					className="order__status--ok"
					style={{ backgroundColor: info.color }}></div>
			);
			break;
		case 'Cancelado':
			spinn = (
				<div
					className="order__status--ok"
					style={{ backgroundColor: info.color }}></div>
			);
			break;
		default:
			spinn = (
				<div
					className="order__status--ok"
					style={{ backgroundColor: 'blue' }}></div>
			);
			break;
	}

	return (
		<Fragment>
			<Col md="9" className="mb-3">
				<Card>
					<Card.Body>
						<Row>
							<Col md="3">
								<Row>
									<Col md="9">
										<Image
											src="https://miro.medium.com/max/1400/1*qYUvh-EtES8dtgKiBRiLsA.png"
											width="120px"
											height="100px"
											className="order__image"
											style={{
												border:
													'3px solid rgba(0,0,0,.3)',
												borderRadius: '.5rem'
											}}
										/>
									</Col>
									<Col md="3">{spinn}</Col>
								</Row>
							</Col>
							<Col md="9">
								<Row>
									<Col md="3">{date}</Col>
									<Col md="5">
										Hora de Entrega:{'  '}
										<span className="text-black-50">
											{hour}
										</span>
									</Col>
									<Col md="4">
										Distancia:{'  '}
										<span className="text-black-50">
											{distance} km
										</span>
									</Col>
								</Row>
								<Row className="mt-3">
									<Col md="12">
										De:{'  '}
										<span className="text-black-50">
											{from}
										</span>
									</Col>
								</Row>
								<Row className="mt-2">
									<Col md="12">
										Para:{'  '}
										<span className="text-black-50">
											{to}
										</span>
									</Col>
								</Row>

								<Row className="justify-content-center">
									{info.nombreestado ===
									'Pendiente' ? (
										<Col
											md="12"
											className="mt-3 text-right">
											<Button
												onClick={() => {
													dispatch({
														type:
															HelperConstants.ORDER_INFORMATION_MODAL,
														payload: {
															info,
															state: true
														}
													});
												}}
												variant="primary"
												size="sm">
												<i className="fas fa-eye mr-2"></i>
												Información
											</Button>

											<Button
												className="ml-2"
												onClick={() => {
													dispatch({
														type:
															HelperConstants.CANCEL_ORDER_MODAL,
														payload: position
													});
												}}
												variant="danger"
												size="sm">
												<i className="fas fa-times mr-2"></i>
												Cancelar tu pedido
											</Button>
										</Col>
									) : (
										<Col
											md="12"
											className="mt-3 text-right">
											<Button
												onClick={() => {
													dispatch({
														type:
															HelperConstants.ORDER_INFORMATION_MODAL,
														payload: {
															info,
															state: true
														}
													});
												}}
												variant="primary"
												size="sm">
												<i className="fas fa-eye mr-2"></i>
												Información
											</Button>
										</Col>
									)}
								</Row>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Fragment>
	);
};
