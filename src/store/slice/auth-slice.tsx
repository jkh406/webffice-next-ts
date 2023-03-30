import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { createUser, signIn } from "../api/Api";
// import { useAppDispatch } from "./hooks";
// import {API} from '../api/Api';
import axios from "axios";
import AuthApi from "service/auth-api";

type AuthState = {
    loading: boolean;
    logged: boolean;
    token: string;
    myId: string;
}

type UserType = {
    userId: string;
    userPw: string;
};

const initialAuthState: AuthState = {
    loading: false,
    logged: false,
    token: '',
    myId: '',
}

// 로그인
export const loginUser = createAsyncThunk("LOGIN_USER", async (user: UserType, {rejectWithValue, getState, dispatch}) => {
        AuthApi.loginUser(user.userId, user.userPw)
        .then( response => {
            console.log('response()', response);
          dispatch(login(response.data.data));
        })
        .catch(error => {
            if (error.response.status === 400) {
                alert("아이디 혹은 비밀번호를 확인해주세요" + error)
            }else {
                alert ("서버에 일시적으로 문제가 생겼습니다. 잠시후 다시 시도해주세요.")
            }
          console.log('selectBoardList() Error', error);
        });
});
// 회원가입
export const join = createAsyncThunk("JOIN_USER", async (user: UserType, {rejectWithValue, getState, dispatch}) => {

    try {
        const response = await AuthApi.addUser(user.userId, user.userPw);
        dispatch(login(response.data.data));
        alert("회원가입 성공!");
        return response.data;
    }catch (error: any) {
        return error?.response;
    }
});
// 로그아웃
export const logoutUser = createAsyncThunk("LOGOUT_USER", async (_,{dispatch}) => {

    // try {
    //     const response = await axios.post(`${url}/logout`, {},{ 
    //         withCredentials: true,
    //     });
    //     if (response.status === 200 && response.data.success) {
    //         dispatch(logout());
    //     }else {
            
    //     }
    //     return response.data;
    // }catch (error: any) {
    //     return error?.response;
    // }
});

const authSlice = createSlice({
    name: 'contents',
    initialState: initialAuthState,
    reducers: {
        login: (state: AuthState, action: PayloadAction<string>) => ({
            ...state,
            logged: true,
            token: action.payload,
        }),
        logout: (state: AuthState,) => ({
            ...state,
            ...initialAuthState,
        }),
        setToken: (state: AuthState, action: PayloadAction<string>) => ({
            ...state,
            token: action.payload
        })
    },
    extraReducers: (builder) => {
        // Handling peding state
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.myId = action.payload.message;
        });
        builder.addCase(join.fulfilled, (state, action) => {
            state.loading = false;
            state.myId = action.payload.message;
        });

        builder.addCase(logoutUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
        });
    }
});

export const {login, logout, setToken} = authSlice.actions;
export default authSlice.reducer;