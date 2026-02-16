"use client";
import { PaperClipIcon } from "@heroicons/react/20/solid";

const PatientNotes = ({ patient }: any) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-900">
          Patient Notes
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Additional information and attachments.
        </p>
      </div>

      {/* Content */}
      <div>
        <dl className="divide-y divide-gray-200">
          {/* Chief Complaints */}
          <div className="px-4 sm:px-6 py-5 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-700">
              Chief Complaints
            </dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {patient.chiefComplaints || "—"}
            </dd>
          </div>

          {/* Remarks */}
          <div className="px-4 sm:px-6 py-5 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-700">
              Remarks
            </dt>
            <dd className="text-sm text-gray-800 col-span-2">
              {patient.remarks || "—"}
            </dd>
          </div>

          {/* Notes */}
          <div className="px-4 sm:px-6 py-5 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-700">
              Notes
            </dt>
            <dd className="text-sm text-gray-800 col-span-2">
              {patient.notes || "—"}
            </dd>
          </div>

          {/* Attachments */}
          <div className="px-4 sm:px-6 py-5 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-700">
              Attachments
            </dt>
            <dd className="col-span-2">
              <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-gray-50">
                {(patient.attachments || []).length === 0 && (
                  <li className="px-4 py-3 text-sm text-gray-500">
                    No attachments
                  </li>
                )}

                {(patient.attachments || []).map((file: any, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <div className="flex items-center flex-1 min-w-0 gap-3">
                      <PaperClipIcon className="h-5 w-5 text-gray-400" />
                      <span className="truncate text-sm font-medium text-gray-900">
                        {file.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {file.size}
                      </span>
                    </div>

                    <a
                      href={file.url || "#"}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PatientNotes;
