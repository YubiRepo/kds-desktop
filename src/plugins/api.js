import axios from 'axios';
import store from '@/store'

const $axios = axios.create({
    baseURL: 'http://192.168.1.250:8081',
    // headers: {
    //     Authorization: localStorage.getItem('token') != 'null' ? 'Bearer ' + localStorage.getItem('token') : '',
    //     'Content-Type': 'application/json',
    //     "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //     "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    //     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"

    // }
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