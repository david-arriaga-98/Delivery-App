import Axios from './Axios';

export const executeServerPetition = async (method, url, params) => {
	try {
		const { data } = await Axios.request({
			method,
			url,
			data: params
		});

		return data;
	} catch (error) {
		throw error;
	}
};
