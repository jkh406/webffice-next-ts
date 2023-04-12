import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/board";

export const getBoardListApi = (params : any) => {
    return axios.post(USER_API_BASE_URL + "/readBoardLists", null, { 
        withCredentials: true,      
    });
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
