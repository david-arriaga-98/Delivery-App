import { put, call, takeLatest } from 'redux-saga/effects';

import sessionConstants from '../../constants/Session';

import { push } from 'connected-react-router';

import {
	executeServerPetition,
	encryptData
} from '../../utils/User/user.session';

// La payload nos devuelve el usuario y la contraseña
function* login({ payload }) {
	try {
		const results = yield call(
			executeServerPetition,
			'post',
			'login',
			payload
		);
		// Asignamos los valores al localStorage para su persistencia

		const sendPayload = {
			token: results.token,
			idusuario: results.idusuario,
			usuario: results.usuario
		};
		encryptData(sendPayload);
		yield put({
			type: sessionConstants.SUCCESS_LOGIN,
			payload: sendPayload
		});
		yield put(push('/home'));
	} catch (error) {
		if (error.response !== undefined) {
			if (
				error.response.data.mensaje ===
				'usuario y/contraseña incorrectos'
			) {
				yield put({
					type: sessionConstants.ERROR_LOGIN,
					payload: 'Usuario y/o Contraseña incorrectos'
				});
			} else {
				yield put({
					type: sessionConstants.ERROR_LOGIN,
					payload: 'Ha ocurrido un error'
				});
			}
		} else {
			yield put({
				type: sessionConstants.ERROR_LOGIN,
				payload: 'Ha ocurrido un error en el servidor'
			});
		}
	}
}

export default function* session() {
	yield takeLatest(sessionConstants.START_LOGIN, login);
}
