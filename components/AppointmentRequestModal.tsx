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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="
          w-full max-w-4xl
          bg-white
          rounded-2xl
          shadow-2xl shadow-black/15
          ring-1 ring-black/5
          flex flex-col
          max-h-[80vh]
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-800">
            Appointment Requests
          </h2>
          <button
            onClick={() => setOpenModal(false)}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>

        {/* TABLE HEADER */}
        <div className="
          px-6 py-3
          grid grid-cols-12
          text-xs font-semibold
          text-gray-500
          uppercase
          border-b border-gray-200
          bg-gray-50
          sticky top-[64px]
          z-10
        ">
          <p className="col-span-5">Patient</p>
          <p className="col-span-3">Date</p>
          <p className="col-span-3">Location</p>
          <span></span>
        </div>

        {/* TABLE BODY */}
        <div className="px-6 overflow-y-auto divide-y divide-gray-100">
          {newBookings.map((r) => (
            <div
              key={r.id}
              className="
                grid grid-cols-12 items-center
                py-4
                hover:bg-gray-50
                transition
              "
            >
              {/* Patient Info */}
              <div className="col-span-5 flex items-center gap-3">
                <Image
                  src={r.avatar || "/default-avatar.png"}
                  alt="avatar"
                  width={42}
                  height={42}
                  className="rounded-full object-cover ring-1 ring-gray-200"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {r.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {r.type} • {r.label}
                  </p>
                </div>
              </div>

              {/* Date */}
              <p className="col-span-3 text-sm text-gray-700">
                {r.start?.toDateString() || "N/A"}
              </p>

              {/* Location */}
              <p className="col-span-3 text-sm text-gray-700">
                {r.location || "N/A"}
              </p>

              {/* Actions */}
              <div className="col-span-1 flex items-center justify-end gap-2 relative">
                <button
                  onClick={() => handleEdit(r)}
                  className="
                    px-3 py-1.5
                    bg-violet-600
                    text-white
                    rounded-full
                    text-xs font-semibold
                    hover:bg-violet-700
                    transition
                    shadow-sm
                  "
                >
                  Confirm
                </button>

                {/* More menu */}
                <button
                  onClick={() =>
                    setMenuOpenId(menuOpenId === r.id ? null : r.id)
                  }
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                >
                  <MoreHorizontal size={16} className="text-gray-500" />
                </button>

                {menuOpenId === r.id && (
                  <div
                    className="
                      absolute right-0 top-9
                      bg-white
                      border border-gray-200
                      rounded-xl
                      shadow-lg
                      w-48
                      text-sm
                      overflow-hidden
                      z-20
                    "
                  >
                    <button
                      onClick={() => handleEdit(r)}
                      className="
                        flex items-center gap-2
                        px-4 py-2.5
                        hover:bg-gray-50
                        w-full
                        text-gray-700
                      "
                    >
                      ✏️ Edit Date & Time
                    </button>
                    <button
                      className="
                        flex items-center gap-2
                        px-4 py-2.5
                        hover:bg-red-50
                        text-red-600
                        w-full
                      "
                    >
                      <X size={14} /> Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {newBookings.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No appointment requests.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
