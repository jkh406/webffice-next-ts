import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getBoardListApi, getBoardListLimitApi, getBoardApi } from 'service/board-api';

type BoardState = {
    boards: [{
        writter: string;
        title:string;
        boardId: number;
    }],
    startPage: number;//startidx
    nowPage: number;//nowpage
    lastPage: number;//endidx
    pageLimit: number;//boardendidx
    nowBoard: {
        title: string;
        content: string;
        writter: string;
    }
}
const initialContentsState: BoardState = {
    boards: [{ writter: '', title: '', boardId: -1}],
    startPage: 1,
    nowPage: 1,
    lastPage: 5,
    pageLimit: 20,
    nowBoard: {
        title: '',
        content: '',
        writter: '',
    }
}

export const getBoardLists = createAsyncThunk("BOARD_LIST_READ", async (_,{getState}) => {
    try {
        const {board } = getState() as {board: BoardState};
        const params = {
            startPage: (board.nowPage-1) * 20,
            pageNum: 20,
        };
        const response = await getBoardListApi(params);
        return response.data.data;
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
        changePageState: (state: BoardState, action: PayloadAction<{ 
            startPage: number, nowPage: number,lastPage: number}>
        ) => ({
            ...state,
            startPage: action.payload.startPage,
            lastPage: action.payload.lastPage,
            nowPage: action.payload.nowPage,
        })
    },
    extraReducers: (builder) => {
        builder.addCase(getBoardLists.fulfilled, (state, action) => {
            state.boards = action.payload;
            console.log(action.payload);
        });
        builder.addCase(getBoardListLimit.fulfilled, (state, action) => {
            state.pageLimit = Math.ceil(action.payload / 20);
            state.lastPage = state.pageLimit;
            console.log(action.payload);
        });
        builder.addCase(getBoard.fulfilled, (state, action) => {
            state.nowBoard = {
                ...state.nowBoard,
                content: action.payload.boardContent,
                title: action.payload.boardTitle,
                writter: action.payload.boardWritter,
            }
            console.log(action.payload);
        });
    }
});


export const {changePageState} = contentsSlice.actions;
export default contentsSlice.reducer;