import Session from '../../constants/Session';
import { currentUser, logOut } from '../../utils/User/user.session';

const user = currentUser();
const appState =
	user.idusuario === null ||
	user.token === null ||
	user.usuario === null
		? false
		: true;

const initialState = {
	data: {
		...user
	},
	isLoggedIn: appState,
	isLoading: false,
	error: '',
	loginModalState: false,
	registerModalState: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		// Para abrir y cerrar el modal del login
		case Session.OPEN_CLOSE_LOGIN_MODAL:
			return Object.assign({}, state, {
				loginModalState: !state.loginModalState,
				error: ''
			});
		// Para abrir y cerrar el modal del registro
		case Session.OPEN_CLOSE_REGISTER_MODAL:
			return Object.assign({}, state, {
				registerModalState: !state.registerModalState
			});

		case Session.START_LOGIN:
			return Object.assign({}, state, {
				isLoading: true,
				isLoggedIn: false,
				error: ''
			});

		case Session.SUCCESS_LOGIN:
			return Object.assign({}, state, {
				isLoading: false,
				isLoggedIn: true,
				data: action.payload,
				error: '',
				loginModalState: false
			});

		case Session.ERROR_LOGIN:
			return Object.assign({}, state, {
				isLoading: false,
				isLoggedIn: false,
				data: {
					token: null,
					idusuario: null,
					usuario: null
				},
				error: action.payload
			});

		case Session.LOG_OUT:
			logOut();
			return Object.assign({}, state, {
				isLoading: false,
				isLoggedIn: false,
				data: {
					token: null,
					idusuario: null,
					usuario: null
				}
			});
		default:
			return state;
	}
};
