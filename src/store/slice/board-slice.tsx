import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBoardListApi, getBoardListLimitApi, getBoardApi, createBoardApi, deleteBoardApi, updateBoardApi, getBoardCommentsApi, createCommentsApi } from 'service/board-api';

type BoardState = {
    board: [],
    avatar: string;
    board_no:string;
    board_title: string;
    board_type: string;
    reg_tm: string;
    user_name: string;
    view_cnt: string;
    Limit: number
}

const initialState : BoardState = 
  {
    board: [],
    avatar: '',
    board_no: '',
    board_title: '',
    board_type: '',
    reg_tm: '',
    user_name : '',
    view_cnt: '',
    Limit: 1
  }

export const GetBoardComments = createAsyncThunk("BOARD_COMMENTS_READ", async (params : any,{dispatch, getState}) => {
    try {
        const response = await getBoardCommentsApi(params, params.token);
        
        const payload = response.data.data;
        console.log('patload', payload)

        dispatch({
            type: 'selectComments',
            payload
        });
        return response.data.data;
    }catch (error: any) {
        return error?.response;
    }
});

export const getBoardLists = createAsyncThunk("BOARD_LIST_READ", async (params : any,{dispatch, getState}) => {
    try {
        const response = await getBoardListApi(params, params.token);

        const payload = response.data.data.Boards.map((rowData: any ) => ({
            avatar: rowData.avatar,
            board_no: rowData.board_no,
            board_title: rowData.board_title,
            board_type: rowData.board_title,
            reg_tm: rowData.board_title,
            user_name: rowData.board_title,
            view_cnt: rowData.board_title,
            Limit: rowData.Limit
        }));
        dispatch({
            type: 'selectBoard',
            payload,
            Limit: response.data.data.Limit
        });
        return response.data.data;
    }catch (error: any) {
        return error?.response;
    }
});

export const CreateBoard = createAsyncThunk("BOARD_CREATE", async (params : any, thunkAPI : any) => {
    try {
        const response = await createBoardApi(params, params.get('token'));
        return response.data.data;
    }catch (error: any) {
        return error?.response;
    }
});

export const CreateComments = createAsyncThunk("COMMENTS_CREATE", async (params : any, thunkAPI : any) => {
    try {
        const response = await createCommentsApi(params, params.token);
        return response.data.data;
    }catch (error: any) {
        return error?.response;
    }
});

export const UpdateBoard = createAsyncThunk("BOARD_UPDATE", async (params : any,{getState}) => {
    try {
        console.log('updateboard', params);
        const response = await updateBoardApi(params, params.token);
        return response.data.data;
    }catch (error: any) {
        return error?.response;
    }
});

export const DeleteBoard = createAsyncThunk("BOARD_DELETE", async (params : any,{dispatch, getState}) => {
    try {
        const response = await deleteBoardApi(params.board_no, params.token);
        dispatch({
            type: 'deleteBoard',
            response
        });

    }catch (error: any) {
        return error?.response;
    }
});

export const getBoardListLimit = createAsyncThunk("BOARD_LIST_LIMIT", async () => {
    try {
        const response = await getBoardListLimitApi();
        return response.data.data;
    }catch (error: any) {
        return error?.response;
    }
});

export const getBoard = createAsyncThunk("BOARD_GET_BOARD", async (boardId: number) => {
    try {
        const response = await getBoardApi(boardId);
        return response.data.data;
    }catch (error: any) {
        return error?.response;
    }
});

const contentsSlice = createSlice({
    name: 'contents',
    initialState: initialState,
    reducers: {
        selectComments: (state : any, action : any) => {
            console.log('action.payload', action.payload);
            state.board = action.payload
        },
        selectBoard: (state : any, action : any) => {
            state.board = action.payload
        },
        insertBoard: (state : any, action : any) => ({
        ...state
        }),
        deleteBoard: (state : any, action : any) => ({
        ...state
        }),
        updateBoard: (state : any, action : any) => ({
            ...state
            })
    },
    extraReducers: (builder) => {
        builder.addCase(GetBoardComments.fulfilled, (state, action) => {
            state.board = action.payload
        });
        builder.addCase(getBoardLists.fulfilled, (state, action) => {
        });
        builder.addCase(getBoardListLimit.fulfilled, (state, action) => {
        });
        builder.addCase(getBoard.fulfilled, (state, action) => {
        });
    }
});


export const { selectBoard, insertBoard, deleteBoard, updateBoard } = contentsSlice.actions;
export default contentsSlice.reducer;