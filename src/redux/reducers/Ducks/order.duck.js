// Constants
export const orderConstants = {
	START_GET_ORDERS: 'START_GET_ORDERS',
	SUCCESS_GET_ORDERS: 'SUCCESS_GET_ORDERS',
	ERROR_GET_ORDERS: 'ERROR_GET_ORDERS'
};

// Reducer
const initialState = {
	orders: [],
	isError: false,
	isSuccess: false,
	isCharging: false,
	isCharged: false
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case orderConstants.START_GET_ORDERS:
			return {
				...state,
				isError: false,
				isSuccess: false,
				isCharging: true,
				isCharged: false
			};
		case orderConstants.SUCCESS_GET_ORDERS:
			return {
				...state,
				isError: false,
				isSuccess: true,
				isCharging: false,
				isCharged: true,
				orders: payload
			};
		case orderConstants.ERROR_GET_ORDERS:
			return {
				...state,
				isError: true,
				isSuccess: false,
				isCharging: false,
				isCharged: true
			};
		default:
			return state;
	}
};

// Action Creators
export const START_GET_ORDERS = ({ payload }) => {
	return {
		type: orderConstants.START_GET_ORDERS,
		payload
	};
};
export const SUCCESS_GET_ORDERS = ({ payload }) => {
	return {
		type: orderConstants.SUCCESS_GET_ORDERS,
		payload
	};
};
export const ERROR_GET_ORDERS = () => {
	return {
		type: orderConstants.ERROR_GET_ORDERS
	};
};
