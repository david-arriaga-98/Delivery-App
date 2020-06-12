import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	Row,
	Form,
	Col,
	FormGroup,
	FormControl,
	FormLabel,
	Button,
	InputGroup,
	Spinner
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import Axios from '../utils/Axios';
import HelperConstants from '../constants/Helper';
import SessionConstants from '../constants/Session';

export default () => {
	const {
		register,
		errors,
		setError,
		clearError,
		handleSubmit
	} = useForm();

	const [charging, setCharging] = useState(false);
	const dispatch = useDispatch();

	const onSubmit = async (params) => {
		// Validamos que las contraseñas sean correctas
		if (params.contrasena === params.confirmar_contrasena) {
			try {
				setCharging(true);
				params.telefono = '+502' + params.telefono;
				delete params.confirmar_contrasena;

				await Axios.post(
					'Usuario/Registrar',
					Object.assign({}, params, {
						interfaz: 'U'
					})
				);
				dispatch({
					type: SessionConstants.OPEN_CLOSE_REGISTER_MODAL
				});
				dispatch({
					type: HelperConstants.SHOW_SUCCESS_MODAL,
					payload: 'Usuario creado'
				});
			} catch (error) {
				if (error.response !== undefined) {
					if (
						error.response.data[0].mensaje ===
						'El usuario ingresado ya existe en la base de datos'
					) {
						setError(
							'usuario',
							'validation',
							'Este Usuario ya existe'
						);
					} else {
						setError(
							'form',
							'validation',
							'Ha ocurrido un error al realizar tu petición'
						);
					}
				} else {
					setError(
						'form',
						'validation',
						'Ha ocurrido un error'
					);
				}
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
		<Row className="justify-content-center mb-4">
			<Col md="12">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormGroup>
						<FormLabel htmlFor="usuario">
							Usuario:
						</FormLabel>
						<FormControl
							disabled={charging}
							isInvalid={!!errors.usuario}
							type="text"
							name="usuario"
							id="usuario"
							placeholder="Ingrese su usuario"
							ref={register({
								required: {
									value: true,
									message: 'El usuario es requerido'
								},
								maxLength: {
									value: 50,
									message:
										'El usuario debe tener menos de 50 carácteres'
								},
								minLength: {
									value: 5,
									message:
										'El usuario debe tener mas de 5 carácteres'
								}
							})}
						/>
						<Form.Control.Feedback type="invalid">
							{errors?.usuario?.message}
						</Form.Control.Feedback>
					</FormGroup>

					<Row>
						<Col md="6">
							<FormGroup>
								<FormLabel htmlFor="nombres">
									Nombres:
								</FormLabel>
								<FormControl
									disabled={charging}
									isInvalid={!!errors.nombres}
									type="text"
									name="nombres"
									id="nombres"
									placeholder="Ingrese su nombre"
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
								<FormLabel htmlFor="apellidos">
									Apellidos:
								</FormLabel>
								<FormControl
									disabled={charging}
									isInvalid={!!errors.apellidos}
									type="text"
									name="apellidos"
									id="apellidos"
									placeholder="Ingrese su apellido"
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
						<FormLabel htmlFor="telefono">
							Teléfono:
						</FormLabel>
						<InputGroup className="mb-2">
							<InputGroup.Prepend>
								<InputGroup.Text className="text-dark">
									+ 502
								</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								disabled={charging}
								isInvalid={!!errors.telefono}
								type="text"
								name="telefono"
								id="telefono"
								placeholder="Ingrese su teléfono"
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
						<FormLabel htmlFor="correo">
							Correo electrónico:
						</FormLabel>
						<FormControl
							disabled={charging}
							isInvalid={!!errors.correo}
							type="text"
							name="correo"
							id="correo"
							placeholder="Ingrese su correo"
							ref={register({
								required: {
									value: true,
									message: 'Su correo es requerido'
								},
								pattern: {
									value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: 'Su correo no es válido'
								}
							})}
						/>
						<Form.Control.Feedback type="invalid">
							{errors?.correo?.message}
						</Form.Control.Feedback>
					</FormGroup>

					<Row>
						<Col md="6">
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
						<Col md="6">
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
					</Row>

					{charging ? (
						<Button
							variant="success"
							type="submit"
							disabled
							block>
							Registrando
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
							type="submit"
							block
							className="mb-2">
							Registrarse
						</Button>
					)}

					<span style={{ color: '#ff7851' }}>
						{errors?.form?.message}
					</span>
				</Form>
			</Col>
		</Row>
	);
};
