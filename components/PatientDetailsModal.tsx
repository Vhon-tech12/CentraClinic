"use client";

import React, { useState } from "react";
import PatientNotes from "./PatientNotes";

/* ---------------- ICONS ---------------- */

const Icon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    user: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    phone: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    email: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    location: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    calendar: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    heart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    document: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    clipboard: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    medical: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    clock: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    alert: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    close: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };
  return icons[name] || null;
};

/* ---------------- CLINICAL STATUS BADGE ---------------- */

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { color: string; bg: string; icon: string }> = {
    stable: { color: "text-emerald-700", bg: "bg-emerald-50", icon: "bg-emerald-500" },
    critical: { color: "text-red-700", bg: "bg-red-50", icon: "bg-red-500" },
    improving: { color: "text-blue-700", bg: "bg-blue-50", icon: "bg-blue-500" },
    discharged: { color: "text-gray-700", bg: "bg-gray-50", icon: "bg-gray-500" },
  };
  
  const config = statusConfig[status.toLowerCase()] || statusConfig.stable;
  
  return (
    <div className={`flex items-center gap-2 ${config.bg} ${config.color} px-3 py-1.5 rounded-lg text-sm font-medium`}>
      <span className={`w-2 h-2 rounded-full ${config.icon} animate-pulse`}></span>
      {status}
    </div>
  );
};

/* ---------------- VITAL SIGNS CARD ---------------- */

