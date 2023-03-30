import axios from "axios";
import qs from "qs";

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
        });
    }

    deleteUser(userID: any){
        return axios.delete(USER_API_BASE_URL + '/' + userID);
    }
      
    addUser(user: any){
        return axios.post(USER_API_BASE_URL, user);
    }
    
    editUser(user: any){
        return axios.put(USER_API_BASE_URL + '/' + user.id, user)
    }
    
}

export default new AuthApi();