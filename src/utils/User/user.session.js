import Axios from '../Axios';
import CryptoJS from 'crypto-js';
import { Api } from '../../constants/Common';

export const executeServerPetition = async (method, url, params) => {
	try {
		const { data } = await Axios.request({
			method,
			url,
			data: params
		});

		return data[0];
	} catch (error) {
		throw error;
	}
};

export const encryptData = (data) => {
	localStorage.setItem(
		'NEKOT',
		CryptoJS.AES.encrypt(data.token, Api.DATA_KEY).toString()
	);
	localStorage.setItem(
		'RESUI',
		CryptoJS.AES.encrypt(data.idusuario, Api.DATA_KEY).toString()
	);
	localStorage.setItem(
		'RESU',
		CryptoJS.AES.encrypt(data.usuario, Api.DATA_KEY).toString()
	);
};

export const currentUser = () => {
	const NEKOT = localStorage.getItem('NEKOT');
	const RESUI = localStorage.getItem('RESUI');
	const RESU = localStorage.getItem('RESU');

	const obj = {
		token: null,
		idusuario: null,
		usuario: null
	};

	if (NEKOT === null || RESUI === null || RESU === null) {
		return obj;
	} else {
		const token = decryptData(NEKOT);
		const idusuario = decryptData(RESUI);
		const usuario = decryptData(RESU);

		if (token !== '' && idusuario !== '' && usuario !== '') {
			obj.token = token;
			obj.idusuario = idusuario;
			obj.usuario = usuario;
		}

		return obj;
	}
};

const decryptData = (value) => {
	var bytes = CryptoJS.AES.decrypt(value, Api.DATA_KEY);
	return bytes.toString(CryptoJS.enc.Utf8);
};

export const logOut = () => {
	localStorage.removeItem('NEKOT');
	localStorage.removeItem('RESUI');
	localStorage.removeItem('RESU');
};
