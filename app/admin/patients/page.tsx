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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  const patientList = [
    { id: 1, name: "Jessica Ong", email: "JessicaOng@gmail.com", age: "22", gender: "Female", phone: "09609464444", address: "Polintan" },
    { id: 2, name: "Juan Dela Cruz", email: "juan@gmail.com", age: "30", gender: "Male", phone: "09123456789", address: "Makati" },
    { id: 3, name: "Maria Santos", email: "maria@gmail.com", age: "27", gender: "Female", phone: "09234567890", address: "Quezon City" },
    { id: 4, name: "Liza Ramos", email: "liza@gmail.com", age: "35", gender: "Female", phone: "09345678901", address: "Pasig" },
    { id: 5, name: "Carlos Mendoza", email: "carlos@gmail.com", age: "40", gender: "Male", phone: "09456789012", address: "Mandaluyong" },
    { id: 6, name: "Ana Lopez", email: "ana@gmail.com", age: "28", gender: "Female", phone: "09567890123", address: "Taguig" },
    { id: 7, name: "Ana kyut Lopez", email: "ana@gmail.com", age: "28", gender: "Female", phone: "09567890123", address: "Taguig" },
    { id: 8, name: "Anamarrie Lopez", email: "ana@gmail.com", age: "28", gender: "Female", phone: "09567890123", address: "Taguig" },
    // Add more dummy patients for testing
  ];

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patientList.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(patientList.length / patientsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <section className="p-6 bg-gray-50 text-gray-800 space-y-6 min-h-screen">

      {/* WELCOME BANNER */}
      <div className="bg-linear-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold">Welcome Back Doctor 👋</h2>
        <p className="text-sm opacity-90 mt-1">Manage patients, view records, and add new appointments here.</p>
      </div>

      {/* HEADER + ADD BUTTON */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Patients</h1>
        <button
          onClick={() => setShowAddPatient(true)}
          className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition text-white"
        >
          + Add Patient
        </button>
      </div>

      {/* PATIENT TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th className="text-right pr-6">Action</Th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map((p) => (
              <tr key={p.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                <Td>{p.name}</Td>
                <Td>{p.email}</Td>
                <Td>
                  <div className="flex justify-end gap-3 pr-4">
                    <button
                      onClick={() => { setSelected(p); setTab("info"); setShowDetails(true); }}
                      className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                      title="View Details"
                    >
                      👁
                    </button>
                    <button
                      onClick={() => { setSelected(p); setShowSoap(true); }}
                      className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                      title="Add SOAP Note"
                    >
                      🖊
                    </button>
                    <button
                      onClick={() => alert("Delete record")}
                      className="px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition"
                      title="Delete Patient"
                    >
                      🗑
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded-lg transition ${currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* MODALS */}
      <PatientDetailsModal
        open={showDetails}
        onClose={() => setShowDetails(false)}
        patient={selected}
        tab={tab}
        setTab={setTab}
        onCreateMedicalHistory={() => setShowMedicalHistoryModal(true)}
      />
      <SoapNoteModal open={showSoap} onClose={() => setShowSoap(false)} patient={selected} />
      <AddPatientModal open={showAddPatient} onClose={() => setShowAddPatient(false)} />
      <MedicalHistoryModal open={showMedicalHistoryModal} onClose={() => setShowMedicalHistoryModal(false)} />
    </section>
  );
}