import axios from 'axios';
import { getCookie } from './cookies';
import { env } from './function';

axios.defaults.baseURL = env('SERVER');
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const accessToken = getCookie('accessToken');
    const orgToken = getCookie('orgToken');
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers['org-token'] = orgToken;
    return config;
});
