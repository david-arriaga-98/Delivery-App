import Axios from '../../utils/Axios';

export const getOrders = async () => {
	try {
		const { data } = await Axios.post('/Entregas/Listar', {
			interfaz: 'A',
			limitederegistros: 0
		});
		return data;
	} catch (error) {
		throw error;
	}
};

export const getDelivery = async (idusuario) => {
	try {
		const { data } = await Axios.post('/Repartidor/Listado', {
			idusuario
		});
		return data;
	} catch (error) {
		throw error;
	}
};

export const setDelivery = async (
	idpedido,
	idusuario,
	idusuariorepartidor
) => {
	try {
		const { data } = await Axios.post(
			'/Pedido/ActualizarPiloto',
			{
				idusuario,
				idpedido,
				idusuariorepartidor
			}
		);
		return data;
	} catch (error) {
		throw error;
	}
};
