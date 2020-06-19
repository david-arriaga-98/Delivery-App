import React, { lazy } from 'react';
import { Route, Switch } from 'react-router';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { ConnectedRouter } from 'connected-react-router';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import esLocale from 'date-fns/locale/es';

// Components
import HeaderComponent from './components/Common/Header';
import SessionComponent from './components/Session';
import ResponseModalComponent from './components/Responses/Response';
import ChargingLazy from './components/Common/ChargingLazy';
import Main from './components/Main';
import ImageMain from './assets/img/banner.png';

import { useSelector } from 'react-redux';

const ShippingComponent = lazy(() =>
	import('./components/Shipping/Shipping')
);
const ProfileComponent = lazy(() =>
	import('./components/User/Profile')
);
const HomeComponent = lazy(() => import('./components/Home'));
function App({ history, context }) {
	const store = useSelector((state) => state.router);

	return (
		<ConnectedRouter history={history} context={context}>
			{/* Picker Provider */}
			<MuiPickersUtilsProvider
				utils={DateFnsUtils}
				locale={esLocale}>
				{/*ROOT*/}
				<HeaderComponent />
				{store.location.pathname === '/' ? (
					<Image
						width="100%"
						height="100%"
						src={ImageMain}
					/>
				) : (
					<></>
				)}
				<ResponseModalComponent />
				<React.Suspense fallback={<ChargingLazy />}>
					<Container className="mt-4">
						<Switch>
							<Route
								exact
								path={'/'}
								component={Main}
							/>

							<SessionComponent
								exact
								path={'/home'}
								component={HomeComponent}
							/>

							<SessionComponent
								exact
								path={'/perfil'}
								component={ProfileComponent}
							/>
							<SessionComponent
								exact
								path={'/envios'}
								component={ShippingComponent}
							/>

							<Route exact path={'*'}>
								<Row className="justify-content-center">
									<Col
										md="12"
										className="text-danger text-center mt-5">
										<h1>Esta página no existe</h1>
									</Col>
								</Row>
							</Route>
						</Switch>
					</Container>
				</React.Suspense>
			</MuiPickersUtilsProvider>
		</ConnectedRouter>
	);
}

export default App;
