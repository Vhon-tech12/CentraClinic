"use client";

import { useState } from "react";

export default function AdminDiagnosticPage() {
  const [diagnosis, setDiagnosis] = useState("");

  const handleSave = () => {
    localStorage.setItem("diagnosis", diagnosis);
    alert("Diagnosis saved successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Diagnostic Page</h1>
      <p className="mb-6">Enter the diagnosis below and save it.</p>

      <div className="space-y-4">
        <div>
          <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-2">
            Diagnosis
          </label>
          <textarea
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis / impression"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Diagnosis
        </button>
      </div>
    </div>
  );
}
