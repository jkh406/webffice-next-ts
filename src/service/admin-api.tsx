import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/admin";

export const selectUserApi = () => {
    return axios.post(USER_API_BASE_URL + "/SelectUser", null, { 
        withCredentials: true,      
    });
}
