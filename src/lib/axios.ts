import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('AUTH_TOKEN');
    const language = localStorage.getItem('language');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (language) {
        config.headers['Accept-Language'] = language;
    }

    return config;
})

export default api