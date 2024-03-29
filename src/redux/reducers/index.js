import { combineReducers } from 'redux';

// Reducers
import map from './map.reducer';
import session from './session.reducer';
import helper from './helper.reducer';

import { connectRouter } from 'connected-react-router';

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		map,
		session,
		helper
	});

export default createRootReducer;
