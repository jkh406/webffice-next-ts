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
import React, { useState, useEffect, useContext } from 'react';
import scheduleApi from 'service/schedule-api';
import { EventInput } from '@fullcalendar/core'
import { AuthContext } from 'contexts/auth-context';


let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
dayjs.extend(isBetweenPlugin);

export interface ScheduleState {
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
  const user = useContext(AuthContext);
  console.log("user", user);

  useEffect(() => {
    console.log("useEffect Start!!!");
    scheduleApi.selectBoardList('test')
    .then( res => {
      if(!res.data.email)
      {
        console.log("test", res.data.email);
        throw new Error('계정이 존재하지 않습니다.');
      }
    })
    .catch(err => {
      console.log('loadUser() 에러', err);
    });
  });
  
  const INITIAL_EVENTS: EventInput[] = [
    {
      id: createEventId(),
      title: 'Test event',
      start: todayStr
    },
    {
      id: createEventId(),
      title: 'Test event',
      start: todayStr + 'T12:00:00'
    }
  ]
  
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

  const [state, setState] = useState<ScheduleState | null>({
    weekendsVisible: true,
    currentEvents: []
  })
  
  const handleEvents = (events: EventApi[]) => {
    setState({
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
              weekends={state?.weekendsVisible}
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