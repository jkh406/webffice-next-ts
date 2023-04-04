import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1";

export const issueTokenApi = () => {
    return axios.post(USER_API_BASE_URL + "/token/getAccessToken",null, { 
        withCredentials: true,
    });
}

export const loginUserApi = (_email : any, _password : any) => {
    return axios.post(USER_API_BASE_URL + "/login", {
        userId : _email, userPw : _password
    }, { 
        withCredentials: true,
    });
}

export const logOutUserApi = () => {
    return axios.post(USER_API_BASE_URL + "/logout", null, { 
        withCredentials: true,
    });
}

export const deleteUserApi = (userID: any) =>{
    return axios.delete(USER_API_BASE_URL + '/' + userID);
}
  
export const addUserApi = (_email : any, _password : any) =>{
    return axios.post(USER_API_BASE_URL + "/join", {
        userId : _email, userPw : _password
    });
}

export const editUserApi = (user: any) =>{
    return axios.put(USER_API_BASE_URL + '/' + user.id, user)
}
