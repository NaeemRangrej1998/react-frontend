import axios from "axios";
import authHeader from "../utils/authHeader";
import {axiosInstance} from "../utils/AxiousService";
const API_BASE_URL_FOR_USER = "http://localhost:8080/user";

// export function getAllUsers() {
//     return axios.get(`${API_BASE_URL_FOR_USER}/getUser`, { headers: authHeader() }).then((response)=>response.data);
// }

export function getAllUsers() {
    return axiosInstance.get("/user/getUser" ).then((response)=>response.data);
}

export function saveUser(user) {
    return axiosInstance.post(`user/addUser`,user, ).then((response)=>response.data);
}

export function updateUserById(user,id) {
    return axiosInstance.put(`user/updateUser/${id}`,user, ).then((response)=>response.data);
}
export function updateUserStatusById(id) {
    return axiosInstance.get(`user/updateUser/${id}`, ).then((response)=>response.data);
}

export function getUserById(userId) {
    console.log("getById",userId);
    return axiosInstance.get(`user/getUser/${userId}`, ).then((response)=>response.data);
}
export function deleteUserById(userId) {
    console.log("getById",userId);
    return axiosInstance.delete(`user/deleteUser/${userId}`, ).then((response)=>response.data);
}