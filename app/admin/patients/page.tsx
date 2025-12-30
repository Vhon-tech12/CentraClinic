"use client";
import { useState } from "react";

type Patient = {
  name: string;
  phone: string;
  email: string;
  age: number;
  lastVisit: string;
  treatment: string;
};

export default function AdminPatientPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const patient: Patient = {
    name: "Jessica Ong",
    phone: "0960946444",
    email: "JessicaOng@gmail.com",
    age: 22,
    lastVisit: "2025-03-15",
    treatment: "General Checkup",
  };

  return (
    <section className="flex-1 bg-[#0f1115] text-white p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <input
          type="text"
          placeholder="Search..."
          className="bg-[#181b20] px-4 py-2 rounded-lg text-sm outline-none border border-[#2a2d33]"
        />
      </div>

      {/* TABLE */}
      <div className="bg-[#181b20] rounded-xl p-6 h-[600] overflow-y-auto">
        <h2 className="font-medium mb-4">Patient List</h2>

        <table className="w-full text-sm">
          <thead className="bg-[#1f2228] text-gray-300 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left">Patient Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Age</th>
              <th className="px-4 py-3 text-left">Last Visit</th>
              <th className="px-4 py-3 text-right">Treatment</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-[#2a2d33] hover:bg-[#1a1d22]">
              <td className="px-4 py-3 font-medium">{patient.name}</td>
              <td className="px-4 py-3">{patient.phone}</td>
              <td className="px-4 py-3 text-gray-300">{patient.email}</td>
              <td className="px-4 py-3">{patient.age}</td>
              <td className="px-4 py-3">{patient.lastVisit}</td>
              <td className="px-4 py-3 text-right">{patient.treatment}</td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  {/* VIEW */}
                  <button
                    onClick={() => {
                      setSelectedPatient(patient);
                      setActiveTab("info");
                      setIsModalOpen(true);
                    }}
                    className="p-2 rounded-lg bg-[#1f2228] hover:bg-[#2a2d33]"
                  >
                    👁️
                  </button>

                  <button className="p-2 rounded-lg bg-[#1f2228] hover:bg-[#2a2d33]">
                    ✏️
                  </button>
                  <button className="p-2 rounded-lg bg-[#1f2228] hover:bg-[#2a2d33]">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && selectedPatient && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#181b20] w-[900] h-[600] rounded-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-500" />
                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedPatient.name}
                  </h2>
                  <p className="text-sm text-gray-400">Patient Details</p>
                </div>
              </div>

              <button className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg text-sm">
                Confirm
              </button>
            </div>

            {/* TABS */}
            <div className="flex gap-6 border-b border-[#2a2d33] mb-6">
              {[
                { key: "info", label: "Patient Information" },
                { key: "appointments", label: "Appointment History" },
                { key: "treatment", label: "Next Treatment" },
                { key: "medical", label: "Medical History" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-3 text-sm ${
                    activeTab === tab.key
                      ? "text-purple-500 border-b-2 border-purple-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* CONTENT */}
            <div className="h-[400] overflow-y-auto text-sm">
              {activeTab === "info" && (
                <div className="grid grid-cols-3 gap-6">
                  <InfoItem label="Age" value={`${selectedPatient.age} years old`} />
                  <InfoItem label="Gender" value="Female" />
                  <InfoItem label="Email Address" value={selectedPatient.email} />
                  <InfoItem label="Mobile Number" value={selectedPatient.phone} />
                  <InfoItem label="Address" value="Polintan" />
                </div>
              )}

              {activeTab === "appointments" && (
                <p className="text-gray-400">
                  Appointment history will appear here.
                </p>
              )}

              {activeTab === "treatment" && (
                <p className="text-gray-400">
                  Next scheduled treatment details.
                </p>
              )}

              {activeTab === "medical" && (
                <div className="grid grid-cols-2 gap-6">
                  <InfoItem label="Allergies" value="None" />
                  <InfoItem label="Particular Sickness" value="N/A" />
                </div>
              )}
            </div>

            {/* CLOSE */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* REUSABLE INFO ITEM */
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-400 mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
