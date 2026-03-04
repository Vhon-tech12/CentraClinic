"use client";
import { Field } from "./UIHelpers";
import { Placeholder } from "./UIHelpers";
import PatientNotes from "./PatientNotes";

/* ----------------------- PATIENT DETAILS VIEW ----------------------- */
const PatientDetailsModal = ({
  open,
  onClose,
  patient,
  tab,
  setTab,
  onCreateMedicalHistory,
}: any) => {
  if (!open || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="
          `w-[950px]
          bg-white
          rounded-2xl
          p-6
          border border-gray-200
          shadow-2xl shadow-black/10
          ring-1 ring-black/5
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Patient Details
          </h2>
          <button
            onClick={onClose}
            className="
              text-gray-500
              hover:text-gray-800
              transition
              text-lg
            "
          >
            ✕
          </button>
        </div>

        {/* Patient Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="
              w-16 h-16
              rounded-full
              bg-gray-100
              ring-2 ring-violet-200
              flex items-center justify-center
              text-gray-400
              font-semibold
            "
          >
            {/* optional initials */}
            {patient.name?.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {patient.name}
            </h3>
            <p className="text-sm text-gray-500">
              {patient.email}
            </p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          {[
            { id: "info", label: "Patient Information" },
            { id: "notes", label: "Notes" },
            { id: "treatment", label: "Next Treatment" },
            { id: "medical", label: "Medical History" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`
                pb-3
                text-sm
                font-medium
                transition
                ${
                  tab === t.id
                    ? "text-violet-600 border-b-2 border-violet-600"
                    : "text-gray-500 hover:text-gray-800"
                }
              `}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        {tab === "info" && (
          <div
            className="
              grid grid-cols-2 gap-6
              bg-gray-50
              p-5
              rounded-xl
              border border-gray-200
            "
          >
            <Field label="Age" value={patient.age} />
            <Field label="Gender" value={patient.gender} />
            <Field label="Mobile Number" value={patient.phone} />
            <Field label="Address" value={patient.address} />
            <Field label="Email Address" value={patient.email} />
          </div>
        )}

        {tab === "notes" && (
          <div
            className="
              bg-gray-50
              p-5
              rounded-xl
              border border-gray-200
            "
          >
            <PatientNotes patient={patient} />
          </div>
        )}

        {tab === "treatment" && (
          <div
            className="
              bg-gray-50
              p-5
              rounded-xl
              border border-gray-200
            "
          >
            <Placeholder text="Next treatment..." />
          </div>
        )}

        {tab === "medical" && (
          <div
            className="
              flex justify-between items-center
              bg-gray-50
              p-5
              rounded-xl
              border border-gray-200
            "
          >
            <Placeholder text="Medical history..." />
            <button
              onClick={onCreateMedicalHistory}
              className="
                px-4 py-2
                rounded-lg
                bg-violet-600
                hover:bg-violet-700
                text-white
                font-medium
                transition
                shadow-md
              "
            >
              + Create Medical History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetailsModal;
