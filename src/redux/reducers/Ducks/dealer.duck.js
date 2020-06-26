// Constants
export const dealerConstants = {
	START_GET_DEALER: 'START_GET_DEALER',
	SUCCESS_GET_DEALER: 'SUCCESS_GET_DEALER',
	ERROR_GET_DEALER: 'ERROR_GET_DEALER'
};

// Reducer
const initialState = {
	dealers: [],
	isError: false,
	isSuccess: false,
	isCharging: false,
	isCharged: false
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case dealerConstants.START_GET_DEALER:
			return {
				...state,
				isError: false,
				isSuccess: false,
				isCharging: true,
				isCharged: false
			};
		case dealerConstants.SUCCESS_GET_DEALER:
			return {
				...state,
				isError: false,
				isSuccess: true,
				isCharging: false,
				isCharged: true,
				dealers: payload
			};
		case dealerConstants.ERROR_GET_DEALER:
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
export const START_GET_DEALER = ({ payload }) => {
	return {
		type: dealerConstants.START_GET_DEALER,
		payload
	};
};
export const SUCCESS_GET_DEALER = ({ payload }) => {
	return {
		type: dealerConstants.SUCCESS_GET_DEALER,
		payload
	};
};
export const ERROR_GET_DEALER = () => {
	return {
		type: dealerConstants.ERROR_GET_DEALER
	};
};
