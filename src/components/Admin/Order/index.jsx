import React, { useState } from 'react';
import {
	Table,
	Row,
	Col,
	FormControl,
	InputGroup,
	Pagination,
	Modal,
	Button
} from 'react-bootstrap';
import {
	getOrders,
	getDelivery,
	setDelivery
} from '../../../services/Admin/orderService';
import {
	EstaCargandoLosDatos,
	HuboUnErrorAlObtenerLosDatos
} from '../../Shipping/ShippingResponses';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

const Index = () => {
	const [data, setData] = useState([]);
	const [charging, setCharging] = useState(true);
	const [gotData, setGotData] = useState(false);
	const [error, setError] = useState(false);

	React.useEffect(() => {
		const exectAction = async () => {
			try {
				const rData = await getOrders();
				setData(rData);
			} catch (error) {
				setError(true);
			}
			setCharging(false);
			setGotData(true);
		};
		exectAction();
	}, []);

	return (
		<>
			<Row className="justify-content-center">
				{charging ? (
					<EstaCargandoLosDatos />
				) : error ? (
					<HuboUnErrorAlObtenerLosDatos />
				) : (
					<ChargedData data={data} />
				)}
			</Row>
		</>
	);
};

const ModalChorro = ({ data, setModal, dataInfo, userStore }) => {
	const hacerAlgo = async (idusuariorepartidor) => {
		try {
			await setDelivery(
				dataInfo.idpedido,
				userStore,
				data[idusuariorepartidor].idusuario
			);
			setModal(false);
		} catch (error) {}
	};

	return (
		<Col md="11">
			<Table responsive striped bordered hover size="sm">
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
								<Button
									size="sm"
									variant="success"
									onClick={() => {
										hacerAlgo(index);
									}}>
									<i className="fas fa-check-circle mr-2"></i>
									Elegir
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Col>
	);
};

const SetModal = ({ modal, setModal, dataInfo }) => {
	const [data, setData] = useState([]);
	const [charging, setCharging] = useState(true);
	const [gotData, setGotData] = useState(false);
	const [error, setError] = useState(false);

	const userStore = useSelector(
		(state) => state.session.data.idusuario
	);

	React.useEffect(() => {
		const exectAction = async () => {
			try {
				const rData = await getDelivery(userStore);
				setData(rData);
			} catch (error) {
				setError(true);
			}
			setCharging(false);
			setGotData(true);
		};
		exectAction();
	}, []);

	return (
		<>
			<Modal
				scrollable
				size="lg"
				show={modal}
				onHide={() => setModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-motorcycle mr-2"></i>
						Asigne un reparidor
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row className="justify-content-center">
						{charging ? (
							<EstaCargandoLosDatos />
						) : error ? (
							<HuboUnErrorAlObtenerLosDatos />
						) : (
							<ModalChorro
								data={data}
								setModal={setModal}
								dataInfo={dataInfo}
								userStore={userStore}
							/>
						)}
					</Row>
				</Modal.Body>
			</Modal>
		</>
	);
};

const ChargedData = ({ data }) => {
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [pData, setPData] = useState([]);
	const [modal, setModal] = useState(false);
	const [dataInfo, setDataInfo] = useState(undefined);

	React.useEffect(() => {
		let totalPages = Math.ceil(data.length / 10);
		setTotalPage(totalPages);
	}, []);

	React.useEffect(() => {
		changePage();
	}, [page]);

	const getRange = (index) => {
		let max = index * 10 - 1;
		let min = max - 9;
		return {
			min,
			max
		};
	};

	const chargeData = () => {
		const ranges = getRange(page);

		const newData = data.filter(
			(item, index) =>
				index >= ranges.min && index <= ranges.max
		);
		setPData(newData);
	};

	const changePage = (
		previous = false,
		next = false,
		before = false,
		after = false
	) => {
		chargeData();
		if (previous) {
			if (page !== 1) {
				setPage(page - 1);
			}
		} else if (next) {
			if (page !== totalPage) {
				setPage(page + 1);
			}
		} else if (before) {
			setPage(1);
		} else if (after) {
			setPage(totalPage);
		}
		chargeData();
	};

	return (
		<>
			<Col md="6">Filtro</Col>
			<Col md="6">
				<InputGroup>
					<FormControl
						type="text"
						placeholder="Digite los parámetros"
					/>
					<InputGroup.Append>
						<FormControl
							as="select"
							style={{ borderRadius: '0' }}>
							<option>Buscar por...</option>
							<option>ID Orden</option>
							<option>ID Pedido</option>
						</FormControl>
					</InputGroup.Append>
				</InputGroup>
			</Col>
			<Col md="12" className="mt-2">
				<Table responsive striped bordered hover size="sm">
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
						{pData.map((item, index) => (
							<tr key={index}>
								<td className="text-center">
									{page * 10 - (10 - index) + 1}
								</td>

								<td className="text-center">
									{item.usuario}
								</td>
								<td className="text-center">{`${item.distancia} km`}</td>
								<td className="text-center">{`${item.tarifa} Q`}</td>
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
										<Pending
											setModal={setModal}
											setDataInfo={setDataInfo}
											page={page}
											index={index}
											pData={pData}
										/>
									) : (
										<Cancel />
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Col>
			<Col md="9">
				<p className="text-black-50">{`Existen ${data.length} entradas y ${totalPage} páginas en total`}</p>
			</Col>
			<Col md="3">
				<Pagination size="sm" style={{ paddingRight: '0' }}>
					<Pagination.First
						onClick={() => {
							changePage(false, false, true, false);
						}}
					/>
					<Pagination.Prev
						onClick={() => {
							changePage(true, false, false, false);
						}}
					/>
					<Pagination.Item>{page}</Pagination.Item>
					<Pagination.Next
						onClick={() => {
							changePage(false, true, false, false);
						}}
					/>
					<Pagination.Last
						onClick={() => {
							changePage(false, false, false, true);
						}}
					/>
				</Pagination>
			</Col>
			<SetModal
				modal={modal}
				setModal={setModal}
				dataInfo={dataInfo}
			/>
		</>
	);
};

const Cancel = () => {
	return (
		<div>
			<i className="fas fa-eye text-success put-hand"></i>
		</div>
	);
};

const Pending = ({ setModal, setDataInfo, page, index, pData }) => {
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
					setDataInfo(pData[page * 10 - (10 - index)]);
					setModal(true);
				}}>
				<i className="fas fa-user-plus ml-2 text-primary put-hand"></i>
			</span>
		</div>
	);
};

export default Index;
