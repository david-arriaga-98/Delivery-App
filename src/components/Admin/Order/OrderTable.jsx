import React, { useState } from 'react';
import { Table, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import HelperConstants from '../../../constants/Helper';

import OrderInformation from '../../Order/OrderInformation';
import CancelOrder from '../../Order/CancelOrder';
import TerminateOrder from '../../Order/TerminateOrder';
import OrderDeliveryMan from './OrderDeliveryMan';

const OrderTable = ({
	pData,
	page,
	setDataInfo,
	setModal,
	range,
	setLoadData
}) => {
	const [modal2, setModal2] = useState(false);

	const [modal3, setModal3] = useState(false);
	const [modal3Data, setModal3Data] = useState(null);

	const [dataToSend, setDataToSend] = useState(null);

	const [idPedido, setIdPedido] = useState(null);

	return (
		<>
			<Col md="12" className="mt-2">
				<Table
					style={{ fontSize: '.9rem' }}
					responsive
					striped
					bordered
					hover
					size="sm">
					<thead>
						<tr>
							<th className="text-primary text-center">
								#
							</th>
							<th className="text-primary text-center">
								Usuario
							</th>
							<th className="text-primary text-center">
								Distancia
							</th>
							<th className="text-primary text-center">
								Tarifa
							</th>
							<th className="text-primary text-center">
								Fecha de Entrega
							</th>
							<th className="text-primary text-center">
								Hora de Entrega
							</th>
							<th className="text-primary text-center">
								Estado
							</th>
							<th className="text-primary text-center">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody>
						{pData.map((item, index) => {
							let tarifaN = Number.parseFloat(
								item.tarifa
							);
							let tarifaFoo = tarifaN.toFixed(2);

							return (
								<tr key={index}>
									<td className="text-center text-primary">
										{page * range -
											(range - index) +
											1}
									</td>

									<td className="text-center">
										{item.usuario}
									</td>
									<td className="text-center">{`${item.distancia} km`}</td>
									<td className="text-center">{`${tarifaFoo} Q`}</td>
									<td className="text-center">
										{format(
											new Date(
												item.fechaestimada
											),
											'dd-MM-yyyy'
										)}
									</td>
									<td className="text-center">
										{item.horaestimada}
									</td>

									<td
										className="text-center"
										style={{ color: item.color }}>
										{item.nombreestado}
									</td>

									<td>
										{item.nombreestado ===
										'Pendiente' ? (
											<BtnPending
												setModal={setModal3}
												setDataInfo={
													setModal3Data
												}
												page={page}
												index={index}
												pData={pData}
												setIdPedido={
													setIdPedido
												}
												setLoadData={
													setLoadData
												}
											/>
										) : item.nombreestado ===
										  'En Progreso' ? (
											<BtnProgress
												index={index}
												pData={pData}
												setModal={setModal2}
												setDataToSend={
													setDataToSend
												}
											/>
										) : (
											<BtnCancel
												index={index}
												pData={pData}
											/>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Col>
			<OrderInformation />
			<CancelOrder data={idPedido} setLoadData={setLoadData} />
			<TerminateOrder
				modal={modal2}
				setModal={setModal2}
				data={dataToSend}
				setLoadData={setLoadData}
			/>
			<OrderDeliveryMan
				modal={modal3}
				setModal={setModal3}
				dataInfo={modal3Data}
			/>
		</>
	);
};

const BtnCancel = ({ pData, index }) => {
	const dispatch = useDispatch();
	return (
		<div
			onClick={() => {
				dispatch({
					type: HelperConstants.ORDER_INFORMATION_MODAL,
					payload: {
						state: true,
						info: pData[index]
					}
				});
			}}>
			<i className="fas fa-eye text-success put-hand"></i>
		</div>
	);
};

const BtnProgress = ({ pData, index, setModal, setDataToSend }) => {
	const dispatch = useDispatch();
	return (
		<div>
			<span
				onClick={() => {
					dispatch({
						type: HelperConstants.ORDER_INFORMATION_MODAL,
						payload: {
							state: true,
							info: pData[index]
						}
					});
				}}>
				<i className="fas fa-eye text-success put-hand"></i>
			</span>
			<span
				onClick={() => {
					setDataToSend(pData[index]);
					setModal(true);
				}}>
				<i className="fas fa-check-circle text-primary put-hand ml-2"></i>
			</span>
		</div>
	);
};

const BtnPending = ({
	setModal,
	setDataInfo,
	index,
	pData,
	setIdPedido
}) => {
	const dispatch = useDispatch();

	return (
		<div>
			<span
				onClick={() => {
					dispatch({
						type: HelperConstants.ORDER_INFORMATION_MODAL,
						payload: {
							state: true,
							info: pData[index]
						}
					});
				}}>
				<i className="fas fa-eye text-success put-hand"></i>
			</span>
			<span
				onClick={() => {
					setIdPedido(pData[index].idpedido);
					dispatch({
						type: HelperConstants.CANCEL_ORDER_MODAL
					});
				}}>
				<i className="fas fa-times-circle ml-2 text-danger put-hand"></i>
			</span>
			<span
				onClick={() => {
					setDataInfo(pData[index]);
					setModal(true);
				}}>
				<i className="fas fa-user-plus ml-2 text-primary put-hand"></i>
			</span>
		</div>
	);
};

export default OrderTable;
