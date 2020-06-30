import React from 'react';
import { Modal } from 'react-bootstrap';
import RoutingMap from './RoutingMap';

const RoutingMain = ({ modal, setModal }) => {
	return (
		<Modal
			show={modal}
			backdrop="static"
			scrollable
			onHide={() => setModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>
					<i className="fas fa-check mr-2"></i>
					Ingresa tus rutas
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<RoutingMap setModal={setModal} />
			</Modal.Body>
		</Modal>
	);
};

export default RoutingMain;
