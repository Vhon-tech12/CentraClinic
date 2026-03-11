"use client";

import React, { useState } from "react";
import {
  Calendar,
  Users,
  Clock,
  ChevronRight,
  Activity,
  Stethoscope,
  UserCheck,
  Heart,
  Thermometer,
  Droplets,
  FileText,
  X,
  Check,
  User,
  Phone,
  CalendarDays,
  Ruler,
  Scale,
  Wind,
  HeartPulse,
  AlertCircle,
  ClipboardList,
  ArrowRight,
  XCircle,
  CheckCircle2,
  Circle,
  PlayCircle,
  CalendarPlus,
  Sparkles
} from "lucide-react";

// Types
type PatientStatus = 'Pending' | 'Checked-In' | 'Vitals Recorded' | 'Ready for Doctor' | 'Consultation' | 'Completed';

interface Patient {
  id: number;
  name: string;
  birthdate: string;
  contactNumber: string;
  appointmentTime: string;
  service: string;
  status: PatientStatus;
  vitals?: {
    height: string;
    weight: string;
    bloodPressure: string;
    temperature: string;
    pulse: string;
  };
  chiefComplaint?: {
    complaint: string;
    notes: string;
  };
}

interface VitalsData {
  height: string;
  weight: string;
  bloodPressure: string;
  temperature: string;
  pulse: string;
}

interface IdentityData {
  name: string;
  birthdate: string;
  contactNumber: string;
}

interface ComplaintData {
  complaint: string;
  notes: string;
}

interface FollowUpData {
  appointmentDate: string;
  appointmentTime: string;
  treatmentNotes: string;
}

// Sample time slots
const availableTimeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

// Get default date (7 days from today)
const getDefaultFollowUpDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().split('T')[0];
};

// Initial sample data
const initialPatients: Patient[] = [
  { id: 1, name: "Juan Dela Cruz", birthdate: "1985-03-15", contactNumber: "0912-345-6789", appointmentTime: "9:00 AM", service: "ENT Checkup", status: "Pending" },
  { id: 2, name: "Maria Santos", birthdate: "1990-07-22", contactNumber: "0918-987-6543", appointmentTime: "9:30 AM", service: "Nose Consultation", status: "Pending" },
  { id: 3, name: "Pedro Reyes", birthdate: "1978-11-08", contactNumber: "0922-111-2222", appointmentTime: "10:00 AM", service: "Throat Exam", status: "Pending" },
  { id: 4, name: "Ana Garcia", birthdate: "1995-01-30", contactNumber: "0905-333-4444", appointmentTime: "10:30 AM", service: "Ear Cleaning", status: "Pending" },
  { id: 5, name: "Jose Martinez", birthdate: "1982-09-12", contactNumber: "0917-555-6666", appointmentTime: "11:00 AM", service: "Allergy Test", status: "Pending" },
  { id: 6, name: "Lisa Wong", birthdate: "1988-05-18", contactNumber: "0928-777-8888", appointmentTime: "11:30 AM", service: "Sinus Consultation", status: "Pending" },
  { id: 7, name: "Carlos Mendoza", birthdate: "1992-12-25", contactNumber: "0919-999-0000", appointmentTime: "12:00 PM", service: "Ear Consultation", status: "Pending" },
  { id: 8, name: "Sofia Reyes", birthdate: "1975-08-05", contactNumber: "0925-121-3434", appointmentTime: "12:30 PM", service: "Throat Treatment", status: "Pending" },
];

const commonComplaints = [
  "Ear Pain",
  "Nose Bleeding",
  "Sore Throat",
  "Difficulty Breathing",
  "Sinus Congestion",
  "Hearing Loss",
  "Runny Nose",
  "Facial Pain",
  "Headache",
  "Other"
];

