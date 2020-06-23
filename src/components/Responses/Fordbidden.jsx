import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

export default function Fordbidden() {
	const dispatch = useDispatch();
	return (
		<Row className="justify-content-center mt-5">
			<Col md="9" className="text-center">
				<h5 className="text-danger mb-3">
					No puedes acceder a esta ruta
				</h5>
				<Button
					variant="danger"
					size="sm"
					onClick={() => {
						dispatch(push('/'));
					}}>
					<i className="fa fa-arrow-left mr-2"></i>
					Ir al inicio
				</Button>
			</Col>
		</Row>
	);
}
