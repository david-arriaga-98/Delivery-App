import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

export default ({ component: Component, otros }) => {
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
			{...otros}
			render={(props) =>
				applicationState ? (
					<Component {...props} />
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};