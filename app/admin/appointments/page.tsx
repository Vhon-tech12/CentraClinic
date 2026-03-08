"use client";
import { useState } from "react";
import AppointmentRequestsModal from "@/components/AppointmentRequestModal";
import { ChevronLeft, ChevronRight, CalendarDays, Inbox } from "lucide-react";

/* ================= TYPES ================= */

export type ServiceType = "ear" | "nose" | "throat" | "aesthetics";

export type CalendarEvent = {
  id: number;
  patient: string;
  service: ServiceType;
  title: string;
  date: Date;
  time: string;
};

export type AppointmentRequest = {
  id: number;
  name: string;
  type: ServiceType;
  label: string;
};

/* ================= STYLES ================= */

const SERVICE_STYLES: Record<ServiceType, string> = {
  ear: "border-blue-500 bg-blue-50 text-blue-800",
  nose: "border-green-500 bg-green-50 text-green-800",
  throat: "border-purple-500 bg-purple-50 text-purple-800",
  aesthetics: "border-pink-500 bg-pink-50 text-pink-800",
};

/* ================= SAMPLE DATA ================= */

const sampleEvents: CalendarEvent[] = [
  { id: 1, patient: "Juan Dela Cruz", service: "ear", title: "Ear Cleaning", date: new Date(2026, 0, 15), time: "10:00 AM" },
  { id: 2, patient: "Maria Santos", service: "nose", title: "Nose Checkup", date: new Date(2026, 0, 8), time: "1:00 PM" },
  { id: 3, patient: "Liza Ramos", service: "throat", title: "Throat Examination", date: new Date(2026, 0, 15), time: "11:00 AM" },
  { id: 4, patient: "Ana Lopez", service: "aesthetics", title: "Facial Treatment", date: new Date(2026, 0, 16), time: "2:00 PM" },
  { id: 5, patient: "Carlos Mendoza", service: "ear", title: "Ear Consultation", date: new Date(2026, 0, 16), time: "9:00 AM" },
];

const sampleRequests: AppointmentRequest[] = [
  { id: 101, name: "Ana Lopez", type: "ear", label: "Ear Consultation" },
  { id: 102, name: "Carlos Mendoza", type: "nose", label: "Nose Checkup" },
  { id: 103, name: "Liza Ramos", type: "aesthetics", label: "Facial Treatment" },
];

/* ================= CONSTANTS ================= */

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const clinicHours = Array.from({ length: 10 }, (_, i) => 8 + i);

/* ================= HELPERS ================= */

function isSameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}

function isSunday(date: Date) {
  return date.getDay() === 0;
}

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const grid: Date[] = [];
  const startDay = firstDay.getDay();

  for (let i = startDay - 1; i >= 0; i--) grid.push(new Date(year, month, -i));
  for (let d = 1; d <= lastDay.getDate(); d++) grid.push(new Date(year, month, d));
  while (grid.length % 7 !== 0) {
    const last = grid[grid.length - 1];
    grid.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
  }
  return grid;
}

function startOfWeek(date: Date) {
  const day = date.getDay();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
}

