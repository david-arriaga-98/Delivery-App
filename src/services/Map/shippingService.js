import Axios from '../../utils/Axios';

export const QualifyShipping = async (params) => {
	try {
		const { data } = await Axios.post(
			'/Pedido/Calificar',
			params
		);
		return data;
	} catch (error) {
		throw error;
	}
};
