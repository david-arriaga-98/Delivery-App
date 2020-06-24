import React from 'react';
import { Col, Table, Button, Spinner } from 'react-bootstrap';

const GetDeliveryManTable = ({ data, setDeliveryMan, charging }) => {
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
							Nombres
						</th>
						<th className="text-primary text-center">
							Apellidos
						</th>
						<th className="text-primary text-center">
							Viajes
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							<td className="text-center">
								{index + 1}
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
							<td>
								{charging ? (
									<Button
										size="sm"
										variant="success"
										disabled>
										<Spinner
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
										/>
									</Button>
								) : (
									<Button
										size="sm"
										variant="success"
										onClick={() => {
											setDeliveryMan(index);
										}}>
										<div>
											<i className="fas fa-check-circle"></i>
										</div>
									</Button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Col>
	);
};

export default GetDeliveryManTable;
