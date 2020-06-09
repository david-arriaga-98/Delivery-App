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
import { LoadingContainer } from './Maps/Map';
import Axios from '../utils/Axios';
import MapConstants from '../constants/Map';
/* import { push } from 'connected-react-router'; */
import HelperConstants from '../constants/Helper';
import { format } from 'date-fns';
import { Api } from '../constants/Common';
import { KeyboardDatePicker, TimePicker } from '@material-ui/pickers';

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

					const response = await Axios.post(
						'/Orden/Insertar',
						dataToSend
					);
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
				}}>
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

	const [date, setDate] = useState(new Date());
	const [hour, setHour] = useState(new Date());

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

	const handleData = async () => {
		setSpinner(false);
		try {
			const dataToSend = {
				idorden: travelData.s_idorden,
				fechaprogramada: check
					? format(date, 'yyyy-MM-dd')
					: '1900-01-01',
				horaprogramada: check
					? format(hour, 'hh:mm:ss')
					: '00:00:00',
				esprogramado: check ? 'true' : 'false'
			};

			await Axios.post('/Pedido/Insertar', dataToSend);
			dispatch({ type: MapConstants.OPEN_CLOSE_CONFIRM_MODAL });
			dispatch({
				type: MapConstants.RESTART_MAP_STATE
			});
			dispatch({
				type: HelperConstants.SHOW_SUCCESS_MODAL,
				payload: 'Pedido realizado correctamente'
			});
			/* dispatch(push('/envios')); */
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
							<FormLabel style={{ color: 'gray' }}>
								Origen:
							</FormLabel>
						</Col>
						<Col md="10">
							<FormControl
								readOnly
								value={origin.direcction}
							/>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col md="2">
							<FormLabel style={{ color: 'gray' }}>
								Destino:
							</FormLabel>
						</Col>
						<Col md="10">
							<FormControl
								readOnly
								value={destiny.direcction}
							/>
						</Col>
					</Row>
				</FormGroup>
				<Row className="justify-content-center">
					<Col md="11" className="px-0">
						<div style={style}>
							<Map
								google={google}
								style={mapProps.mapStyle}></Map>
						</div>
					</Col>
				</Row>
			</Col>
			<Col md="5">
				<FormGroup>
					<Row>
						<Col md="7">
							<FormLabel style={{ color: 'gray' }}>
								Tiempo de espera:
							</FormLabel>
						</Col>
						<Col md="5">
							<p className="text-success">
								{travelData.tiempoespera}
							</p>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col md="7">
							<FormLabel style={{ color: 'gray' }}>
								Hora estimada:
							</FormLabel>
						</Col>
						<Col md="5">
							<p className="text-success">
								{travelData.horaestimada}
							</p>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col md="7">
							<FormLabel style={{ color: 'gray' }}>
								Distancia:
							</FormLabel>
						</Col>
						<Col md="5">
							<p className="text-success">
								{travelData.distancia}
							</p>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col md="12">
							<Form.Check
								style={{ color: 'gray' }}
								onChange={() => {
									setCheck(!check);
								}}
								type="checkbox"
								label="Programar hora de entrega?"
							/>
						</Col>
					</Row>
				</FormGroup>

				<FormGroup>
					<Row>
						<Col md="12">
							<FormLabel style={{ color: 'gray' }}>
								Fecha programada:
							</FormLabel>
						</Col>
						<Col md="12">
							<KeyboardDatePicker
								disabled={!check}
								value={date}
								format={'dd-MM-yyyy'}
								minDate={new Date()}
								onChange={(date) => {
									setDate(date);
								}}
							/>
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
							<TimePicker
								disabled={!check}
								ampm={false}
								value={hour}
								onChange={setHour}
							/>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col md="6" className="mt-3 text-center">
							<Button
								variant="danger"
								onClick={() => {
									dispatch({
										type:
											MapConstants.OPEN_CLOSE_CONFIRM_MODAL
									});
								}}>
								Salir
							</Button>
						</Col>
						<Col md="6" className="mt-3 text-center">
							{spinner ? (
								<Button
									variant="success"
									type="submit"
									disabled>
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
								<Button
									variant="success"
									onClick={handleData}>
									Confirmar
								</Button>
							)}

							<span className="mt-3 text-secondary">
								{resError}
							</span>
						</Col>
					</Row>
				</FormGroup>
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
