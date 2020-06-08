import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Row,
	Col,
	FormControl,
	FormLabel,
	FormGroup,
	Button,
	Spinner
} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { GoogleApiWrapper, Map } from 'google-maps-react';

import { Api } from '../constants/Common';
import { LoadingContainer } from './Maps/Map';
import { useForm } from 'react-hook-form';
import Axios from '../utils/Axios';

import MapConstants from '../constants/Map';
import { push } from 'connected-react-router';

const MainComponent = (props) => {
	// Hooks
	const [travelData, setTravelData] = useState({
		horaestimada: '',
		distancia: '',
		tiempoespera: '',
		s_idorden: ''
	});
	const [gotData, setGotData] = useState(false);
	const [respError, setRespError] = useState(false);

	// Redux
	const { origin, destiny, chargingConfirm } = useSelector(
		(state) => state.map
	);
	const { data } = useSelector((state) => state.session);

	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			if (
				!gotData &&
				(travelData.distancia === '' ||
					travelData.horaestimada === '' ||
					travelData.tiempoespera === '') &&
				!respError
			) {
				try {
					const dataToSend = {
						idusuario: data.idusuario,
						latitudorg: origin.position.lat,
						longitudorg: origin.position.lng,
						codigopostalorg: '00000',
						direccionorg: origin.direcction,
						latituddes: destiny.position.lat,
						longituddes: destiny.position.lng,
						codigopostaldes: '00000',
						direcciondes: destiny.direcction
					};

					const response = await Axios.post('/Orden/Insertar', dataToSend);
					setTravelData({
						...travelData,
						horaestimada: response.data[0].horaestimada,
						distancia: response.data[0].distancia,
						tiempoespera: response.data[0].tiempoespera,
						s_idorden: response.data[0].s_idorden
					});
				} catch (error) {
					setRespError(true);
				}
				setGotData(true);
			}
		};
		getData();
	});

	const componentToRender = gotData ? (
		respError && gotData ? (
			<ErrorResponse dispatch={dispatch} />
		) : (
			<DataComponent
				{...props}
				dispatch={dispatch}
				travelData={travelData}
				origin={origin}
				destiny={destiny}
				data={data}
				chargingConfirm={chargingConfirm}
			/>
		)
	) : (
		<ChargingComponent />
	);
	return <React.Fragment>{componentToRender}</React.Fragment>;
};

// Componentes
const ErrorResponse = (props) => {
	const { dispatch } = props;
	return (
		<Fragment>
			<h6 className="text-danger text-center">
				Ha ocurrido un error al calcular tus datos
			</h6>
			<Button
				variant="danger"
				className="mt-2"
				onClick={() => {
					dispatch({
						type: MapConstants.OPEN_CLOSE_CONFIRM_MODAL
					});
				}}
			>
				Volver
			</Button>
		</Fragment>
	);
};

