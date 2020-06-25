import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import HelperConstants from '../../constants/Helper';

const CancelOrder = () => {
	const dispatch = useDispatch();
	const helperStore = useSelector((state) => state.helper);

	/* const cancelOrder = async () => {
		try {
			let idToSend = undefined;
			if (useDataFromThisComponent) {
				idToSend =
					dataFromThisComponent[
						helperStore.cancelOrderPosition
					].idpedido;
			} else {
				idToSend =
					orders[helperStore.cancelOrderPosition].idpedido;
			}

			await axios.post('/Pedido/Cancelar', {
				idpedido: idToSend
			});

			dispatch({
				type: HelperConstants.CANCEL_ORDER_MODAL
			});
			dispatch({
				type: HelperConstants.SHOW_SUCCESS_MODAL,
				payload: 'Tu orden ha sido cancelada correctamente'
			});
			reRenderComponent();
		} catch (error) {}
	}; */

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
				<Button variant="primary" size="sm">
					<i className="fas fa-check mr-2"></i>
					Si
				</Button>

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

export default CancelOrder;
