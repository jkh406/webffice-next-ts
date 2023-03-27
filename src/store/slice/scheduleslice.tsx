import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import scheduleApi from 'service/schedule-api';
import { boolean } from "yup";

const initialState = [
  {
    board_id: '',
    board_title: '',
    board_start: '',
    board_end: '',
    chkallDay: false
  }
]

interface scheduleList { 
  board_id : string,
  board_title :string,
  start_date : string,
  end_date : string,
  chk_allDay : string,
  register_id : string 
}

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
      	// anonymous function
        selectSchedule: (state : any, action : any) => {
          const board = action.payload; 
          return {
            ...state,
            board
          };
        },
        insertSchedule: (state : any, action : PayloadAction<scheduleList>) => {
          scheduleApi.insertScheduleList(action.payload)
          .then( response => { 
            console.log(response);
           })
          .catch(err => {
            console.log('insertSchedule() Error', err);
          });
        },
        deleteSchedule: (state : any, action : PayloadAction<{ publicId : String }>) => {
          console.log(action.payload);
          scheduleApi.deleteScheduleList(action.payload)
          .then( response => { 
            console.log(response);
           })
          .catch(err => {
            console.log('insertSchedule() Error', err);
          });
        }
    }
});

export const { selectSchedule, insertSchedule, deleteSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;