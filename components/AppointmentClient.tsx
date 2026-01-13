"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

/* ================= MODAL COMPONENT ================= */
function BookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8 relative shadow-xl animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-lg font-bold"
        >
          ✕
        </button>

        <div className="flex justify-center gap-3 mb-6">
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                step >= n ? "bg-indigo-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Patient Type */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">Welcome!</h2>
            <p className="text-center text-gray-500 mb-6">Select your patient type to proceed</p>

            <div className="space-y-4">
              <button
                onClick={() => setStep(2)}
                className="w-full border border-indigo-600 text-indigo-700 font-medium py-3 rounded-xl hover:bg-indigo-50 transition"
              >
                Existing Patient
              </button>
              <button
                onClick={() => setStep(2)}
                className="w-full border border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition"
              >
                New Patient
              </button>
            </div>
          </>
        )}

        {/* Step 2: Clinic Appointment */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Clinic Appointment</h2>
            <p className="text-gray-500 text-center mb-4">Choose your preferred date for your clinic visit</p>

            <input
              type="date"
              className="w-full border border-gray-300 rounded-xl p-3 mb-6 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />

            <button
              onClick={() => setStep(3)}
              className="w-full bg-indigo-600 text-white font-medium py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Continue
            </button>
          </>
        )}

        {/* Step 3: Patient Details */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Patient Details</h2>

            <div className="space-y-4">
              <div className="relative">
                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="w-full border border-gray-300 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="Full Name"
                />
              </div>
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="w-full border border-gray-300 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="Email"
                />
              </div>
              <div className="relative">
                <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="w-full border border-gray-300 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-6 bg-indigo-600 text-white font-medium py-3 rounded-xl hover:bg-indigo-700 transition"
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

  useEffect(() => {
    if (searchParams.get("book") === "true") {
      setOpenModal(true);
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setOpenModal(false);
    window.history.replaceState({}, "", "/appointment");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Book Your Clinic Appointment</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Schedule your visit with our expert team in just a few simple steps. We make healthcare easy for you.
          </p>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-indigo-600 text-white font-medium py-4 px-8 rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-700 transition"
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
            Book Now
          </button>
        </div>

        <div className="flex-1">
          <img
            src="Centra-Doctor.jpg"
            alt="Clinic Appointment"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Select Patient Type", desc: "Choose whether you are a new or existing patient." },
          { title: "Pick a Date", desc: "Select your preferred clinic visit date." },
          { title: "Enter Details", desc: "Provide your contact and personal information." },
        ].map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-lg transition"
          >
            <div className="text-3xl font-bold text-indigo-600 mb-3">{index + 1}</div>
            <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-500">{step.desc}</p>
          </div>
        ))}
      </div>

      {openModal && <BookingModal onClose={handleCloseModal} />}
    </div>
  );
}
