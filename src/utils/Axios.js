import axios from 'axios';

import { Api } from '../constants/Common';

/* import { store } from '../index'; */

const Axios = axios.create({
	baseURL: Api.SERVER_API
});

/* Axios.interceptors.request.use((req) => {
	const { session } = store.getState();

		req.headers.post['token'] = session.data.token;
	
	return req;
}); */

export default Axios;
