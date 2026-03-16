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
  Sparkles,
  Monitor
} from "lucide-react";


// Types
type PatientStatus = 'Pending' | 'Checked-In' | 'Vitals Recorded' | 'Ready for Doctor' | 'Consultation' | 'Completed' | 'Scheduled for Procedure' | 'No Show' | 'Cancelled' | 'Rescheduled';

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
  lateArrival?: boolean;
  visitType?: 'NEW PATIENT' | 'FOLLOW-UP' | 'RETURN VISIT' | 'PROCEDURE';
  procedureRequired?: boolean;
  procedureDetails?: {
    procedureType: string;
    room: string;
    scheduledTime: string;
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

interface ProcedureRoom {
  id: number;
  name: string;
  description: string;
  image: string;
  available: boolean;
}

interface ProcedureForm {
  procedureType: string;
  date: string;
  estimatedTime: string;
  doctor: string;
  notes: string;
}

const procedureRooms: ProcedureRoom[] = [
  {
    id: 1,
    name: "Procedure Room 1",
    description: "For ENT procedures",
    image: "/ro.jpg",
    available: true
  },
  {
    id: 2,
    name: "Procedure Room 2", 
    description: "Nasal Exam Procedures",
    image: "/roo.jpg",
    available: true
  },
  {
    id: 3,
    name: "Procedure Room 3",
    description: "Aesthetic procedures",
    image: "/room.jpg", 
    available: true
  }
];

const procedureTypes = ["Ear Cleaning", "Tonsillectomy", "Nasal Endoscopy", "Biopsy", "Laryngoscopy", "Audiometry", "Other"];
const doctors = ["Dr. John Ong"];


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
{ id: 1, name: "Juan Dela Cruz", birthdate: "1985-03-15", contactNumber: "0912-345-6789", appointmentTime: "9:00 AM", service: "Ear Cleaning Procedure", status: "Pending", visitType: "PROCEDURE", procedureRequired: true, },
{ id: 2, name: "Maria Santos", birthdate: "1990-07-22", contactNumber: "0918-987-6543", appointmentTime: "9:30 AM", service: "Nose Consultation", status: "No Show", visitType: "NEW PATIENT" },
{ id: 3, name: "Pedro Reyes", birthdate: "1978-11-08", contactNumber: "0922-111-2222", appointmentTime: "10:00 AM", service: "Throat Exam", status: "Pending", visitType: "RETURN VISIT" },
{ id: 4, name: "Ana Garcia", birthdate: "1995-01-30", contactNumber: "0905-333-4444", appointmentTime: "10:30 AM", service: "Ear Cleaning", status: "Completed", visitType: "PROCEDURE", procedureRequired: true },
{ id: 5, name: "Jose Martinez", birthdate: "1982-09-12", contactNumber: "0917-555-6666", appointmentTime: "11:00 AM", service: "Allergy Test", status: "Pending", visitType: "NEW PATIENT" },
{ id: 6, name: "Lisa Wong", birthdate: "1988-05-18", contactNumber: "0928-777-8888", appointmentTime: "11:30 AM", service: "Sinus Consultation", status: "Pending", visitType: "FOLLOW-UP" },
{ id: 7, name: "Carlos Mendoza", birthdate: "1992-12-25", contactNumber: "0919-999-0000", appointmentTime: "12:00 PM", service: "Ear Consultation", status: "Rescheduled", visitType: "RETURN VISIT" },
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
  const [activeModal, setActiveModal] = useState<'identity' | 'vitals' | 'complaint' | 'followUp' | 'reschedule' | null>(null);
  
// Form states
  const [identityForm, setIdentityForm] = useState<IdentityData>({ name: '', birthdate: '', contactNumber: '' });
  const [vitalsForm, setVitalsForm] = useState<VitalsData>({ height: '', weight: '', bloodPressure: '', temperature: '', pulse: '' });
  const [complaintForm, setComplaintForm] = useState<ComplaintData>({ complaint: '', notes: '' });
  const [followUpForm, setFollowUpForm] = useState<FollowUpData>({ appointmentDate: getDefaultFollowUpDate(), appointmentTime: '9:00 AM', treatmentNotes: '' });
  const [rescheduleForm, setRescheduleForm] = useState<FollowUpData>({ appointmentDate: getDefaultFollowUpDate(), appointmentTime: '9:00 AM', treatmentNotes: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Procedure scheduling state
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<ProcedureRoom | null>(null);
  const [procedureForm, setProcedureForm] = useState<ProcedureForm>({
    procedureType: '',
    date: getDefaultFollowUpDate(),
    estimatedTime: '60 minutes',
    doctor: '',
    notes: ''
  });
  const [selectedPatientForProcedure, setSelectedPatientForProcedure] = useState<Patient | null>(null);

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

  const handleScheduleProcedure = (patient: Patient) => {
    setSelectedPatientForProcedure(patient);
    setProcedureForm({
      procedureType: patient.visitType === 'PROCEDURE' ? patient.service : '',
      date: getDefaultFollowUpDate(),
      estimatedTime: '60 minutes',
      doctor: '',
      notes: `Patient: ${patient.name}. Service: ${patient.service}`
    });
    setSelectedRoom(null);
    setShowProcedureModal(true);
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
    pending: patients.filter(p => p.status === 'Pending' || p.status === 'Rescheduled').length,
    checkedIn: patients.filter(p => p.status === 'Checked-In').length,
    vitalsRecorded: patients.filter(p => p.status === 'Vitals Recorded').length,
    readyForDoctor: patients.filter(p => p.status === 'Ready for Doctor').length,
    completed: patients.filter(p => p.status === 'Completed').length,
    noShow: patients.filter(p => p.status === 'No Show').length,
    cancelled: patients.filter(p => p.status === 'Cancelled').length,
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
      'No Show': 'bg-rose-100 text-rose-700 border-rose-200',
      'Cancelled': 'bg-orange-100 text-orange-700 border-orange-200',
      'Rescheduled': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Scheduled for Procedure': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    };
    return styles[status] || 'bg-gray-100 text-gray-700 border-gray-200';
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
      'No Show': <XCircle className="w-3.5 h-3.5" />,
      'Cancelled': <XCircle className="w-3.5 h-3.5" />,
       'Rescheduled': <CalendarPlus className="w-3.5 h-3.5" />,
      'Scheduled for Procedure': <Monitor className="w-3.5 h-3.5" />,
    };
    return icons[status] || <Circle className="w-3.5 h-3.5" />;
  };

  // Handle action button clicks
  const handleNoShow = (patient: Patient) => {
    setPatients(prev => prev.map(p => 
      p.id === patient.id ? { ...p, status: 'No Show' } : p
    ));
    setToastMessage(`${patient.name} marked as No Show`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancel = (patient: Patient) => {
    setPatients(prev => prev.map(p => 
      p.id === patient.id ? { ...p, status: 'Cancelled' } : p
    ));
    setToastMessage(`${patient.name} appointment cancelled`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReschedule = (patient: Patient) => {
    setSelectedPatient(patient);
    setRescheduleForm({
      appointmentDate: getDefaultFollowUpDate(),
      appointmentTime: patient.appointmentTime,
      treatmentNotes: patient.service
    });
    setActiveModal('reschedule');
  };

  const handleRescheduleSubmit = () => {
    if (!selectedPatient) return;
    
    setPatients(prev => prev.map(p => 
      p.id === selectedPatient.id 
        ? { ...p, status: 'Rescheduled', appointmentTime: rescheduleForm.appointmentTime }
        : p
    ));
    
    setToastMessage(`${selectedPatient.name} rescheduled to ${rescheduleForm.appointmentTime}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
    
    setActiveModal(null);
    setSelectedPatient(null);
  };

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
    const updatedPatient = { ...patient, status: 'Completed' as PatientStatus };
    
    setPatients(prev => prev.map(p => 
      p.id === patient.id ? updatedPatient : p
    ));
    
    // Auto-trigger procedure scheduling if needed
    const needsProcedure = patient.visitType === 'PROCEDURE' || 
      ['Cleaning', 'Surgery', 'Biopsy', 'Endoscopy', 'Tonsillectomy', 'Laryngoscopy'].some(kw => 
        patient.service.toLowerCase().includes(kw.toLowerCase())
      );
    
    if (needsProcedure) {
      // Mark as requiring procedure
      updatedPatient.procedureRequired = true;
      setPatients(prev => prev.map(p => 
        p.id === patient.id ? { ...updatedPatient, procedureRequired: true } : p
      ));
      
      // Prepare procedure form
      setSelectedPatientForProcedure(updatedPatient);
      setProcedureForm({
        procedureType: patient.visitType === 'PROCEDURE' ? patient.service : patient.service,
        date: (() => {
          const date = new Date();
          date.setDate(date.getDate() + 7);
          return date.toISOString().split('T')[0];
        })(),
        estimatedTime: '60 minutes',
        doctor: doctors[0] || 'Dr. John Ong',
        notes: `Post-consultation procedure scheduling for ${patient.name}\nChief complaint: ${patient.chiefComplaint?.complaint || 'N/A'}\nService: ${patient.service}`
      });
      setShowProcedureModal(true);
      
      // Success toast
      setToastMessage(`✅ Consultation completed for ${patient.name}. Schedule procedure now?`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 6000);
    } else {
      // Regular complete without procedure
      setToastMessage(`✅ Consultation completed for ${patient.name}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleLateCheckIn = (patient: Patient) => {
    setPatients(prev => prev.map(p => 
      p.id === patient.id ? { ...p, status: 'Checked-In', lateArrival: true } : p
    ));
    setToastMessage(`${patient.name} marked as Late Check-In`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Get patients ready for doctor
  const doctorQueue = patients.filter(p => p.status === 'Ready for Doctor' || p.status === 'Consultation');
  
  const procedureQueue = patients.filter(p => p.status === 'Scheduled for Procedure');

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-3 sm:gap-4 mb-6">
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
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-2 text-rose-500 mb-1">
              <XCircle className="w-4 h-4" />
              <span className="text-xs font-medium">No Show</span>
            </div>
            <p className="text-2xl font-bold text-rose-700">{stats.noShow}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-2 text-orange-500 mb-1">
              <XCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Cancelled</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">{stats.cancelled}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* TODAY'S APPOINTMENTS TABLE */}
          <div className="lg:col-span-1 xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
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
                            <>
                              <div className="group relative">
                                <button
                                  onClick={() => handleCheckIn(patient)}
                                  className="w-8 h-8 p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-all hover:scale-110 flex items-center justify-center"
                                >
                                  <UserCheck className="w-4 h-4" />
                                </button>
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                  Check-In
                                </span>
                              </div>
                              <div className="group relative">
                                <button
                                  onClick={() => handleNoShow(patient)}
                                  className="w-8 h-8 p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-all hover:scale-110 flex items-center justify-center"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                  No Show
                                </span>
                              </div>
                              <div className="group relative">
                                <button
                                  onClick={() => handleCancel(patient)}
                                  className="w-8 h-8 p-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-all hover:scale-110 flex items-center justify-center"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                  Cancel
                                </span>
                              </div>
                              <div className="group relative">
                                <button
                                  onClick={() => handleReschedule(patient)}
                                  className="w-8 h-8 p-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg transition-all hover:scale-110 flex items-center justify-center"
                                >
                                  <CalendarPlus className="w-4 h-4" />
                                </button>
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                  Reschedule
                                </span>
                              </div>
                            </>
                          )}
{patient.status === 'No Show' && (
                            <div className="group relative">
                              <button
                                onClick={() => handleLateCheckIn(patient)}
                                className="w-8 h-8 p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-all hover:scale-110 flex items-center justify-center"
                              >
                                <Clock className="w-4 h-4" />
                              </button>
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                Late Check-In
                              </span>
                            </div>
                          )}
{patient.status === 'Checked-In' && (
                            <div className="group relative">
                              <button
                                onClick={() => handleRecordVitals(patient)}
                                className="w-8 h-8 p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition-all hover:scale-110 flex items-center justify-center"
                              >
                                <Heart className="w-4 h-4" />
                              </button>
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                Record Vitals
                              </span>
                            </div>
                          )}
{patient.status === 'Vitals Recorded' && (
                            <div className="group relative">
                              <button
                                onClick={() => handleSendToDoctor(patient)}
                                className="w-8 h-8 p-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-all hover:scale-110 flex items-center justify-center"
                              >
                                <ArrowRight className="w-4 h-4" />
                              </button>
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                Send to Doctor
                              </span>
                            </div>
                          )}
{(patient.status === 'Ready for Doctor' || patient.status === 'Consultation') && (
                            <div className="group relative">
                              <button
                                onClick={() => handleComplete(patient)}
                                className="w-8 h-8 p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-all hover:scale-110 flex items-center justify-center"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                Complete
                              </span>
                            </div>
                          )}
{patient.status === 'Completed' && (
                            <>
                              <div className="group relative">
                                <button
                                  onClick={() => handleScheduleNext(patient)}
                                  className="w-8 h-8 p-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg transition-all hover:scale-110 flex items-center justify-center"
                                >
                                  <CalendarPlus className="w-4 h-4" />
                                </button>
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                  Schedule Next
                                </span>
                              </div>
                              <div className="group relative">
                                <button
                                  onClick={() => handleScheduleProcedure(patient)}
                                  className="w-8 h-8 p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-all hover:scale-110 flex items-center justify-center"
                                >
                                  <Monitor className="w-4 h-4" />
                                </button>
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                  Schedule Procedure
                                </span>
                              </div>
                            </>
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

      {/* Procedure Scheduling Modal */}
      {showProcedureModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Monitor className="w-5 h-5 text-indigo-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {selectedPatientForProcedure 
                      ? `Schedule Procedure - ${selectedPatientForProcedure.name}` 
                      : 'Schedule Procedure'
                    }
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedPatientForProcedure 
                      ? `Patient: ${selectedPatientForProcedure.name} (${selectedPatientForProcedure.service})` 
                      : selectedRoom ? `Room: ${selectedRoom.name}` : 'Select a procedure room'
                    }
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowProcedureModal(false);
                  setSelectedRoom(null);
                  setProcedureForm({ procedureType: '', date: getDefaultFollowUpDate(), estimatedTime: '60 minutes', doctor: '', notes: '' });
                }} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {!selectedRoom ? (
                <>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      Select Procedure Room
                    </h4>
                    <p className="text-sm text-gray-600 mb-6">Choose an available room for the procedure.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {procedureRooms.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md hover:shadow-indigo-200 hover:scale-[1.02] transition-all duration-300 border-2 border-gray-100 hover:border-indigo-300 p-6 flex flex-col items-center text-center h-[320px] overflow-hidden ${
                          selectedRoom?.id === room.id ? 'ring-4 ring-indigo-200 shadow-indigo-300 scale-[1.02]' : ''
                        }`}
                      >
                        <div className="w-full h-48 rounded-xl overflow-hidden shadow-sm mb-4 group-hover:shadow-md transition-shadow">
                          <img 
                            src={room.image} 
                            alt={room.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <h5 className="font-semibold text-gray-900 text-lg mb-2">{room.name}</h5>
                        <p className="text-sm text-gray-600 mb-4 flex-1">{room.description}</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          room.available 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {room.available ? 'Available' : 'Occupied'}
                        </span>
                        <button className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 w-full">
                          <Sparkles className="w-4 h-4" />
                          Select Room
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      Schedule Procedure in {selectedRoom.name}
                    </h4>
                    <p className="text-sm text-gray-600">{selectedRoom.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Procedure Type
                      </label>
                      <select
                        value={procedureForm.procedureType}
                        onChange={(e) => setProcedureForm({ ...procedureForm, procedureType: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                      >
                        <option value="">Select procedure type</option>
                        {procedureTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Procedure Date
                      </label>
                      <input
                        type="date"
                        value={procedureForm.date}
                        onChange={(e) => setProcedureForm({ ...procedureForm, date: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Duration
                      </label>
                      <select
                        value={procedureForm.estimatedTime}
                        onChange={(e) => setProcedureForm({ ...procedureForm, estimatedTime: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                      >
                        <option value="30 minutes">30 minutes</option>
                        <option value="60 minutes">60 minutes</option>
                        <option value="90 minutes">90 minutes</option>
                        <option value="120 minutes">120 minutes</option>
                        <option value="180 minutes">3 hours</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assigned Doctor
                      </label>
                      <select
                        value={procedureForm.doctor}
                        onChange={(e) => setProcedureForm({ ...procedureForm, doctor: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                      >
                        <option value="">Select doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor} value={doctor}>{doctor}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={procedureForm.notes}
                      onChange={(e) => setProcedureForm({ ...procedureForm, notes: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all resize-none"
                      placeholder="Any special instructions, patient preparation, equipment needed..."
                    />
                  </div>

                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <p className="text-sm text-indigo-700">
                      <strong>Selected Room:</strong> <span className="font-semibold">{selectedRoom.name}</span> - {selectedRoom.description}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex gap-3 justify-end">
              {!selectedRoom ? (
                <p className="text-sm text-gray-500 self-center">Please select a room to continue</p>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setSelectedRoom(null);
                      setProcedureForm({ procedureType: '', date: getDefaultFollowUpDate(), estimatedTime: '60 minutes', doctor: '', notes: '' });
                    }}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all"
                  >
                    Change Room
                  </button>
                  <button
                      onClick={() => {
                        if (!selectedRoom || !procedureForm.procedureType || !procedureForm.doctor) return;
                        
                        // Submit procedure - update patient if selected, show toast
                        const formattedDate = new Date(procedureForm.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        });
                        
                        if (selectedPatientForProcedure) {
                          setPatients(prev => prev.map(p => 
                            p.id === (selectedPatientForProcedure as Patient).id
                              ? { 
                                  ...p, 
                                  status: 'Scheduled for Procedure' as PatientStatus,
                                  procedureDetails: {
                                    procedureType: procedureForm.procedureType,
                                    room: selectedRoom.name,
                                    scheduledTime: `${procedureForm.date} ${procedureForm.estimatedTime}`
                                  }
                                }
                              : p
                          ));
                        }

                      
                      setToastMessage(`Procedure "${procedureForm.procedureType}" scheduled in ${selectedRoom.name} on ${formattedDate}${selectedPatientForProcedure ? ` for ${selectedPatientForProcedure.name}` : ''}`);
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 5000);
                      
                      // Reset form
                      setSelectedRoom(null);
                      setProcedureForm({ procedureType: '', date: getDefaultFollowUpDate(), estimatedTime: '60 minutes', doctor: '', notes: '' });
                      setSelectedPatientForProcedure(null);
                      setShowProcedureModal(false);
                    }}

                    disabled={!procedureForm.procedureType || !procedureForm.doctor}
                    className="px-8 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Confirm Procedure Appointment
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

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

      {/* Reschedule Modal */}
      {activeModal === 'reschedule' && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <CalendarPlus className="w-5 h-5 text-yellow-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Reschedule Appointment</h3>
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
                  New Date
                </label>
                <input
                  type="date"
                  value={rescheduleForm.appointmentDate}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, appointmentDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Clock className="w-4 h-4 inline mr-1" />
                  New Time
                </label>
                <select
                  value={rescheduleForm.appointmentTime}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, appointmentTime: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 focus:outline-none transition-all"
                >
                  {availableTimeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Service
                </label>
                <textarea
                  value={rescheduleForm.treatmentNotes}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, treatmentNotes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 focus:outline-none transition-all resize-none"
                  placeholder="Service type..."
                />
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-yellow-700">
                  <strong>Note:</strong> Original appointment will be marked as Rescheduled.
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
                onClick={handleRescheduleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-xl transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Reschedule
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

