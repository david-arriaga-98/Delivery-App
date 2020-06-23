import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { Container } from 'react-bootstrap';
import AdminTemplate from './Admin/AdminTemplate';
import Fordbidden from './Responses/Fordbidden';

export default ({ component: Component, interf }) => {
	const { isLoggedIn, data } = useSelector(
		(state) => state.session
	);

	const applicationState =
		!isLoggedIn ||
		data.token === null ||
		data.idusuario === null ||
		data.usuario === null
			? false
			: true;
	return (
		<Route
			render={(props) =>
				applicationState ? (
					interf === 'A' ? (
						data.interfaz === 'A' ? (
							<AdminTemplate XComponent={Component} />
						) : (
							<Fordbidden />
						)
					) : data.interfaz === 'A' ? (
						<Fordbidden />
					) : (
						<Container className="mt-4">
							<Component {...props} />
						</Container>
					)
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};
