import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const PageNotFound = () => {
	const dispatch = useDispatch();
	return (
		<Row className="justify-content-center mt-5">
			<Col md="9" className="text-center">
				<h5 className="text-black-50 mb-3">
					Esta página no existe
				</h5>
				<Button
					variant="secondary"
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
};

export default PageNotFound;
