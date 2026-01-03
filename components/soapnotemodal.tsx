"use client";
import { FieldBlock } from "./UIHelpers";
import { SectionLabel } from "./UIHelpers";
import { ActionChips } from "./UIHelpers";





/* ---------------------------- SOAP NOTE ---------------------------- */
const SoapNoteModal = ({ open, onClose, patient }: { open: boolean; onClose: () => void; patient: any }) => {
  if (!open || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[820] max-h-[92vh] bg-[#111318] text-gray-200 rounded-2xl border border-gray-700 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">SOAP Note</h2>
            <p className="text-sm text-gray-400">{patient.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#1b1f27] text-gray-400 hover:text-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-8">
          <SectionLabel title="SUBJECTIVE" />
          <FieldBlock label="Chief Complaint" placeholder="Enter patient's chief complaint" />
          <FieldBlock label="History of Present Illness" placeholder="Describe symptoms, duration, onset..." />

          <SectionLabel title="OBJECTIVE" subtitle="(Select templates or attach Labs, Results, Vitals, Notes, etc.)" />
          <FieldBlock label="Remarks" placeholder="Physical exam findings, observations..." />
          <ActionChips options={["Add Remarks"]} />

          <SectionLabel title="ASSESSMENT" />
          <FieldBlock label="Diagnosis" placeholder="Enter diagnosis / impression" />
          <ActionChips options={["Add Diagnosis", "Add ICD-10", "Add Remarks"]} />

          <SectionLabel title="PLAN" />
          <FieldBlock label="Plan" placeholder="Treatment plan, medications, follow-up..." />
          <ActionChips options={["Add Plan", "Add Procedure", "Add PhilHealth", "Add Remarks"]} />
          <FieldBlock label="Follow-up Check-up" placeholder="Clinic and Date" />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-700 bg-[#0f1115] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-[#1b1f27] transition"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition">
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoapNoteModal