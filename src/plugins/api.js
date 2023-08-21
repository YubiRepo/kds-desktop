import axios from 'axios';
import store from '@/store'

const $axios = axios.create({
    baseURL: 'http://192.168.1.250:8081',
});

$axios.interceptors.request.use(
    function (config) {
        const token = store.state.token
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default $axios;