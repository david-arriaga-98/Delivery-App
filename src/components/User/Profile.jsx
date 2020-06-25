import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
	FormGroup,
	FormLabel,
	FormControl,
	Card,
	Button,
	Form,
	InputGroup,
	Spinner,
	Modal
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
	getCurrentUser,
	editUser,
	editPassword
} from '../../services/User/user.session';
import {
	EstaCargandoLosDatos,
	HuboUnErrorAlObtenerLosDatos
} from '../Shipping/ShippingResponses';
import { useForm } from 'react-hook-form';
import HelperConstants from '../../constants/Helper';
import SessionConstants from '../../constants/Session';

export default () => {
	const userState = useSelector((state) => state.session);
	const [error, setError] = useState('');
	const [gotData, setGotData] = useState(false);
	const [charging, setCharging] = useState(true);
	const [user, setUser] = useState({
		user: '...',
		name: '...',
		lastname: '...',
		phone: '...',
		email: '...'
	});

	const refresh = () => {
		setGotData(false);
		setCharging(true);
		setError('');
	};

	React.useEffect(() => {
		if (!gotData) {
			const execute = async () => {
				setGotData(true);
				try {
					const data = await getCurrentUser(
						userState.data.idusuario
					);

					setUser({
						...user,
						name: data[0].nombres,
						lastname: data[0].apellidos,
						user: data[0].usuario,
						phone: data[0].telefono,
						email: data[0].correo
					});
				} catch (error) {
					setError('Ha ocurrido un error');
				}
				setCharging(false);
			};
			execute();
		}
	}, [gotData, user, userState]);

	return (
		<Row className="justify-content-center mb-4">
			{charging ? (
				<EstaCargandoLosDatos />
			) : error === '' ? (
				<EditComponent
					user={user}
					userState={userState}
					refresh={refresh}
				/>
			) : (
				<HuboUnErrorAlObtenerLosDatos />
			)}
		</Row>
	);
};

