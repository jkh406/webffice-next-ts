import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteScheduleList, insertScheduleList, selectScheduleList } from 'service/schedule-api';
import { useAppSelector } from 'hooks/use-auth';

type scheduleType =  { 
  board_id : string,
  board_title: string,
  start_date: string,
  end_date: string,
  chkallDay: string,
  register_id : string,
  token : string
}

const initialState : any = 
  {
    board_id: null,
    board_title: null,
    start_date: null,
    end_date: null,
    chkallDay: null,
    register_id : null,
    board: null
  }


// SELECT
export const SelectSchedule = createAsyncThunk("SELECT_SCHEDULE", async (schedule: any, {dispatch, getState}) => {
  try {
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
    const response = await insertScheduleList(schedule, schedule.token);

      return response;
  }catch (error: any) {
      return error?.response;
  }
});

// DELETE
export const DeleteSchedule = createAsyncThunk("DELETE_SCHEDULE", async (schedule: any,{dispatch}) => {
  try {
    const response = await deleteScheduleList(schedule.schedule_id, schedule.token);
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