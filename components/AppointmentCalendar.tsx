"use client";

import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { Bell } from "lucide-react";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": require("date-fns/locale/en-US") };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CustomToolbar = (toolbar: any) => (
  <div className="flex items-center justify-between px-2 mb-3">
    <div className="flex items-center gap-2">
      <button onClick={() => toolbar.onNavigate("TODAY")} className="btn">Today</button>
      <button onClick={() => toolbar.onNavigate("PREV")} className="btn">‹</button>
      <button onClick={() => toolbar.onNavigate("NEXT")} className="btn">›</button>
      <h2 className="ml-3 text-lg font-semibold">{toolbar.label}</h2>
    </div>
    <div className="flex gap-2">
      {["month", "week", "day"].map(view => (
        <button
          key={view}
          onClick={() => toolbar.onView(view)}
          className={`btn ${toolbar.view === view ? "bg-blue-600" : ""}`}
        >
          {view}
        </button>
      ))}
    </div>
  </div>
);

const eventStyleGetter = () => ({
  style: { backgroundColor: "#2563eb", borderRadius: "12px", border: "none" },
});

type Appointment = {
  id: string;
  fullName: string;
  serviceType: string;
  appointmentDate: string;
  status: "PENDING" | "CONFIRMED" | "REJECTED";
};

export default function AppointmentCalendar() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Only one fetch function
  const fetchAppointments = async () => {
    try {
      console.log("Fetching appointments...");
      const res = await fetch("/api/admin/appointment");
      console.log("Fetch response status:", res.status);
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Fetch failed:", res.status, errorText);
        throw new Error("Fetch failed");
      }
      const data = await res.json();
      console.log("Raw appointments data:", data);
      // Map the data to ensure fullName is available (from user.name if needed)
      const mappedAppointments = data.appointments.map((appt: any) => ({
        ...appt,
        fullName: appt.fullName || appt.user?.name || "Unknown",
        email: appt.email || appt.user?.email || "",
      }));
      console.log("Mapped appointments:", mappedAppointments);
      setAppointments(mappedAppointments);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Only one useEffect
  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateAppointmentStatus = async (id: string, status: "CONFIRMED" | "REJECTED") => {
    try {
      const res = await fetch("/api/admin/appointment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Update failed: ${res.status} ${res.statusText}`, errorText);
        throw new Error(`Update failed: ${res.status} ${res.statusText}`);
      }

      // Update the local state after PATCH
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch (err) {
      console.error("Failed to update appointment", err);
    }
  };

  const events = appointments
    .filter(a => a.status === "CONFIRMED")
    .map(a => ({
      id: a.id,
      title: `${a.fullName} — ${a.serviceType}`,
      start: new Date(a.appointmentDate),
      end: new Date(new Date(a.appointmentDate).getTime() + 60 * 60 * 1000),
    }));

  const requests = appointments.filter(a => a.status === "PENDING");

  if (loading) return <p className="text-white p-6">Loading…</p>;

  return (
    <section className="p-6 text-white space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <button onClick={() => setOpenModal(true)} className="btn relative">
          <Bell size={18} /> Requests
          {requests.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1.5 py-0.5 rounded-full shadow">
              {requests.length}
            </span>
          )}
        </button>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 520 }}
        components={{ toolbar: CustomToolbar }}
        eventPropGetter={eventStyleGetter}
      />

      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#111318] rounded-2xl shadow-2xl w-[600px] p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Appointment Requests</h2>
              <button onClick={() => setOpenModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            {requests.length === 0 && <p>No pending requests</p>}
            {requests.map(r => (
              <div key={r.id} className="flex justify-between items-center p-3 bg-[#1b1f29] rounded-lg mb-2">
                <p>{r.fullName} — {r.serviceType}</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-600 rounded" onClick={() => updateAppointmentStatus(r.id, "CONFIRMED")}>Approve</button>
                  <button className="px-3 py-1 bg-red-600 rounded" onClick={() => updateAppointmentStatus(r.id, "REJECTED")}>Reject</button>
                </div>
              </div>
            ))}
            <button onClick={() => setOpenModal(false)} className="px-4 py-2 bg-gray-700 rounded">Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
