import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_API_URL || 'http://localhost:3000';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      return toast.error('something went wrong!');
    }
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  source: axios.CancelToken.source(),
};
