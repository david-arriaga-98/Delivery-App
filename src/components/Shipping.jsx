import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default () => {
	return (
		<React.Fragment>
			<Card style={{ border: '1px solid gray' }}>
				<Card.Body>
					<Row className="justify-content-center border-dark">
						<Col md="11">
							<Row>
								<Col md="3">
									<Image
										src="https://miro.medium.com/max/1400/1*qYUvh-EtES8dtgKiBRiLsA.png"
										width="170px"
										style={{ border: '1px solid gray' }}
									/>
								</Col>
								<Col md="9">
									<Row>
										<Col md="3">01/06/2020</Col>
										<Col md="5">Hora de Entrega: 02:00 pm</Col>
										<Col md="4">Distancia: 14.2 Km</Col>
									</Row>
									<Row className="mt-3">
										<Col md="12">
											<h6>De: San Cristobal, Zona 8 Mixco, Guatemala</h6>
										</Col>
									</Row>
									<Row className="mt-2">
										<Col md="12">
											<h6>De: San Cristobal, Zona 8 Mixco, Guatemala</h6>
										</Col>
									</Row>
								</Col>
							</Row>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</React.Fragment>
	);
};
