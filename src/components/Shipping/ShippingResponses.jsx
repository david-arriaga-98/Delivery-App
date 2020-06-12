import React from 'react';

import { Row, Col, Button, Spinner } from 'react-bootstrap';

export const HuboUnErrorAlObtenerLosDatos = () => {
	return (
		<Col md="9" className="mt-4 text-center">
			<h5 className="text-danger">
				Ha ocurrido un error al obtener sus datos del servidor
			</h5>
		</Col>
	);
};

export const EstaCargandoLosDatos = () => {
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

export const NoHayDatos = ({ action }) => {
	return (
		<Row className="justify-content-center">
			<Col md="9" className="mt-4 text-center">
				<h5 className="text-dark">
					No hay datos para mostrar
				</h5>
			</Col>
			<Col md="9" className="mt-2 text-center">
				<Button
					size="sm"
					variant="secondary"
					onClick={action}>
					Volver
					<i className="fas fa-undo-alt ml-2"></i>
				</Button>
			</Col>
		</Row>
	);
};
