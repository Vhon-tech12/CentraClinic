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
    padding: "6px 10px",
    border: "none",
    color: "#fff",
    fontWeight: 500,
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  },
});

interface AppointmentCalendarProps {
  events: any[];
}

export default function AppointmentCalendar({ events }: AppointmentCalendarProps) {
  return (
    <div className="bg-[#0e1014] rounded-2xl border border-white/10 shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-white/20">
        <p className="text-sm text-gray-400 font-semibold">Clinic Schedule</p>
      </div>

      <div className="p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 560 }}
          components={{ toolbar: CustomToolbar }}
          eventPropGetter={eventStyleGetter}
          className="custom-dark-calendar"
        />
      </div>

      {/* Global styles for dark theme */}
      <style jsx global>{`
        /* Calendar wrapper */
        .custom-dark-calendar {
          background-color: #111318;
          border-radius: 12px;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        /* Header row (days) */
        .custom-dark-calendar .rbc-header {
          background-color: #1f222d !important;
          color: #bbb !important;
          border-bottom: 1px solid #222736 !important;
          font-weight: 500;
        }

        /* Time gutter */
        .custom-dark-calendar .rbc-time-gutter {
          background-color: #1b1f29 !important;
          color: #888 !important;
          border-right: 1px solid #222736 !important;
        }

        /* Day backgrounds */
        .custom-dark-calendar .rbc-day-bg {
          background-color: #111318 !important;
        }

        /* Off-range days (dimmed) */
        .custom-dark-calendar .rbc-day-bg.rbc-off-range-bg {
          background-color: #0c0e12 !important;
        }

        /* Today highlight */
        .custom-dark-calendar .rbc-today {
          background-color: #1a1c24 !important;
        }

        /* Event hover effect */
        .custom-dark-calendar .rbc-event:hover {
          background-color: #1e40af !important;
          transform: translateY(-1px);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        /* Toolbar */
        .custom-dark-calendar .rbc-toolbar {
          background-color: #1f222d !important;
          color: #fff !important;
          border-bottom: 1px solid #222736 !important;
          padding: 0.5rem 1rem;
          border-radius: 8px 8px 0 0;
        }

        .custom-dark-calendar .rbc-toolbar button {
          background-color: #1b1f29 !important;
          color: #fff !important;
          border: 1px solid #333 !important;
          border-radius: 6px;
          padding: 4px 8px;
          font-size: 13px;
        }

        .custom-dark-calendar .rbc-toolbar button:hover {
          background-color: #222736 !important;
        }

        /* Weekend column */
        .custom-dark-calendar .rbc-off-range {
          background-color: #16171c !important;
        }

        /* Event text */
        .custom-dark-calendar .rbc-event-label,
        .custom-dark-calendar .rbc-event-content {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}
