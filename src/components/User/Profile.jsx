import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
	FormGroup,
	FormLabel,
	FormControl,
	Card,
	Button
} from 'react-bootstrap';

export default () => {
	return (
		<Row className="justify-content-center mb-4">
			<Card border="secondary">
				<Card.Header>
					<h4 className="text-black-50">
						<i className="far fa-address-card mr-2"></i>
						Mi Perfil
					</h4>
				</Card.Header>
				<Card.Body>
					<FormGroup>
						<FormLabel className="text-black-50">
							Usuario:
						</FormLabel>
						<FormControl
							readOnly
							type="text"
							value="Usuario"
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
									readOnly
									type="text"
									value="Nombres del usuario"
									className="bg-secondary text-white"
								/>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<FormLabel className="text-black-50">
									Apellidos:
								</FormLabel>
								<FormControl
									readOnly
									type="text"
									value="Apellidos del usuario"
									className="bg-secondary text-white"
								/>
							</FormGroup>
						</Col>
					</Row>

					<FormGroup>
						<FormLabel className="text-black-50">
							Teléfono:
						</FormLabel>

						<FormControl
							readOnly
							type="text"
							value="Telefono del usuario"
							className="bg-secondary text-white"
						/>
					</FormGroup>

					<FormGroup>
						<FormLabel className="text-black-50">
							Correo electrónico:
						</FormLabel>
						<FormControl
							readOnly
							type="text"
							value="Correo del usuario"
							className="bg-secondary text-white"
						/>
					</FormGroup>
					<FormGroup className="text-right">
						<Button size="sm">
							<i className="far fa-edit mr-2"></i>
							Editar mi información
						</Button>
					</FormGroup>
				</Card.Body>
			</Card>
		</Row>
	);
};
