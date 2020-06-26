import { all } from 'redux-saga/effects';

import sessionSaga from './session.sagas';
import orderSaga from './Orders/order.sagas';
import dealerSaga from './Orders/dealer.sagas';

export default function* rootSagas() {
	yield all([sessionSaga(), orderSaga(), dealerSaga()]);
}
