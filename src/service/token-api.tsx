import axios from "axios";

const url = 'http://localhost:8080/api/v1';

// 유저 존재하는지 확인
export const checkId = async (userId: string) => 
    await axios.get(`${url}/get?userId=${userId}`);

// acess 토큰 재발급받음.
export const issueToken = () => 
    axios.post(`${url}/token/getAccessToken`,{
    },
    { 
        withCredentials: true,
    }
);