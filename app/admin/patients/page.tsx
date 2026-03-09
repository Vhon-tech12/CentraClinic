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
  const [showMedicalHistoryModal, setShowMedicalHistoryModal] =
    useState(false);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  const patientList = [
    {
      id: 1,
      name: "Jessica Ong",
      email: "JessicaOng@gmail.com",
      age: "22",
      gender: "Female",
      phone: "09609464444",
      address: "Polintan",
      concern: "General Checkup",
      datetime: "2026-03-08 10:30 AM",
      status: "Completed",
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      email: "juan@gmail.com",
      age: "30",
      gender: "Male",
      phone: "09123456789",
      address: "Makati",
      concern: "Dental Cleaning",
      datetime: "2026-03-08 11:00 AM",
      status: "Ongoing",
    },
    {
      id: 3,
      name: "Maria Santos",
      email: "maria@gmail.com",
      age: "27",
      gender: "Female",
      phone: "09234567890",
      address: "Quezon City",
      concern: "Vaccination",
      datetime: "2026-03-07 09:30 AM",
      status: "Completed",
    },
    {
      id: 4,
      name: "Liza Ramos",
      email: "liza@gmail.com",
      age: "35",
      gender: "Female",
      phone: "09345678901",
      address: "Pasig",
      concern: "Checkup",
      datetime: "2026-03-06 01:00 PM",
      status: "Ongoing",
    },
    {
      id: 5,
      name: "Carlos Mendoza",
      email: "carlos@gmail.com",
      age: "40",
      gender: "Male",
      phone: "09456789012",
      address: "Mandaluyong",
      concern: "Physical Therapy",
      datetime: "2026-03-05 02:30 PM",
      status: "Completed",
    },
    {
      id: 6,
      name: "Ana Lopez",
      email: "ana@gmail.com",
      age: "28",
      gender: "Female",
      phone: "09567890123",
      address: "Taguig",
      concern: "Dental Check",
      datetime: "2026-03-08 03:00 PM",
      status: "Ongoing",
    },
    {
      id: 7,
      name: "Ana kyut Lopez",
      email: "ana@gmail.com",
      age: "28",
      gender: "Female",
      phone: "09567890123",
      address: "Taguig",
      concern: "Checkup",
      datetime: "2026-03-08 04:00 PM",
      status: "Ongoing",
    },
    {
      id: 8,
      name: "Anamarrie Lopez",
      email: "ana@gmail.com",
      age: "28",
      gender: "Female",
      phone: "09567890123",
      address: "Taguig",
      concern: "Consultation",
      datetime: "2026-03-08 05:00 PM",
      status: "Completed",
    },
  ];

  const filteredPatients = patientList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-orange-500",
    ];
    return colors[name.charCodeAt(0) % colors.length];
  };

  const getStatusStyle = (status: string) => {
    if (status === "Completed")
      return "bg-green-100 text-green-600 border border-green-200";
    if (status === "Ongoing")
      return "bg-blue-100 text-blue-600 border border-blue-200";
    return "bg-red-100 text-red-600 border border-red-200";
  };

  return (
    <section className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Patient Management</h2>
          <p className="text-sm opacity-90">
            View and manage all registered patients
          </p>
        </div>

        <button
          onClick={() => setShowAddPatient(true)}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          + Add Patient
        </button>
      </div>

      {/* SEARCH */}

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Total Patients:{" "}
          <span className="font-semibold">{filteredPatients.length}</span>
        </p>

        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search patient name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 pr-4 py-2 w-72 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide sticky top-0">
              <tr>
                <Th className="py-4">Patient</Th>
                <Th>Email</Th>
                <Th>Gender</Th>
                <Th>Concern</Th>
                <Th>Date & Time</Th>
                <Th>Status</Th>
                <Th className="text-right pr-6">Actions</Th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {currentPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    No patients found
                  </td>
                </tr>
              ) : (
                currentPatients.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-indigo-50 transition duration-150 cursor-pointer"
                  >
                    <Td className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold shadow ${getAvatarColor(
                            p.name
                          )}`}
                        >
                          {p.name.charAt(0)}
                        </div>

                        <div>
                          <p className="font-medium text-gray-800">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.phone}</p>
                        </div>
                      </div>
                    </Td>

                    <Td className="text-gray-700">{p.email}</Td>

                    <Td>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          p.gender === "Male"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-pink-100 text-pink-600"
                        }`}
                      >
                        {p.gender}
                      </span>
                    </Td>

                    <Td>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                        {p.concern}
                      </span>
                    </Td>

                    <Td className="text-gray-700 text-sm">{p.datetime}</Td>

                    <Td>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                          p.status
                        )}`}
                      >
                        {p.status}
                      </span>
                    </Td>

                    <Td>
                      <div className="flex justify-end gap-2 pr-4">
                        <button
                          title="View Patient"
                          onClick={() => {
                            setSelected(p);
                            setTab("info");
                            setShowDetails(true);
                          }}
                          className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-indigo-100 transition flex items-center justify-center"
                        >
                          👁
                        </button>

                        <button
                          title="SOAP Note"
                          onClick={() => {
                            setSelected(p);
                            setShowSoap(true);
                          }}
                          className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-green-100 transition flex items-center justify-center"
                        >
                          ✏️
                        </button>

                        <button
                          title="Delete"
                          onClick={() => alert("Delete record")}
                          className="w-9 h-9 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition flex items-center justify-center"
                        >
                          🗑
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}

      {filteredPatients.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{indexOfFirstPatient + 1}</span>
            -{" "}
            <span className="font-medium">
              {Math.min(indexOfLastPatient, filteredPatients.length)}
            </span>{" "}
            of <span className="font-medium">{filteredPatients.length}</span>{" "}
            patients
          </p>

          <div className="flex items-center gap-1 bg-white border border-gray-200 shadow-sm rounded-xl p-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm rounded-lg hover:bg-gray-100 disabled:opacity-40"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition ${
                    currentPage === page
                      ? "bg-indigo-600 text-white shadow"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm rounded-lg hover:bg-gray-100 disabled:opacity-40"
            >
              →
            </button>
          </div>
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

      <SoapNoteModal
        open={showSoap}
        onClose={() => setShowSoap(false)}
        patient={selected}
      />

      <AddPatientModal
        open={showAddPatient}
        onClose={() => setShowAddPatient(false)}
      />

      <MedicalHistoryModal
        open={showMedicalHistoryModal}
        onClose={() => setShowMedicalHistoryModal(false)}
      />
    </section>
  );
}