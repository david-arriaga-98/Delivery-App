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

export const NoHayDatos = () => {
	return (
		<Row className="justify-content-center">
			<Col className="mt-4 text-center">
				<h5 className="text-secondary">
					No hay datos para mostrar
				</h5>
			</Col>
		</Row>
	);
};
