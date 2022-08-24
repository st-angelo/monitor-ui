import axios from 'axios';
import { auth_jwtName } from './constants';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem(auth_jwtName);
  if (!token) return config;
  if (!config.headers) config.headers = {};
  config.headers['authorization'] = `Bearer ${token}`;
  return config;
});

export default instance;
