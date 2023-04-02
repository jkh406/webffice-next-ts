import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1";

class AuthApi {

    checkId(userID: string){
        return axios.get(USER_API_BASE_URL + '/get?userId=' + userID);
    }
    
    issueToken(){
        return axios.post(USER_API_BASE_URL + "/token/getAccessToken", { 
            withCredentials: true,
        });
    }
    
    loginUser(_email : any, _password : any){
        return axios.post(USER_API_BASE_URL + "/login", {
            userId : _email, userPw : _password
        }, { 
            withCredentials: true,
        });
    }
    
    logOutUser(){
        return axios.post(USER_API_BASE_URL + "/logout");
    }

    deleteUser(userID: any){
        return axios.delete(USER_API_BASE_URL + '/' + userID);
    }
      
    addUser(_email : any, _password : any){
        return axios.post(USER_API_BASE_URL + "/join", {
            userId : _email, userPw : _password
        });
    }
    
    editUser(user: any){
        return axios.put(USER_API_BASE_URL + '/' + user.id, user)
    }
    
}

export default new AuthApi();