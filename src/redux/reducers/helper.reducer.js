import HelperConstants from '../../constants/Helper';

const initialState = {
	responseModal: {
		showModal: false,
		modalType: 'SUCCESS',
		message: ''
	},
	searchSends: {
		filterModal: false
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case HelperConstants.SHOW_SUCCESS_MODAL:
			return Object.assign({}, state, {
				responseModal: {
					showModal: true,
					modalType: 'SUCCESS',
					message:
						action.payload === undefined
							? state.responseModal.message
							: action.payload
				}
			});
		case HelperConstants.SHOW_ERROR_MODAL:
			return Object.assign({}, state, {
				responseModal: {
					showModal: true,
					modalType: 'ERROR',
					message:
						action.payload === undefined
							? 'Ha ocurrido un error'
							: action.payload
				}
			});

		case HelperConstants.CLOSE_MODAL:
			return Object.assign({}, state, {
				responseModal: {
					...initialState.responseModal
				}
			});

		case HelperConstants.APPLY_FILTERS_MODAL:
			return Object.assign({}, state, {
				searchSends: {
					filterModal: !state.searchSends.filterModal
				}
			});
		default:
			return state;
	}
};
