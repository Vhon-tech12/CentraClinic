"use client";

import { useState } from "react";
import { FieldBlock, SectionLabel, ActionChips } from "./UIHelpers";
import PrescriptionModal, { Prescription } from "./PrescriptionModal";
import HeadTemplateModal from "./HeadTemplateModal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Patient = { name: string; id?: string };

type Diagnostic = {
  imageData: string;
  strokes: Record<string, Record<string, { strokes: any[][] }>>;
};

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

  const [diagnosis, setDiagnosis] = useState(
    typeof window !== "undefined" ? localStorage.getItem("diagnosis") || "" : ""
  );

  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);

  const [chiefComplaint, setChiefComplaint] = useState(
    typeof window !== "undefined" ? localStorage.getItem("chiefComplaint") || "" : ""
  );
  const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("historyOfPresentIllness") || ""
      : ""
  );
  const [remarks, setRemarks] = useState(
    typeof window !== "undefined" ? localStorage.getItem("remarks") || "" : ""
  );
  const [plan, setPlan] = useState(
    typeof window !== "undefined" ? localStorage.getItem("plan") || "" : ""
  );
  const [followUp, setFollowUp] = useState(
    typeof window !== "undefined" ? localStorage.getItem("followUp") || "" : ""
  );

  if (!open || !patient) return null;

  const handleAddOrUpdatePrescription = (rx: Prescription) => {
    if (editingIndex !== null) {
      setPrescriptions(prev => prev.map((p, i) => (i === editingIndex ? rx : p)));
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
    if (confirm("Delete this prescription?")) {
      setPrescriptions(prev => prev.filter((_, i) => i !== idx));
    }
  };

  const handleSaveNote = () => {
    const soapNote = {
      patientId: patient.id,
      chiefComplaint,
      historyOfPresentIllness,
      remarks,
      diagnosis,
      plan,
      followUp,
      prescriptions,
    };
    console.log("Saving SOAP Note:", soapNote);
    onClose();
  };

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

  const handleSaveDiagnostic = (diagnostic: Diagnostic) => {
    setDiagnostics(prev => [...prev, diagnostic]);
    setDiagnosis(prev =>
      prev ? prev + " [Diagnostic image attached]" : "[Diagnostic image attached]"
    );
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="w-full max-w-225 max-h-[90vh] bg-white text-gray-800 rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col">

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between bg-gray-50">
            <div>
              <h2 className="text-xl font-bold text-gray-900">SOAP Note</h2>
              <p className="text-sm text-gray-500">{patient.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-200 text-gray-500"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div
            id="soap-modal-content"
            className="px-6 py-6 space-y-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            <SectionLabel title="SUBJECTIVE" />
            <FieldBlock
              label="Chief Complaint"
              placeholder="Enter patient's chief complaint"
              value={chiefComplaint}
              onChange={e => setChiefComplaint(e.target.value)}
            />
            <FieldBlock
              label="History of Present Illness"
              placeholder="Describe symptoms, duration, onset..."
              value={historyOfPresentIllness}
              onChange={e => setHistoryOfPresentIllness(e.target.value)}
            />

            <SectionLabel title="OBJECTIVE" subtitle="(Physical exam, labs, vitals)" />
            <FieldBlock
              label="Remarks"
              placeholder="Physical exam findings..."
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
            />

            <SectionLabel title="ASSESSMENT" />
            <FieldBlock
              label="Diagnosis"
              placeholder="Diagnosis / impression"
              value={diagnosis}
              onChange={e => setDiagnosis(e.target.value)}
            />

            <ActionChips
              options={["Add Diagnosis"]}
              onSelect={() => setOpen3DModal(true)}
            />

            {diagnostics.length > 0 && (
              <div className="space-y-3">
                {diagnostics.map((d, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-200 p-4 rounded-xl"
                  >
                    <img src={d.imageData} className="rounded-lg" />
                  </div>
                ))}
              </div>
            )}

            <SectionLabel title="PLAN" />
            <FieldBlock
              label="Plan"
              placeholder="Treatment plan"
              value={plan}
              onChange={e => setPlan(e.target.value)}
            />

            <ActionChips
              options={["Add Prescription","Add Body Diagram"]}
              onSelect={() => setOpenPrescription(true)}
            />

            {prescriptions.map((rx, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-900">{rx.drug}</p>
                  <p className="text-sm text-gray-600">
                    {rx.dose} · {rx.frequency} · {rx.duration}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(idx)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <FieldBlock
              label="Follow-up"
              placeholder="Clinic and date"
              value={followUp}
              onChange={e => setFollowUp(e.target.value)}
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNote}
              className="px-5 py-2 bg-violet-600 text-white rounded-lg"
            >
              Save Note
            </button>
            <button
              onClick={handleExportPDF}
              className="px-5 py-2 bg-amber-500 text-white rounded-lg"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>

      <PrescriptionModal
        open={openPrescription}
        onClose={() => {
          setOpenPrescription(false);
          setEditingIndex(null);
        }}
        onSave={handleAddOrUpdatePrescription}
        defaultValues={editingIndex !== null ? prescriptions[editingIndex] : undefined}
      />

      {open3DModal && patient && (
        <HeadTemplateModal
          open={open3DModal}
          onClose={() => setOpen3DModal(false)}
          patientId={patient.id || "temp"}
          onSaveFinding={text =>
            setDiagnosis(prev => (prev ? prev + "; " + text : text))
          }
          onExport={handleExportPDF}
          onSaveDiagnostic={handleSaveDiagnostic}
        />
      )}
    </>
  );
};

export default SoapNoteModal;
