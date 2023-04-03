import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteScheduleList, insertScheduleList, selectScheduleList } from 'service/schedule-api';
import { useAppSelector } from 'hooks/use-auth';

type scheduleType =  { 
  board_id : string,
  board_title: string,
  board_start: string,
  board_end: string,
  chkallDay: string,
  register_id : string
}

const initialState : any = 
  {
    board_id: '',
    board_title: '',
    board_start: '',
    board_end: '',
    chkallDay: '',
    register_id : '',
    board: []
  }


// SELECT
export const SelectSchedule = createAsyncThunk("SELECT_SCHEDULE", async (schedule: any, {dispatch, getState}) => {
  try {
    console.log('schedule.token', schedule.token);
      const response = await selectScheduleList(schedule.user_ID, schedule.token);
      const payload = response.data.map((rowData: any ) => ({
        id: rowData.board_id,
        title: rowData.board_title,
        start: rowData.start_date
      }));

      dispatch({
          type: 'selectItem',
          payload
        });
      return payload;
  }catch (error: any) {
      return error?.response;
  }
});

// INSERT
export const InsertSchedule = createAsyncThunk("INSERT_SCHEDULE", async (schedule: scheduleType, {dispatch}) => {
  try {
    const token = useAppSelector((state : any) => state.auth.token);
    console.log('InsertSchedule token', token);
    const response = await insertScheduleList(schedule, token);
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
    const token = useAppSelector((state : any) => state.auth.token);
    const response = await deleteScheduleList(schedule_ID, token);
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
        selectItem: (state : any, action : any) => {
          state.board = action.payload
        },
        insertItem: (state : any, action : any) => ({
          ...state
        }),
        deleteItem: (state : any, action : any) => ({
          ...state
        })
    },
    extraReducers: (builder) => {
        builder.addCase(SelectSchedule.fulfilled, (state : any, action) => {
          state.board = action.payload
        });
        builder.addCase(InsertSchedule.fulfilled, (state, action) => {
          state.board = action.payload
        });
        builder.addCase(DeleteSchedule.fulfilled, (state, action) => {
        });
    }
});

export const { selectItem, insertItem, deleteItem } = scheduleSlice.actions;
export default scheduleSlice.reducer;