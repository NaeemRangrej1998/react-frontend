import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,

})

axiosInstance.interceptors.request.use(
    config=>{
        const accessToken=localStorage.getItem('accessToken')
        if (accessToken){
            config.headers.Authorization=`Bearer${accessToken}`
        }
        return config
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            // Handle token expiration here (refresh token or redirect to login)
            console.log('Unauthorized, logging out...');
            localStorage.removeItem('accessToken'); // Clear the token
            window.location.href = '/login'; // Redirect to login
        }
        return Promise.reject(error);
    }
)