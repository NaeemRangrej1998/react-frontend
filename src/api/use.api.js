import axios from "axios";
import authHeader from "../utils/authHeader";

const API_BASE_URL_FOR_USER = "http://localhost:8080/user";

export function getAllUsers() {
    return axios.get(`${API_BASE_URL_FOR_USER}/getUser`, { headers: authHeader() }).then((response)=>response.data);
}

export function saveUser(user) {
    return axios.post(`${API_BASE_URL_FOR_USER}/addUser`,user, { headers: authHeader() }).then((response)=>response.data);
}

export function updateUserById(user,id) {
    return axios.put(`${API_BASE_URL_FOR_USER}/updateUser/${id}`,user, { headers: authHeader() }).then((response)=>response.data);
}
export function updateUserStatusById(id) {
    return axios.get(`${API_BASE_URL_FOR_USER}/updateUser/${id}`, { headers: authHeader() }).then((response)=>response.data);
}

export function getUserById(userId) {
    console.log("getById",userId);
    return axios.get(`${API_BASE_URL_FOR_USER}/getUser/${userId}`, { headers: authHeader() }).then((response)=>response.data);
}