import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/schedule";

class ScheduleApi {

  selectBoardList(userID: any){
    console.log("selectBoardList", userID);
    return axios.get(USER_API_BASE_URL + '/' + userID);
  }
}

export default new ScheduleApi();