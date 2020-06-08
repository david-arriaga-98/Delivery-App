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
