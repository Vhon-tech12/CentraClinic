"use client";
import { useState } from "react";
import { FieldBlock } from "./UIHelpers";

/* ----------------------- ADD PATIENT MODAL ----------------------- */
const AddPatientModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [tab, setTab] = useState("personal");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    emergencyAltPhone: "",
    physicianName: "",
    physicianClinic: "",
    physicianPhone: "",
    physicianEmail: "",
    consent: "",
    consentChecked: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.age.trim()) errors.age = "Age is required";
    if (!formData.gender.trim()) errors.gender = "Gender is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.consentChecked) errors.consent = "You must consent to proceed";
    return errors;
  };

  const handleSave = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      alert("Please fix the following errors:\n" + Object.values(errors).join("\n"));
      return;
    }
    console.log("Saving patient data:", formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-200/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="w-full max-w-3xl bg-white text-gray-900 rounded-2xl shadow-xl overflow-y-auto transform transition-all duration-300 scale-95 animate-scaleUp max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-300 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Add New Patient</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 py-4 border-b border-gray-300 flex gap-6">
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
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500 hover:text-gray-700"
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
              <FieldBlock label="Full Name" placeholder="Enter full name" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} />
              <FieldBlock label="Email" placeholder="Enter email address" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
              <FieldBlock label="Age" placeholder="Enter age" value={formData.age} onChange={(e) => handleInputChange('age', e.target.value)} />
              <FieldBlock label="Gender" placeholder="Male/Female/Other" value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)} />
              <FieldBlock label="Phone Number" placeholder="Enter phone number" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
              <FieldBlock label="Address" placeholder="Enter address" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} />
            </div>
          )}

          {tab === "emergency" && (
            <div className="grid grid-cols-2 gap-4">
              <FieldBlock label="Contact Name" placeholder="Enter contact name" value={formData.emergencyName} onChange={(e) => handleInputChange('emergencyName', e.target.value)} />
              <FieldBlock label="Relationship" placeholder="Relationship to patient" value={formData.emergencyRelationship} onChange={(e) => handleInputChange('emergencyRelationship', e.target.value)} />
              <FieldBlock label="Phone Number" placeholder="Enter contact number" value={formData.emergencyPhone} onChange={(e) => handleInputChange('emergencyPhone', e.target.value)} />
              <FieldBlock label="Alternate Phone" placeholder="Optional" value={formData.emergencyAltPhone} onChange={(e) => handleInputChange('emergencyAltPhone', e.target.value)} />
            </div>
          )}

          {tab === "physician" && (
            <div className="grid grid-cols-2 gap-4">
              <FieldBlock label="Primary Physician" placeholder="Physician name" value={formData.physicianName} onChange={(e) => handleInputChange('physicianName', e.target.value)} />
              <FieldBlock label="Clinic/Hospital" placeholder="Clinic or hospital" value={formData.physicianClinic} onChange={(e) => handleInputChange('physicianClinic', e.target.value)} />
              <FieldBlock label="Phone Number" placeholder="Physician phone" value={formData.physicianPhone} onChange={(e) => handleInputChange('physicianPhone', e.target.value)} />
              <FieldBlock label="Email" placeholder="Physician email" value={formData.physicianEmail} onChange={(e) => handleInputChange('physicianEmail', e.target.value)} />
            </div>
          )}

          {tab === "consent" && (
            <div className="space-y-4">
              <FieldBlock label="Consent Form" placeholder="Type patient consent or notes here..." type="textarea" value={formData.consent} onChange={(e) => handleInputChange('consent', e.target.value)} />
              <div className="flex items-center gap-2">
                <input type="checkbox" id="consent" className="accent-purple-600" checked={formData.consentChecked} onChange={(e) => handleInputChange('consentChecked', e.target.checked)} />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  I hereby consent to the treatment and data collection.
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-300 flex justify-end gap-2 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">
            Save Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;
