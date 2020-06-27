import React from 'react';
import { Table, Col } from 'react-bootstrap';

import OrderInformation from '../../Order/OrderInformation';
import CancelOrder from '../../Order/CancelOrder';

const OrderTable = ({ pData, page }) => {
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
								Nombres
							</th>
							<th className="text-primary text-center">
								Apellidos
							</th>
							<th className="text-primary text-center">
								Viajes
							</th>
							<th className="text-primary text-center">
								Ponderación
							</th>
						</tr>
					</thead>
					<tbody>
						{pData.map((item, index) => {
							return (
								<tr key={index}>
									<td className="text-center text-success">
										{page * 10 - (10 - index) + 1}
									</td>

									<td className="text-center">
										{item.usuario}
									</td>
									<td className="text-center">
										{item.nombres}
									</td>
									<td className="text-center">
										{item.apellidos}
									</td>
									<td className="text-center">
										{item.viajes}
									</td>
									<td className="text-center">
										{item.ponderacion}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Col>
			<OrderInformation />
			<CancelOrder />
		</>
	);
};

export default OrderTable;
