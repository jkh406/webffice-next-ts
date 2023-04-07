import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/schedule";


export const selectScheduleList = (schedule_ID: any, token : any) => 
{
  return axios.get(USER_API_BASE_URL + '/' + schedule_ID, {
    withCredentials: true,       
   headers: {
    Authorization: token,
    },
  });
}

export const insertScheduleList = (schedule: any, token : any) => 
{
  axios.post(USER_API_BASE_URL + '/insert', schedule, {
    withCredentials: true, 
    headers: {
     Authorization: token,
     },});
}

export const deleteScheduleList = (schedule_ID: any, token : any) => 
{
  axios.delete(USER_API_BASE_URL + '/delete/' + schedule_ID, {
    withCredentials: true, 
    headers: {
     Authorization: token,
     },});
}
