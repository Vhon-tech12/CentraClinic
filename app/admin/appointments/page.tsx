"use client";

import { useState } from "react";
import AppointmentRequestsModal from "@/components/AppointmentRequestModal";

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
  ear: "bg-blue-500/90",
  nose: "bg-green-500/90",
  throat: "bg-purple-500/90",
  aesthetics: "bg-pink-500/90",
};

/* ================= SAMPLE DATA ================= */

const sampleEvents: CalendarEvent[] = [
  {
    id: 1,
    patient: "Juan Dela Cruz",
    service: "ear",
    title: "Ear Cleaning",
    date: new Date(2026, 1, 15), // Feb 15, 2026
    time: "10:00 AM",
  },
  {
    id: 2,
    patient: "Maria Santos",
    service: "nose",
    title: "Nose Checkup",
    date: new Date(2026, 2, 8), // Mar 8, 2026
    time: "1:00 PM",
  },
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
  "July","August","September","October","November","December",
];
const clinicHours = Array.from({ length: 10 }, (_, i) => 8 + i); // 8AM to 5PM

/* ================= HELPERS ================= */

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
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
    grid.push(
      new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1)
    );
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
  const [view, setView] = useState<"week" | "month">("month");

  // Month state
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0));

  // Week state
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date()));

  // Modal menu
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
    setWeekStart(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7));
  }

  function nextWeek() {
    setWeekStart(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7));
  }

  const monthGrid = getMonthGrid(currentMonth.getFullYear(), currentMonth.getMonth());
  const weekDays = getWeekDays(weekStart);

  const currentMonthYear = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

  return (
    <div className="bg-[#0b0d12] text-white rounded-2xl p-6 shadow-xl">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <div>
          <h2 className="text-xl font-semibold">Schedule</h2>
          <p className="text-gray-400 text-sm">{view === "month" ? currentMonthYear : `Week of ${weekStart.getDate()} ${monthNames[weekStart.getMonth()]}`}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {view === "month" && (
            <>
              <button onClick={prevMonth} className="px-3 py-1 bg-gray-700 rounded">◀</button>
              <button onClick={nextMonth} className="px-3 py-1 bg-gray-700 rounded">▶</button>
            </>
          )}
          {view === "week" && (
            <>
              <button onClick={prevWeek} className="px-3 py-1 bg-gray-700 rounded">◀</button>
              <button onClick={nextWeek} className="px-3 py-1 bg-gray-700 rounded">▶</button>
            </>
          )}

          <button
            onClick={() => setView("month")}
            className={`px-3 py-1 rounded ${view === "month" ? "bg-indigo-600" : "bg-gray-700"}`}
          >
            Month
          </button>

          <button
            onClick={() => setView("week")}
            className={`px-3 py-1 rounded ${view === "week" ? "bg-indigo-600" : "bg-gray-700"}`}
          >
            Week
          </button>

          <button
            onClick={() => {
              const today = new Date();
              setCurrentMonth(today);
              setWeekStart(startOfWeek(today));
              setView("week");
            }}
            className="px-3 py-1 bg-gray-700 rounded"
          >
            Today
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-indigo-600 px-4 py-2 rounded-lg text-sm"
          >
            Appointment Requests
          </button>
        </div>
      </div>

      {/* MONTH VIEW */}
      {view === "month" && (
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => (
            <div key={d} className="text-xs text-center text-gray-400">{d}</div>
          ))}

          {monthGrid.map((day) => (
            <div
              key={day.toISOString()}
              className={`border border-white/10 p-2 h-24 ${
                day.getMonth() === currentMonth.getMonth() ? "bg-[#0b0d12]" : "bg-gray-900/50"
              }`}
            >
              <div className="text-xs mb-1">{day.getDate()}</div>

              {events.filter((e) => isSameDay(e.date, day)).map((e) => (
                <div
                  key={e.id}
                  className={`text-[10px] rounded px-1 py-0.5 text-white ${SERVICE_STYLES[e.service]}`}
                >
                  {e.title}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* WEEK VIEW */}
      {view === "week" && (
        <div className="grid grid-cols-8 border-t border-white/10">
          {/* TIME COLUMN */}
          <div className="border-r border-white/10">
            <div className="h-8 border-b border-white/10"></div>
            {clinicHours.map(hour => (
              <div key={hour} className="h-16 text-xs text-gray-400 flex items-center justify-end pr-2 border-b border-white/10">
                {hour <= 11 ? `${hour}:00 AM` : hour === 12 ? `12:00 PM` : `${hour-12}:00 PM`}
              </div>
            ))}
          </div>

          {/* DAYS */}
          {weekDays.map(day => (
            <div key={day.toISOString()} className="border-r border-white/10">
              <div className="h-8 text-center border-b border-white/10">{days[day.getDay()]} {day.getDate()}</div>
              {clinicHours.map(hour => (
                <div key={hour} className="h-16 border-b border-white/10 relative">
                  {events.filter(e => isSameDay(e.date, day) && parseInt(e.time.split(":")[0]) === (hour <= 12 ? hour : hour - 12)).map(e => (
                    <div
                      key={e.id}
                      className={`absolute top-1 left-1 right-1 text-[10px] rounded px-1 py-0.5 text-white ${SERVICE_STYLES[e.service]}`}
                    >
                      {e.title}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* LEGEND */}
      <div className="flex gap-4 mt-4 text-xs text-gray-300">
        <Legend color="bg-blue-500" label="Ear" />
        <Legend color="bg-green-500" label="Nose" />
        <Legend color="bg-purple-500" label="Throat" />
        <Legend color="bg-pink-500" label="Aesthetics" />
      </div>

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

/* ================= LEGEND ================= */

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
}
