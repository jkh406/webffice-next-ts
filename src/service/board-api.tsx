import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/board";

export const getBoardListApi = (params : any, token : any) => {
    return axios.post(USER_API_BASE_URL + "/readBoardLists", params, { 
        withCredentials: true,      
        headers: {
         Authorization: token,
         },
    });
}

export const createBoardApi = (params : any, token : any) => {
    return axios.post(USER_API_BASE_URL + "/createBoard", params, { 
        withCredentials: true,      
        headers: {
         Authorization: token,
         },
    });
}

export const updateBoardApi = (params : any, token : any) => {
    return axios.post(USER_API_BASE_URL + "/updateBoard", params, { 
        withCredentials: true,      
        headers: {
         Authorization: token,
         },
    });
}

export const deleteBoardApi = (params: any, token : any) => 
{
  axios.delete(USER_API_BASE_URL + '/delete/' + params, {
    withCredentials: true, 
    headers: {
     Authorization: token,
     },});
}

export const getBoardListLimitApi = () => {
    return axios.post(USER_API_BASE_URL + "/getBoardListLimit", null, { 
        withCredentials: true,      
    });
}
export const getBoardApi = (boardId : any) => {
    return axios.post(USER_API_BASE_URL + "/getBoard", null, { 
        withCredentials: true,      
    });
}

export const getColumnsApi = (ScreenName: any, token : any) => 
{
  return axios.get(USER_API_BASE_URL + '/' + ScreenName, {
    withCredentials: true,       
   headers: {
    Authorization: token,
    },
  });
}
