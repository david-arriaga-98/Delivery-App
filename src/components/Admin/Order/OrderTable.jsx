import React from 'react';
import { Table, Col } from 'react-bootstrap';
import { format } from 'date-fns';

const OrderTable = ({ pData, page, setDataInfo, setModal }) => {
	return (
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
						let tarifaN = Number.parseFloat(item.tarifa);
						let tarifaFoo = tarifaN.toFixed(2);

						return (
							<tr key={index}>
								<td className="text-center">
									{page * 10 - (10 - index) + 1}
								</td>

								<td className="text-center">
									{item.usuario}
								</td>
								<td className="text-center">{`${item.distancia} km`}</td>
								<td className="text-center">{`${tarifaFoo} Q`}</td>
								<td className="text-center">
									{format(
										new Date(item.fechaestimada),
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
											setModal={setModal}
											setDataInfo={setDataInfo}
											page={page}
											index={index}
											pData={pData}
										/>
									) : (
										<BtnCancel />
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</Col>
	);
};

const BtnCancel = () => {
	return (
		<div>
			<i className="fas fa-eye text-success put-hand"></i>
		</div>
	);
};

const BtnPending = ({
	setModal,
	setDataInfo,
	page,
	index,
	pData
}) => {
	return (
		<div>
			<span>
				<i className="fas fa-eye text-success put-hand"></i>
			</span>
			<span>
				<i className="fas fa-times-circle ml-2 text-danger put-hand"></i>
			</span>
			<span
				onClick={() => {
					setDataInfo(page * 10 - (10 - index));
					setModal(true);
				}}>
				<i className="fas fa-user-plus ml-2 text-primary put-hand"></i>
			</span>
		</div>
	);
};

export default OrderTable;
