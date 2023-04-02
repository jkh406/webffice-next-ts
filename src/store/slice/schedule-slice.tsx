import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteScheduleList, insertScheduleList, selectScheduleList } from 'service/schedule-api';

type scheduleType =  { 
  board_id : string,
  board_title: string,
  board_start: string,
  board_end: string,
  chkallDay: string,
  register_id : string,
}

const initialState : any = [
  {
    board_id: '',
    board_title: '',
    board_start: '',
    board_end: '',
    chkallDay: false,
    board : null
  }
]

// SELECT
export const SelectSchedule = createAsyncThunk("SELECT_SCHEDULE", async (schedule_ID: any, {dispatch}) => {
  try {
      const response = await selectScheduleList(schedule_ID);
      const payload = response.data.map((rowData: any ) => ({
        board_id: rowData.board_id,
        board_title: rowData.board_title,
        board_start: rowData.start_date
      }));

      dispatch({
          type: 'selectItem',
          payload
        });
      return response.data;
  }catch (error: any) {
      return error?.response;
  }
});

// INSERT
export const InsertSchedule = createAsyncThunk("INSERT_SCHEDULE", async (schedule: scheduleType, {dispatch}) => {
  try {
    const response = await insertScheduleList(schedule);
    console.log('InsertSchedule response', response);

    dispatch({
        type: 'insertItem',
        payload: {
          token: response,
          user: response,
        },
      });
      return response;
  }catch (error: any) {
      return error?.response;
  }
});

// DELETE
export const DeleteSchedule = createAsyncThunk("DELETE_SCHEDULE", async (schedule_ID: string,{dispatch}) => {
  try {
    const response = await deleteScheduleList(schedule_ID);
    dispatch({
        type: 'deleteItem',
        payload: {
          token: response,
          user: response,
        },
      });
      return response;
  }catch (error: any) {
      return error?.response;
  }
});

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        selectItem: (state : any, action : any) => ({
          ...state,
          board: action.payload
        }),
        insertItem: (state : any, action : any) => ({
          ...state
        }),
        deleteItem: (state : any, action : any) => ({
          ...state
        })
    },
    extraReducers: (builder) => {
        builder.addCase(SelectSchedule.fulfilled, (state, action) => ({
          board : action.payload
        }));
        builder.addCase(InsertSchedule.fulfilled, (state, action) => {
        });
        builder.addCase(DeleteSchedule.fulfilled, (state, action) => {
        });
    }
});

export const { selectItem, insertItem, deleteItem } = scheduleSlice.actions;
export default scheduleSlice.reducer;