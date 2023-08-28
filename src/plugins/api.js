import axios from 'axios';
import store from '@/store'

const $axios = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
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