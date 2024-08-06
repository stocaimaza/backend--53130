import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://adoptemos-pichichos-production.up.railway.app/',
  withCredentials: true,
});

export default axiosInstance;
