import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Row,
	Col,
	FormControl,
	FormLabel,
	FormGroup,
	Button,
	Spinner,
	Form,
	InputGroup
} from 'react-bootstrap';
import Axios from '../../utils/Axios';
import { push } from 'connected-react-router';
/* import HelperConstants from '../constants/Helper'; */
import { format } from 'date-fns';
import MapConstants from '../../constants/Map';
import { KeyboardDatePicker, TimePicker } from '@material-ui/pickers';

import { useForm } from 'react-hook-form';

const MainComponent = (props) => {
	// Hooks
	const [travelData, setTravelData] = useState({
		horaestimada: '',
		distancia: '',
		tiempoespera: '',
		s_idorden: '',
		tarifa: ''
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
						s_idorden: response.data[0].s_idorden,
						tarifa: response.data[0].tarifa
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
	const { travelData, origin, destiny, dispatch } = props;

	// Hooks
	const [check, setCheck] = useState(false);

	const [resError, setResError] = useState('');

	const [spinner, setSpinner] = useState(false);

	const [date, setDate] = useState(new Date());
	const [hour, setHour] = useState(new Date());

	// Forms
	const {
		register,
		errors,
		handleSubmit,
		clearError,
		setError
	} = useForm();

	const onSubmit = async (e) => {
		setSpinner(true);
		const numo = Number.parseInt(e.montorecolectar);
		try {
			if (numo >= 0 && numo <= 1000) {
				const dataToSend = {
					idorden: travelData.s_idorden,
					fechaprogramada: check
						? format(date, 'yyyy-MM-dd')
						: '1900-01-01',
					horaprogramada: check
						? format(hour, 'HH:mm:ss')
						: '00:00:00',
					esprogramado: check ? 'true' : 'false',
					instrucciones_recoleccion: origin.indications,
					instrucciones_entrega: destiny.indications,
					montorecolectar: numo,
					origennombre: e.origennombre,
					origentelefono: '+502' + e.origentelefono,
					destinonombre: e.destinonombre,
					destinotelefono: '+502' + e.destinotelefono,
					dondeentrega: e.dondeentrega,
					donderecepcion: e.donderecepcion
				};

				await Axios.post('/Pedido/Insertar', dataToSend);
				dispatch({
					type: MapConstants.OPEN_CLOSE_CONFIRM_MODAL
				});
				dispatch({
					type: MapConstants.RESTART_MAP_STATE
				});
				dispatch(push('/envios'));
				return;
			} else {
				clearError(['montorecolectar']);
				setError(
					'montorecolectar',
					'error',
					'El valor debe ser entre 0 y 1000.'
				);
			}
		} catch (error) {
			setResError('Ha ocurrido un error');
		}
		setSpinner(false);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Row className="justify-content-center">
				<Col md="12">
					<FormGroup>
						<FormLabel style={{ color: 'gray' }}>
							Origen:
						</FormLabel>
						<Row>
							<Col md="6">
								<InputGroup className="mb-2">
									<InputGroup.Prepend>
										<InputGroup.Text className="bg-secondary text-white">
											Dirección
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										readOnly
										value={origin.direcction}
									/>
								</InputGroup>
							</Col>
							<Col md="6">
								<InputGroup className="mb-2">
									<InputGroup.Prepend>
										<InputGroup.Text className="bg-secondary text-white">
											Indicación
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										readOnly
										value={origin.indications}
									/>
								</InputGroup>
							</Col>
						</Row>
					</FormGroup>

					<FormGroup>
						<FormLabel style={{ color: 'gray' }}>
							Destino:
						</FormLabel>
						<Row>
							<Col md="6">
								<InputGroup className="mb-2">
									<InputGroup.Prepend>
										<InputGroup.Text className="bg-secondary text-white">
											Dirección
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										readOnly
										value={destiny.direcction}
									/>
								</InputGroup>
							</Col>
							<Col md="6">
								<InputGroup className="mb-2">
									<InputGroup.Prepend>
										<InputGroup.Text className="bg-secondary text-white">
											Indicación
										</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										readOnly
										value={destiny.indications}
									/>
								</InputGroup>
							</Col>
						</Row>
					</FormGroup>
				</Col>
				<Col md="3">
					<FormGroup>
						<FormLabel style={{ color: 'gray' }}>
							Tiempo de espera:
						</FormLabel>
						<FormControl
							className="bg-secondary text-white"
							readOnly
							value={`${travelData.tiempoespera} minutos`}
						/>
					</FormGroup>
				</Col>
				<Col md="3">
					<FormGroup>
						<FormLabel style={{ color: 'gray' }}>
							Hora estimada:
						</FormLabel>
						<FormControl
							className="bg-secondary text-white"
							readOnly
							value={travelData.horaestimada}
						/>
					</FormGroup>
				</Col>

				<Col md="3">
					<FormGroup>
						<FormLabel style={{ color: 'gray' }}>
							Distancia:
						</FormLabel>
						<FormControl
							className="bg-secondary text-white"
							readOnly
							value={`${travelData.distancia} km`}
						/>
					</FormGroup>
				</Col>
				<Col md="3">
					<FormGroup>
						<FormLabel style={{ color: 'gray' }}>
							Tarifa:
						</FormLabel>
						<FormControl
							className="bg-secondary text-white"
							readOnly
							value={`${travelData.tarifa} Q`}
						/>
					</FormGroup>
				</Col>

				<Col md="6">
					<FormGroup>
						<FormLabel
							htmlFor="origennombre"
							style={{ color: 'gray' }}>
							Contacto del lugar origen:
						</FormLabel>
						<FormControl
							placeholder="Ingrese el nombre de el lugar del contacto"
							disabled={spinner}
							isInvalid={!!errors.origennombre}
							id="origennombre"
							name="origennombre"
							ref={register({
								required: {
									value: true,
									message: 'Este campo es requerido'
								},
								maxLength: {
									value: 50,
									message:
										'Este campo debe tener menos de 50 carácteres'
								},
								minLength: {
									value: 3,
									message:
										'Este campo debe tener mas de 3 carácteres'
								}
							})}
						/>
						<Form.Control.Feedback type="invalid">
							{errors?.origennombre?.message}
						</Form.Control.Feedback>
					</FormGroup>
				</Col>

				<Col md="6">
					<FormGroup>
						<FormLabel
							htmlFor="origentelefono"
							style={{ color: 'gray' }}>
							Telefono del lugar origen:
						</FormLabel>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text className="text-text-black-50">
									+ 502
								</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								disabled={spinner}
								isInvalid={!!errors.origentelefono}
								type="text"
								name="origentelefono"
								id="origentelefono"
								placeholder="Ingrese su teléfono"
								ref={register({
									required: {
										value: true,
										message:
											'El teléfono es requerido'
									},
									pattern: {
										value: /^\d{8}$/,
										message:
											'El teléfono solo debe tener números'
									},
									minLength: {
										value: 8,
										message:
											'El teléfono debe tener 8 dígitos'
									}
								})}
							/>
							<Form.Control.Feedback type="invalid">
								{errors?.origentelefono?.message}
							</Form.Control.Feedback>
						</InputGroup>
					</FormGroup>
				</Col>

				<Col md="6">
					<FormGroup>
						<FormLabel
							htmlFor="destinonombre"
							style={{ color: 'gray' }}>
							Contacto del lugar destino:
						</FormLabel>
						<FormControl
							placeholder="Ingrese el nombre de el lugar del contacto"
							disabled={spinner}
							isInvalid={!!errors.destinonombre}
							id="destinonombre"
							name="destinonombre"
							ref={register({
								required: {
									value: true,
									message: 'Este campo es requerido'
								},
								maxLength: {
									value: 50,
									message:
										'Este campo debe tener menos de 50 carácteres'
								},
								minLength: {
									value: 3,
									message:
										'Este campo debe tener mas de 3 carácteres'
								}
							})}
						/>
						<Form.Control.Feedback type="invalid">
							{errors?.destinonombre?.message}
						</Form.Control.Feedback>
					</FormGroup>
				</Col>

				<Col md="6">
					<FormGroup>
						<FormLabel
							htmlFor="destinotelefono"
							style={{ color: 'gray' }}>
							Telefono del lugar destino:
						</FormLabel>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text className="text-text-black-50">
									+ 502
								</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								disabled={spinner}
								isInvalid={!!errors.destinotelefono}
								type="text"
								name="destinotelefono"
								id="destinotelefono"
								placeholder="Ingrese el teléfono"
								ref={register({
									required: {
										value: true,
										message:
											'El teléfono es requerido'
									},
									pattern: {
										value: /^\d{8}$/,
										message:
											'El teléfono solo debe tener números'
									},
									minLength: {
										value: 8,
										message:
											'El teléfono debe tener 8 dígitos'
									}
								})}
							/>
							<Form.Control.Feedback type="invalid">
								{errors?.destinotelefono?.message}
							</Form.Control.Feedback>
						</InputGroup>
					</FormGroup>
				</Col>

				<Col md="4">
					<FormGroup>
						<FormLabel
							htmlFor="dondeentrega"
							style={{ color: 'gray' }}>
							Lugar de entrega:
						</FormLabel>
						<FormControl
							disabled={spinner}
							isInvalid={!!errors.dondeentrega}
							id="dondeentrega"
							name="dondeentrega"
							placeholder="Ingrese el lugar de entrega"
							ref={register({
								required: {
									value: true,
									message: 'Este campo es requerido'
								},
								maxLength: {
									value: 50,
									message:
										'Este campo debe tener menos de 50 carácteres'
								},
								minLength: {
									value: 3,
									message:
										'Este campo debe tener mas de 3 carácteres'
								}
							})}
						/>
						<Form.Control.Feedback type="invalid">
							{errors?.dondeentrega?.message}
						</Form.Control.Feedback>
					</FormGroup>
				</Col>

				<Col md="4">
					<FormGroup>
						<FormLabel
							htmlFor="donderecepcion"
							style={{ color: 'gray' }}>
							Recepción:
						</FormLabel>
						<FormControl
							disabled={spinner}
							isInvalid={!!errors.donderecepcion}
							id="donderecepcion"
							name="donderecepcion"
							placeholder="Ingrese la recepción"
							ref={register({
								required: {
									value: true,
									message: 'Este campo es requerido'
								},
								maxLength: {
									value: 50,
									message:
										'Este campo debe tener menos de 50 carácteres'
								},
								minLength: {
									value: 3,
									message:
										'Este campo debe tener mas de 3 carácteres'
								}
							})}
						/>
						<Form.Control.Feedback type="invalid">
							{errors?.donderecepcion?.message}
						</Form.Control.Feedback>
					</FormGroup>
				</Col>

				<Col md="4">
					<FormGroup>
						<FormLabel
							htmlFor="montorecolectar"
							style={{ color: 'gray' }}>
							Monto a recolectar:
						</FormLabel>
						<FormControl
							disabled={spinner}
							isInvalid={!!errors.montorecolectar}
							id="montorecolectar"
							name="montorecolectar"
							placeholder="Ingrese el monto"
							ref={register({
								required: {
									value: true,
									message: 'Este campo es requerido'
								},
								pattern: {
									value: /^([0-9])*$/,
									message:
										'Este campo solo debe tener números'
								}
							})}
						/>
						<Form.Control.Feedback type="invalid">
							{errors?.montorecolectar?.message}
						</Form.Control.Feedback>
					</FormGroup>
				</Col>

				<Col md="4">
					<FormGroup>
						<Form.Check
							style={{ color: 'gray' }}
							onChange={() => {
								setCheck(!check);
							}}
							type="checkbox"
							label="¿Programar hora?"
						/>
					</FormGroup>
				</Col>
				<Col md="4">
					<FormGroup>
						<FormLabel style={{ color: 'gray' }}>
							Hora programada:
						</FormLabel>
						<TimePicker
							disabled={!check}
							ampm={false}
							value={hour}
							onChange={setHour}
						/>
					</FormGroup>
				</Col>
				<Col md="4">
					<FormGroup>
						<FormLabel style={{ color: 'gray' }}>
							Fecha programada:
						</FormLabel>
						<KeyboardDatePicker
							disabled={!check}
							value={date}
							format={'dd-MM-yyyy'}
							minDate={new Date()}
							onChange={(date) => {
								setDate(date);
							}}
						/>
					</FormGroup>
				</Col>

				<Col md="10" className="mt-3 text-center">
					<Row className="justify-content-end">
						<Col md="6">
							<Button
								size="sm"
								block
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
						<Col md="6">
							{spinner ? (
								<Button
									size="sm"
									block
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
									type="submit"
									size="sm"
									block
									variant="success">
									Confirmar
								</Button>
							)}
						</Col>
					</Row>
				</Col>
				<Col md="12">
					<span className="mt-3 text-secondary">
						{resError}
					</span>
				</Col>
			</Row>
		</Form>
	);
};

const ChargingComponent = () => (
	<Row className="justify-content-center">
		<Col md="12" className="text-center">
			<h5>Calculando tu entrega...</h5>
		</Col>
	</Row>
);

export default MainComponent;
