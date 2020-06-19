import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';

export default () => {
	return (
		<Row className="justify-content-center mt-5">
			<Col md="10" className="text-center">
				<Spinner
					as="span"
					animation="border"
					size="sm"
					role="status"
					aria-hidden="true"
				/>
			</Col>
		</Row>
	);
};
