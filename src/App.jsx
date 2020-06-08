import React from 'react';
import { Route, Switch } from 'react-router';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { ConnectedRouter } from 'connected-react-router';
// Components
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import HomeComponent from './components/Home';
import SessionComponent from './components/Session';
<<<<<<< HEAD
/* import ShippingComponent from './components/Shipping'; */
=======
import ShippingComponent from './components/Shipping';
>>>>>>> 9ee00eccc37d5276a7d6de49dd1eeb1d8300269b

import ResponseModalComponent from './components/Responses/Response';

import ImageMain from './assets/img/banner.png';

const Main = () => {
	return (
		<React.Fragment>
			<Row className="justify-content-center">
				<Col md="12" className="text-center">
					<Image width="100%" height="100%" src={ImageMain} />
				</Col>
			</Row>
		</React.Fragment>
	);
};

function App({ history, context }) {
	return (
		<ConnectedRouter history={history} context={context}>
			<HeaderComponent />
			<ResponseModalComponent />
			<Container className="mt-4">
				<Switch>
					<Route exact path={'/'} component={Main} />

					<SessionComponent exact path={'/home'} component={HomeComponent} />

<<<<<<< HEAD
					{/* 	<SessionComponent
						exact
						path={'/envios'}
						component={ShippingComponent}
					/> */}
=======
					<SessionComponent
						exact
						path={'/envios'}
						component={ShippingComponent}
					/>
>>>>>>> 9ee00eccc37d5276a7d6de49dd1eeb1d8300269b

					<Route exact path={'*'}>
						<Row className="justify-content-center">
							<Col md="12" className="text-danger text-center mt-5">
								<h1>Esta página no existe</h1>
							</Col>
						</Row>
					</Route>
				</Switch>
			</Container>
			<FooterComponent />
		</ConnectedRouter>
	);
}

export default App;
