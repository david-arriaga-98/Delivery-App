import React, { useEffect, useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

export default () => {
	const [orders, setOrders] = useState([]);
	const [gotData, setGotData] = useState(false);
	const [respError, setRespError] = useState('');

	useEffect(() => {
		if (orders.length === 0 && !gotData) {
			getOrder();
		}
	});

	const getOrder = async () => {
		try {
			const { data } = await axios.get(
				'https://jsonplaceholder.typicode.com/posts'
			);
			setOrders(data);
			setGotData(true);
		} catch (error) {
			setRespError(
				'Ha ocurrido un error al tratar de recuperar su información'
			);
		}
	};

	return (
		<React.Fragment>
			{!gotData ? (
				<h1>Aun no se obtiene respuesta</h1>
			) : (
				orders.map((item, index) => {
					return (
						<ShippingCard
							key={index}
							date={'01/06/2020'}
							hour={'02:00'}
							distance="25"
							from="mi enepe"
							to="your ass"
						/>
					);
				})
			)}
			{/* <ShippingCard
				date={'01/06/2020'}
				hour={'02:00'}
				distance="25"
				from="mi enepe"
				to="your ass"
			/> */}
		</React.Fragment>
	);
};

const ShippingCard = ({ date, hour, distance, from, to }) => {
	return (
		<Row className="justify-content-center border-dark mb-2">
			<Col md="9">
				<Card style={{ border: '1px solid gray' }}>
					<Card.Body>
						<Row>
							<Col md="3">
								<Image
									src="https://miro.medium.com/max/1400/1*qYUvh-EtES8dtgKiBRiLsA.png"
									width="150px"
									style={{
										border: '1px solid #ced4da'
									}}
								/>
							</Col>
							<Col md="9">
								<Row>
									<Col md="3">01/06/2020</Col>
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
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};
