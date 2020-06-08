import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Image, Button, Row, Col } from 'react-bootstrap';
import HelperConstants from '../../constants/Helper';
import SuccessImage from '../../assets/img/about2.png';

export default () => {
	const state = useSelector((state) => state.helper);
	const dispatch = useDispatch();
	return (
		<Modal
			centered
			size="sm"
			show={state.responseModal.showModal}
			onHide={() =>
				dispatch({
					type: HelperConstants.CLOSE_MODAL
				})
			}>
			<Modal.Header closeButton>
				<Modal.Title>
					<i className="fas fa-clipboard-check mr-2"></i>
					Correcto
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className="justify-content-center">
					<Col className="text-center" sm="12" md="12">
						<Image
							width="230px"
							src={SuccessImage}></Image>
					</Col>
					<Col md="12" className="text-center mt-3 ">
						<h4>Usuario creado</h4>
					</Col>
					<Col md="12" className="text-right mt-3">
						<Button
							variant="success"
							onClick={() => {
								dispatch({
									type: HelperConstants.CLOSE_MODAL
								});
							}}>
							<i className="fas fa-check mr-2"></i>
							Salir
						</Button>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	);
};

/* const SuccessResponse = () => <h1>Soy una respuesta positrona</h1>;

const ErrorResponse = () => <h1>Soy una respuesta negatona</h1>;
 */
