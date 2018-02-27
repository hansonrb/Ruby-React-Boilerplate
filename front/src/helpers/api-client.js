
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
export default () => {
  const session = localStorage.getItem('tmz_session');
  if (session) {
    const headers = JSON.parse(session).headers;
    axios.defaults.headers = {
      'access-token': headers['access-token'],
      client: headers.client,
      expiry: headers.expiry,
      uid: headers.uid,
    };
  }

  return axios;
};
