import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBoardListApi, getBoardListLimitApi, getBoardApi, createBoardApi, deleteBoardApi, updateBoardApi } from 'service/board-api';

type BoardState = {
    boards: {
        avatar: string;
        board_no:string;
        board_title: string;
        board_type: string;
        reg_tm: string;
        user_name: string;
        view_cnt: string;
    },
    Limit: number
}
const initialContentsState: BoardState = {
    boards: { avatar: '', board_no: '', board_title: '', board_type: '', reg_tm: '', user_name: '', view_cnt: ''},
    Limit: 1
}

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

export const CreateBoard = createAsyncThunk("BOARD_CREATE", async (params : any,{getState}) => {
    try {
        const response = await createBoardApi(params, params.token);
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
    initialState: initialContentsState,
    reducers: {
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
        builder.addCase(getBoardLists.fulfilled, (state, action) => {
            state.boards = action.payload.Boards;
            state.Limit = action.payload.Limit
        });
        builder.addCase(getBoardListLimit.fulfilled, (state, action) => {
        });
        builder.addCase(getBoard.fulfilled, (state, action) => {
        });
    }
});


export const { selectBoard, insertBoard, deleteBoard, updateBoard } = contentsSlice.actions;
export default contentsSlice.reducer;