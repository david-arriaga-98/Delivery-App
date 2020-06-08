import Session from '../../constants/Session';

export const OPEN_CLOSE_LOGIN_MODAL = () => {
	return {
		type: Session.OPEN_CLOSE_LOGIN_MODAL
	};
};

export const OPEN_CLOSE_REGISTER_MODAL = () => {
	return {
		type: Session.OPEN_CLOSE_REGISTER_MODAL
	};
};

// >>> Para hacer llamados al api

// --- Metodos del login

export const LOG_OUT = () => {
	return {
		type: Session.LOG_OUT
	};
};

// Es el metodo que realiza la llamada al api
export const START_LOGIN = (payload) => {
	return {
		type: Session.START_LOGIN,
		payload
	};
};

// Si el login fué correcto entonces guarda las credenciales
export const SUCCESS_LOGIN = (payload) => {
	return {
		type: Session.SUCCESS_LOGIN,
		payload
	};
};

// Retorna los errores y borra la sesión
export const ERROR_LOGIN = (payload) => {
	return {
		type: Session.ERROR_LOGIN,
		payload
	};
};
