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
  status?: string;
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

const today = new Date();

const sampleEvents: CalendarEvent[] = [
  {
    id: 1,
    patient: "Juan Dela Cruz",
    service: "ear",
    title: "Ear Cleaning",
    date: today,
    time: "9:00 AM",
    status: "Confirmed"
  },
  {
    id: 2,
    patient: "Maria Santos",
    service: "nose",
    title: "Nose Checkup",
    date: today,
    time: "10:00 AM",
    status: "Confirmed"
  },
  {
    id: 3,
    patient: "Liza Ramos",
    service: "throat",
    title: "Throat Examination",
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    time: "11:00 AM",
    status: "Confirmed"
  },
  {
    id: 4,
    patient: "Ana Lopez",
    service: "aesthetics",
    title: "Facial Treatment",
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    time: "2:00 PM",
    status: "Confirmed"
  },
  {
    id: 5,
    patient: "Carlos Mendoza",
    service: "ear",
    title: "Ear Consultation",
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    time: "1:00 PM",
    status: "Confirmed"
  }
];

const sampleRequests: AppointmentRequest[] = [
  { id: 101, name: "Ana Lopez", type: "ear", label: "Ear Consultation" },
  { id: 102, name: "Carlos Mendoza", type: "nose", label: "Nose Checkup" },
  { id: 103, name: "Liza Ramos", type: "aesthetics", label: "Facial Treatment" },
];

/* ================= CONSTANTS ================= */

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const clinicHours = [
  { hour: 8, label: "8:00 AM" },
  { hour: 9, label: "9:00 AM" },
  { hour: 10, label: "10:00 AM" },
  { hour: 11, label: "11:00 AM" },
  { hour: 12, label: "12:00 PM" },
  { hour: 13, label: "1:00 PM" },
  { hour: 14, label: "2:00 PM" },
  { hour: 15, label: "3:00 PM" },
  { hour: 16, label: "4:00 PM" },
  { hour: 17, label: "5:00 PM" },
];

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

  for (let i = startDay - 1; i >= 0; i--) {
    grid.push(new Date(year, month, -i));
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    grid.push(new Date(year, month, d));
  }

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

