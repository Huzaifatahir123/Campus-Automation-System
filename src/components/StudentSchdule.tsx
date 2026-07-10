"use client"

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { calendarEvents } from "@/lib/data"

const localizer = momentLocalizer(moment)

const myEventsList = calendarEvents.map((event: any) => ({
  ...event,
  start: new Date(event.start),
  end: new Date(event.end),
}))

const MyCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)

export default MyCalendar