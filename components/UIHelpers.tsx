


export const Field = ({ label, value }: any) => (
  <div>
    <p className="text-xs opacity-60 mb-1">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export const Placeholder = ({ text }: any) => (
  <p className="opacity-70">{text}</p>
);

export const FieldBlock = ({ label, placeholder, value, onChange, type = "text" }: { label: string; placeholder?: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; type?: string }) => (
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-300">{label}</p>
    {type === "textarea" ? (
      <textarea
        rows={2}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl px-3 py-2 text-sm
                   bg-[#0f1115] text-gray-200
                   border border-gray-700
                   placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl px-3 py-2 text-sm
                   bg-[#0f1115] text-gray-200
                   border border-gray-700
                   placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
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
                   bg-[#13161d] text-gray-300
                   hover:bg-[#1b1f27] hover:border-gray-500 transition"
      >
        + {o}
      </button>
    ))}
  </div>
);