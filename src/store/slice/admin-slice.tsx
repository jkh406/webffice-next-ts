import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { selectUserApi } from "service/admin-api";

const initialState: any = {
    user_detail: []
}

export const SelectUser = createAsyncThunk("SELECT_USER", async (token: any, {getState, dispatch}) => {
    try {
        const response = await selectUserApi(token);
        const payload = response.data.map((rowData: any ) => ({
            id : rowData.user_ID,
            avatar : rowData.avatar,
            startDate : rowData.startDate,
            email : rowData.email,
            name : rowData.name,
            phone : rowData.phone,
            rank : rowData.rank,
            address : 'test',
            detail_address : 'test',
        }));

        dispatch({
            type: 'selectUser',
            payload: payload
        });
        return response.data;
    }catch (error: any) {
        // alert ("서버에 일시적으로 문제가 생겼습니다. 잠시후 다시 시도해주세요.")
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        selectUser: (state :any, action : any) => {
            state.user_detail = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(SelectUser.fulfilled, (state, action) => {
            console.log('selectUser extraReducers payload',action.payload);
            state.user_detail = action.payload
        });
    }
});

export const { selectUser } = adminSlice.actions;
export default adminSlice.reducer;