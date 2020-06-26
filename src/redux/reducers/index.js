import { combineReducers } from 'redux';

// Reducers
import map from './map.reducer';
import session from './session.reducer';
import helper from './helper.reducer';

// Ducks
import order from './Ducks/order.duck';
import dealer from './Ducks/order.duck';

import { connectRouter } from 'connected-react-router';

const createRootReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		map,
		session,
		helper,
		order,
		dealer
	});

export default createRootReducer;
