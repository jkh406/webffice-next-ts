import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Stack, Paper, Container } from '@mui/material';
import { EventApi, DateSelectArg, EventClickArg, EventContentArg, } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useState, useEffect } from 'react';
import scheduleApi from 'service/schedule-api';
import { EventInput } from '@fullcalendar/core'
import { useAuthContext } from 'contexts/auth-context';
import { useDispatch, useSelector } from 'react-redux';
import { selectSchedule, insertSchedule, deleteSchedule } from "store/slice/scheduleslice"
import { customAlphabet } from "nanoid";

export interface Eventstate {
  weekendsVisible: boolean | undefined;
  currentEvents: EventApi[] | undefined;
}

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-", 10);

const INITIAL_EVENTS : EventInput[] = [    
  {
      id: '',
      title: '',
      start: ''
    }
]

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}

export function CustomSchedule() {
  const scheduleslice = useSelector((state : any) => state.schedule)
  const dispatch = useDispatch();

  const [nanoValue, setNanoValue] = useState({
    code: "",
  });

  const { user } = useAuthContext();
  const [eventValue, setEventValue] : any = useState({
    weekendsVisible: true,
    currentEvents: []
  })

  useEffect( () => {
    setNanoValue((prev) => ({ ...prev, code: nanoid() }));

     scheduleApi.selectScheduleList(user.email)
    .then( res => {
      window.localStorage.setItem("userID", JSON.stringify(user.email))
      dispatch(selectSchedule(res.data.map((rowData: any ) => ({
        id: rowData.board_id,
        title: rowData.board_title,
        start: rowData.start_date
      }
      ))));

    })
    .catch(err => {
      console.log('selectBoardList() Error', err);
    });
  },[]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`이벤트를 삭제하시겠습니까? '${clickInfo.event.title}'`)) {
      console.log('clickInfo =', clickInfo);
      console.log('clickInfo =', clickInfo.event._def.publicId);
      
      dispatch(deleteSchedule({
        publicId : clickInfo.event._def.publicId
      }));

      clickInfo.event.remove();
    }
  };
  
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title : any = prompt('이벤트의 새 제목을 입력하세요.')
    let calendarApi = selectInfo.view.calendar
    
    setNanoValue((prev) => ({ ...prev, code: nanoid() }));
    calendarApi.unselect() // clear date selection

    dispatch(insertSchedule({
      board_id: nanoValue.code,
      board_title : title,
      start_date: selectInfo.startStr,
      end_date: selectInfo.endStr,
      chk_allDay: selectInfo.allDay.toString(),
      register_id : user.email
    }));

    if (title) {
      calendarApi.addEvent({
        id: nanoValue.code,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  const handleEvents = (events: EventApi[]) => {
    setEventValue({
      currentEvents: events,
      weekendsVisible: true,
    })
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Paper >
          <Stack spacing={0}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              initialView='dayGridMonth'
              editable={true}
              locale='ko'
              weekends={eventValue?.weekendsVisible}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateSelect}
              events={scheduleslice.board}
              eventContent={renderEventContent} 
              eventsSet={handleEvents} 
              eventClick={handleEventClick}
              initialEvents={INITIAL_EVENTS}
            />
          </Stack>
        </Paper>
      </Container>
      
      
    </LocalizationProvider>
  );
}