const EditComponent = ({ user, userState, refresh }) => {
	const [canEdit, setCanEdit] = useState(false);
	const {
		register,
		errors,
		handleSubmit,
		setValue,
		clearError
	} = useForm();
	const [recharge, setRecharge] = useState(true);
	const [error, setError] = useState('');
	const [charging, setCharging] = useState(false);
	const dispatch = useDispatch();
	const [modal, setModal] = useState(false);

	const handleClick = () => {
		if (canEdit) {
			setRecharge(true);
			clearError([
				'nombres',
				'apellidos',
				'correo',
				'telefono'
			]);
		}
		setCanEdit(!canEdit);
	};

	const onSubmit = async (params) => {
		try {
			setCharging(true);
			const newObj = {
				...params,
				idusuario: userState.data.idusuario,
				telefono: '+502' + params.telefono
			};

			await editUser(newObj);
			setCharging(false);
			refresh();
			dispatch({
				type: HelperConstants.SHOW_SUCCESS_MODAL,
				payload: 'Actualizacion correcta'
			});
		} catch (error) {
			setError('Ha ocurrido un error');
		}
	};

	const BtnEdit = ({ handleClick, charging }) => {
		return (
			<>
				{charging ? (
					<Button
						disabled
						type="submit"
						className="mr-2"
						size="sm">
						Cargando
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
					<Button type="submit" className="mr-2" size="sm">
						<i className="far fa-edit mr-2"></i>
						Editar
					</Button>
				)}
				<Button
					variant="danger"
					size="sm"
					onClick={handleClick}>
					<i className="far fa-edit mr-2"></i>
					Cancelar
				</Button>
			</>
		);
	};

	React.useEffect(() => {
		if (recharge) {
			setRecharge(false);
			setValue([
				{ nombres: user.name },
				{ apellidos: user.lastname },
				{ telefono: user.phone.substr(-8) },
				{ correo: user.email }
			]);
		}
	}, [recharge, user, setValue]);

	return (
		<>
			<Card border="secondary">
				<Card.Header>
					<h4 className="text-black-50">
						<i className="far fa-address-card mr-2"></i>
						Mi Perfil
					</h4>
				</Card.Header>
				<Card.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<FormGroup>
							<FormLabel className="text-black-50">
								Usuario:
							</FormLabel>
							<FormControl
								readOnly
								type="text"
								value={user.user}
								className="bg-secondary text-white"
							/>
						</FormGroup>

						<Row>
							<Col md="6">
								<FormGroup>
									<FormLabel className="text-black-50">
										Nombres:
									</FormLabel>
									<FormControl
										disabled={charging}
										readOnly={!canEdit}
										type="text"
										name="nombres"
										isInvalid={!!errors.nombres}
										className={
											!canEdit
												? 'bg-secondary text-white'
												: 'bg-primary text-white'
										}
										ref={register({
											required: {
												value: true,
												message:
													'Su nombre es requerido'
											},
											maxLength: {
												value: 40,
												message:
													'Su nombre debe tener menos de 40 carácteres'
											}
										})}
									/>
									<Form.Control.Feedback type="invalid">
										{errors?.nombres?.message}
									</Form.Control.Feedback>
								</FormGroup>
							</Col>
							<Col md="6">
								<FormGroup>
									<FormLabel className="text-black-50">
										Apellidos:
									</FormLabel>
									<FormControl
										disabled={charging}
										name="apellidos"
										readOnly={!canEdit}
										isInvalid={!!errors.apellidos}
										type="text"
										className={
											!canEdit
												? 'bg-secondary text-white'
												: 'bg-primary text-white'
										}
										ref={register({
											required: {
												value: true,
												message:
													'Su apellido es requerido'
											},
											maxLength: {
												value: 50,
												message:
													'Su apellido debe tener menos de 50 carácteres'
											}
										})}
									/>
									<Form.Control.Feedback type="invalid">
										{errors?.apellidos?.message}
									</Form.Control.Feedback>
								</FormGroup>
							</Col>
						</Row>

						<FormGroup>
							<FormLabel className="text-black-50">
								Teléfono:
							</FormLabel>
							<InputGroup className="mb-2">
								<InputGroup.Prepend>
									<InputGroup.Text
										className={
											!canEdit
												? 'bg-secondary text-white'
												: 'bg-primary text-white'
										}>
										+ 502
									</InputGroup.Text>
								</InputGroup.Prepend>

								<FormControl
									disabled={charging}
									name="telefono"
									readOnly={!canEdit}
									isInvalid={!!errors.telefono}
									type="text"
									className={
										!canEdit
											? 'bg-secondary text-white'
											: 'bg-primary text-white'
									}
									ref={register({
										required: {
											value: true,
											message:
												'Su teléfono es requerido'
										},
										pattern: {
											value: /^\d{8}$/,
											message:
												'Su teléfono solo debe tener números'
										},
										minLength: {
											value: 8,
											message:
												'Su teléfono debe tener 8 dígitos'
										}
									})}
								/>
								<Form.Control.Feedback type="invalid">
									{errors?.telefono?.message}
								</Form.Control.Feedback>
							</InputGroup>
						</FormGroup>

						<FormGroup>
							<FormLabel className="text-black-50">
								Correo electrónico:
							</FormLabel>
							<FormControl
								disabled={charging}
								name="correo"
								readOnly={!canEdit}
								isInvalid={!!errors.correo}
								type="text"
								className={
									!canEdit
										? 'bg-secondary text-white'
										: 'bg-primary text-white'
								}
								ref={register({
									required: {
										value: true,
										message:
											'Su correo es requerido'
									},
									pattern: {
										value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message:
											'Su correo no es válido'
									}
								})}
							/>
							<Form.Control.Feedback type="invalid">
								{errors?.correo?.message}
							</Form.Control.Feedback>
						</FormGroup>
						<FormGroup className="text-right">
							{canEdit ? (
								<BtnEdit
									charging={charging}
									handleClick={handleClick}
								/>
							) : (
								<>
									<Button
										variant="success"
										type="button"
										className="mr-2"
										size="sm"
										onClick={() => {
											setModal(true);
										}}>
										<i className="fas fa-key mr-2"></i>
										Cambiar contraseña
									</Button>
									<Button
										type="button"
										className="mr-2"
										size="sm"
										onClick={handleClick}>
										<i className="far fa-edit mr-2"></i>
										Editar mi información
									</Button>
								</>
							)}
						</FormGroup>
						<span style={{ color: '#ff7851' }}>
							{error}
						</span>
					</Form>
				</Card.Body>
			</Card>
			<EditPassword
				modal={modal}
				setModal={setModal}
				userState={userState}
				dispatch={dispatch}
			/>
		</>
	);
};

