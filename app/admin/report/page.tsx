"use client";

import React from "react";

export default function ReportPage() {
  // Example patient data
  const patient = {
    name: "Juan Dela Cruz",
    age: 30,
    gender: "Male",
    id: "C12345",
    doctor: "Dr. Maria Santos",
  };

  // Medical History with optional images
  const medicalHistory = [
    { text: "Allergy to Penicillin", image: "/images/penicillin-allergy.png" },
    { text: "Appendectomy 2018" },
    { text: "Hypertension (2020)" },
  ];

  const prescription = [
    { name: "Paracetamol", dosage: "500mg", frequency: "3x/day", duration: "5 days" },
    { name: "Amoxicillin", dosage: "250mg", frequency: "2x/day", duration: "7 days" },
  ];

  // SOAP Notes replacing Lab Results
  const soapNotes = [
    {
      chiefComplaints: "Toncil",
      remarks: "Patient reports mild dizziness in the mornings",
      notes: "Recommended rest and hydration, monitor blood pressure",
      attachment: "/3d-diagnostics/head_scan.png",
    },
    {
      chiefComplaints: "Lower back pain",
      remarks: "Pain after long hours of sitting",
      notes: "Prescribed stretching exercises and mild analgesics",
      attachment: "/3d-diagnostics/back_scan.png",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 p-6 hidden print:hidden">
        <h2 className="font-bold text-lg mb-4">Sidebar</h2>
        <ul className="space-y-2 text-sm">
          <li>Dashboard</li>
          <li>Patients</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Print Button */}
        <div className="text-right mb-4 print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Print Report
          </button>
        </div>

        {/* Report Content */}
        <div className="report-content bg-white w-full rounded-lg shadow-lg p-8 print:shadow-none print:max-w-full print:p-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-6 print:flex">
            <div>
              <h1 className="text-3xl font-bold tracking-wide">Centra Clinic</h1>
              <p className="text-sm">123 Main St, Santo Rosario</p>
            </div>
            <div className="text-right text-sm">
              <p className="font-semibold">{patient.name}</p>
              <p>Age: {patient.age} | Gender: {patient.gender}</p>
              <p>Patient ID: {patient.id}</p>
              <p>Attending Doctor: {patient.doctor}</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </header>

          <hr className="border-gray-300 mb-6" />

          {/* Medical History */}
          <section className="mb-6">
            <h2 className="font-semibold text-xl mb-3 border-b border-gray-300 pb-1">
              Medical History
            </h2>
            {medicalHistory.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {medicalHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 border border-gray-200 rounded p-3 shadow-sm text-sm"
                  >
                    <p>{item.text}</p>
                    {item.image && (
                      <img
                        src={item.image}
                        alt="Medical History"
                        className="mt-2 w-full h-auto rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm">No significant medical history.</p>
            )}
          </section>

          {/* Prescription */}
          <section className="mb-6">
            <h2 className="font-semibold text-xl mb-3 border-b border-gray-300 pb-1">
              Prescription
            </h2>
            {prescription.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Medicine</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Dosage</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Frequency</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {prescription.map((med, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2">{med.name}</td>
                      <td className="border border-gray-300 px-3 py-2">{med.dosage}</td>
                      <td className="border border-gray-300 px-3 py-2">{med.frequency}</td>
                      <td className="border border-gray-300 px-3 py-2">{med.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm">No prescriptions for this visit.</p>
            )}
          </section>

          {/* SOAP Notes */}
          <section className="mb-6">
            <h2 className="font-semibold text-xl mb-3 border-b border-gray-300 pb-1">
              SOAP Notes
            </h2>
            {soapNotes.length > 0 ? (
              <div className="space-y-4">
                {soapNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 border border-gray-200 rounded p-3 shadow-sm text-sm"
                  >
                    <p><strong>Chief Complaints:</strong> {note.chiefComplaints}</p>
                    <p><strong>Remarks:</strong> {note.remarks}</p>
                    <p><strong>Notes:</strong> {note.notes}</p>
                    {note.attachment && (
                      <img
                        src="/Throatpic.png"
                        alt="Attachment"
                        className="mt-2 w-full h-auto rounded"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm">No SOAP notes recorded.</p>
            )}
          </section>

          {/* Footer */}
          <footer className="mt-8 text-sm text-gray-600 print:mt-12">
            <p>Doctor's Signature: _______________________________</p>
            <p>Contact: (123) 456-7890 | centra@clinic.com</p>
          </footer>
        </div>
      </main>
    </div>
  );
}