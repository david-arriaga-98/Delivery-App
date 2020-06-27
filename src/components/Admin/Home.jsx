import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const AdminHome = () => {
	return (
		<>
			<Row>
				<Col md="12" className="mt-3">
					<Row className="justify-content-center">
						<Col md="3" className="text-center">
							<Card
								border="danger"
								text={'dark'}
								className="mt-2">
								<Card.Title
									className="mt-2"
									style={{ fontSize: '14px' }}>
									Viajes Realizados
								</Card.Title>
								<Card.Body>
									{/* <RenderB /> */}
									<Card.Text className="text-black-50"></Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md="3" className="text-center">
							<Card
								border="danger"
								text={'dark'}
								className="mt-2">
								<Card.Title
									className="mt-2"
									style={{ fontSize: '14px' }}>
									Usuarios
								</Card.Title>
								<Card.Body>
									{/* <RenderB /> */}
									<Card.Text className="text-black-50"></Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md="3" className="text-center">
							<Card
								border="danger"
								text={'dark'}
								className="mt-2">
								<Card.Title
									className="mt-2"
									style={{ fontSize: '14px' }}>
									Kilómetros recorridos
								</Card.Title>
								<Card.Body>
									{/* <RenderB /> */}
									<Card.Text className="text-black-50"></Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col md="3" className="text-center ">
							<Card
								border="danger"
								text={'dark'}
								className="mt-2">
								<Card.Title
									className="mt-2"
									style={{ fontSize: '14px' }}>
									Ventas
								</Card.Title>
								<Card.Body>
									{/* <RenderB /> */}
									<Card.Text className="text-black-50"></Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
};

export default AdminHome;
