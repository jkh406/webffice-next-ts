import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import styled from "styled-components";

export const CustomCalendar : any = styled(DateCalendar)`
width: 100vw;
height: 100vh;
max-width: 100%;
max-height: 100%;
background: white;
font-family: Arial, Helvetica, sans-serif;
line-height: 1.125em;

.react-calendar--doubleView {
width: 700px;
}
.react-calendar--doubleView .react-calendar__viewContainer {
display: flex;
margin: -0.5em;
}
.react-calendar--doubleView .react-calendar__viewContainer > * {
width: 50%;
margin: 0.5em;
}

button {
  margin: 3px;
  background-color: #6f876f;
  border: 0;
  border-radius: 30px;
  color: white;
  padding: 5px 0;

  &:hover {
    background-color: #556b55;
  }

  &:active {
    background-color: #a5c1a5;
  }
}

*,
*:before,
*:after {
-moz-box-sizing: border-box;
-webkit-box-sizing: border-box;
box-sizing: border-box;
}
button {
margin: 0;
border: 0;
outline: none;
}
button:enabled:hover {
cursor: pointer;
}
.react-calendar__navigation {
height: 44px;
margin-bottom: 1em;
}
.react-calendar__navigation button {
min-width: 44px;
background: none;
}
.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
background-color: #e6e6e6;
}
.react-calendar__navigation button[disabled] {
background-color: #f0f0f0;
}
.react-calendar__month-view__weekdays {
text-align: center;
text-transform: uppercase;
font-weight: bold;
font-size: 0.75em;
}
.react-calendar__month-view__weekdays__weekday {
padding: 0.5em;
}
.react-calendar__month-view__weekNumbers {
font-weight: bold;
}
.react-calendar__month-view__weekNumbers .react-calendar__tile {
display: flex;
align-items: center;
justify-content: center;
font-size: 0.75em;
padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
}
.react-calendar__month-view__days__day--weekend {
color: #d10000;
}
.react-calendar__month-view__days__day--neighboringMonth {
color: #757575;
}
.react-calendar__year-view .react-calendar__tile,
.react-calendar__decade-view .react-calendar__tile,
.react-calendar__century-view .react-calendar__tile {
padding: 2em 0.5em;
}
.react-calendar__tile {
max-width: 100%;
text-align: center;
padding: 0.75em 0.5em;
background: none;
}
.react-calendar__tile:disabled {
background-color: #f0f0f0;
}
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
background-color: #e6e6e6;
}
.react-calendar__tile--now {
background: #ffff76;
}
.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
background: #ffffa9;
}
.react-calendar__tile--hasActive {
background: #76baff;
}
.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
background: #a9d4ff;
}
.react-calendar__tile--active {
background: #006edc;
color: white;
}
.react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
background: #1087ff;
}
.react-calendar--selectRange .react-calendar__tile--hover {
background-color: #e6e6e6;
}
`