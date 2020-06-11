import HelperConstants from '../../constants/Helper';

export const SHOW_ERROR_MODAL = (payload) => {
	return {
		type: HelperConstants.SHOW_ERROR_MODAL,
		payload
	};
};

export const SHOW_SUCCESS_MODAL = (payload) => {
	return {
		type: HelperConstants.SHOW_SUCCESS_MODAL,
		payload
	};
};

export const CLOSE_MODAL = () => {
	return {
		type: HelperConstants.CLOSE_MODAL
	};
};

export const APPLY_FILTERS_MODAL = () => {
	return {
		type: HelperConstants.APPLY_FILTERS_MODAL
	};
};

export const ORDER_INFORMATION_MODAL = (payload) => {
	return {
		type: HelperConstants.ORDER_INFORMATION_MODAL,
		payload
	};
};
