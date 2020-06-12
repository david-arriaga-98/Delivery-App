import React from 'react';
import { useForm } from 'react-hook-form';
import {
	Row,
	Form,
	Col,
	FormGroup,
	FormControl,
	FormLabel,
	Button,
	Spinner,
	InputGroup
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
/* import sha256 from 'crypto-js/sha256'; */

import sessionConstants from '../constants/Session';

export default () => {
	const { register, errors, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const state = useSelector((state) => state.session);

	const onSubmit = async (data) => {
		/* data.contrasena = sha256(data.contrasena).toString();*/
		// Despachamos la acción
		dispatch({
			type: sessionConstants.START_LOGIN,
			payload: data
		});
	};
	return (
		<Row className="justify-content-center mb-4">
			<Col md="10">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormGroup>
						<FormLabel htmlFor="usuario">
							Usuario:
						</FormLabel>

						<InputGroup className="mb-2">
							<InputGroup.Prepend>
								<InputGroup.Text>
									<i className="fas fa-user"></i>
								</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								disabled={state.isLoading}
								type="text"
								placeholder="Ingrese su usuario"
								name="usuario"
								id="usuario"
								ref={register({
									required: {
										value: true,
										message:
											'El usuario es requerido'
									}
								})}
								isInvalid={!!errors.usuario}
							/>
							<Form.Control.Feedback type="invalid">
								{errors?.usuario?.message}
							</Form.Control.Feedback>
						</InputGroup>
					</FormGroup>
					<FormGroup>
						<FormLabel htmlFor="contrasena">
							Contraseña:
						</FormLabel>

						<InputGroup className="mb-2">
							<InputGroup.Prepend>
								<InputGroup.Text>
									<i className="fas fa-key"></i>
								</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								disabled={state.isLoading}
								type="password"
								placeholder="Ingrese su usuario"
								name="contrasena"
								id="contrasena"
								ref={register({
									required: {
										value: true,
										message:
											'La contraseña es requerida'
									}
								})}
								isInvalid={!!errors.contrasena}
							/>
							<Form.Control.Feedback type="invalid">
								{errors?.contrasena?.message}
							</Form.Control.Feedback>
						</InputGroup>
					</FormGroup>

					<FormGroup>
						{state.isLoading ? (
							<Button
								variant="primary"
								type="submit"
								disabled
								block>
								Ingresando
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
								variant="primary"
								type="submit"
								block>
								Iniciar Sesión
							</Button>
						)}
					</FormGroup>
					<span className="error-message">
						{state.error}
					</span>
				</Form>
			</Col>
		</Row>
	);
};
