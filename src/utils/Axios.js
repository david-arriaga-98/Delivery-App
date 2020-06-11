import axios from 'axios';

import { Api } from '../constants/Common';

import { store } from '../index';

import SessionConstants from '../constants/Session';

const Axios = axios.create({
	baseURL: Api.SERVER_API
});

Axios.interceptors.request.use((req) => {
	const { session } = store.getState();

	req.headers['x-access-token'] = session.data.token;

	return req;
});

Axios.interceptors.response.use((res) => {
	if (res.status === 401) {
		store.dispatch({
			type: SessionConstants.LOG_OUT
		});
	}

	return res;
});

export default Axios;