const [currentMonth, setCurrentMonth] = useState(new Date());

  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date()));

  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  function handleEdit(id: number) {
    console.log("Edit request:", id);
  }

  function prevMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  }

  function nextMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  }

  function prevWeek() {
    setWeekStart(
      new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7)
    );
  }

  function nextWeek() {
    setWeekStart(
      new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7)
    );
  }

  function goToToday() {
    const today = new Date();
    setWeekStart(today);
    setView("day");
  }

  const monthGrid = getMonthGrid(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  const weekDays = getWeekDays(startOfWeek(weekStart));

  return (
    <div className="bg-white text-gray-900 rounded-2xl p-8 space-y-8 border border-gray-200 shadow-lg">

      {/* WELCOME */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-gray-900 font-semibold text-xl">
            Good morning, Secretary!
          </h3>
          <p className="text-gray-600 text-base mt-1">
            {events.length} appointments scheduled
          </p>
        </div>
        <button
          onClick={goToToday}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
        >
          Today
        </button>
      </div>

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <CalendarDays className="w-7 h-7 text-emerald-600" />
            Schedule
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {view === "month"
              ? `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`
              : view === "week"
              ? `Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
              : `Today • ${weekStart.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* NAV */}
          <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
            <button
              onClick={goToToday}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              Today
            </button>
            {(view === "month" || view === "week") && (
              <>
                <button
                  onClick={view === "month" ? prevMonth : prevWeek}
                  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Previous"
                >
                  <ChevronLeft size={16} className="text-gray-500" />
                </button>
                <button
                  onClick={view === "month" ? nextMonth : nextWeek}
                  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Next"
                >
                  <ChevronRight size={16} className="text-gray-500" />
                </button>
              </>
            )}
          </div>

          {/* VIEW SWITCH */}
          <div className="flex bg-gray-50 rounded-xl p-0.5 border border-gray-100 shadow-sm">
            {(["month", "week"] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex-1
                  ${view === v
                    ? "bg-emerald-600 text-white shadow-md hover:shadow-lg"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"}`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-lg text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all"
          >
            <Inbox size={16} />
            Requests
          </button>
        </div>
      </div>

      {/* MONTH VIEW */}
{view === "month" && (
        <div className="grid grid-cols-7 gap-px bg-gray-100 p-4 rounded-2xl border border-gray-200 shadow-sm">
          {/* Header row */}
          {days.map(d => (
            <div key={d} className="h-12 flex items-center justify-center text-xs font-bold text-gray-600 uppercase tracking-wide bg-white border border-gray-200">
              {d}
            </div>
          ))}
          {/* Days */}
          {monthGrid.map(day => {
            const closed = isSunday(day);
            const dayEvents = events.filter(e => isSameDay(e.date, day));
            return (
              <div
                key={day.toISOString()}
                className={`relative h-40 border border-gray-200 bg-white hover:shadow-md transition-all duration-200 group
                  ${closed ? 'bg-linear-to-br from-red-50 to-rose-50 border-red-200 opacity-75' : ''}`}
              >
                {/* Day number */}
                <div className="absolute top-2 left-3 z-10">
                  <span className={`text-lg font-bold px-2 py-1 rounded-full ${
                    closed ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {day.getDate()}
                  </span>
                  {closed && (
                    <span className="ml-2 text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                      Closed
                    </span>
                  )}
                </div>
                
                {/* Events */}
                <div className="pt-10 pb-3 px-3 space-y-2 overflow-y-auto max-h-full">
                  {dayEvents.map(e => (
                      <div
                      key={e.id}
                      className={`group-hover:scale-[1.02] transition-transform duration-200 p-2 rounded-xl border-l-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md bg-white ${SERVICE_STYLES[e.service]}`}
                    >
                      <div className="font-semibold text-xs text-gray-900 line-clamp-1 mb-1">
                        {e.title}
                      </div>
                      <div className="text-xs font-semibold text-gray-800 leading-tight mb-1">
                        {e.patient}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-mono text-gray-600">
                          {e.time}
                        </span>
                        {e.status && (
                          <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full font-medium">
                            {e.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {dayEvents.length === 0 && !closed && (
                    <div className="text-xs text-gray-400 text-center py-4">
                      No appointments
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* WEEK VIEW */}
      {view === "week" && (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
          {/* Header row with days */}
        <div className="grid grid-cols-[90px_repeat(7,160px)] border-b border-gray-200 bg-gray-50">
             <div className="h-12 border-r border-gray-200"></div>
            {weekDays.map(day => {
              const closed = isSunday(day);
              return (
                <div
                  key={day.toISOString()}
                  className={`h-12 flex items-center justify-center border-r border-gray-200 text-sm font-semibold text-gray-700 ${
  closed ? "bg-red-50 text-red-600" : ""
}`}
                >
                  {days[day.getDay()]} {day.getDate()}
                </div>
              );
            })}
          </div>

          {/* Time grid */}
          <div className="grid grid-cols-[90px_repeat(7,160px)]">
            {/* Time column */}
            <div className="border-r border-gray-200 bg-gray-50">
              {clinicHours.map(({ hour, label }) => (
                <div
                  key={hour}
                  className="h-28 border-b border-gray-100 text-xs flex items-start justify-end pr-3 pt-1 text-gray-400"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Day columns */}
            {weekDays.map(day => {
              const closed = isSunday(day);
              return (
                <div
                  key={day.toISOString()}
                  className={`border-r border-gray-200 ${closed ? "bg-red-50" : ""}`}
                >
                  {clinicHours.map(({ hour }) => (
                    <div
                      key={hour}
                      className="h-28 border-b border-gray-100 flex flex-col items-start justify-start gap-1 p-2 min-h-[112px]"
                    >
                      {!closed &&
                        events
                          .filter(e =>
                            isSameDay(e.date, day) &&
                            e.time.startsWith(`${hour}:`)
                          )
                          .map(e => (
                            <div
                              key={e.id}
                              className={`flex flex-col justify-between p-3 rounded-lg shadow-sm border border-gray-100 border-l-4 hover:shadow-md transition-all duration-200 w-full max-w-[160px] cursor-pointer ${SERVICE_STYLES[e.service]}`}
                            >
                              <span className="font-semibold text-sm mb-1 text-gray-900">
                                {e.title}
                              </span>
                              <span className="text-sm font-medium text-gray-800 mb-1 leading-snug">
                                {e.patient}
                              </span>
                              <div className="flex items-center justify-between text-xs mt-auto">
                                <span className="font-mono text-gray-600 whitespace-nowrap">
                                  {e.time}
                                </span>
                                {e.status && (
                                 <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                                    {e.status}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DAY VIEW */}
      {view === "day" && (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
          {/* Header */}
          <div className="grid grid-cols-[100px_1fr] border-b border-gray-200">
            <div className="h-10 border-r border-gray-200 bg-gray-50"></div>
            <div className="h-10 text-center text-xs font-semibold text-gray-700">
              {days[weekStart.getDay()]} {weekStart.getDate()}
            </div>
          </div>

          {/* Time grid */}
            <div className="grid grid-cols-[100px_1fr]">
              {/* Time column */}
              <div className="border-r border-gray-200 bg-gray-50">
                {clinicHours.map(({ hour, label }) => (
                  <div
                    key={hour}
                    className="h-28 border-b border-gray-100 text-xs flex items-start justify-end pr-3 pt-1 text-gray-400"
                  >
                    {label}
                  </div>
                ))}
              </div>

            {/* Event column */}
            <div>
              {clinicHours.map(({ hour }) => (
                <div
                  key={hour}
                  className="h-28 border-b border-gray-100 flex flex-col gap-2 p-3"
                >
                  {events
                    .filter(e =>
                      isSameDay(e.date, weekStart) &&
                      e.time.startsWith(`${hour}:`)
                    )
                    .map(e => (
                      <div
                        key={e.id}
                       className={`p-3 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white ${SERVICE_STYLES[e.service]}`}
                      >
                        <span className="font-semibold text-sm text-gray-900">
                          {e.title}
                        </span>
                        <span className="text-xs font-medium text-gray-800 line-clamp-1 mb-1 leading-tight">
                          {e.patient}
                        </span>
                        <div className="flex items-center gap-1 text-[10px]">
                          <span className="font-mono text-gray-600">
                            {e.time}
                          </span>
                          {e.status && (
                            <span className="bg-green-100 text-green-800 px-1.5 py-px rounded-full font-medium">
                              {e.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL */}
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