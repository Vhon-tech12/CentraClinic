"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { Bell, MoreHorizontal, Clock, X } from "lucide-react";
import Image from "next/image";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

/* ===== Custom Toolbar ===== */
const CustomToolbar = (toolbar: any) => {
  const goToBack = () => toolbar.onNavigate("PREV");
  const goToNext = () => toolbar.onNavigate("NEXT");
  const goToToday = () => toolbar.onNavigate("TODAY");

  return (
    <div className="flex items-center justify-between px-2 mb-3">
      <div className="flex items-center gap-2">
        <button
          onClick={goToToday}
          className="px-3 py-1.5 text-sm rounded-lg bg-[#1b1f29] border border-white/10 hover:bg-[#222736]"
        >
          Today
        </button>

        <button
          onClick={goToBack}
          className="px-3 py-1.5 text-sm rounded-lg bg-[#1b1f29] border border-white/10 hover:bg-[#222736]"
        >
          ‹
        </button>

        <button
          onClick={goToNext}
          className="px-3 py-1.5 text-sm rounded-lg bg-[#1b1f29] border border-white/10 hover:bg-[#222736]"
        >
          ›
        </button>

        <h2 className="ml-3 text-lg font-semibold">{toolbar.label}</h2>
      </div>

      <div className="flex gap-2">
        {["month", "week", "day"].map((view) => (
          <button
            key={view}
            onClick={() => toolbar.onView(view)}
            className={`px-3 py-1.5 text-sm rounded-lg capitalize ${
              toolbar.view === view
                ? "bg-blue-500"
                : "bg-[#1b1f29] border border-white/10 hover:bg-[#222736]"
            }`}
          >
            {view}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ===== Event Styling ===== */
const eventStyleGetter = () => ({
  style: {
    backgroundColor: "#2563eb",
    borderRadius: "12px",
    padding: "4px 6px",
    border: "none",
  },
});

export default function AppointmentCalendar() {
  const [openModal, setOpenModal] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Juan Dela Cruz — Consultation",
      start: new Date(2026, 0, 4, 10, 0),
      end: new Date(2026, 0, 4, 11, 0),
    },
    {
      id: 2,
      title: "Maria Santos — Follow-up",
      start: new Date(2026, 0, 5, 14, 0),
      end: new Date(2026, 0, 5, 14, 30),
    },
  ]);

  const [newBookings, setNewBookings] = useState([
    {
      id: 3,
      name: "Pedro Reyes",
      avatar: "/avatar.png",
      type: "Virtual Consult",
      label: "Follow-up",
      start: new Date(2026, 0, 6, 15, 0),
      end: new Date(2026, 0, 6, 15, 30),
      location: "Centra Virtual Clinic",
    },
    {
      id: 4,
      name: "Ana Cruz",
      avatar: "/avatar.png",
      type: "Clinic Visit",
      label: "New Patient",
      start: new Date(2026, 0, 6, 16, 0),
      end: new Date(2026, 0, 6, 16, 30),
      location: "Centra Health Manila",
    },
  ]);

  /* Handle opening the edit modal */
  const handleEdit = (appointment: any) => {
    setSelectedAppointment({ ...appointment }); // copy to avoid mutation
    setEditModalOpen(true);
    setMenuOpenId(null);
  };

  /* Save edited appointment */
  const saveEdit = () => {
    if (selectedAppointment) {
      // If appointment already exists in events, update it
      const isExisting = events.some((e) => e.id === selectedAppointment.id);

      if (isExisting) {
        setEvents((prev) =>
          prev.map((e) =>
            e.id === selectedAppointment.id
              ? { ...e, start: new Date(selectedAppointment.start), end: new Date(selectedAppointment.end) }
              : e
          )
        );
      } else {
        // New booking becomes confirmed event
        setEvents((prev) => [
          ...prev,
          {
            id: selectedAppointment.id,
            title: `${selectedAppointment.name} — ${selectedAppointment.label}`,
            start: new Date(selectedAppointment.start),
            end: new Date(selectedAppointment.end),
          },
        ]);
        setNewBookings((prev) => prev.filter((b) => b.id !== selectedAppointment.id));
      }
    }
    setEditModalOpen(false);
  };

  return (
    <section className="flex-1 bg-[#0e1014] min-h-screen text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-gray-400 text-sm">Calendar schedule & patient queue</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="relative flex items-center gap-2 bg-[#1b1f29] px-3 py-2 rounded-xl border border-white/10 hover:bg-[#222736] transition"
        >
          <Bell size={18} />
          <span className="text-sm">Appointment Requests</span>
          {newBookings.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1.5 py-0.5 rounded-full shadow">
              {newBookings.length}
            </span>
          )}
        </button>
      </div>

      {/* Calendar */}
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
            components={{ toolbar: CustomToolbar }}
            eventPropGetter={eventStyleGetter}
          />
        </div>
      </div>

      {/* ===== Appointment Requests Modal ===== */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[780] bg-[#111318] rounded-2xl shadow-2xl text-white">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold">Appointment Requests</h2>
              <button onClick={() => setOpenModal(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            {/* Table Head */}
            <div className="px-6 py-3 grid grid-cols-12 text-xs text-gray-400">
              <p className="col-span-5">PATIENT</p>
              <p className="col-span-3">DATE</p>
              <p className="col-span-3">LOCATION</p>
              <span></span>
            </div>

            {/* Table Rows */}
            <div className="px-6 pb-5">
              {newBookings.map((r) => (
                <div
                  key={r.id}
                  className="grid grid-cols-12 items-center py-4 border-b border-white/10 last:border-0"
                >
                  {/* Patient */}
                  <div className="col-span-5 flex items-center gap-3">
                    <Image src={r.avatar} alt="avatar" width={42} height={42} className="rounded-full" />
                    <div>
                      <p className="font-medium text-white">{r.name}</p>
                      <p className="text-sm text-gray-400">
                        {r.type} • {r.label}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <p className="col-span-3 text-sm text-white">{format(r.start, "MMM dd yyyy, EEE")}</p>

                  {/* Location */}
                  <p className="col-span-3 text-sm text-white">{r.location}</p>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(r)}
                      className="px-3 py-1.5 bg-blue-600 text-white border border-blue-700 rounded-full text-xs font-medium hover:bg-blue-700 transition"
                    >
                      CONFIRM
                    </button>

                    {/* Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setMenuOpenId(menuOpenId === r.id ? null : r.id)}
                        className="p-1 rounded hover:bg-white/10 transition"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {menuOpenId === r.id && (
                        <div className="absolute right-0 top-7 bg-[#1b1f29] border border-white/10 rounded-xl shadow-lg w-44 text-sm overflow-hidden">
                          <button
                            onClick={() => handleEdit(r)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 w-full text-white"
                          >
                            ✏️ Edit Date & Time
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 hover:bg-red-600/80 text-red-500 w-full">
                            <X size={14} /> Decline
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== Edit Appointment Modal ===== */}
      {editModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-[500] bg-[#111318] rounded-2xl shadow-2xl text-white p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Appointment</h2>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-400">Patient: {selectedAppointment.name}</p>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400">Start Time</label>
                <input
                  type="datetime-local"
                  value={format(selectedAppointment.start, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      start: new Date(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#1b1f29] border border-white/10 text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400">End Time</label>
                <input
                  type="datetime-local"
                  value={format(selectedAppointment.end, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      end: new Date(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#1b1f29] border border-white/10 text-white"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
