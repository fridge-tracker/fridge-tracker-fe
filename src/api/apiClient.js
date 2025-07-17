import axios from "axios";
import keycloak from "../components/keycloak/keycloak";

const WHITE_LIST = ["v1/users/register"];
export const ENDPOINTS = {
    LOGIN: "/v1/users/login",
    USER: {REGISTER: "/v1/users/register"},
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
