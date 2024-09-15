import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

// Axios request interceptor to include token in requests
api.interceptors.request.use(
    (config) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            config.headers.Authorization = `Bearer ${token.split('=')[1]}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Axios response interceptor for handling unauthorized requests (401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default api;
