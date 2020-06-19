import React, { Fragment } from 'react';

import { Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import HelperConstants from '../../constants/Helper';

const getIndex = (actualPage, indexInPagination) => {
	return actualPage * 5 - (5 - indexInPagination);
};

const InformationButton = ({ dispatch, info }) => (
	<Button
		onClick={() => {
			dispatch({
				type: HelperConstants.ORDER_INFORMATION_MODAL,
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
);

const QualifyButton = ({ dispatch, info }) => (
	<Button
		className="ml-2"
		onClick={() => {
			dispatch({
				type: HelperConstants.QUALIFY_MODAL,
				payload: {
					info,
					state: true
				}
			});
		}}
		variant="success"
		size="sm">
		<i className="fas fa-file-alt mr-2"></i>
		Califica la entrega
	</Button>
);

const CancelButton = ({ dispatch, position, page }) => {
	const index = getIndex(page, position);
	return (
		<Button
			className="ml-2"
			onClick={() => {
				dispatch({
					type: HelperConstants.CANCEL_ORDER_MODAL,
					payload: index
				});
			}}
			variant="danger"
			size="sm">
			<i className="fas fa-times mr-2"></i>
			Cancelar tu pedido
		</Button>
	);
};

const ShippingCard = ({
	date,
	hour,
	distance,
	from,
	to,
	info,
	dispatch,
	position,
	page
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

	const ButtonToRender = () => {
		if (info.nombreestado === 'Finalizado') {
			return (
				<React.Fragment>
					<InformationButton
						dispatch={dispatch}
						info={info}
					/>
					<QualifyButton dispatch={dispatch} info={info} />
				</React.Fragment>
			);
		} else if (info.nombreestado === 'Pendiente') {
			return (
				<React.Fragment>
					<InformationButton
						dispatch={dispatch}
						info={info}
					/>
					<CancelButton
						dispatch={dispatch}
						position={position}
						page={page}
					/>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<InformationButton
						dispatch={dispatch}
						info={info}
					/>
				</React.Fragment>
			);
		}
	};

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
										Hora de Entrega:
										<span className="text-black-50">
											{` ${hour}`}
										</span>
									</Col>
									<Col md="4">
										Distancia:
										<span className="text-black-50">
											{` ${distance} km`}
										</span>
									</Col>
								</Row>
								<Row className="mt-3">
									<Col md="12">
										De:
										<span className="text-black-50">
											{` ${from}`}
										</span>
									</Col>
								</Row>
								<Row className="mt-2">
									<Col md="12">
										Para:
										<span className="text-black-50">
											{` ${to}`}
										</span>
									</Col>
								</Row>

								<Row className="justify-content-center">
									<Col
										md="12"
										className="mt-3 text-right">
										<ButtonToRender />
									</Col>
								</Row>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Fragment>
	);
};

export default React.memo(ShippingCard);
