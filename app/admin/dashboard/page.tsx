"use client";

import { useState } from "react";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import AppointmentRequestsModal from "@/components/AppointmentRequestModal";
import EditAppointmentModal from "@/components/EditAppoinmentModal";
import { Bell } from "lucide-react";

export default function AppointmentsPage() {
  const [events, setEvents] = useState<any[]>([
    { id: 1, title: "Juan Dela Cruz — Consultation", start: new Date(2026, 0, 4, 10, 0), end: new Date(2026, 0, 4, 11, 0) },
    { id: 2, title: "Maria Santos — Follow-up", start: new Date(2026, 0, 5, 14, 0), end: new Date(2026, 0, 5, 14, 30) },
  ]);

  const [newBookings, setNewBookings] = useState<any[]>([
    { id: 3, name: "Pedro Reyes", avatar: "/avatar.png", type: "Virtual Consult", label: "Follow-up", start: new Date(2026, 0, 6, 15, 0), end: new Date(2026, 0, 6, 15, 30), location: "Centra Virtual Clinic" },
    { id: 4, name: "Ana Cruz", avatar: "/avatar.png", type: "Clinic Visit", label: "New Patient", start: new Date(2026, 0, 6, 16, 0), end: new Date(2026, 0, 6, 16, 30), location: "Centra Health Manila" },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const handleEdit = (appointment: any) => {
    setSelectedAppointment({ ...appointment });
    setEditModalOpen(true);
    setMenuOpenId(null);
  };

  const saveEdit = () => {
    if (selectedAppointment) {
      const isExisting = events.some((e) => e.id === selectedAppointment.id);
      if (isExisting) {
        setEvents((prev) =>
          prev.map((e) =>
            e.id === selectedAppointment.id
              ? { ...e, start: selectedAppointment.start, end: selectedAppointment.end }
              : e
          )
        );
      } else {
        setEvents((prev) => [
          ...prev,
          { id: selectedAppointment.id, title: `${selectedAppointment.name} — ${selectedAppointment.label}`, start: selectedAppointment.start, end: selectedAppointment.end },
        ]);
        setNewBookings((prev) => prev.filter((b) => b.id !== selectedAppointment.id));
      }
    }
    setEditModalOpen(false);
  };

  return (
    <section className="flex-1 bg-[#0e1014] min-h-screen text-white p-6 space-y-6">
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

      <AppointmentCalendar events={events} />

      {openModal && (
        <AppointmentRequestsModal
          newBookings={newBookings}
          menuOpenId={menuOpenId}
          setMenuOpenId={setMenuOpenId}
          handleEdit={handleEdit}
          setOpenModal={setOpenModal}
        />
      )}

      {editModalOpen && selectedAppointment && (
        <EditAppointmentModal
          selectedAppointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
          setEditModalOpen={setEditModalOpen}
          saveEdit={saveEdit}
        />
      )}
    </section>
  );
}
