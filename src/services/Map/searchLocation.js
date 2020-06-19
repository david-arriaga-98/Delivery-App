import axios from 'axios';
import { Api } from '../../constants/Common';

export const searchByName = async (name) => {
	try {
		const url = `${Api.GEOCODING_URL}address=${name}&components=country:GT&key=${Api.GOOGLE_API_KEY}`;
		const { data } = await axios.get(url);
		return data;
	} catch (e) {
		throw e;
	}
};

export const searchByLocation = async (location) => {
	try {
		const url = `${Api.GEOCODING_URL}latlng=${location.lat},${location.lng}&key=${Api.GOOGLE_API_KEY}`;
		const { data } = await axios.get(url);
		return data;
	} catch (e) {
		throw e;
	}
};
