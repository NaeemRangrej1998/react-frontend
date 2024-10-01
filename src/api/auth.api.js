import axios from "axios";

const API_BASE_URL = "http://localhost:8080/auth";

export function login(credentials) {
    return axios.post(`${API_BASE_URL}/singin`, credentials);
}
