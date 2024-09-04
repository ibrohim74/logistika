import axios from 'axios';

// Axios instansiyasini yaratamiz
const $API = axios.create({
    baseURL: 'http://213.199.39.164:8015/', // O'zingizning API bazaviy URL ni kiriting
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor orqali so'rovlar uchun access tokenni avtomatik qo'shamiz
$API.interceptors.request.use(
    (config) => {
        // localStorage'dan access tokenni olamiz
        const token = localStorage.getItem('user');
        if (token) {
            // So'rov sarlavhasiga access token qo'shamiz
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        // Xatolik yuz bersa, uni qaytaramiz
        return Promise.reject(error);
    }
);

export default $API;
