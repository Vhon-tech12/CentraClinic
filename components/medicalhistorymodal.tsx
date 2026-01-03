"use client";
import { useState } from "react";
import { FieldBlock } from "./UIHelpers";

const MedicalHistoryModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    type: "",
    resultDate: "",
    lab: "",
    remarks: "",
    photos: [] as File[],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, photos: files }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.type.trim()) errors.type = "Type is required";
    if (!formData.resultDate.trim()) errors.resultDate = "Result date is required";
    if (!formData.remarks.trim()) errors.remarks = "Remarks are required";
    return errors;
  };

  const handleSave = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      alert("Please fix the following errors:\n" + Object.values(errors).join("\n"));
      return;
    }
    // Here you would typically send the data to an API or parent component
    console.log('Saving medical history data:', formData);
    // Reset form
    setFormData({
      type: "",
      resultDate: "",
      lab: "",
      remarks: "",
      photos: [],
    });
    onClose();
  };

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
          <FieldBlock label="Type" placeholder="Type of medical history" value={formData.type} onChange={(e) => handleInputChange('type', e.target.value)} />
          <FieldBlock label="Result Date" placeholder="YYYY-MM-DD" type="date" value={formData.resultDate} onChange={(e) => handleInputChange('resultDate', e.target.value)} />
          <FieldBlock label="Lab (Optional)" placeholder="Lab name or leave blank" value={formData.lab} onChange={(e) => handleInputChange('lab', e.target.value)} />
          <FieldBlock label="Remarks" placeholder="Additional notes..." type="textarea" value={formData.remarks} onChange={(e) => handleInputChange('remarks', e.target.value)} />

          <div>
            <p className="text-sm font-medium text-gray-300 mb-1">Add Photos (Optional)</p>
            <input type="file" multiple accept="image/*" className="w-full text-gray-200" onChange={handleFileChange} />
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
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition">
            Save History
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryModal;


