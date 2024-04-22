import axios, { type AxiosInstance } from 'axios';
import { message } from 'antd';
import { expiresCookies } from 'types/enums';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const onResponseSuccess = (response: any): any => {
    return response;
};
const onResponseFail = (error: any): any => {
    const status = error.status || error.response.status;
    if (status === 403) {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem("reportingToken");
        localStorage.removeItem('isAdmin');
        document.cookie = `isAdmin=; expires=${expiresCookies}; path=/; domain=solulever.com;`;
        document.cookie = `authToken=; expires=${expiresCookies}; path=/; domain=solulever.com;`;
        document.cookie = `session=; expires=${expiresCookies}; path=/; domain=solulever.com;`;
        window.location.href = `/login`;
    }
    if (status === 401) {
        message.error('An error occured');
    }
    if (status === 408) {
        window.location.href = `/login`;
    }
    return Promise.reject(error);
};
const Api: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
Api.interceptors.request.use(
    async (config) => {
        const token =
        cookies.get('authToken') ??
            sessionStorage.getItem('authToken');
        // Check if token exists
        if (token) {
            // Add the token to the request headers
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    async (error) => {
        // Handle request error
        throw error;
    }
);

Api.interceptors.response.use(
    (response: any) => onResponseSuccess(response),
    (error: any) => onResponseFail(error)
);

export default Api;
