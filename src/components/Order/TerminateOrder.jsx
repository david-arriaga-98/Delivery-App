import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { terminateOrder } from '../../services/Admin/orderService';
import { useSelector, useDispatch } from 'react-redux';
import HelperConstants from '../../constants/Helper';

const TerminateOrder = ({ modal, setModal, data, setLoadData }) => {
	const idusuario = useSelector(
		(state) => state.session.data.idusuario
	);
	const [charging, setCharging] = useState(false);
	const dispatch = useDispatch();
	const terminate = async () => {
		try {
			setCharging(true);
			await terminateOrder(idusuario, data.idpedido);
			setModal(false);
			dispatch({
				type: HelperConstants.SHOW_SUCCESS_MODAL,
				payload: 'La orden ha sido terminada'
			});
			setLoadData(true);
		} catch (error) {}
		setCharging(false);
	};

	return (
		<Modal scrollable onHide={() => setModal(false)} show={modal}>
			<Modal.Header closeButton>
				<Modal.Title>
					<i className="fas fa-info-circle mr-2"></i>
					Confirmar
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="text-center">
				<p className="text-black-50">
					¿Seguro que deseas terminar esta entrega?
				</p>
			</Modal.Body>
			<Modal.Footer>
				{charging ? (
					<Button variant="primary" size="sm" disabled>
						Si
						<Spinner
							className="ml-2"
							as="span"
							animation="border"
							size="sm"
							role="status"
							aria-hidden="true"
						/>
					</Button>
				) : (
					<Button
						variant="primary"
						size="sm"
						onClick={terminate}>
						<span>
							<i className="fas fa-check mr-2"></i>
						</span>
						Si
					</Button>
				)}

				<Button
					className="ml-2"
					onClick={() => {
						setModal(false);
					}}
					variant="danger"
					size="sm">
					<i className="fas fa-times mr-2"></i>
					No
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default TerminateOrder;
