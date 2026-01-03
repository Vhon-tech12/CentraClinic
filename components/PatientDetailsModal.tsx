"use client";
import { Field } from "./UIHelpers";
import { Placeholder } from "./UIHelpers";





/* ----------------------- PATIENT DETAILS VIEW ----------------------- */
const PatientDetailsModal = ({ open, onClose, patient, tab, setTab, onCreateMedicalHistory}: any) => {
  if (!open || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-[950] bg-[#111318] rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Patient Details</h2>
          <button onClick={onClose} className="opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>

        {/* Patient Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-600" />
          <div>
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <p className="text-sm opacity-70">{patient.email}</p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-8 border-b border-gray-700 mb-6">
          {[
            { id: "info", label: "Patient Information" },
            { id: "notes", label: "Notes" },
            { id: "treatment", label: "Next Treatment" },
            { id: "medical", label: "Medical History" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`pb-2 ${
                tab === t.id
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        {tab === "info" && (
          <div className="grid grid-cols-2 gap-6">
            <Field label="Age" value={patient.age} />
            <Field label="Gender" value={patient.gender} />
            <Field label="Mobile Number" value={patient.phone} />
            <Field label="Address" value={patient.address} />
            <Field label="Email Address" value={patient.email} />
          </div>
        )}
        {tab === "notes" && <Placeholder text="Start Notes......" />}
        {tab === "treatment" && <Placeholder text="Next treatment..." />}
        {tab === "medical" && (
    <div className="flex justify-between items-center">
       <Placeholder text="Medical history..." />
    <button
      onClick={onCreateMedicalHistory} // <-- use the prop we pass from PatientsPage
      className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition"
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