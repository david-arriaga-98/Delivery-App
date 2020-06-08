import MapConstants from '../../constants/Map';

// La payload va a ser tanto las coordenadas, la direccion e indicaciones
export const REGISTER_ORIGIN_DIRECTION = (payload) => {
	return {
		type: MapConstants.REGISTER_ORIGIN_DIRECTION,
		payload
	};
};

// La payload va a ser tanto las coordenadas, la direccion e indicaciones
export const REGISTER_DESTINY_DIRECTION = (payload) => {
	return {
		type: MapConstants.REGISTER_DESTINY_DIRECTION,
		payload
	};
};

export const OPEN_CLOSE_DESTINY_MODAL = () => {
	return {
		type: MapConstants.OPEN_CLOSE_DESTINY_MODAL
	};
};

export const OPEN_CLOSE_ORIGIN_MODAL = () => {
	return {
		type: MapConstants.OPEN_CLOSE_ORIGIN_MODAL
	};
};

export const OPEN_CLOSE_CONFIRM_MODAL = () => {
	return {
		type: MapConstants.OPEN_CLOSE_CONFIRM_MODAL
	};
};

export const CHARGING_CONFIRM = () => {
	return {
		type: MapConstants.CHARGING_CONFIRM
	};
};
