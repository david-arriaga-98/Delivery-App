import Axios from '../Axios';
import CryptoJS from 'crypto-js';
import { Api } from '../../constants/Common';
import { addDays, getUnixTime } from 'date-fns';
import Validator from 'validator';

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
	localStorage.setItem(
		'ZAF',
		CryptoJS.AES.encrypt(data.interfaz, Api.DATA_KEY).toString()
	);
	localStorage.setItem('TIME', getUnixTime(addDays(new Date(), 1)));
};

export const currentUser = () => {
	const NEKOT = localStorage.getItem('NEKOT');
	const RESUI = localStorage.getItem('RESUI');
	const RESU = localStorage.getItem('RESU');
	const TIME = localStorage.getItem('TIME');
	const ZAF = localStorage.getItem('ZAF');
	const CURRENT = getUnixTime(new Date());

	const obj = {
		token: null,
		idusuario: null,
		usuario: null,
		interfaz: null
	};

	if (
		NEKOT === null ||
		RESUI === null ||
		RESU === null ||
		TIME === null ||
		ZAF === null
	) {
		return obj;
	} else {
		const token = decryptData(NEKOT);
		const idusuario = decryptData(RESUI);
		const usuario = decryptData(RESU);
		const interfaz = decryptData(ZAF);

		// Validamos que el tiempo sea correcto
		if (CURRENT < TIME) {
			if (
				token !== '' &&
				idusuario !== '' &&
				usuario !== '' &&
				interfaz !== ''
			) {
				// Validamos que los datos sean correctos

				if (
					Validator.isJWT(token) &&
					Validator.isUUID(idusuario)
				) {
					obj.token = token;
					obj.idusuario = idusuario;
					obj.usuario = usuario;
					obj.interfaz = interfaz;
				}
			}
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
	localStorage.removeItem('TIME');
	localStorage.removeItem('ZAF');
};
