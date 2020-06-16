import React, { Fragment } from 'react';

import { Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import HelperConstants from '../../constants/Helper';

const ShippingCard = ({
	date,
	hour,
	distance,
	from,
	to,
	info,
	helperStore,
	dispatch,
	position
}) => {
	let spinn = undefined;

	switch (info.nombreestado) {
		case 'Pendiente':
			spinn = (
				<Spinner
					style={{ backgroundColor: info.color }}
					animation="grow"
					size="sm"
				/>
			);
			break;
		case 'En Progreso':
			spinn = (
				<Spinner
					style={{ backgroundColor: info.color }}
					animation="grow"
					size="sm"
				/>
			);
			break;
		case 'Finalizado':
			spinn = (
				<div
					className="order__status--ok"
					style={{ backgroundColor: info.color }}></div>
			);
			break;
		case 'Cancelado':
			spinn = (
				<div
					className="order__status--ok"
					style={{ backgroundColor: info.color }}></div>
			);
			break;
		default:
			spinn = (
				<div
					className="order__status--ok"
					style={{ backgroundColor: 'blue' }}></div>
			);
			break;
	}

	return (
		<Fragment>
			<Col md="9" className="mb-3">
				<Card>
					<Card.Body>
						<Row>
							<Col md="3">
								<Row>
									<Col md="9">
										<Image
											src="https://miro.medium.com/max/1400/1*qYUvh-EtES8dtgKiBRiLsA.png"
											width="120px"
											height="100px"
											className="order__image"
											style={{
												border:
													'3px solid rgba(0,0,0,.3)',
												borderRadius: '.5rem'
											}}
										/>
									</Col>
									<Col md="3">{spinn}</Col>
								</Row>
							</Col>
							<Col md="9">
								<Row>
									<Col md="3">{date}</Col>
									<Col md="5">
										Hora de Entrega:{'  '}
										<span className="text-black-50">
											{hour}
										</span>
									</Col>
									<Col md="4">
										Distancia:{'  '}
										<span className="text-black-50">
											{distance} km
										</span>
									</Col>
								</Row>
								<Row className="mt-3">
									<Col md="12">
										De:{'  '}
										<span className="text-black-50">
											{from}
										</span>
									</Col>
								</Row>
								<Row className="mt-2">
									<Col md="12">
										Para:{'  '}
										<span className="text-black-50">
											{to}
										</span>
									</Col>
								</Row>

								<Row className="justify-content-center">
									{info.nombreestado ===
									'Pendiente' ? (
										<Col
											md="12"
											className="mt-3 text-right">
											<Button
												onClick={() => {
													dispatch({
														type:
															HelperConstants.ORDER_INFORMATION_MODAL,
														payload: {
															info,
															state: true
														}
													});
												}}
												variant="primary"
												size="sm">
												<i className="fas fa-eye mr-2"></i>
												Información
											</Button>

											<Button
												className="ml-2"
												onClick={() => {
													dispatch({
														type:
															HelperConstants.CANCEL_ORDER_MODAL,
														payload: position
													});
												}}
												variant="danger"
												size="sm">
												<i className="fas fa-times mr-2"></i>
												Cancelar tu pedido
											</Button>
										</Col>
									) : (
										<Col
											md="12"
											className="mt-3 text-right">
											<Button
												onClick={() => {
													dispatch({
														type:
															HelperConstants.ORDER_INFORMATION_MODAL,
														payload: {
															info,
															state: true
														}
													});
												}}
												variant="primary"
												size="sm">
												<i className="fas fa-eye mr-2"></i>
												Información
											</Button>
										</Col>
									)}
								</Row>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Fragment>
	);
};

export default ShippingCard;