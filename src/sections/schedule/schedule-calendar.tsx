import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Stack, Paper, Container } from '@mui/material';
import { makeStyles } from '@mui/styles'
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from 'utils/event-utils';
import React, { useState, Dispatch  } from 'react';

dayjs.extend(isBetweenPlugin);

export interface ScheduleState {
  weekendsVisible: boolean | undefined;
  currentEvents: EventApi[] | undefined;
}


const useStyles = makeStyles((theme : any) => ({
  paper: {
    padding: theme.spacing(0),
  },
}));

const handleEventClick = (clickInfo: EventClickArg) => {
  if (confirm(`이벤트를 삭제하시겠습니까? '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
};

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}


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

export function CustomSchedule() {
  const classes = useStyles();

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
        <Paper className={classes.paper}>
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
              eventContent={renderEventContent} // custom render function
              eventsSet={handleEvents} // called after events are initialized/added/changed/removed
              eventClick={handleEventClick}
              dayMaxEvents={true}
              initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            />
          </Stack>
        </Paper>
      </Container>
      
      
    </LocalizationProvider>
  );
}