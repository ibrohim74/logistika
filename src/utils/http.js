import axios from 'axios';


const $API = axios.create({
    baseURL: 'https://new.top3.uz/', headers: {
        'Content-Type': 'application/json',
    },
});


$API.interceptors.request.use((config) => {
    const token = localStorage.getItem('user');
    if (token) {

        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
}, (error) => {

    return Promise.reject(error);
});

export default $API;