const DataComponent = (props) => {
	// Props
	const { google, travelData, origin, destiny, dispatch } = props;

	// Hooks
	const [check, setCheck] = useState(false);

	const [resError, setResError] = useState('');

	const [spinner, setSpinner] = useState(false);

	const {
		register,
		errors,
		handleSubmit,
		reset,
		setError,
		clearError
	} = useForm();

	// Maps property
	const mapProps = {
		mapStyle: {
			border: '1px solid #ced4da'
		},
		center: {
			lat: 14.601906,
			lng: -90.5817001
		}
	};
	const style = {
		width: '80%',
		height: '45vh'
	};

	// Functions
	const onChange = () => {
		setCheck(!check);
		reset({
			date: '',
			hour: ''
		});
	};

	const onSubmit = async (formData) => {
		setSpinner(false);
		if (formData.date !== '') {
			const year = formData.date.split('-');
			if (check && (year[0] > 2022 || year[0] < 2020)) {
				clearError('date');
				setError('date', 'error', 'Año no valido');
				return;
			}
		}
		try {
			const dataToSend = {
				idorden: travelData.s_idorden,
				fechaprogramada: check ? formData.date : '1900-01-01',
				horaprogramada: check ? formData.hour : '00:00:00',
				esprogramado: check ? 'true' : 'false'
			};
			await Axios.post('/Pedido/Insertar', dataToSend);
			dispatch({ type: MapConstants.OPEN_CLOSE_CONFIRM_MODAL });
			dispatch({
				type: MapConstants.RESTART_MAP_STATE
			});
			dispatch(push('/envios'));
		} catch (error) {
			setResError('Ha ocurrido un error');
		}
		setSpinner(false);
	};

	return (
		<Row className="justify-content-center">
			<Col md="7">
				<FormGroup>
					<Row>
						<Col md="2">
							<FormLabel style={{ color: 'gray' }}>Origen:</FormLabel>
						</Col>
						<Col md="10">
							<FormControl readOnly value={origin.direcction} />
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col md="2">
							<FormLabel style={{ color: 'gray' }}>Destino:</FormLabel>
						</Col>
						<Col md="10">
							<FormControl readOnly value={destiny.direcction} />
						</Col>
					</Row>
				</FormGroup>
				<Row className="justify-content-center">
					<Col md="11" className="px-0">
						<div style={style}>
							<Map google={google} style={mapProps.mapStyle}></Map>
						</div>
					</Col>
				</Row>
			</Col>
			<Col md="5">
				<FormGroup>
					<Row>
						<Col md="7">
							<FormLabel style={{ color: 'gray' }}>Tiempo de espera:</FormLabel>
						</Col>
						<Col md="5">
							<p className="text-success">{travelData.tiempoespera}</p>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col md="7">
							<FormLabel style={{ color: 'gray' }}>Hora estimada:</FormLabel>
						</Col>
						<Col md="5">
							<p className="text-success">{travelData.horaestimada}</p>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col md="7">
							<FormLabel style={{ color: 'gray' }}>Distancia:</FormLabel>
						</Col>
						<Col md="5">
							<p className="text-success">{travelData.distancia}</p>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col md="12">
							<Form.Check
								style={{ color: 'gray' }}
								onChange={onChange}
								type="checkbox"
								label="Programar hora de entrega?"
							/>
						</Col>
					</Row>
				</FormGroup>

				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormGroup>
						<Row>
							<Col md="12">
								<FormLabel style={{ color: 'gray' }}>
									Fecha programada:
								</FormLabel>
							</Col>
							<Col md="12">
								<FormControl
									disabled={!check}
									type="text"
									name="date"
									ref={register({
										pattern: {
											value: /^\d{4}([-])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
											message: 'Error, formato de fecha es aaaa-mm-dd'
										},
										required: {
											value: check ? true : false,
											message: 'Este campo es requerido'
										}
									})}
									isInvalid={!!errors.date}
								/>
								<Form.Control.Feedback type="invalid">
									{errors?.date?.message}
								</Form.Control.Feedback>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col md="12">
								<FormLabel style={{ color: 'gray' }}>
									Hora programada:
								</FormLabel>
							</Col>
							<Col md="12">
								<FormControl
									disabled={!check}
									type="text"
									name="hour"
									ref={register({
										pattern: {
											value: /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/,
											message: 'Error, formato de hora es hh:mm:ss'
										},
										required: {
											value: check ? true : false,
											message: 'Este campo es requerido'
										}
									})}
									isInvalid={!!errors.hour}
								/>
								<Form.Control.Feedback type="invalid">
									{errors?.hour?.message}
								</Form.Control.Feedback>
							</Col>
							<Col md="12" className="mt-3 text-center">
								{spinner ? (
									<Button variant="success" type="submit" disabled>
										Confirmando
										<Spinner
											className="ml-2"
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
										/>
									</Button>
								) : (
									<Button variant="success" type="submit">
										Confirmar
									</Button>
								)}

								<span className="mt-3 text-secondary">{resError}</span>
							</Col>
						</Row>
					</FormGroup>
				</Form>
			</Col>
		</Row>
	);
};

const ChargingComponent = () => (
	<Row className="justify-content-center">
		<Col md="12" className="text-center">
			<h5>Calculando tu entrega...</h5>
		</Col>
	</Row>
);

export default GoogleApiWrapper({
	apiKey: Api.GOOGLE_API_KEY,
	LoadingContainer
})(MainComponent);