const VitalSigns = () => {
  const vitals = [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal" },
    { label: "Heart Rate", value: "72", unit: "bpm", status: "normal" },
    { label: "Temperature", value: "36.8", unit: "°C", status: "normal" },
    { label: "SpO2", value: "98", unit: "%", status: "normal" },
    { label: "Respiratory", value: "16", unit: "/min", status: "normal" },
    { label: "Weight", value: "68", unit: "kg", status: "normal" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="heart" className="w-5 h-5 text-red-500" />
        <h3 className="font-semibold text-gray-800">Vital Signs</h3>
        <span className="text-xs text-gray-400 ml-auto">Last updated: Today</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {vitals.map((vital) => (
          <div key={vital.label} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">{vital.label}</p>
            <p className="text-lg font-bold text-gray-900">
              {vital.value}
              <span className="text-xs font-normal text-gray-500 ml-1">{vital.unit}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- ALLERGIES ALERT ---------------- */

const AllergiesAlert = ({ allergies }: { allergies: string[] }) => {
  if (!allergies || allergies.length === 0) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="alert" className="w-5 h-5 text-red-600" />
        <h3 className="font-semibold text-red-800">Known Allergies</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {allergies.map((allergy, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg border border-red-200 font-medium"
          >
            {allergy}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ---------------- FIELD COMPONENT ---------------- */

const Field = ({ label, value, icon }: { label: string; value?: string; icon?: string }) => (
  <div className="flex items-start gap-3">
    {icon && <Icon name={icon} className="w-4 h-4 text-gray-400 mt-0.5" />}
    <div>
      <span className="text-xs text-gray-500 uppercase tracking-wide block">
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-900">
        {value || "-"}
      </span>
    </div>
  </div>
);

/* ---------------- PLACEHOLDER ---------------- */

const Placeholder = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
    <Icon name="document" className="w-12 h-12 mb-3 opacity-50" />
    <p className="text-sm">{text}</p>
  </div>
);

/* ---------------- CONDITION TAGS ---------------- */

const ConditionTags = ({ conditions }: { conditions: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {conditions.map((condition, idx) => (
      <span
        key={idx}
        className="px-3 py-1.5 text-sm bg-blue-100 text-blue-800 rounded-lg border border-blue-200 font-medium"
      >
        {condition}
      </span>
    ))}
  </div>
);

/* ---------------- MEDICATION LIST ---------------- */

const MedicationList = ({ medications }: { medications: string[] }) => (
  <ul className="space-y-2">
    {medications.map((med, idx) => (
      <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
        {med}
      </li>
    ))}
  </ul>
);

/* ---------------- MODAL ---------------- */

const PatientDetailsModal = ({
  open,
  onClose,
  patient,
  tab,
  setTab,
  onCreateMedicalHistory,
}: any) => {
  if (!open || !patient) return null;

  const tabs = [
    { id: "info", label: "Clinical Summary", icon: "user" },
    { id: "notes", label: "Clinical Notes", icon: "document" },
    { id: "treatment", label: "Treatment Plan", icon: "clipboard" },
    { id: "medical", label: "Medical History", icon: "medical" },
  ];

  // Sample clinical data
  const clinicalData = {
    mrn: "MRN-2024-001234",
    bloodType: "O+",
    allergies: ["Penicillin", "Sulfa"],
    conditions: ["Type 2 Diabetes", "Hypertension", "Hyperlipidemia"],
    medications: ["Metformin 500mg", "Lisinopril 10mg", "Atorvastatin 20mg", "Aspirin 81mg"],
    lastVisit: "2024-01-15",
    nextAppointment: "2024-02-15",
    primaryPhysician: "Dr. John Ong",
    careCoordinator: "John Ong",
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-[1400px] max-h-[95vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">

        {/* HEADER - Clinical Style */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-linear-to-r from-slate-50 to-white">
          <div className="flex items-center gap-5">
            {/* Avatar with medical cross */}
            <div className="relative">
              <div className="w-16 h-16 rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {patient.name?.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">
                  {patient.name}
                </h2>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                  {clinicalData.mrn}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-1">
                <p className="text-sm text-gray-600">
                  {patient.age} yrs • {patient.gender}
                </p>
                <span className="text-gray-300">|</span>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Icon name="location" className="w-3.5 h-3.5" />
                  {patient.address}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <StatusBadge status="Stable" />
            
            <div className="h-8 w-px bg-gray-200"></div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TABS - Clinical Navigation */}
        <div className="flex gap-1 px-6 border-b border-gray-200 bg-gray-50/50">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                tab === t.id
                  ? "text-teal-600 border-teal-600 bg-white"
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon name={t.icon} className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">

          {/* CLINICAL SUMMARY */}
          {tab === "info" && (
            <div className="space-y-6">
              {/* Quick Info Bar */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-500 uppercase">Blood Type</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{clinicalData.bloodType}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="calendar" className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500 uppercase">Last Visit</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{clinicalData.lastVisit}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="clock" className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500 uppercase">Next Appointment</span>
                  </div>
                  <p className="text-lg font-semibold text-teal-600">{clinicalData.nextAppointment}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="user" className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500 uppercase">Primary Physician</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{clinicalData.primaryPhysician}</p>
                </div>
              </div>

              {/* Allergies Alert */}
              <AllergiesAlert allergies={clinicalData.allergies} />

              {/* Vital Signs */}
              <VitalSigns />

              {/* Main Content Grid */}
              <div className="grid grid-cols-3 gap-6">
                {/* Patient Information */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <Icon name="user" className="w-5 h-5 text-teal-600" />
                    <h3 className="font-semibold text-gray-800">Patient Information</h3>
                  </div>
                  <div className="space-y-4">
                    <Field label="Age" value={`${patient.age} years`} />
                    <Field label="Gender" value={patient.gender} />
                    <Field label="Mobile" value={patient.phone} icon="phone" />
                    <Field label="Email" value={patient.email} icon="email" />
                    <Field label="Address" value={patient.address} icon="location" />
                  </div>
                </div>

                {/* Active Conditions */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <Icon name="heart" className="w-5 h-5 text-rose-600" />
                    <h3 className="font-semibold text-gray-800">Active Conditions</h3>
                  </div>
                  <ConditionTags conditions={clinicalData.conditions} />
                </div>

                {/* Current Medications */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-5">
                    <Icon name="medical" className="w-5 h-5 text-teal-600" />
                    <h3 className="font-semibold text-gray-800">Current Medications</h3>
                  </div>
                  <MedicationList medications={clinicalData.medications} />
                </div>
              </div>

              {/* Care Team */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">Care Team</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <Icon name="user" className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Primary Physician</p>
                      <p className="font-semibold text-gray-900">{clinicalData.primaryPhysician}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon name="clipboard" className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Care Coordinator</p>
                      <p className="font-semibold text-gray-900">{clinicalData.careCoordinator}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CLINICAL NOTES */}
          {tab === "notes" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <PatientNotes patient={patient} />
            </div>
          )}

          {/* TREATMENT PLAN */}
          {tab === "treatment" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <Placeholder text="Treatment plan information will appear here." />
            </div>
          )}

          {/* MEDICAL HISTORY */}
          {tab === "medical" && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Icon name="medical" className="w-5 h-5 text-teal-600" />
                  <h3 className="font-semibold text-gray-800">Medical History</h3>
                </div>
                <button
                  onClick={onCreateMedicalHistory}
                  className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
                >
                  <Icon name="clipboard" className="w-4 h-4" />
                  Create Medical History
                </button>
              </div>
              <Placeholder text="Medical history records will appear here." />
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
          <p className="text-xs text-gray-500">
            Patient ID: {patient.id || "N/A"} • Last updated: Today
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PatientDetailsModal;

