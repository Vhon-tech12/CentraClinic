"use client";

import { useState } from "react";
import { FieldBlock, SectionLabel, ActionChips } from "./UIHelpers";
import PrescriptionModal, { Prescription } from "./PrescriptionModal";
import HeadTemplateModal from "./HeadTemplateModal";
import EducationalMaterialModal from "./EducationalMaterialModal";
import { EducationalMaterial } from "@/types/EducationalMaterial";
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
  const [openEducationalMaterial, setOpenEducationalMaterial] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<EducationalMaterial[]>([]);

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

  const [showPreview, setShowPreview] = useState(false);

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

  const handleRemoveMaterial = (idx: number) => {
    if (confirm("Remove this educational material?")) {
      setSelectedMaterials(prev => prev.filter((_, i) => i !== idx));
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
    setShowPreview(true);
    onClose();
  };

  const handleShowPreview = () => {
    setShowPreview(true);
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

  // Render live preview content
  const renderPreview = () => (
    <div className="space-y-4">
      {/* Patient Info Header */}
      <div className="bg-linear-to-r from-violet-600 to-indigo-600 text-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-bold">SOAP Note Preview</h3>
        <p className="text-violet-100 text-sm">{patient.name}</p>
      </div>

      {/* Subjective Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h4 className="text-xs font-bold tracking-widest text-violet-600 mb-3">SUBJECTIVE</h4>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-1">Chief Complaint</p>
            <p className="text-sm text-gray-800 min-h-5">{chiefComplaint || <span className="text-gray-300 italic">No complaint recorded</span>}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-1">History of Present Illness</p>
            <p className="text-sm text-gray-800 min-h-5">{historyOfPresentIllness || <span className="text-gray-300 italic">No history recorded</span>}</p>
          </div>
        </div>
      </div>

      {/* Objective Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h4 className="text-xs font-bold tracking-widest text-emerald-600 mb-3">OBJECTIVE</h4>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">Physical Exam Findings</p>
          <p className="text-sm text-gray-800 min-h-5">{remarks || <span className="text-gray-300 italic">No remarks recorded</span>}</p>
        </div>
      </div>

      {/* Assessment Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h4 className="text-xs font-bold tracking-widest text-amber-600 mb-3">ASSESSMENT</h4>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase mb-1">Diagnosis</p>
          <p className="text-sm text-gray-800 min-h-5">{diagnosis || <span className="text-gray-300 italic">No diagnosis recorded</span>}</p>
        </div>
        {diagnostics.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {diagnostics.map((d, i) => (
              <img key={i} src={d.imageData} alt="Diagnostic" className="rounded-lg border border-gray-200" />
            ))}
          </div>
        )}
      </div>

      {/* Plan Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h4 className="text-xs font-bold tracking-widest text-cyan-600 mb-3">PLAN</h4>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase mb-1">Treatment Plan</p>
            <p className="text-sm text-gray-800 min-h-5">{plan || <span className="text-gray-300 italic">No plan recorded</span>}</p>
          </div>
          
          {/* Prescriptions Preview */}
          {prescriptions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase mb-2">Prescriptions</p>
              <div className="space-y-2">
                {prescriptions.map((rx, idx) => (
                  <div key={idx} className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                    <p className="font-semibold text-amber-900 text-sm">{rx.drug}</p>
                    <p className="text-xs text-amber-700">{rx.dose} · {rx.frequency} · {rx.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Educational Materials Preview */}
          {selectedMaterials.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase mb-2">Educational Materials</p>
              <div className="space-y-2">
                {selectedMaterials.map((material, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg p-2">
                    {material.thumbnail && (
                      <img src={material.thumbnail} alt={material.title} className="w-8 h-8 object-cover rounded" />
                    )}
                    <p className="text-xs font-medium text-blue-900">{material.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Follow-up */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase mb-1">Follow-up</p>
            <p className="text-sm text-gray-800 min-h-5">{followUp || <span className="text-gray-300 italic">No follow-up scheduled</span>}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="w-full max-w-6xl max-h-[95vh] bg-white text-gray-800 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col">

          {/* Header */}
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-linear-to-r from-gray-50 to-white">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">SOAP Note</h2>
              <p className="text-sm text-gray-500">{patient.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body - Two Column Layout */}
          <div
            id="soap-modal-content"
            className="flex-1 overflow-y-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-0">
              
              {/* Left Column - Input Fields */}
              <div className="overflow-y-auto p-4 sm:p-6 bg-gray-50/50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="space-y-6">
                  {/* Subjective Section */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-5 bg-violet-500 rounded-full"></div>
                      <h3 className="text-sm font-bold tracking-wider text-gray-700">SUBJECTIVE</h3>
                    </div>
                    <FieldBlock
                      label="Chief Complaint"
                      placeholder="Enter patient's chief complaint"
                      value={chiefComplaint}
                      onChange={e => setChiefComplaint(e.target.value)}
                    />
                    <div className="mt-4">
                      <FieldBlock
                        label="History of Present Illness"
                        placeholder="Describe symptoms, duration, onset..."
                        value={historyOfPresentIllness}
                        onChange={e => setHistoryOfPresentIllness(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Objective Section */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-5 bg-emerald-500 rounded-full"></div>
                      <h3 className="text-sm font-bold tracking-wider text-gray-700">OBJECTIVE</h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">(Physical exam, labs, vitals)</p>
                    <FieldBlock
                      label="Remarks"
                      placeholder="Physical exam findings..."
                      value={remarks}
                      onChange={e => setRemarks(e.target.value)}
                    />
                  </div>

                  {/* Assessment Section */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-5 bg-amber-500 rounded-full"></div>
                      <h3 className="text-sm font-bold tracking-wider text-gray-700">ASSESSMENT</h3>
                    </div>
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
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {diagnostics.map((d, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 border border-gray-200 p-3 rounded-xl"
                          >
                            <img src={d.imageData} className="rounded-lg w-full" alt="Diagnostic" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Plan Section */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-5 bg-cyan-500 rounded-full"></div>
                      <h3 className="text-sm font-bold tracking-wider text-gray-700">PLAN</h3>
                    </div>
                    <FieldBlock
                      label="Plan"
                      placeholder="Treatment plan"
                      value={plan}
                      onChange={e => setPlan(e.target.value)}
                    />

                    <ActionChips
                      options={["Add Prescription", "Add Body Diagram", "Add Educational Material"]}
                      onSelect={(option) => {
                        if (option === "Add Prescription") {
                          setOpenPrescription(true);
                        } else if (option === "Add Body Diagram") {
                          setOpen3DModal(true);
                        } else if (option === "Add Educational Material") {
                          setOpenEducationalMaterial(true);
                        }
                      }}
                    />

                    {prescriptions.map((rx, idx) => (
                      <div
                        key={idx}
                        className="mt-4 bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-xl flex justify-between items-start"
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
                            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(idx)}
                            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}

                    {selectedMaterials.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <p className="text-sm font-medium text-gray-700">Attached Educational Materials</p>
                        {selectedMaterials.map((material, idx) => (
                          <div
                            key={idx}
                            className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-xl flex justify-between items-center"
                          >
                            <div className="flex items-center gap-3">
                              {material.thumbnail && (
                                <img
                                  src={material.thumbnail}
                                  alt={material.title}
                                  className="w-12 h-12 object-cover rounded-lg shadow-sm"
                                />
                              )}
                              <div>
                                <p className="font-semibold text-gray-900">{material.title}</p>
                                <p className="text-sm text-gray-500">{material.category}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveMaterial(idx)}
                              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-4">
                      <FieldBlock
                        label="Follow-up"
                        placeholder="Clinic and date"
                        value={followUp}
                        onChange={e => setFollowUp(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="hidden lg:block overflow-y-auto p-6 bg-linear-to-b from-gray-100 to-gray-50 border-l border-gray-200 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="sticky top-0">
                  {showPreview ? (
                    renderPreview()
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm font-medium">Preview will appear here</p>
                      <p className="text-xs mt-1">after clicking Preview button</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Preview Toggle - Visible only on small screens */}
              <div className="lg:hidden border-t border-gray-200 bg-gray-50 p-4">
                <details className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <summary className="px-4 py-3 cursor-pointer font-medium text-gray-700 flex items-center justify-between hover:bg-gray-50">
                    <span>📋 Live Preview</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 border-t border-gray-200">
                    {renderPreview()}
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-wrap justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleShowPreview}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
            >
              Preview
            </button>
            <button
              onClick={handleExportPDF}
              className="px-5 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium transition-colors shadow-sm"
            >
              Export PDF
            </button>
            <button
              onClick={handleSaveNote}
              className="px-5 py-2.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 font-medium transition-colors shadow-md"
            >
              Save Note
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

      <EducationalMaterialModal
        open={openEducationalMaterial}  
        onClose={() => setOpenEducationalMaterial(false)}
        onAttach={(materials) => {
          setSelectedMaterials(materials);
          setOpenEducationalMaterial(false);
        }}
        selected={selectedMaterials}
      />
    </>
  );
};

export default SoapNoteModal;

