import { put, call, takeLatest } from 'redux-saga/effects';
import { dealerConstants } from '../../reducers/Ducks/dealer.duck';

import { executeServerPetition } from '../../../utils/serverPetitions';

function* getDealers({ payload }) {
	try {
		const result = yield call(
			executeServerPetition,
			'POST',
			'/Repartidor/Listado',
			payload
		);
		yield put({
			type: dealerConstants.SUCCESS_GET_DEALER,
			payload: result
		});
	} catch (error) {
		yield put({
			type: dealerConstants.ERROR_GET_DEALER
		});
	}
}

export default function* order() {
	yield takeLatest(dealerConstants.START_GET_DEALER, getDealers);
}
