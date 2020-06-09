import React from 'react';
import { Route, Switch } from 'react-router';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { ConnectedRouter } from 'connected-react-router';
// Components
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import HomeComponent from './components/Home';
import SessionComponent from './components/Session';
/* import ShippingComponent from './components/Shipping'; */

import ResponseModalComponent from './components/Responses/Response';

import ImageMain from './assets/img/banner.png';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import esLocale from 'date-fns/locale/es';

const Main = () => {
	return (
		<React.Fragment>
			<Row className="justify-content-center">
				<Col md="12" className="text-center">
					<Image
						width="100%"
						height="100%"
						src={ImageMain}
					/>
				</Col>
			</Row>
		</React.Fragment>
	);
};

function App({ history, context }) {
	return (
		<ConnectedRouter history={history} context={context}>
			{/* Picker Provider */}
			<MuiPickersUtilsProvider
				utils={DateFnsUtils}
				locale={esLocale}>
				{/*ROOT*/}
				<HeaderComponent />
				<ResponseModalComponent />
				<Container className="mt-4">
					<Switch>
						<Route exact path={'/'} component={Main} />

						<SessionComponent
							exact
							path={'/home'}
							component={HomeComponent}
						/>

						{/* <SessionComponent
						exact
						path={'/envios'}
						component={ShippingComponent}
					/> */}

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
				<FooterComponent />
			</MuiPickersUtilsProvider>
		</ConnectedRouter>
	);
}

export default App;
