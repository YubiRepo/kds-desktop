import axios from 'axios';
import store from '@/store'

const $axios = axios.create({
<<<<<<< HEAD
    // baseURL: process.env.VUE_APP_API_URL,
    // headers: {
    //     Authorization: localStorage.getItem('token') != 'null' ? 'Bearer ' + localStorage.getItem('token') : '',
    //     'Content-Type': 'application/json',
    //     "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    //     "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    //     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"

    // }
=======
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        Authorization: localStorage.getItem('token') != 'null' ? 'Bearer ' + localStorage.getItem('token') : '',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"

    }
>>>>>>> 5e29ebae3946e5d4f3bbbf6aef4ed944dec725c4
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