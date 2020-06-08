import MapConstants from '../../constants/Map';

const initialState = {
	origin: {
		position: {
			lat: undefined,
			lng: undefined
		},
		direcction: '',
		indications: ''
	},
	destiny: {
		position: {
			lat: undefined,
			lng: undefined
		},
		direcction: '',
		indications: ''
	},
	lookButton: false,
	originModalState: false,
	destinyModalState: false,
	confirmModalState: false,
	chargingConfirm: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case MapConstants.REGISTER_ORIGIN_DIRECTION:
			return Object.assign({}, state, {
				origin: {
					...action.payload
				}
			});
		case MapConstants.OPEN_CLOSE_ORIGIN_MODAL:
			return Object.assign({}, state, {
				originModalState: !state.originModalState
			});

		case MapConstants.REGISTER_DESTINY_DIRECTION:
			return Object.assign({}, state, {
				destiny: {
					...action.payload
				}
			});
		case MapConstants.OPEN_CLOSE_DESTINY_MODAL:
			return Object.assign({}, state, {
				destinyModalState: !state.destinyModalState
			});

		case MapConstants.OPEN_CLOSE_CONFIRM_MODAL:
			return Object.assign({}, state, {
				confirmModalState: !state.confirmModalState
			});

		case MapConstants.CHARGING_CONFIRM:
			return Object.assign({}, state, {
				chargingConfirm: !state.chargingConfirm
			});

		case MapConstants.RESTART_MAP_STATE:
			return Object.assign({}, state, {
				...initialState
			});
		default:
			return state;
	}
};
