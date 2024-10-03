import {axiosInstance} from "../utils/AxiousService";

export function getAllRoles() {
    return axiosInstance.get("/role/getAllRole" ).then((response)=>response.data);
}
export function saveRole(role) {
    return axiosInstance.post("/role/addRole",role ).then((response)=>response.data);
}