function getWeekDays(start: Date) {
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

/* ================= COMPONENT ================= */

export default function WeekCalendar() {
  const [events] = useState(sampleEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState<"week" | "month" | "day">("month");
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0));
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date()));
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  function handleEdit(id: number) { console.log("Edit request:", id); }
  function prevMonth() { setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)); }
  function nextMonth() { setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)); }
  function prevWeek() { setWeekStart(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7)); }
  function nextWeek() { setWeekStart(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7)); }

  function goToToday() {
    const today = new Date();
    setWeekStart(today);
    setView("day");
  }

  const monthGrid = getMonthGrid(currentMonth.getFullYear(), currentMonth.getMonth());
  const weekDays = getWeekDays(startOfWeek(weekStart));

  return (
    <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-xl space-y-6 border border-gray-200">

      {/* WELCOME BANNER */}
      <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-lg mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h3 className="text-indigo-700 font-semibold text-lg">Welcome, Dr. John Ong!</h3>
          <p className="text-indigo-600 text-sm">
            You have <span className="font-semibold">{events.length}</span> appointments this week. 🌟
          </p>
        </div>
        <button
          onClick={goToToday}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
        >
          Go to Today
        </button>
      </div>

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* TITLE */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2 text-gray-800">
            <CalendarDays className="w-6 h-6 text-indigo-600" />
            Schedule
          </h2>
          <p className="text-sm text-gray-500">
            {view === "month"
              ? `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`
              : view === "week"
              ? `Week of ${weekStart.getDate()} ${monthNames[weekStart.getMonth()]}`
              : `Today • ${monthNames[weekStart.getMonth()]} ${weekStart.getDate()}`}
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-wrap items-center gap-3">

          {/* NAVIGATION */}
          <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
            <button onClick={goToToday} className="px-4 py-2 text-sm hover:bg-gray-200 transition text-gray-700">Today</button>
            {(view === "month" || view === "week") && (
              <>
                <button onClick={view === "month" ? prevMonth : prevWeek} className="px-3 py-2 hover:bg-gray-200 transition text-gray-600">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={view === "month" ? nextMonth : nextWeek} className="px-3 py-2 hover:bg-gray-200 transition text-gray-600">
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>

          {/* VIEW SWITCHER */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
            {(["month", "week"] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 text-sm rounded-lg transition
                  ${view === v
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-600 hover:bg-gray-200"}
                `}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          {/* APPOINTMENT REQUESTS */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2 rounded-xl text-sm font-medium shadow-lg shadow-indigo-600/20 text-white"
          >
            <Inbox size={16} />
            Appointment Requests
          </button>

        </div>
      </div>

      {/* MONTH VIEW */}
      {view === "month" && (
        <div className="grid grid-cols-7 gap-1">
          {days.map(d => <div key={d} className="text-xs text-center text-gray-500">{d}</div>)}
          {monthGrid.map(day => {
            const closed = isSunday(day);
            return (
              <div key={day.toISOString()} className={`h-28 p-2 border border-gray-200 rounded-lg ${closed ? "bg-red-50 text-red-600" : "hover:bg-gray-50 transition bg-white"}`}>
                <div className="text-xs flex justify-between mb-1">
                  <span>{day.getDate()}</span>
                  {closed && <span className="text-[10px] font-semibold">Closed</span>}
                </div>
                <div className="flex flex-col gap-1 overflow-y-auto max-h-20">
                  {!closed && events.filter(e => isSameDay(e.date, day)).map(e => (
                    <div key={e.id} className={`flex flex-col p-1 rounded-md shadow-sm cursor-pointer hover:shadow-md transition transform hover:scale-105 bg-white border-l-4 ${SERVICE_STYLES[e.service]}`}>
                      <span className="font-semibold text-[10px]">{e.title}</span>
                      <span className="text-[9px] opacity-90">{e.patient}</span>
                      <span className="text-[8px] opacity-70">{e.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* WEEK VIEW */}
      {view === "week" && (
        <div className="grid grid-cols-8 border-t border-gray-200">
          <div className="border-r border-gray-200"></div>
          {weekDays.map(day => {
            const closed = isSunday(day);
            return (
              <div key={day.toISOString()} className={`border-r border-gray-200 ${closed ? "bg-red-50" : ""}`}>
                <div className="h-8 text-center border-b border-gray-200 text-xs font-semibold text-gray-700">
                  {days[day.getDay()]} {day.getDate()}
                  {closed && <div className="text-[10px] text-red-600">Closed</div>}
                </div>
                {clinicHours.map(hour => (
                  <div key={hour} className="h-16 border-b border-gray-200 flex flex-col gap-1 p-1">
                    {!closed && events.filter(e => isSameDay(e.date, day) && e.time.startsWith(`${hour}:`)).map(e => (
                      <div key={e.id} className={`flex flex-col p-1 rounded-md shadow-sm cursor-pointer hover:shadow-md transition transform hover:scale-105 bg-white border-l-4 ${SERVICE_STYLES[e.service]}`}>
                        <span className="font-semibold text-[10px]">{e.title}</span>
                        <span className="text-[9px]">{e.patient}</span>
                        <span className="text-[8px]">{e.time}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* DAY VIEW */}
      {view === "day" && (
        <div className="grid grid-cols-2 border-t border-gray-200">
          {/* Time column */}
          <div className="border-r border-gray-200 bg-gray-50">
            {clinicHours.map(hour => (
              <div key={hour} className="h-16 border-b border-gray-200 text-xs flex items-center justify-end pr-2 text-gray-600">
                {hour}:00
              </div>
            ))}
          </div>

          {/* Today events */}
          <div className="border-b border-gray-200 bg-white">
            <div className="h-8 text-center border-b border-gray-200 text-xs font-semibold text-gray-700">
              Today {weekStart.getDate()}
            </div>
            {clinicHours.map(hour => (
              <div key={hour} className="h-16 border-b border-gray-200 flex flex-col gap-1 p-1">
                {events.filter(e => isSameDay(e.date, weekStart) && e.time.startsWith(`${hour}:`)).map(e => (
                  <div key={e.id} className={`flex flex-col p-1 rounded-md shadow-sm cursor-pointer hover:shadow-md transition transform hover:scale-105 bg-white border-l-4 ${SERVICE_STYLES[e.service]}`}>
                    <span className="font-semibold text-[10px]">{e.title}</span>
                    <span className="text-[9px]">{e.patient}</span>
                    <span className="text-[8px]">{e.time}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPOINTMENT REQUESTS MODAL */}
      {modalOpen && (
        <AppointmentRequestsModal
          newBookings={sampleRequests}
          setOpenModal={setModalOpen}
          menuOpenId={menuOpenId}
          setMenuOpenId={setMenuOpenId}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
}