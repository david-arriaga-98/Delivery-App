import { put, call, takeLatest } from 'redux-saga/effects';
import { orderConstants } from '../../reducers/Ducks/order.duck';

import { executeServerPetition } from '../../../utils/serverPetitions';

function* getOrders({ payload }) {
	try {
		const result = yield call(
			executeServerPetition,
			'POST',
			'/Entregas/Listar',
			payload
		);
		yield put({
			type: orderConstants.SUCCESS_GET_ORDERS,
			payload: result
		});
	} catch (error) {
		yield put({
			type: orderConstants.ERROR_GET_ORDERS
		});
	}
}

export default function* order() {
	yield takeLatest(orderConstants.START_GET_ORDERS, getOrders);
}
