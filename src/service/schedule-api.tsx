import axios from 'axios';
import { useSelector } from 'react-redux';

const USER_API_BASE_URL = "http://localhost:8080/api/schedule";


export const selectScheduleList = (userID: any) => 
{
  const token = useSelector((state : any) => state.auth.token);
  console.log('token', token);

  return axios.get(USER_API_BASE_URL + '/' + userID, {
    withCredentials: true,       
   headers: {
    Authorization: token,
    },
  });
}

export const insertScheduleList = (schedule: any) => 
{
  const token = useSelector((state : any) => state.auth.token);
  axios.post(USER_API_BASE_URL + '/insert', schedule, {
    headers: {
     Authorization: token,
     },});
}

export const deleteScheduleList = (ScheduleId: any) => 
{
  const token = useSelector((state : any) => state.auth.token);
  axios.delete(USER_API_BASE_URL + '/' + ScheduleId.publicId, {
    headers: {
     Authorization: token,
     },});
}
