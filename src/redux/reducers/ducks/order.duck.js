// Constants
export const OrderConstants = {
	GET_ORDERS_START: 'GET_ORDERS_START',
	GET_ORDERS_SUCCESS: 'GET_ORDERS_SUCCESS',
	GET_ORDERS_ERROR: 'GET_ORDERS_ERROR'
};

// Reducers
const initialState = {
	orders: [],
	getOrders: {
		isSuccess: false,
		isError: false,
		isLoading: false
	}
};
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case OrderConstants.GET_ORDERS_START:
			return {
				...state,
				getOrders: {
					isLoading: true
				}
			};
		case OrderConstants.GET_ORDERS_SUCCESS:
			return {
				...state,
				orders: payload,
				getOrders: {
					isLoading: false,
					isSuccess: true,
					isError: false
				}
			};
		case OrderConstants.GET_ORDERS_ERROR:
			return {
				...state,
				getOrders: {
					isLoading: false,
					isSuccess: false,
					isError: true
				}
			};
		default:
			return state;
	}
};

// Action Reducers
export const GET_ORDERS_START = (payload) => {
	return {
		type: OrderConstants.GET_ORDERS_START,
		payload
	};
};
export const GET_ORDERS_SUCCESS = (payload) => {
	return {
		type: OrderConstants.GET_ORDERS_SUCCESS,
		payload
	};
};
export const GET_ORDERS_ERROR = () => {
	return { type: OrderConstants.GET_ORDERS_ERROR };
};
