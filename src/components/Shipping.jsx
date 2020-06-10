import React, { useEffect, useState, Fragment } from 'react';
import {
	Row,
	Col,
	Image,
	Button,
	FormControl,
	Spinner
} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import axios from '../utils/Axios';
import { useSelector, useDispatch } from 'react-redux';
import HelperConstants from '../constants/Helper';

import InputGroup from 'react-bootstrap/InputGroup';

export default () => {
	const [orders, setOrders] = useState([]);
	const [gotData, setGotData] = useState(false);
	const [respError, setRespError] = useState('');

	const helperStore = useSelector((state) => state.helper);
	const sessionStore = useSelector((state) => state.session);
	const dispatch = useDispatch();

	useEffect(() => {
		if (orders.length === 0 && !gotData) {
			getOrder();
		}
	});

	const getOrder = async () => {
		try {
			const dataToSend = {
				interfaz: 'U',
				idpedido: undefined,
				idorden: undefined,
				fechadestino_del: undefined,
				fechadestino_al: undefined,
				idusuario: sessionStore.data.idusuario,
				idestado: undefined,
				fecharecibido_del: undefined,
				fecharecibido_al: undefined,
				idusuariorepartidor: undefined,
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

const ObtuvoLosDatos = ({ dispatch, orders, helperStore }) => {
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
				<Modal.Body></Modal.Body>
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
					<Button variant="info" size="sm">
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
							Aplicar filtros a tu búsqueda
						</Button>
					</Col>
					<Col>
						<InputGroup className="mb-2">
							<FormControl
								type="text"
								placeholder="Ingrese el ID de su orden"
							/>
							<InputGroup.Append>
								<InputGroup.Text
									onClick={() => {
										console.log('ok');
									}}
									className="bg-primary put-hand">
									<i className="fas fa-search text-white"></i>
								</InputGroup.Text>
							</InputGroup.Append>
						</InputGroup>
					</Col>
				</Row>
			</Col>

			{orders.map((item, index) => {
				return (
					<ShippingCard
						key={index}
						date={'01/06/2020'}
						hour={'02:00'}
						distance="25"
						from="Lugar 1"
						to="Lugar 2"
					/>
				);
			})}
		</Fragment>
	);
};

const ShippingCard = ({ date, hour, distance, from, to }) => {
	return (
		<Fragment>
			<Col md="9" className="mb-3">
				<Card style={{ border: '1px solid gray' }}>
					<Card.Body>
						<Row>
							<Col md="3">
								<Image
									src="https://miro.medium.com/max/1400/1*qYUvh-EtES8dtgKiBRiLsA.png"
									width="150px"
									style={{
										border: '1px solid #ced4da'
									}}
								/>
							</Col>
							<Col md="9">
								<Row>
									<Col md="3">01/06/2020</Col>
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
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Fragment>
	);
};
