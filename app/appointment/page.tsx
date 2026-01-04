"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

/* ================= MODAL STEPS ================= */

function BookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Progress */}
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
            <p className="text-gray-500 mb-6">
              Please select patient type
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setStep(2)}
                className="w-full border rounded-full py-3 hover:bg-gray-50"
              >
                I'm an Existing Patient
              </button>

              <button
                onClick={() => setStep(2)}
                className="w-full border rounded-full py-3 hover:bg-gray-50"
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

            <input
              type="date"
              className="w-full border rounded-lg p-3 mb-4"
            />

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
              <input className="w-full border p-3 rounded-lg" placeholder="First Name" />
              <input className="w-full border p-3 rounded-lg" placeholder="Last Name" />
              <input className="w-full border p-3 rounded-lg" placeholder="Email" />
              <input className="w-full border p-3 rounded-lg" placeholder="Phone Number" />
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

/* ================= MAIN PAGE ================= */
export default function AppointmentPage() {
  const searchParams = useSearchParams();
  const [openModal, setOpenModal] = useState(false);

  // ✅ AUTO-OPEN MODAL WHEN FROM NAVBAR
  useEffect(() => {
    if (searchParams.get("book") === "true") {
      setOpenModal(true);
    }
  }, [searchParams]);

  // ✅ CLOSE MODAL + CLEAN URL
  const handleCloseModal = () => {
    setOpenModal(false);
    window.history.replaceState({}, "", "/appointment");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Schedule a consultation with our expert team at Centra Clinic PH.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">

            {/* LEFT */}
            <div className="bg-linear-to-br from-indigo-600 to-blue-700 text-white p-10">
              <h2 className="text-2xl font-bold mb-4">
                Why Choose Centra Clinic PH?
              </h2>

              <div className="space-y-6 mt-8">
                <Info icon={faClock} title="Flexible Hours" text="Mon–Sat: 8am to 6pm" />
                <Info icon={faPhone} title="Phone" text="09999562468" />
                <Info icon={faEnvelope} title="Email" text="centraclinicph@gmail.com" />
                <Info icon={faMapMarkerAlt} title="Location" text="Makati City" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-10">
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition"
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MODAL */}
      {openModal && <BookingModal onClose={handleCloseModal} />}
    </div>
  );
}

function Info({
  icon,
  title,
  text,
}: {
  icon: any;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-indigo-100 text-sm">{text}</p>
      </div>
    </div>
  );
}

