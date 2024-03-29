import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import HelperConstants from '../../constants/Helper';
import axios from '../../utils/Axios';

const CancelOrder = ({ data, setLoadData }) => {
	const dispatch = useDispatch();
	const helperStore = useSelector((state) => state.helper);
	const [charging, setCharging] = useState(false);

	const cancelOrder = async () => {
		try {
			setCharging(true);
			await axios.post('/Pedido/Cancelar', {
				idpedido: data
			});

			dispatch({
				type: HelperConstants.CANCEL_ORDER_MODAL
			});
			dispatch({
				type: HelperConstants.SHOW_SUCCESS_MODAL,
				payload: 'La orden ha sido cancelada correctamente'
			});
			setLoadData(true);
		} catch (error) {}
		setCharging(false);
	};

	return (
		<Modal
			scrollable
			onHide={() =>
				dispatch({
					type: HelperConstants.CANCEL_ORDER_MODAL
				})
			}
			show={helperStore.cancelOrderModal}>
			<Modal.Header closeButton>
				<Modal.Title>
					<i className="fas fa-info-circle mr-2"></i>
					Confirmar
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="text-center">
				<p className="text-black-50">
					¿Seguro que deseas cancelar tu pedido?
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
						onClick={cancelOrder}>
						<span>
							<i className="fas fa-check mr-2"></i>
						</span>
						Si
					</Button>
				)}

				<Button
					className="ml-2"
					onClick={() => {
						dispatch({
							type: HelperConstants.CANCEL_ORDER_MODAL
						});
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

export default React.memo(CancelOrder);