const EditPassword = ({ modal, setModal, userState, dispatch }) => {
	const {
		register,
		errors,
		handleSubmit,
		clearError,
		setError
	} = useForm();
	const [charging, setCharging] = useState(false);
	const [rError, setRError] = useState('');

	React.useEffect(() => {
		const timeOut = setTimeout(() => {
			setRError('');
		}, 1200);

		return () => {
			clearTimeout(timeOut);
		};
	}, [rError]);

	const onSubmit = async (params) => {
		setCharging(true);
		if (params.contrasena === params.confirmar_contrasena) {
			try {
				await editPassword({
					contrasena: params.contrasena,
					idusuario: userState.data.idusuario
				});
				dispatch({
					type: SessionConstants.LOG_OUT
				});
			} catch (error) {
				setRError(
					'Ha ocurrido un error al realizar la petición'
				);
			}
		} else {
			clearError(['contrasena', 'confirmar_contrasena']);
			setError(
				'confirmar_contrasena',
				'error',
				'Las contraseñas no coinciden.'
			);
		}
		setCharging(false);
	};

	return (
		<Modal
			onHide={() => {
				setModal(false);
			}}
			show={modal}>
			<Modal.Header closeButton>
				<Modal.Title>
					<i className="fas fa-key mr-2"></i>
					Cambiar contraseña
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Row className="justify-content-center">
						<Col md="10">
							<FormGroup>
								<FormLabel htmlFor="contrasena">
									Contraseña:
								</FormLabel>
								<FormControl
									disabled={charging}
									isInvalid={!!errors.contrasena}
									type="password"
									name="contrasena"
									id="contrasena"
									placeholder="Ingrese su contraseña"
									ref={register({
										required: {
											value: true,
											message:
												'La contraseña es requerida'
										},
										pattern: {
											value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
											message:
												'La contraseña debe constar con mayúsculas, minúsculas y números'
										},

										maxLength: {
											value: 16,
											message:
												'La contraseña debe tener menos de 16 carácteres'
										},
										minLength: {
											value: 6,
											message:
												'La contraseña debe tener mas de 5 carácteres'
										}
									})}
								/>
								<Form.Control.Feedback type="invalid">
									{errors?.contrasena?.message}
								</Form.Control.Feedback>
							</FormGroup>
						</Col>
						<Col md="10">
							<FormGroup>
								<FormLabel htmlFor="confirmar_contrasena">
									Confirmar contraseña:
								</FormLabel>
								<FormControl
									disabled={charging}
									isInvalid={
										!!errors.confirmar_contrasena
									}
									type="password"
									name="confirmar_contrasena"
									id="confirmar_contrasena"
									placeholder="Ingrese su contraseña"
									ref={register({
										required: {
											value: true,
											message:
												'La contraseña es requerida'
										},
										pattern: {
											value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
											message:
												'La contraseña debe constar con mayúsculas, minúsculas y números'
										},

										maxLength: {
											value: 16,
											message:
												'La contraseña debe tener menos de 16 carácteres'
										},
										minLength: {
											value: 6,
											message:
												'La contraseña debe tener mas de 5 carácteres'
										}
									})}
								/>
								<Form.Control.Feedback type="invalid">
									{
										errors?.confirmar_contrasena
											?.message
									}
								</Form.Control.Feedback>
							</FormGroup>
						</Col>
						<Col md="10">
							<FormGroup className="text-right">
								{!charging ? (
									<Button
										variant="success"
										type="submit"
										className="mr-2"
										size="sm">
										<span>
											<i className="fas fa-save mr-2"></i>
										</span>
										Guardar
									</Button>
								) : (
									<Button
										variant="success"
										type="submit"
										size="sm"
										disabled>
										Guardando
										<Spinner
											className="ml-2"
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
										/>
									</Button>
								)}
								<Button
									variant="danger"
									disabled={charging}
									type="button"
									className="mr-2"
									size="sm"
									onClick={() => {
										setModal(false);
									}}>
									<i className="fas fa-times mr-2"></i>
									Salir
								</Button>
							</FormGroup>
						</Col>
						<span className="error-message mb-3">
							{rError}
						</span>
					</Row>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
