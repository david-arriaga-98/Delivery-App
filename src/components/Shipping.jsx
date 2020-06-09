import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default () => {
	return (
		<Row className="justify-content-center border-dark">
			<Col md="11">
				<Row>
					<Col md="3">Imagen</Col>
					<Col md="9">
						<Row>
							<Col md="4">01/06/2020</Col>
							<Col md="4">
								Hora de Entrega: 02:00 pm
							</Col>
							<Col md="4">Distancia: 14.2 Km</Col>
						</Row>
						<Row>
							<Col md="12">
								<h6>
									De: San Cristobal, Zona 8 Mixco,
									Guatemala
								</h6>
							</Col>
						</Row>
						<Row>
							<Col md="12">
								<h6>
									De: San Cristobal, Zona 8 Mixco,
									Guatemala
								</h6>
							</Col>
						</Row>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};
