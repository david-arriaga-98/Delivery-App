import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default () => {
	const [show, setShow] = useState(false);
	React.useEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, 800);
	});

	return (
		<>
			<Row className="justify-content-center">
				{show ? <Counter /> : <></>}
			</Row>
		</>
	);
};
const Counter = () => {
	const [num, setNum] = useState(400);
	const [secondNumber, setSecondNumber] = useState(21300);

	React.useEffect(() => {
		for (let i = 0; i <= 1500; i += 10) {
			setTimeout(() => {
				setNum(num + i);
				setSecondNumber(secondNumber + i);
			});
		}
	}, []);

	const RenderB = () => {
		if (num <= 1100) {
			return (
				<Card.Title
					style={{
						fontSize: '1.5rem',
						fontWeight: 'bold',
						color: '#FF8A65'
					}}>{`+ ${num}`}</Card.Title>
			);
		} else if (num > 1100 && num <= 1600) {
			return (
				<Card.Title
					style={{
						fontWeight: 'bold',
						fontSize: '1.52rem'
					}}
					className="text-danger">{`+ ${num}`}</Card.Title>
			);
		} else {
			return (
				<Card.Title
					style={{
						fontSize: '1.55rem',
						fontWeight: 'bold',
						color: '#FF5722'
					}}>{`+ ${num}`}</Card.Title>
			);
		}
	};

	const RenderA = () => {
		if (secondNumber <= 22000) {
			return (
				<Card.Title
					style={{
						fontSize: '1.5rem',
						fontWeight: 'bold',
						color: '#FF8A65'
					}}>{`+ ${secondNumber}`}</Card.Title>
			);
		} else if (secondNumber > 22000 && secondNumber <= 22500) {
			return (
				<Card.Title
					style={{
						fontWeight: 'bold',
						fontSize: '1.52rem'
					}}
					className="text-danger">{`+ ${secondNumber}`}</Card.Title>
			);
		} else {
			return (
				<Card.Title
					style={{
						fontSize: '1.55rem',
						fontWeight: 'bold',
						color: '#FF5722'
					}}>{`+ ${secondNumber}`}</Card.Title>
			);
		}
	};

	return (
		<>
			<Col md="10" className="mt-3">
				<Row className="justify-content-center">
					<Col md="6" className="text-center">
						<Card
							border="danger"
							text={'dark'}
							className="mb-2">
							<Card.Body>
								<RenderB />
								<Card.Text
									className="text-black-50"
									style={{
										fontSize: '1.7rem',
										fontWeight: 'bold'
									}}>
									Entregas
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col md="6" className="text-center">
						<Card
							border="danger"
							text={'dark'}
							className="mb-2">
							<Card.Body>
								<RenderA />
								<Card.Text
									className="text-black-50"
									style={{
										fontSize: '1.7rem',
										fontWeight: 'bold'
									}}>
									Kilómetros recorridos
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Col>
		</>
	);
};
