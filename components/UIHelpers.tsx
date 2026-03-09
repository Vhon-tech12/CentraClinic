import React from "react";

export const Field = ({ label, value }: any) => (
  <div>
    <p className="text-xs opacity-60 mb-1">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export const Placeholder = ({ text }: any) => (
  <p className="opacity-70">{text}</p>
);

export const FieldBlock = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  readOnly = false, // new prop
}: {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  readOnly?: boolean;
}) => (
  <div className="space-y-1.5">
    <p className="text-sm font-medium text-gray-700">{label}</p>
    {type === "textarea" ? (
      <textarea
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly} // apply readOnly
        className={`w-full rounded-lg px-3 py-2.5 text-sm
                   bg-gray-50 text-gray-900
                   border border-gray-200
                   placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500
                   resize-none
                   ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`} // style if readonly
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly} // apply readOnly
        className={`w-full rounded-lg px-3 py-2.5 text-sm
                   bg-gray-50 text-gray-900
                   border border-gray-200
                   placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500
                   ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`} // style if readonly
      />
    )}
  </div>
);

export const Th = ({ children, className = "" }: any) => (
  <th className={`px-4 py-3 text-left ${className}`}>{children}</th>
);

export const Td = ({ children }: any) => (
  <td className="px-4 py-3">{children}</td>
);

export const SectionLabel = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-1">
    <p className="text-xs font-semibold tracking-widest text-gray-400">{title}</p>
    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
  </div>
);

export const ActionChips = ({ options, onSelect }: { options: string[]; onSelect?: (option: string) => void }) => (
  <div className="flex flex-wrap gap-2 mt-1">
    {options.map((o) => (
      <button
        key={o}
        onClick={() => onSelect?.(o)}
        className="px-3 py-1.5 rounded-full text-xs
                   border border-gray-600
                   bg-white text-gray-900
                   hover:bg-gray-100 hover:border-gray-500 transition"
      >
        + {o}
      </button>
    ))}
  </div>
);