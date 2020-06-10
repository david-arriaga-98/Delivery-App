import { createStore, applyMiddleware, compose } from 'redux';
import { logger } from 'redux-logger';
import reduxSaga from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './reducers/index';
import rootSaga from './sagas';

const sagaMiddleware = reduxSaga();
export const history = createBrowserHistory();

export default (preloadedState) => {
	return {
		...createStore(
			rootReducer(history),
			preloadedState,
			compose(
				applyMiddleware(
					routerMiddleware(history),
					logger,
					sagaMiddleware
				)
			)
		),
		runSaga: sagaMiddleware.run(rootSaga)
	};
};
