import axios from 'axios';
import { API_URL } from './Constants';

export default class Api {
  fetch(method, url, options) {
    const data = options || {};

    data.url = url;
    data.method = method;
    data.baseURL = API_URL;
    data.headers = data.headers || {};

    return axios(data)
      .then((response) => {
        if (__DEV__ && console && typeof console.groupCollapsed === 'function' && !url.includes('/!url')) {
          console.groupCollapsed(`%c API --> ${url}`, 'color: green');
          console.log('data: ', data);
          console.log('response: ', response);
          console.groupEnd();
        }
        if (response.status < 400) {
          return {
            status: response.status,
            data: response.data,
            headers: response.headers
          };
        }
        return response.data;
      })
      .catch((response) => {
        if (__DEV__ && console && typeof console.groupCollapsed === 'function' && !url.includes('/!url')) {
          console.groupCollapsed(`%c API --> ${url}`, 'color: red');
          console.log('data: ', data);
          console.log('response: ', response.message, response.data);
          console.groupEnd();
        }
        if (response.message === 'Network Error') {
          throw {
            status: null,
            data: {
              code: 'network_error',
              message: response.message
            }
          };
        }
      });
    }
}