"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export const eventStyleGetter = () => ({
  style: {
    backgroundColor: "#2563eb",
    borderRadius: "12px",
    padding: "4px 6px",
    border: "none",
  },
});

interface AppointmentCalendarProps {
  events: any[];
}

export default function AppointmentCalendar({ events }: AppointmentCalendarProps) {
  return (
    <div className="bg-[#111318] rounded-2xl border border-white/10 shadow-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-sm text-gray-300">Clinic Schedule</p>
      </div>
      <div className="p-3">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 540 }}
          components={{toolbar: CustomToolbar }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
}
