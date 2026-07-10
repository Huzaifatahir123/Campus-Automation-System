"use client"
import { useState } from 'react'
import { Calendar, momentLocalizer ,View,Views} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { calendarEvents } from "@/lib/data"

const localizer = momentLocalizer(moment)


const MyCalendar = () => {
  
  const [view,setView] = useState<View>(Views.WORK_WEEK);
  const handleChange = (selectedView:View) => {
            setView(selectedView);
  }
    return (
      
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week","day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleChange}
      min={new Date(2026, 6, 10, 8, 0, 0)}
  max={new Date(2026, 6, 10, 17, 0, 0)}
    />
  
    )

  
  
}

export default MyCalendar