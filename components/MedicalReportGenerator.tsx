"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Patient {
  id?: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  phone?: string;
  address?: string;
  chiefComplaints?: string;
  remarks?: string;
  notes?: string;
  attachments?: any[];
}

interface SOAPNote {
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
  diagnosis?: string;
  prescriptions?: any[];
  followUp?: string;
}

interface AnnotationSnapshot {
  tab: string;
  area: string;
  imageData: string;
  timestamp: Date;
}

interface MedicalReportGeneratorProps {
  patient: Patient;
  soapNote?: SOAPNote;
  annotationSnapshots?: AnnotationSnapshot[];
  onGenerate?: (pdfBlob: Blob) => void;
}

const MedicalReportGenerator: React.FC<MedicalReportGeneratorProps> = ({
  patient,
  soapNote,
  annotationSnapshots = [],
  onGenerate,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!reportRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        foreignObjectRendering: true,
        onclone: (clonedDoc) => {
          // Replace unsupported color functions with RGB equivalents
          const elements = clonedDoc.querySelectorAll('*');
          elements.forEach((el) => {
            const computedStyle = window.getComputedStyle(el);
            for (let i = 0; i < computedStyle.length; i++) {
              const prop = computedStyle[i];
              const value = computedStyle.getPropertyValue(prop);
              if (value.includes('oklch(') || value.includes('lab(')) {
                // Convert oklch to rgb approximation (simplified)
                let rgbValue = value;
                if (value.includes('oklch(')) {
                  // Simple conversion: oklch(l c h) ≈ rgb based on lightness
                  const match = value.match(/oklch\(([^)]+)\)/);
                  if (match) {
                    const params = match[1].split(' ');
                    const l = parseFloat(params[0]);
                    const rgbApprox = Math.round(l * 255);
                    rgbValue = `rgb(${rgbApprox}, ${rgbApprox}, ${rgbApprox})`;
                  }
                } else if (value.includes('lab(')) {
                  // Simple conversion: lab(l a b) ≈ rgb based on lightness (L is 0-100)
                  const match = value.match(/lab\(([^)]+)\)/);
                  if (match) {
                    const params = match[1].split(' ');
                    const l = parseFloat(params[0]);
                    const rgbApprox = Math.round((l / 100) * 255);
                    rgbValue = `rgb(${rgbApprox}, ${rgbApprox}, ${rgbApprox})`;
                  }
                }
                (el as HTMLElement).style.setProperty(prop, rgbValue, 'important');
              }
            }
          });
        },
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      // Calculate dimensions to fit A4
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const imgWidth = 190; // Leave margins
      const pageHeight = 277; // Leave margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10; // Top margin

      // Add first page
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is longer
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Add annotation snapshots as separate pages
      if (annotationSnapshots.length > 0) {
        annotationSnapshots.forEach((snapshot, index) => {
          pdf.addPage();
          pdf.setFontSize(16);
          pdf.text(`Annotation Snapshot - ${snapshot.tab} (${snapshot.area})`, 10, 20);
          pdf.setFontSize(10);
          pdf.text(`Generated: ${snapshot.timestamp.toLocaleString()}`, 10, 30);

          // Add the snapshot image
          const snapshotImg = new Image();
          snapshotImg.src = snapshot.imageData;
          pdf.addImage(snapshot.imageData, 'PNG', 10, 40, 190, 120);
        });
      }

      const pdfBlob = pdf.output('blob');
      const fileName = `Medical_Report_${patient.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;

      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (onGenerate) {
        onGenerate(pdfBlob);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Medical Report Generator</h3>
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? 'Generating...' : 'Generate PDF Report'}
        </button>
      </div>

      {/* Hidden report template for PDF generation */}
      <div
        ref={reportRef}
        className="hidden"
        style={{
          width: '800px',
          padding: '40px',
          backgroundColor: 'white',
          color: 'black',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #333', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0', color: '#2563eb' }}>
            CENTRA CLINIC MEDICAL REPORT
          </h1>
          <p style={{ fontSize: '14px', margin: '5px 0', color: '#666' }}>
            Comprehensive Medical Documentation
          </p>
          <p style={{ fontSize: '12px', margin: '0', color: '#666' }}>
            Generated on: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Patient Information */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#1f2937', borderBottom: '1px solid #e5e7eb', paddingBottom: '5px' }}>
            PATIENT INFORMATION
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <strong>Name:</strong> {patient.name}
            </div>
            <div>
              <strong>Email:</strong> {patient.email}
            </div>
            {patient.age && (
              <div>
                <strong>Age:</strong> {patient.age}
              </div>
            )}
            {patient.gender && (
              <div>
                <strong>Gender:</strong> {patient.gender}
              </div>
            )}
            {patient.phone && (
              <div>
                <strong>Phone:</strong> {patient.phone}
              </div>
            )}
            {patient.address && (
              <div style={{ gridColumn: 'span 2' }}>
                <strong>Address:</strong> {patient.address}
              </div>
            )}
          </div>
        </div>

        {/* SOAP Notes */}
        {soapNote && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#1f2937', borderBottom: '1px solid #e5e7eb', paddingBottom: '5px' }}>
              SOAP NOTES
            </h2>

            {soapNote.subjective && (
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '5px' }}>SUBJECTIVE</h3>
                <p style={{ margin: '0', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{soapNote.subjective}</p>
              </div>
            )}

            {soapNote.objective && (
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#22c55e', marginBottom: '5px' }}>OBJECTIVE</h3>
                <p style={{ margin: '0', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{soapNote.objective}</p>
              </div>
            )}

            {soapNote.assessment && (
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#f97316', marginBottom: '5px' }}>ASSESSMENT</h3>
                <p style={{ margin: '0', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{soapNote.assessment}</p>
              </div>
            )}

            {soapNote.plan && (
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#a855f7', marginBottom: '5px' }}>PLAN</h3>
                <p style={{ margin: '0', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{soapNote.plan}</p>
              </div>
            )}

            {soapNote.diagnosis && (
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#dc2626', marginBottom: '5px' }}>DIAGNOSIS</h3>
                <p style={{ margin: '0', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{soapNote.diagnosis}</p>
              </div>
            )}
          </div>
        )}

        {/* Prescriptions */}
        {soapNote?.prescriptions && soapNote.prescriptions.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#1f2937', borderBottom: '1px solid #e5e7eb', paddingBottom: '5px' }}>
              PRESCRIPTIONS
            </h2>
            {soapNote.prescriptions.map((rx: any, index: number) => (
              <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '5px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{rx.drug}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {rx.dose} · {rx.frequency} · {rx.duration}
                </div>
                {rx.instructions && (
                  <div style={{ fontSize: '14px', marginTop: '5px' }}>
                    <strong>Instructions:</strong> {rx.instructions}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Additional Notes */}
        {(patient.chiefComplaints || patient.remarks || patient.notes) && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#1f2937', borderBottom: '1px solid #e5e7eb', paddingBottom: '5px' }}>
              ADDITIONAL NOTES
            </h2>

            {patient.chiefComplaints && (
              <div style={{ marginBottom: '10px' }}>
                <strong>Chief Complaints:</strong>
                <p style={{ margin: '5px 0', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{patient.chiefComplaints}</p>
              </div>
            )}

            {patient.remarks && (
              <div style={{ marginBottom: '10px' }}>
                <strong>Remarks:</strong>
                <p style={{ margin: '5px 0', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{patient.remarks}</p>
              </div>
            )}

            {patient.notes && (
              <div style={{ marginBottom: '10px' }}>
                <strong>Notes:</strong>
                <p style={{ margin: '5px 0', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{patient.notes}</p>
              </div>
            )}
          </div>
        )}

        {/* Follow-up */}
        {soapNote?.followUp && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#1f2937', borderBottom: '1px solid #e5e7eb', paddingBottom: '5px' }}>
              FOLLOW-UP
            </h2>
            <p style={{ margin: '0', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{soapNote.followUp}</p>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '50px', textAlign: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '20px', fontSize: '12px', color: '#666' }}>
          <p>This medical report was generated electronically by Centra Clinic Management System.</p>
          <p>Please consult with healthcare professionals for medical advice and treatment.</p>
        </div>
      </div>
    </div>
  );
};

export default MedicalReportGenerator;
