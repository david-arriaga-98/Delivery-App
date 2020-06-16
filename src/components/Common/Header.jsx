import React, { Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Navbar, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import Login from '../User/Login';
import Register from '../User/Register';
import SessionConstants from '../../constants/Session';
import MapConstants from '../../constants/Map';

export default () => {
	const store = useSelector((state) => state.session);

	const status = store.isLoggedIn;

	const dispatch = useDispatch();

	const Header = status ? (
		<IsLoggedIn dispatch={dispatch} />
	) : (
		<NotIsLoggedIn store={store} dispatch={dispatch} />
	);

	return (
		<Navbar variant="dark" className="bg-orange" expand="md">
			<Navbar.Brand
				className="put-hand"
				onClick={() => {
					dispatch(push('/'));
				}}>
				<img
					alt=""
					src="https://image.flaticon.com/icons/svg/3063/3063822.svg"
					width="40"
					height="40"
					className="d-inline-block align-top"
				/>{' '}
				EvoSys
			</Navbar.Brand>

			<Navbar.Toggle aria-controls="navbar-nav" />
			{Header}
		</Navbar>
	);
};

const NotIsLoggedIn = ({ store, dispatch }) => {
	return (
		<Fragment>
			<Navbar.Collapse
				id="navbar-nav"
				className="justify-content-end ">
				<Nav>
					<Nav.Item>
						<span
							onClick={() =>
								dispatch({
									type:
										SessionConstants.OPEN_CLOSE_LOGIN_MODAL
								})
							}
							className="navbar__item mr-3 mt-1">
							Iniciar
						</span>
					</Nav.Item>
					<Nav.Item>
						<span
							onClick={() =>
								dispatch({
									type:
										SessionConstants.OPEN_CLOSE_REGISTER_MODAL
								})
							}
							className="navbar__item mr-3 mt-1">
							Registrarse
						</span>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>

			{/* Modales */}

			<Modal
				size="md"
				show={store.loginModalState}
				onHide={() =>
					dispatch({
						type: SessionConstants.OPEN_CLOSE_LOGIN_MODAL
					})
				}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-clipboard-check mr-2"></i>
						Iniciar Sesión
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Login />
				</Modal.Body>
			</Modal>

			<Modal
				scrollable
				show={store.registerModalState}
				onHide={() =>
					dispatch({
						type:
							SessionConstants.OPEN_CLOSE_REGISTER_MODAL
					})
				}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-address-book mr-2"></i>
						Registrarse
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Register />
				</Modal.Body>
			</Modal>
		</Fragment>
	);
};

const IsLoggedIn = ({ dispatch }) => {
	return (
		<Navbar.Collapse
			id="navbar-nav"
			className="justify-content-end">
			<Nav>
				<Nav.Item>
					<span
						className="navbar__item mr-3 mt-1"
						onClick={() => {
							dispatch(push('/home'));
						}}>
						Home
					</span>
				</Nav.Item>
				<Nav.Item>
					<span
						className="navbar__item mr-3 mt-1"
						onClick={() => {
							dispatch(push('/perfil'));
						}}>
						Perfil
					</span>
				</Nav.Item>
				<Nav.Item>
					<span
						className="navbar__item mr-3 mt-1"
						onClick={() => {
							dispatch(push('/envios'));
						}}>
						Mis envíos
					</span>
				</Nav.Item>
				<Nav.Item>
					<span
						onClick={() => {
							dispatch({
								type: SessionConstants.LOG_OUT
							});
							dispatch({
								type: MapConstants.RESTART_MAP_STATE
							});
						}}
						className="navbar__item mr-3 mt-1">
						Salir
					</span>
				</Nav.Item>
			</Nav>
		</Navbar.Collapse>
	);
};
