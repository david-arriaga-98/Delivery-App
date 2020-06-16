import './assets/css/styles.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';

import App from './App';
import Store, { history } from './redux/store';

export const store = Store();

ReactDOM.render(
	<Provider store={store} context={ReactReduxContext}>
		<App history={history} context={ReactReduxContext} />
	</Provider>,
	document.getElementById('root')
);
