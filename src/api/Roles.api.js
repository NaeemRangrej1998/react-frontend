import {axiosInstance} from "../utils/AxiousService";

export function getAllRoles() {
    return axiosInstance.get(`/role/getAllRole`).then((response)=>response.data);
}
export function saveRole(role) {
    return axiosInstance.post(`/role/addRole`,role ).then((response)=>response.data);
}

export function updateRoleById(id,role){
    return axiosInstance.put(`/role/updateRole/${id}`,role).then((response)=>response.data);
}

export function deleteRoleById(id){
    return axiosInstance.delete(`/role/deleteRole/${id}`).then((response)=>response.data);
}

export function updateRoleStatusById(id,activeStatus){
    return axiosInstance.put(`/role/updateStatus/${activeStatus}/${id}`).then((response)=>response.data);
}

export function getRoleById(id){
    console.log("role",id);
    return axiosInstance.get(`/role/getRoleById/${id}`).then((response)=>response.data);
}