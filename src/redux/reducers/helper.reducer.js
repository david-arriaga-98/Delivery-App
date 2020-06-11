import HelperConstants from '../../constants/Helper';

const initialState = {
	responseModal: {
		showModal: false,
		modalType: 'SUCCESS',
		message: ''
	},
	searchSends: {
		filterModal: false
	},
	orderInformationModal: false,
	orderInfo: {
		direcciondes: '',
		direccionorg: '',
		distancia: '',
		esprogramado: false,
		estado: '',
		fechaasignado: '',
		fechadestino: '',
		fechaestimada: '',
		fechaorigen: '',
		fechaprogramada: '',
		horaasignado: '',
		horadestino: '',
		horaestimada: '',
		horaorigen: '',
		horaprogramada: '',
		idestado: 0,
		idorden: '',
		idpedido: '',
		idusuario: '',
		idusuariorepartidor: '',
		mensaje: '',
		nombreestado: '',
		repartidor: '',
		tarifa: '',
		tiempoespera: '',
		tiemporuta: ''
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

		case HelperConstants.ORDER_INFORMATION_MODAL:
			return Object.assign({}, state, {
				orderInformationModal: !state.orderInformationModal,
				orderInfo: !action.payload.state
					? { ...initialState.orderInfo }
					: {
							direcciondes:
								action.payload.info.direcciondes,
							direccionorg:
								action.payload.info.direccionorg,
							distancia: action.payload.info.distancia,
							esprogramado:
								action.payload.info.esprogramado,
							estado: action.payload.info.estado,
							fechaasignado:
								action.payload.info.fechaasignado,
							fechadestino:
								action.payload.info.fechadestino,
							fechaestimada:
								action.payload.info.fechaestimada,
							fechaorigen:
								action.payload.info.fechaorigen,
							fechaprogramada:
								action.payload.info.fechaprogramada,
							horaasignado:
								action.payload.info.horaasignado,
							horadestino:
								action.payload.info.horadestino,
							horaestimada:
								action.payload.info.horaestimada,
							horaorigen:
								action.payload.info.horaorigen,
							horaprogramada:
								action.payload.info.horaprogramada,
							idestado: action.payload.info.idestado,
							idorden: action.payload.info.idorden,
							idpedido: action.payload.info.idpedido,
							idusuario: action.payload.info.idusuario,
							idusuariorepartidor:
								action.payload.info
									.idusuariorepartidor,
							mensaje: action.payload.info.mensaje,
							nombreestado:
								action.payload.info.nombreestado,
							repartidor:
								action.payload.info.repartidor,
							tarifa: action.payload.info.tarifa,
							tiempoespera:
								action.payload.info.tiempoespera,
							tiemporuta: action.payload.info.tiemporuta
					  }
			});

		default:
			return state;
	}
};
