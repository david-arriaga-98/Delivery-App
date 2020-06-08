import { all } from 'redux-saga/effects';

import sessionSaga from './session.sagas';

export default function* rootSagas() {
	yield all([sessionSaga()]);
}
