import axios from "axios";
import keycloak from "../keycloak/keycloak";

const WHITE_LIST = ["v1/users/register"];
export const ENDPOINTS = {
    LOGIN: "/v1/users/login",
    USER: {REGISTER: "/v1/users/register"},
    GOODS: {
        GET_OVERVIEW: (page, size)=>`/v1/goods?page=${page}&size=${size}`,
        ADD: "/v1/goods",
        REMOVE: (id)=>`/v1/goods/${id}`,
        UPDATE: (id)=>`/v1/goods/${id}`,
    }

};

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 10000,
    withCredentials: true,
});

apiClient.interceptors.request.use(

    (config) => {
        if (WHITE_LIST.includes(config.url)) {
            return config;
        }
        if (keycloak.authenticated) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
        return config;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
