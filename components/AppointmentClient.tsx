// app/appointment/page.tsx
"use client"; // important! makes the whole page a client component

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

/* ================= MODAL COMPONENT ================= */

function BookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`w-3 h-3 rounded-full ${
                step >= n ? "bg-indigo-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Hi!</h2>
            <p className="text-gray-500 mb-6">Please select patient type</p>

            <div className="space-y-3">
              <button
                onClick={() => setStep(2)}
                className="w-full border rounded-full py-3"
              >
                I'm an Existing Patient
              </button>
              <button
                onClick={() => setStep(2)}
                className="w-full border rounded-full py-3"
              >
                I'm a New Patient
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Appointment Type</h2>

            <div className="flex gap-3 mb-4">
              <button className="flex-1 py-2 rounded-full bg-indigo-100 text-indigo-700">
                Virtual Consult
              </button>
              <button className="flex-1 py-2 rounded-full border">
                Clinic Visit
              </button>
            </div>

            <input type="date" className="w-full border rounded-lg p-3 mb-4" />

            <button
              onClick={() => setStep(3)}
              className="w-full bg-indigo-600 text-white py-3 rounded-full"
            >
              Continue
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Patient Details</h2>

            <div className="space-y-3">
              <input
                className="w-full border p-3 rounded-lg"
                placeholder="First Name"
              />
              <input
                className="w-full border p-3 rounded-lg"
                placeholder="Last Name"
              />
              <input
                className="w-full border p-3 rounded-lg"
                placeholder="Email"
              />
              <input
                className="w-full border p-3 rounded-lg"
                placeholder="Phone Number"
              />
            </div>

            <button
              onClick={onClose}
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-full"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= MAIN PAGE COMPONENT ================= */

export default function AppointmentPage() {
  const searchParams = useSearchParams();
  const [openModal, setOpenModal] = useState(false);

  // Automatically open modal if URL has ?book=true
  useEffect(() => {
    if (searchParams.get("book") === "true") {
      setOpenModal(true);
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setOpenModal(false);
    // Remove query param from URL without reload
    window.history.replaceState({}, "", "/appointment");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Book Your Appointment</h1>
          <p className="text-gray-600">
            Schedule a consultation with our expert team.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faCalendarAlt} />
          Book Appointment
        </button>

        {openModal && <BookingModal onClose={handleCloseModal} />}
      </div>
    </div>
  );
}
