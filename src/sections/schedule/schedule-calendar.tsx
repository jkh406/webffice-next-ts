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
import { createEventId } from 'utils/event-utils';
import React, { useState, useEffect } from 'react';
import scheduleApi from 'service/schedule-api';
import { EventInput } from '@fullcalendar/core'
import { useAuthContext } from 'contexts/auth-context';
import { useDispatch, useSelector } from 'react-redux';


let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
dayjs.extend(isBetweenPlugin);

export interface Eventstate {
  weekendsVisible: boolean | undefined;
  currentEvents: EventApi[] | undefined;
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}

export function CustomSchedule() {


  const { user } = useAuthContext();
  const [eventValue, setEventValue] = useState<Eventstate | null>({
    weekendsVisible: true,
    currentEvents: []
  })
  const [ boardValue, SetBoardValue ] : any = useState([{
      id: '',
      title: '',
      start: ''
    }]);
  let [newBoardValue, SetNewBoardValue ] : any = useState();

  useEffect( () => {
    console.log("useEffect Start!!!");
     scheduleApi.selectBoardList(user.email)
    .then( res => {
      SetNewBoardValue(res.data.map((rowData: { board_id: any; board_title: any; start_date: any; }) => ({
        id: rowData.board_id,
        title: rowData.board_title,
        start: rowData.start_date
      }
      )));

      SetBoardValue([...boardValue, newBoardValue]);

      return() =>
      {
        console.log('return() ', INITIAL_EVENTS);
        <FullCalendar initialEvents={INITIAL_EVENTS}></FullCalendar>
      }

    })
    .catch(err => {
      console.log('selectBoardList() 에러', err);
    });
  },[]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`이벤트를 삭제하시겠습니까? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  };
  
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('이벤트의 새 제목을 입력하세요.')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }
  const INITIAL_EVENTS : EventInput[] = newBoardValue;
  console.log('INITIAL_EVENTS', newBoardValue);

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
              select={handleDateSelect}
              weekends={eventValue?.weekendsVisible}
              selectable={true}
              selectMirror={true}
              eventContent={renderEventContent} 
              eventsSet={handleEvents} 
              eventClick={handleEventClick}
              dayMaxEvents={true}
              initialEvents={INITIAL_EVENTS}
            />
          </Stack>
        </Paper>
      </Container>
      
      
    </LocalizationProvider>
  );
}