import axios from "axios";
export default {

    install(Vue) {
        let axiosCall = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
        });

        Vue.prototype.$api = {
            url: process.env.VUE_APP_API_HOST,
            storageURL: process.env.VUE_APP_STORAGE_URL,
            post: async function (path) {
                return await axiosCall.post(path);
            },
        };
        Vue.prototype.$axiosCall = axiosCall;
    }
} 