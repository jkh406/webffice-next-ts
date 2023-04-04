import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUserApi, loginUserApi, logOutUserApi } from "service/auth-api";

type UserType = {
    userId: string;
    userPw: string;
};

const initialState: any = {
    isLoading: false,
    isAuthenticated: false,
    token: '',
    user: null,
}

// 로그인
export const LoginUser = createAsyncThunk("LOGIN_USER", async (user: UserType, {getState, dispatch}) => {
    try {
        const response = await loginUserApi(user.userId, user.userPw);
        dispatch({
            type: 'login',
            payload: {
              token: response.data.data.Token,
              user: response.data.data.User,
            },
          });
        return response.data;
    }catch (error: any) {
        console.log(error);
        if (error.response.status === 400) {
            alert("아이디 혹은 비밀번호를 확인해주세요" + error)
        }else {
            alert ("서버에 일시적으로 문제가 생겼습니다. 잠시후 다시 시도해주세요.")
        }
        return error?.response;
    }
});

// 회원가입
export const joinUser = createAsyncThunk("JOIN_USER", async (user: UserType, {getState, dispatch}) => {
    try {
        const response = await addUserApi(user.userId, user.userPw);
        dispatch(login(response.data.data));
        alert("회원가입 성공!");
        return response.data;
    }catch (error: any) {
        return error?.response;
    }
});

// 로그아웃
export const LogoutUser = createAsyncThunk("LOGOUT_USER", async (_,{dispatch}) => {
    try {
        const response = await logOutUserApi();
        if (response.status === 200 && response.data.success) {
            dispatch(logout());
        }
        return response.data;
    }catch (error: any) {
        return error?.response;
    }
});

// 
export const Skip = createAsyncThunk("SKIP", async (_,{dispatch}) => {
    dispatch(skipId());
});

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state :any, action : any) => {
            state.token = action.payload;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        join: (state: any,) => ({
            ...state,
        }),
        logout: (state: any,) => ({
            ...state,
            ...initialState,
        }),
        setToken: (state: any, action: any) => ({
            ...state,
            token: action.payload
        }),
        skipId(state: any) {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.token = 'testtoken';
            state.user = {
                id: 'SkipID',
                avatar: '/assets/avatars/avatar-anika-visser.png',
                name: 'SKIP',
                email: 'SKIP@anbtech.co.kr'};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.myId = action.payload.message;
            state.token = action.payload.data.Token;
            state.user = action.payload.data.User;
            window.localStorage.setItem("user_ID", action.payload.message);
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
        });
        builder.addCase(LogoutUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(LogoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
        });
        builder.addCase(joinUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.myId = action.payload.message;
        });
        builder.addCase(Skip.fulfilled, (state, action) => {
            state.isLoading = false;
        });
    }
});

export const { login, logout, setToken, join, skipId } = authSlice.actions;
export default authSlice.reducer;