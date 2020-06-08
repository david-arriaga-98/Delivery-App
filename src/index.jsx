import './assets/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';

import App from './App';
import Store, { history } from './redux/store';

// La exportamos para usar esta instancia de la store en cualquier parte
export const store = Store();

ReactDOM.render(
	<Provider store={store} context={ReactReduxContext}>
		<App history={history} context={ReactReduxContext} />
	</Provider>,
	document.getElementById('root')
);
