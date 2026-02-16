"use client";

import { useState } from "react";
import PatientDetailsModal from "@/components/PatientDetailsModal";
import SoapNoteModal from "@/components/soapnotemodal";
import AddPatientModal from "@/components/AddPatientModal";
import MedicalHistoryModal from "@/components/medicalhistorymodal";
import { Th, Td } from "@/components/UIHelpers";

export default function PatientsPage() {
  const [selected, setSelected] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSoap, setShowSoap] = useState(false);
  const [tab, setTab] = useState("info");
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showMedicalHistoryModal, setShowMedicalHistoryModal] = useState(false);

  const patientList = [
    { id: 1, name: "Jessica Ong", email: "JessicaOng@gmail.com", age: "22", gender: "Female", phone: "09609464444", address: "Polintan" },
  ];

  return (
    <section className="p-6 bg-gray-50 text-gray-800 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Patients</h1>
        <button
          onClick={() => setShowAddPatient(true)}
          className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition text-white"
        >
          + Add Patient
        </button>
      </div>

      <table className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th className="text-right pr-6">Action</Th>
          </tr>
        </thead>
        <tbody>
          {patientList.map((p) => (
            <tr key={p.id} className="border-t border-gray-200">
              <Td>{p.name}</Td>
              <Td>{p.email}</Td>
              <Td>
                <div className="flex justify-end gap-3 pr-4">
                  <button onClick={() => { setSelected(p); setTab("info"); setShowDetails(true); }} className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700">👁</button>
                  <button onClick={() => { setSelected(p); setShowSoap(true); }} className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700">🖊</button>
                  <button onClick={() => alert("Delete record")} className="px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700">🗑</button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>

      <PatientDetailsModal open={showDetails} onClose={() => setShowDetails(false)} patient={selected} tab={tab} setTab={setTab} onCreateMedicalHistory={() => setShowMedicalHistoryModal(true)} />
      <SoapNoteModal open={showSoap} onClose={() => setShowSoap(false)} patient={selected} />
      <AddPatientModal open={showAddPatient} onClose={() => setShowAddPatient(false)} />
      <MedicalHistoryModal open={showMedicalHistoryModal} onClose={() => setShowMedicalHistoryModal(false)} />
    </section>
  );
}