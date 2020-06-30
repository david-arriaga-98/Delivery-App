import { call, put, takeLatest } from 'redux-saga/effects';

import { OrderConstants } from '../reducers/ducks/order.duck';

function* getOrders({ payload }) {
	try {
	} catch (error) {}
}

export default function* order() {
	yield takeLatest(OrderConstants.GET_ORDERS_START, getOrders);
}
