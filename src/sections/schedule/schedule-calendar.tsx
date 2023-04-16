import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Stack, Paper, Container } from '@mui/material';
import { EventApi, DateSelectArg, EventClickArg, EventContentArg, } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { EventInput } from '@fullcalendar/core'
import { useAppDispatch, useAppSelector } from 'hooks/use-auth';
import { useCookie } from 'utils/cookie';
import { SelectSchedule, InsertSchedule, DeleteSchedule } from "store/slice/schedule-slice"
import { customAlphabet } from "nanoid";
import { FC } from 'react';

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

interface CustomScheduleProps {
  scheduleslice: any;
}

export const CustomSchedule: FC<CustomScheduleProps> = ({ scheduleslice }) => {
  
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth);
  const { auth } = useCookie();
  const [nanoValue, setNanoValue] = useState({
    code: "",
  });
  const [eventValue, setEventValue] : any = useState({
    weekendsVisible: true,
    currentEvents: []
  });

  useEffect( () => {
    setNanoValue((prev) => ({ ...prev, code: nanoid() }));

  },[]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`이벤트를 삭제하시겠습니까? '${clickInfo.event.title}'`)) {
      
    const schedule = { 
      schedule_id: clickInfo.event._def.publicId,
      token: auth
    };
      dispatch(DeleteSchedule(schedule));

      clickInfo.event.remove();
    }
  };
  
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title : any = prompt('이벤트의 새 제목을 입력하세요.')
    let calendarApi = selectInfo.view.calendar
    const storageUser = JSON.parse(localStorage.getItem('user') || '{}');
    setNanoValue((prev) => ({ ...prev, code: nanoid() }));
    calendarApi.unselect()

    const schedule = { 
      board_id: nanoValue.code,
      board_title : title,
      start_date: selectInfo.startStr,
      end_date: selectInfo.endStr,
      chkallDay: selectInfo.allDay.toString(),
      register_id : storageUser.user_ID,
      token: auth
    };

    dispatch(InsertSchedule(schedule));

    if (title) {
      calendarApi.addEvent({
        id: nanoValue.code,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
    
    const selectSchedule = { user_ID: storageUser.user_ID, token: auth };
    dispatch(SelectSchedule((selectSchedule)));
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
              events={scheduleslice}
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