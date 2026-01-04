"use client";

import Image from "next/image";
import { MoreHorizontal, X } from "lucide-react";

interface Props {
  newBookings: any[];
  menuOpenId: number | null;
  setMenuOpenId: (id: number | null) => void;
  handleEdit: (appointment: any) => void;
  setOpenModal: (open: boolean) => void;
}

export default function AppointmentRequestsModal({
  newBookings,
  menuOpenId,
  setMenuOpenId,
  handleEdit,
  setOpenModal,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[780] bg-[#111318] rounded-2xl shadow-2xl text-white">
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
              <div className="col-span-5 flex items-center gap-3">
                <Image src={r.avatar} alt="avatar" width={42} height={42} className="rounded-full" />
                <div>
                  <p className="font-medium text-white">{r.name}</p>
                  <p className="text-sm text-gray-400">
                    {r.type} • {r.label}
                  </p>
                </div>
              </div>

              <p className="col-span-3 text-sm text-white">{r.start.toDateString()}</p>
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
  );
}