export default function SecretaryDashboard() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeModal, setActiveModal] = useState<'identity' | 'vitals' | 'complaint' | 'followUp' | null>(null);
  
  // Form states
  const [identityForm, setIdentityForm] = useState<IdentityData>({ name: '', birthdate: '', contactNumber: '' });
  const [vitalsForm, setVitalsForm] = useState<VitalsData>({ height: '', weight: '', bloodPressure: '', temperature: '', pulse: '' });
  const [complaintForm, setComplaintForm] = useState<ComplaintData>({ complaint: '', notes: '' });
  const [followUpForm, setFollowUpForm] = useState<FollowUpData>({ appointmentDate: getDefaultFollowUpDate(), appointmentTime: '9:00 AM', treatmentNotes: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Handler to open Schedule Next modal
  const handleScheduleNext = (patient: Patient) => {
    setSelectedPatient(patient);
    setFollowUpForm({
      appointmentDate: getDefaultFollowUpDate(),
      appointmentTime: '9:00 AM',
      treatmentNotes: ''
    });
    setActiveModal('followUp');
  };

  // Handler to submit Schedule Next
  const handleScheduleNextSubmit = () => {
    if (!selectedPatient) return;
    
    // Create new follow-up appointment
    const newPatient: Patient = {
      ...selectedPatient,
      id: Date.now(), // Generate unique ID
      appointmentTime: followUpForm.appointmentTime,
      service: followUpForm.treatmentNotes || 'Follow-up Visit',
      status: 'Pending',
      birthdate: selectedPatient.birthdate,
      contactNumber: selectedPatient.contactNumber,
    };
    
    // Add new appointment to patients array
    setPatients(prev => [...prev, newPatient]);
    
    // Show success toast
    const formattedDate = new Date(followUpForm.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    setToastMessage(`Next appointment for ${selectedPatient.name} scheduled on ${formattedDate} at ${followUpForm.appointmentTime}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
    
    setActiveModal(null);
    setSelectedPatient(null);
  };

  // Get today's date formatted
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  // Stats
  const stats = {
    totalAppointments: patients.length,
    pending: patients.filter(p => p.status === 'Pending').length,
    checkedIn: patients.filter(p => p.status === 'Checked-In').length,
    vitalsRecorded: patients.filter(p => p.status === 'Vitals Recorded').length,
    readyForDoctor: patients.filter(p => p.status === 'Ready for Doctor').length,
    completed: patients.filter(p => p.status === 'Completed').length,
  };

  // Get status badge styles
  const getStatusBadge = (status: PatientStatus) => {
    const styles: Record<PatientStatus, string> = {
      'Pending': 'bg-gray-100 text-gray-700 border-gray-200',
      'Checked-In': 'bg-blue-100 text-blue-700 border-blue-200',
      'Vitals Recorded': 'bg-amber-100 text-amber-700 border-amber-200',
      'Ready for Doctor': 'bg-purple-100 text-purple-700 border-purple-200',
      'Consultation': 'bg-orange-100 text-orange-700 border-orange-200',
      'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    return styles[status];
  };

  // Get status icon
  const getStatusIcon = (status: PatientStatus): React.ReactNode => {
    const icons: Record<PatientStatus, React.ReactNode> = {
      'Pending': <Circle className="w-3.5 h-3.5" />,
      'Checked-In': <UserCheck className="w-3.5 h-3.5" />,
      'Vitals Recorded': <Heart className="w-3.5 h-3.5" />,
      'Ready for Doctor': <Stethoscope className="w-3.5 h-3.5" />,
      'Consultation': <Activity className="w-3.5 h-3.5" />,
      'Completed': <CheckCircle2 className="w-3.5 h-3.5" />,
    };
    return icons[status];
  };

  // Handle action button clicks
  const handleCheckIn = (patient: Patient) => {
    setSelectedPatient(patient);
    setIdentityForm({
      name: patient.name,
      birthdate: patient.birthdate,
      contactNumber: patient.contactNumber
    });
    setActiveModal('identity');
  };

  const handleRecordVitals = (patient: Patient) => {
    setSelectedPatient(patient);
    setVitalsForm({
      height: patient.vitals?.height || '',
      weight: patient.vitals?.weight || '',
      bloodPressure: patient.vitals?.bloodPressure || '',
      temperature: patient.vitals?.temperature || '',
      pulse: patient.vitals?.pulse || ''
    });
    setActiveModal('vitals');
  };

  const handleSendToDoctor = (patient: Patient) => {
    setSelectedPatient(patient);
    setComplaintForm({
      complaint: patient.chiefComplaint?.complaint || '',
      notes: patient.chiefComplaint?.notes || ''
    });
    setActiveModal('complaint');
  };

  // Submit handlers
  const handleIdentitySubmit = () => {
    if (!selectedPatient) return;
    setPatients(prev => prev.map(p => 
      p.id === selectedPatient.id 
        ? { ...p, status: 'Checked-In', ...identityForm }
        : p
    ));
    setActiveModal(null);
    setSelectedPatient(null);
  };

  const handleVitalsSubmit = () => {
    if (!selectedPatient) return;
    setPatients(prev => prev.map(p => 
      p.id === selectedPatient.id 
        ? { ...p, status: 'Vitals Recorded', vitals: vitalsForm }
        : p
    ));
    setActiveModal(null);
    setSelectedPatient(null);
  };

  const handleComplaintSubmit = () => {
    if (!selectedPatient) return;
    setPatients(prev => prev.map(p => 
      p.id === selectedPatient.id 
        ? { ...p, status: 'Ready for Doctor', chiefComplaint: complaintForm }
        : p
    ));
    setActiveModal(null);
    setSelectedPatient(null);
  };

  const handleComplete = (patient: Patient) => {
    setPatients(prev => prev.map(p => 
      p.id === patient.id ? { ...p, status: 'Completed' } : p
    ));
  };

  // Get patients ready for doctor
  const doctorQueue = patients.filter(p => p.status === 'Ready for Doctor' || p.status === 'Consultation');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Secretary Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage appointments and patient queue
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl w-fit">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{formatDate()}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6">
        {/* WELCOME BANNER */}
        <div className="bg-linear-to-r from-teal-500 via-emerald-500 to-teal-500 text-white p-5 sm:p-6 rounded-2xl shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute right-16 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
          <div className="relative">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Good Morning, Secretary! 👋
            </h2>
            <p className="text-sm opacity-90 mt-1">Here's your clinic overview for today. Manage patient workflow below.</p>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium">Total</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Circle className="w-4 h-4" />
              <span className="text-xs font-medium">Pending</span>
            </div>
            <p className="text-2xl font-bold text-gray-700">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-2 text-blue-500 mb-1">
              <UserCheck className="w-4 h-4" />
              <span className="text-xs font-medium">Checked-In</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{stats.checkedIn}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <Heart className="w-4 h-4" />
              <span className="text-xs font-medium">Vitals Done</span>
            </div>
            <p className="text-2xl font-bold text-amber-700">{stats.vitalsRecorded}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-2 text-purple-500 mb-1">
              <Stethoscope className="w-4 h-4" />
              <span className="text-xs font-medium">Ready</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">{stats.readyForDoctor}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-2 text-emerald-500 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-medium">Completed</span>
            </div>
            <p className="text-2xl font-bold text-emerald-700">{stats.completed}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* TODAY'S APPOINTMENTS TABLE */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Today's Appointments</h3>
                <p className="text-sm text-gray-500 mt-0.5">{patients.length} patients scheduled</p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-gray-900">{patient.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {patient.appointmentTime}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{patient.service}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(patient.status)}`}>
                          {getStatusIcon(patient.status)}
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {patient.status === 'Pending' && (
                            <button
                              onClick={() => handleCheckIn(patient)}
                              className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <UserCheck className="w-3 h-3" />
                              Check-In
                            </button>
                          )}
                          {patient.status === 'Checked-In' && (
                            <button
                              onClick={() => handleRecordVitals(patient)}
                              className="px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Heart className="w-3 h-3" />
                              Vitals
                            </button>
                          )}
                          {patient.status === 'Vitals Recorded' && (
                            <button
                              onClick={() => handleSendToDoctor(patient)}
                              className="px-2.5 py-1 text-xs font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <ArrowRight className="w-3 h-3" />
                              Send to Doctor
                            </button>
                          )}
                          {(patient.status === 'Ready for Doctor' || patient.status === 'Consultation') && (
                            <button
                              onClick={() => handleComplete(patient)}
                              className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              Complete
                            </button>
                          )}
                          {patient.status === 'Completed' && (
                            <button
                              onClick={() => handleScheduleNext(patient)}
                              className="px-2.5 py-1 text-xs font-medium bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <CalendarPlus className="w-3 h-3" />
                              Schedule Next
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DOCTOR QUEUE SECTION */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 sm:px-6 py-4 border-b border-gray-100 bg-linear-to-r from-purple-50 to-indigo-50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Stethoscope className="w-4 h-4 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Doctor Queue</h3>
                  <p className="text-sm text-gray-500">{doctorQueue.length} patients waiting</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {doctorQueue.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">No patients in queue</p>
                  <p className="text-xs text-gray-400 mt-1">Patients will appear here when ready for doctor</p>
                </div>
              ) : (
                doctorQueue.map((patient) => (
                  <div key={patient.id} className="bg-gray-50/50 rounded-xl border border-gray-100 p-4 hover:border-purple-200 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{patient.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{patient.appointmentTime}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        patient.status === 'Ready for Doctor' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {patient.status}
                      </span>
                    </div>
                    
                    {/* Chief Complaint */}
                    {patient.chiefComplaint && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1">
                          <AlertCircle className="w-3 h-3" />
                          Chief Complaint
                        </div>
                        <p className="text-sm text-gray-700 bg-white rounded-lg px-3 py-2 border border-gray-200">
                          {patient.chiefComplaint.complaint}
                        </p>
                        {patient.chiefComplaint.notes && (
                          <p className="text-xs text-gray-500 mt-1 italic">
                            Note: {patient.chiefComplaint.notes}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Vitals */}
                    {patient.vitals && (
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-2">
                          <Activity className="w-3 h-3" />
                          Vitals
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Ruler className="w-3 h-3" />
                              Height
                            </div>
                            <p className="text-sm font-medium text-gray-900">{patient.vitals.height}</p>
                          </div>
                          <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Scale className="w-3 h-3" />
                              Weight
                            </div>
                            <p className="text-sm font-medium text-gray-900">{patient.vitals.weight}</p>
                          </div>
                          <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Droplets className="w-3 h-3" />
                              BP
                            </div>
                            <p className="text-sm font-medium text-gray-900">{patient.vitals.bloodPressure}</p>
                          </div>
                          <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Thermometer className="w-3 h-3" />
                              Temp
                            </div>
                            <p className="text-sm font-medium text-gray-900">{patient.vitals.temperature}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* MODALS */}
      
      {/* Identity Verification Modal */}
      {activeModal === 'identity' && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserCheck className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Patient Identity Verification</h3>
                  <p className="text-xs text-gray-500">{selectedPatient.name}</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={identityForm.name}
                  onChange={(e) => setIdentityForm({ ...identityForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                  placeholder="Enter patient name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <CalendarDays className="w-4 h-4 inline mr-1" />
                  Birthdate
                </label>
                <input
                  type="date"
                  value={identityForm.birthdate}
                  onChange={(e) => setIdentityForm({ ...identityForm, birthdate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={identityForm.contactNumber}
                  onChange={(e) => setIdentityForm({ ...identityForm, contactNumber: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all"
                  placeholder="0912-345-6789"
                />
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Please verify the patient's identity before checking in. Confirm the details match their appointment.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleIdentitySubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Verify & Check-In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vitals Modal */}
      {activeModal === 'vitals' && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Heart className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Record Patient Vitals</h3>
                  <p className="text-xs text-gray-500">{selectedPatient.name}</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Ruler className="w-4 h-4 inline mr-1" />
                    Height (cm)
                  </label>
                  <input
                    type="text"
                    value={vitalsForm.height}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, height: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all"
                    placeholder="e.g., 170"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Scale className="w-4 h-4 inline mr-1" />
                    Weight (kg)
                  </label>
                  <input
                    type="text"
                    value={vitalsForm.weight}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, weight: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all"
                    placeholder="e.g., 65"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Droplets className="w-4 h-4 inline mr-1" />
                  Blood Pressure (mmHg)
                </label>
                <input
                  type="text"
                  value={vitalsForm.bloodPressure}
                  onChange={(e) => setVitalsForm({ ...vitalsForm, bloodPressure: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all"
                  placeholder="e.g., 120/80"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Thermometer className="w-4 h-4 inline mr-1" />
                    Temperature (°C)
                  </label>
                  <input
                    type="text"
                    value={vitalsForm.temperature}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, temperature: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all"
                    placeholder="e.g., 36.5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <HeartPulse className="w-4 h-4 inline mr-1" />
                    Pulse (bpm)
                  </label>
                  <input
                    type="text"
                    value={vitalsForm.pulse}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, pulse: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all"
                    placeholder="e.g., 72"
                  />
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-amber-700">
                  <strong>Note:</strong> Please ensure accurate vital signs are recorded before sending the patient to the doctor.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleVitalsSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save Vitals
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chief Complaint Modal */}
      {activeModal === 'complaint' && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ClipboardList className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Chief Complaint</h3>
                  <p className="text-xs text-gray-500">{selectedPatient.name}</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  Main Complaint
                </label>
                <select
                  value={complaintForm.complaint}
                  onChange={(e) => setComplaintForm({ ...complaintForm, complaint: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none transition-all"
                >
                  <option value="">Select a complaint</option>
                  {commonComplaints.map((complaint) => (
                    <option key={complaint} value={complaint}>{complaint}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Additional Notes
                </label>
                <textarea
                  value={complaintForm.notes}
                  onChange={(e) => setComplaintForm({ ...complaintForm, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:outline-none transition-all resize-none"
                  placeholder="Describe any additional symptoms or details..."
                />
              </div>

              {/* Vitals Preview */}
              {selectedPatient.vitals && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recorded Vitals</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-white rounded-lg p-2 border border-gray-200">
                      <span className="text-gray-500">Height</span>
                      <p className="font-medium text-gray-900">{selectedPatient.vitals.height}</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-200">
                      <span className="text-gray-500">Weight</span>
                      <p className="font-medium text-gray-900">{selectedPatient.vitals.weight}</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-200">
                      <span className="text-gray-500">BP</span>
                      <p className="font-medium text-gray-900">{selectedPatient.vitals.bloodPressure}</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-200">
                      <span className="text-gray-500">Temp</span>
                      <p className="font-medium text-gray-900">{selectedPatient.vitals.temperature}</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-200 col-span-2">
                      <span className="text-gray-500">Pulse</span>
                      <p className="font-medium text-gray-900">{selectedPatient.vitals.pulse}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-purple-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-purple-700">
                  <strong>Note:</strong> After submitting, the patient will be added to the Doctor Queue for consultation.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleComplaintSubmit}
                disabled={!complaintForm.complaint}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlayCircle className="w-4 h-4" />
                Send to Doctor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Next Modal */}
      {activeModal === 'followUp' && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <CalendarPlus className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Schedule Next Appointment</h3>
                  <p className="text-xs text-gray-500">{selectedPatient.name}</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <CalendarDays className="w-4 h-4 inline mr-1" />
                  Follow-up Date
                </label>
                <input
                  type="date"
                  value={followUpForm.appointmentDate}
                  onChange={(e) => setFollowUpForm({ ...followUpForm, appointmentDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Follow-up Time
                </label>
                <select
                  value={followUpForm.appointmentTime}
                  onChange={(e) => setFollowUpForm({ ...followUpForm, appointmentTime: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none transition-all"
                >
                  {availableTimeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Treatment Notes / Service
                </label>
                <textarea
                  value={followUpForm.treatmentNotes}
                  onChange={(e) => setFollowUpForm({ ...followUpForm, treatmentNotes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none transition-all resize-none"
                  placeholder="Enter treatment or service type for follow-up..."
                />
              </div>

              <div className="bg-teal-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-teal-700">
                  <strong>Note:</strong> A new appointment will be added to the schedule with "Pending" status.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleNextSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex items-center gap-3 max-w-sm">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Appointment Scheduled</p>
              <p className="text-xs text-gray-500 mt-0.5">{toastMessage}</p>
            </div>
            <button onClick={() => setShowToast(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors ml-2">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

