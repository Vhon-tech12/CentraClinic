"use client";

import { useState } from "react";
import { FieldBlock, SectionLabel, ActionChips } from "./UIHelpers";
import PrescriptionModal, { Prescription } from "./PrescriptionModal";
import HeadTemplateModal from "./HeadTemplateModal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Patient = { name: string; id?: string };

const SoapNoteModal = ({
  open,
  onClose,
  patient,
}: {
  open: boolean;
  onClose: () => void;
  patient: Patient | null;
}) => {
  const [openPrescription, setOpenPrescription] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  const [open3DModal, setOpen3DModal] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");

  if (!open || !patient) return null;

  // --- Prescription Handlers ---
  const handleAddOrUpdatePrescription = (rx: Prescription) => {
    if (editingIndex !== null) {
      setPrescriptions(prev =>
        prev.map((p, i) => (i === editingIndex ? rx : p))
      );
      setEditingIndex(null);
    } else {
      setPrescriptions(prev => [...prev, rx]);
    }
    setOpenPrescription(false);
  };

  const handleEdit = (idx: number) => {
    setEditingIndex(idx);
    setOpenPrescription(true);
  };

  const handleDelete = (idx: number) => {
    if (confirm("Are you sure you want to delete this prescription?")) {
      setPrescriptions(prev => prev.filter((_, i) => i !== idx));
    }
  };

  // --- Save SOAP Note Handler ---
  const handleSaveNote = () => {
    console.log({
      patientId: patient.id,
      diagnosis,
      prescriptions,
    });
    onClose();
  };

  // --- PDF Export Handler ---
  const handleExportPDF = async () => {
    const modalEl = document.getElementById("soap-modal-content");
    if (!modalEl) return;

    const canvas = await html2canvas(modalEl, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`SOAP_Report_${patient.name}.pdf`);
  };

  return (
    <>
      {/* SOAP Note Modal */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-[900px] max-h-[90vh] bg-[#1b1f27] text-gray-200 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between bg-[#22252f]">
            <div>
              <h2 className="text-xl font-bold text-white">SOAP Note</h2>
              <p className="text-sm text-gray-400">{patient.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div
            id="soap-modal-content"
            className="px-6 py-6 space-y-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          >
            {/* SUBJECTIVE */}
            <SectionLabel title="SUBJECTIVE" />
            <FieldBlock label="Chief Complaint" placeholder="Enter patient's chief complaint" />
            <FieldBlock label="History of Present Illness" placeholder="Describe symptoms, duration, onset..." />

            {/* OBJECTIVE */}
            <SectionLabel title="OBJECTIVE" subtitle="(Physical exam, labs, vitals, notes)" />
            <FieldBlock label="Remarks" placeholder="Physical exam findings, observations..." />
            <ActionChips options={["Add Remarks"]} onSelect={() => {}} />

            {/* ASSESSMENT */}
            <SectionLabel title="ASSESSMENT" />
            <FieldBlock
              label="Diagnosis"
              placeholder="Enter diagnosis / impression"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
            <ActionChips
              options={["Add Diagnosis"]}
              onSelect={(opt) => {
                // Debug to check if click works
                console.log("Selected Option:", opt);
                if (String(opt).includes("Add Diagnosis")) setOpen3DModal(true);
              }}
            />

            {/* PLAN */}
            <SectionLabel title="PLAN" />
            <FieldBlock label="Plan" placeholder="Treatment plan, medications, follow-up..." />
            <ActionChips
              options={["Add Plan", "Add Prescription"]}
              onSelect={(opt) => {
                if (opt === "Add Prescription") setOpenPrescription(true);
              }}
            />

            {/* PRESCRIPTIONS */}
            {prescriptions.length > 0 && (
              <div className="space-y-3 mt-4">
                {prescriptions.map((rx, idx) => (
                  <div
                    key={idx}
                    className="bg-[#262b36] border border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition flex justify-between items-start"
                  >
                    <div>
                      <p className="font-semibold text-white text-lg">{rx.drug}</p>
                      <p className="text-gray-300 text-sm">{rx.dose} · {rx.frequency} · {rx.duration}</p>
                      {rx.instructions && <p className="text-gray-400 text-sm mt-1">{rx.instructions}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(idx)}
                        className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <FieldBlock label="Follow-up Check-up" placeholder="Clinic and Date" />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-700 bg-[#22252f] flex justify-end gap-3 sticky bottom-0">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNote}
              className="px-5 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition"
            >
              Save Note
            </button>
            <button
              onClick={handleExportPDF}
              className="px-5 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Prescription Modal */}
      <PrescriptionModal
        open={openPrescription}
        onClose={() => { setOpenPrescription(false); setEditingIndex(null); }}
        onSave={handleAddOrUpdatePrescription}
        defaultValues={editingIndex !== null ? prescriptions[editingIndex] : undefined}
      />

      {/* Head 3D Diagnostic Modal */}
      {open3DModal && patient && (
        <HeadTemplateModal
          open={open3DModal}
          onClose={() => setOpen3DModal(false)}
          patientId={patient.id || "temp"}
          onSaveFinding={(text: string) => {
            setDiagnosis(prev => prev ? prev + "; " + text : text);
          }}
          onExport={handleExportPDF}
        />
      )}
    </>
  );
};

export default SoapNoteModal;
