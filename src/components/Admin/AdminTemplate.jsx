import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const AdminTemplate = ({ XComponent }) => {
	const [showModal, setShowModal] = useState(true);
	const dispatch = useDispatch();
	const handle = () => {
		setShowModal(!showModal);
	};

	return (
		<div
			className={
				showModal
					? 'd-flex wrapper'
					: 'd-flex toggled wrapper'
			}>
			<div className="sidebar-wrapper">
				<div className="list-group list-group-flush">
					<span
						className="list-group-item list-group-item-action put-hand"
						onClick={() => {
							dispatch(push('/admin'));
						}}>
						<i className="fas fa-home mr-2"></i>
						Home
					</span>
					<span
						className="list-group-item list-group-item-action put-hand"
						onClick={() => {
							dispatch(push('/admin/pedidos'));
						}}>
						<i className="fas fa-truck mr-2"></i>
						Pedidos
					</span>
					<span
						className="list-group-item list-group-item-action put-hand"
						onClick={() => {
							dispatch(push('/admin/pedidos'));
						}}>
						<i className="fas fa-motorcycle mr-2"></i>
						Repartidor
					</span>
				</div>
			</div>

			<div id="page-content-wrapper">
				{showModal ? (
					<BtnClose handle={handle} />
				) : (
					<BtnOpen handle={handle} />
				)}
				<Container fluid>
					<XComponent />
				</Container>
			</div>
		</div>
	);
};

const BtnClose = ({ handle }) => {
	return (
		<Button variant="light" onClick={handle}>
			<i className="fas fa-chevron-left mr-2"></i>
		</Button>
	);
};
const BtnOpen = ({ handle }) => {
	return (
		<Button variant="light" onClick={handle}>
			<i className="fas fa-chevron-right mr-2"></i>
		</Button>
	);
};

export default AdminTemplate;
