import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true,
    timeout: 5000
});

// Request interceptor for adding auth tokens or other headers
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor with enhanced error handling
api.interceptors.response.use(
    response => response,
    error => {
        const errorResponse = {
            message: 'An error occurred',
            status: error.response?.status,
            data: error.response?.data
        };

        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        console.log('API Error:', errorResponse);
        return Promise.reject(error);
    }
);

export default api;
