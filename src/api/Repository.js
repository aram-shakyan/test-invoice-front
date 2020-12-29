import Vue from 'vue';
import axios from "axios";
import store from "./../store"
const API_URL = process.env.VUE_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL
})

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        Vue.prototype.$snotify.error("Unauthenticated.", '');
        store.dispatch("LOGOUT");
    }

    if (403 === error.response.status) {
        Vue.prototype.$snotify.error("Forbidden.", '');
    }

    if (500 === error.response.status) {
        Vue.prototype.$snotify.error("Server Error, Please try again later..", '');
    }

    return Promise.reject(error);
});

axiosInstance.interceptors.request.use((config) => {
    const AUTH_TOKEN = localStorage.getItem('auth_token');

    if(AUTH_TOKEN) {
        config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;