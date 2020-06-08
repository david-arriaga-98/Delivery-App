import React, { Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Navbar } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import Login from './Login';
import Register from './Register';
import SessionConstants from '../constants/Session';
import MapConstants from '../constants/Map';

export default () => {
	const store = useSelector((state) => state.session);

	const status = store.isLoggedIn;

	const Header = status ? <IsLoggedIn /> : <NotIsLoggedIn />;

	const dispatch = useDispatch();

	return (
		<Navbar variant="dark" className="color_orange">
			<Navbar.Brand
				className="put-hand"
				onClick={() => {
					dispatch(push('/'));
				}}
			>
				EvoSys
			</Navbar.Brand>

			<Navbar.Toggle />
			{Header}
		</Navbar>
	);
};

const NotIsLoggedIn = () => {
	const store = useSelector((state) => state.session);
	const dispatch = useDispatch();

	return (
		<Fragment>
			<Navbar.Collapse className="justify-content-end ">
				<Navbar.Text className="mr-3">
					<span
						onClick={() =>
							dispatch({
								type: SessionConstants.OPEN_CLOSE_LOGIN_MODAL
							})
						}
						className="navbar__item"
					>
						Iniciar
					</span>
				</Navbar.Text>
				<Navbar.Text className="mr-3">
					<span
						onClick={() =>
							dispatch({
								type: SessionConstants.OPEN_CLOSE_REGISTER_MODAL
							})
						}
						className="navbar__item"
					>
						Registrarse
					</span>
				</Navbar.Text>
			</Navbar.Collapse>

			{/* Modales */}

			<Modal
				size="md"
				show={store.loginModalState}
				onHide={() =>
					dispatch({
						type: SessionConstants.OPEN_CLOSE_LOGIN_MODAL
					})
				}
			>
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
						type: SessionConstants.OPEN_CLOSE_REGISTER_MODAL
					})
				}
			>
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

const IsLoggedIn = () => {
	const dispatch = useDispatch();
	return (
		<Navbar.Collapse className="justify-content-end">
			<Navbar.Text className="mr-3">
				<span
					className="navbar__item"
					onClick={() => {
						dispatch(push('/home'));
					}}
				>
					Home
				</span>
			</Navbar.Text>
			{/* <Navbar.Text className="mr-3">
				<span className="navbar__item">Perfil</span>
			</Navbar.Text> */}
			<Navbar.Text className="mr-3">
				<span
					className="navbar__item"
					onClick={() => {
						dispatch(push('/envios'));
					}}
				>
					Mis envíos
				</span>
			</Navbar.Text>
			<Navbar.Text className="mr-1">
				<span
					onClick={() => {
						dispatch({
							type: SessionConstants.LOG_OUT
						});
						dispatch({
							type: MapConstants.RESTART_MAP_STATE
						});
					}}
					className="navbar__item"
				>
					Salir
				</span>
			</Navbar.Text>
		</Navbar.Collapse>
	);
};
