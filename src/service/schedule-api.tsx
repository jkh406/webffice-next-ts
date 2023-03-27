import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/schedule";


class ScheduleApi {
  

  selectScheduleList(userID: any){
    return axios.get(USER_API_BASE_URL + '/' + userID);
  }

  insertScheduleList(schedule: any){
    return axios.post(USER_API_BASE_URL, schedule);
  }

  deleteScheduleList(ScheduleId: any){
    return axios.delete(USER_API_BASE_URL + '/' + ScheduleId);
  }
}

export default new ScheduleApi();