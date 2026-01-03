"use client";

import { useState } from "react";

type Patient = {
  id: number;
  name: string;
  email: string;
  age: string;
  gender: string;
  phone: string;
  address: string;
};

// Mock data
const patientList: Patient[] = [
  {
    id: 1,
    name: "Jessica Ong",
    email: "JessicaOng@gmail.com",
    age: "22 years old",
    gender: "Female",
    phone: "09609464444",
    address: "Polintan",
  },
];

export default function PatientsPage() {
  const [selected, setSelected] = useState<Patient | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSoap, setShowSoap] = useState(false);
  const [tab, setTab] = useState("info");
  const [showAddPatient, setShowAddPatient] = useState(false); // ✅ Add Patient state
  const [showMedicalHistoryModal, setShowMedicalHistoryModal] = useState(false);


  const openDetails = (p: Patient) => {
    setSelected(p);
    setTab("info");
    setShowDetails(true);   // 👁 Patient Details View
  };

  const openSoap = (p: Patient) => {
    setSelected(p);
    setShowSoap(true);     // 🖊 SOAP Note
  };

  return (
    <section className="p-6 bg-[#0f1115] text-white space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <button
          onClick={() => setShowAddPatient(true)}
          className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition"
        >
          + Add Patient
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border border-gray-700 rounded-xl overflow-hidden">
        <thead className="bg-[#13161d]">
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th className="text-right pr-6">Action</Th>
          </tr>
        </thead>

        <tbody>
          {patientList.map((p) => (
            <tr key={p.id} className="border-t border-gray-700">
              <Td>{p.name}</Td>
              <Td>{p.email}</Td>
              <Td>
                <div className="flex justify-end gap-3 pr-4">
                  {/* 👁 VIEW */}
                  <button
                    onClick={() => openDetails(p)}
                    className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                  >
                    👁
                  </button>

                  {/* 🖊 SOAP NOTE */}
                  <button
                    onClick={() => openSoap(p)}
                    className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                  >
                    🖊
                  </button>

                  {/* 🗑 DELETE */}
                  <button
                    className="px-3 py-2 rounded-lg bg-red-700/70 hover:bg-red-700"
                    onClick={() => alert("Delete record")}
                  >
                    🗑
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* VIEW DETAILS MODAL */}
      <PatientDetailsModal
        open={showDetails}
        onClose={() => setShowDetails(false)}
        patient={selected}
        tab={tab}
        setTab={setTab}
      />

      {/* SOAP NOTE MODAL */}
      <SoapNoteModal
        open={showSoap}
        onClose={() => setShowSoap(false)}
        patient={selected}
      />

      {/* ADD PATIENT MODAL */}
      <AddPatientModal
        open={showAddPatient}
        onClose={() => setShowAddPatient(false)}
      />
       <PatientDetailsModal
         open={showDetails}
         onClose={() => setShowDetails(false)}
         patient={selected}
         tab={tab}
         setTab={setTab}
         onCreateMedicalHistory={() => setShowMedicalHistoryModal(true)} // ✅ New prop
      />
      {/* NEW MEDICAL HISTORY MODAL */}
       <MedicalHistoryModal
       open={showMedicalHistoryModal}
       onClose={() => setShowMedicalHistoryModal(false)}
      />
    </section>
    
  );
}

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

/* ---------------------------- SOAP NOTE ---------------------------- */
const SoapNoteModal = ({ open, onClose, patient }: { open: boolean; onClose: () => void; patient: any }) => {
  if (!open || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[820] max-h-[92vh] bg-[#111318] text-gray-200 rounded-2xl border border-gray-700 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">SOAP Note</h2>
            <p className="text-sm text-gray-400">{patient.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#1b1f27] text-gray-400 hover:text-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-8">
          <SectionLabel title="SUBJECTIVE" />
          <FieldBlock label="Chief Complaint" placeholder="Enter patient's chief complaint" />
          <FieldBlock label="History of Present Illness" placeholder="Describe symptoms, duration, onset..." />

          <SectionLabel title="OBJECTIVE" subtitle="(Select templates or attach Labs, Results, Vitals, Notes, etc.)" />
          <FieldBlock label="Remarks" placeholder="Physical exam findings, observations..." />
          <ActionChips options={["Add Remarks"]} />

          <SectionLabel title="ASSESSMENT" />
          <FieldBlock label="Diagnosis" placeholder="Enter diagnosis / impression" />
          <ActionChips options={["Add Diagnosis", "Add ICD-10", "Add Remarks"]} />

          <SectionLabel title="PLAN" />
          <FieldBlock label="Plan" placeholder="Treatment plan, medications, follow-up..." />
          <ActionChips options={["Add Plan", "Add Procedure", "Add PhilHealth", "Add Remarks"]} />
          <FieldBlock label="Follow-up Check-up" placeholder="Clinic and Date" />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-700 bg-[#0f1115] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-[#1b1f27] transition"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition">
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

/* ----------------------- ADD PATIENT MODAL ----------------------- */
const AddPatientModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [tab, setTab] = useState("personal");
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[820] max-h-[90vh] bg-[#111318] text-gray-200 rounded-2xl border border-gray-700 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Add New Patient</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#1b1f27] text-gray-400 hover:text-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 py-4 border-b border-gray-700 flex gap-6">
          {[
            { id: "personal", label: "Personal Information" },
            { id: "emergency", label: "Emergency Contact" },
            { id: "physician", label: "Physician Info" },
            { id: "consent", label: "Patient Consent" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`pb-2 text-sm font-medium ${
                tab === t.id
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          {tab === "personal" && (
            <div className="grid grid-cols-2 gap-4">
              <FieldBlock label="Full Name" placeholder="Enter full name" />
              <FieldBlock label="Email" placeholder="Enter email address" />
              <FieldBlock label="Age" placeholder="Enter age" />
              <FieldBlock label="Gender" placeholder="Male/Female/Other" />
              <FieldBlock label="Phone Number" placeholder="Enter phone number" />
              <FieldBlock label="Address" placeholder="Enter address" />
            </div>
          )}
          {tab === "emergency" && (
            <div className="grid grid-cols-2 gap-4">
              <FieldBlock label="Contact Name" placeholder="Enter contact name" />
              <FieldBlock label="Relationship" placeholder="Relationship to patient" />
              <FieldBlock label="Phone Number" placeholder="Enter contact number" />
              <FieldBlock label="Alternate Phone" placeholder="Optional" />
            </div>
          )}
          {tab === "physician" && (
            <div className="grid grid-cols-2 gap-4">
              <FieldBlock label="Primary Physician" placeholder="Physician name" />
              <FieldBlock label="Clinic/Hospital" placeholder="Clinic or hospital" />
              <FieldBlock label="Phone Number" placeholder="Physician phone" />
              <FieldBlock label="Email" placeholder="Physician email" />
            </div>
          )}
          {tab === "consent" && (
            <div className="space-y-4">
              <FieldBlock label="Consent Form" placeholder="Type patient consent or notes here..." />
              <div className="flex items-center gap-2">
                <input type="checkbox" id="consent" className="accent-purple-500" />
                <label htmlFor="consent" className="text-sm text-gray-300">
                  I hereby consent to the treatment and data collection.
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-700 bg-[#0f1115] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-[#1b1f27] transition"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition">
            Save Patient
          </button>
        </div>
      </div>
    </div>
  );
};
const MedicalHistoryModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[700] max-h-[90vh] bg-[#111318] text-gray-200 rounded-2xl border border-gray-700 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">New Medical History</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 p-2 rounded-lg">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-4">
          <FieldBlock label="Type" placeholder="Type of medical history" />
          <FieldBlock label="Result Date" placeholder="YYYY-MM-DD" />
          <FieldBlock label="Lab (Optional)" placeholder="Lab name or leave blank" />
          <FieldBlock label="Remarks" placeholder="Additional notes..." />

          <div>
            <p className="text-sm font-medium text-gray-300 mb-1">Add Photos (Optional)</p>
            <input type="file" multiple accept="image/*" className="w-full text-gray-200" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-700 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-[#1b1f27] transition"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition">
            Save History
          </button>
        </div>
      </div>
    </div>
  );
};


/* -------------------------- UI HELPERS -------------------------- */
const Field = ({ label, value }: any) => (
  <div>
    <p className="text-xs opacity-60 mb-1">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const Placeholder = ({ text }: any) => (
  <p className="opacity-70">{text}</p>
);

const FieldBlock = ({ label, placeholder }: { label: string; placeholder?: string }) => (
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-300">{label}</p>
    <textarea
      rows={2}
      placeholder={placeholder}
      className="w-full rounded-xl px-3 py-2 text-sm
                 bg-[#0f1115] text-gray-200
                 border border-gray-700
                 placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
    />
  </div>
);

const Th = ({ children, className = "" }: any) => (
  <th className={`px-4 py-3 text-left ${className}`}>{children}</th>
);

const Td = ({ children }: any) => (
  <td className="px-4 py-3">{children}</td>
);

const SectionLabel = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-1">
    <p className="text-xs font-semibold tracking-widest text-gray-400">{title}</p>
    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
  </div>
);

const ActionChips = ({ options }: { options: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-1">
    {options.map((o) => (
      <button
        key={o}
        className="px-3 py-1.5 rounded-full text-xs
                   border border-gray-600
                   bg-[#13161d] text-gray-300
                   hover:bg-[#1b1f27] hover:border-gray-500 transition"
      >
        + {o}
      </button>
    ))}
  </div>
);
