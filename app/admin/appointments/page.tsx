export default function AppointmentsPage() {
  return (
    <section className="flex-1 bg-[#0f1115] text-white p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Appointments</h1>

        <input
          type="text"
          placeholder="Search..."
          className="bg-[#181b20] px-4 py-2 rounded-lg text-sm outline-none border border-[#2a2d33]"
        />
      </div>

      <div className="bg-[#181b20] rounded-xl p-6 h-[600px] overflow-y-auto">
        <h2 className="font-medium mb-4">Appointment List</h2>

        {/* TABLE */}
        <table className="w-full text-sm">
          <thead className="bg-[#1f2228] text-gray-300 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Patient</th>
              <th className="px-4 py-3 text-left">Test</th>
              <th className="px-4 py-3 text-left">Doctor</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Timer</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-[#2a2d33] hover:bg-[#1a1d22]">
              <td className="px-4 py-3">7:00 – 7:10</td>
              <td className="px-4 py-3 font-medium">Braha Marlam Roh</td>
              <td className="px-4 py-3 text-gray-300">
                Upper Abdomen General — Test Code 2705
              </td>
              <td className="px-4 py-3">Valeria</td>

              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded-lg text-xs bg-gray-700 text-gray-200">
                  Visited
                </span>
              </td>

              <td className="px-4 py-3 font-mono text-gray-400">00:00</td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button className="p-2 rounded-lg bg-[#1f2228] hover:bg-[#2a2d33]">
                    👁️
                  </button>
                  <button className="p-2 rounded-lg bg-[#1f2228] hover:bg-[#2a2d33]">
                    ✏️
                  </button>
                  <button className="p-2 rounded-lg bg-[#1f2228] hover:bg-[#2a2d33]">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>

            <tr className="border-b border-[#2a2d33] hover:bg-[#1a1d22]">
              <td className="px-4 py-3">8:20 – 8:30</td>
              <td className="px-4 py-3 font-medium">Carter Smith</td>
              <td className="px-4 py-3 text-gray-300">
                Upper Abdomen General — Test Code 2705
              </td>
              <td className="px-4 py-3">Valeria</td>

              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded-lg text-xs bg-amber-500/20 text-amber-400">
                  Waiting
                </span>
              </td>

              <td className="px-4 py-3 font-mono text-amber-400">05:54</td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button className="p-2 rounded-lg bg-[#1f2228] hover:bg-[#2a2d33]">
                    👁️
                  </button>
                  <button className="p-2 rounded-lg bg-[#1f2228] hover:bg-[#2a2d33]">
                    ✏️
                  </button>
                  <button className="p-2 rounded-lg bg-[#1f2228] hover:bg-[#2a2d33]">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-[#1a1d22]">
              <td className="px-4 py-3">9:00 – 9:10</td>
              <td className="px-4 py-3 font-medium">Ashlynn Botosh</td>
              <td className="px-4 py-3 text-gray-300">
                Upper Abdomen General — Test Code 2705
              </td>
              <td className="px-4 py-3">Alexander</td>

              <td className="px-4 py-3">
                <span className="px-2 py-1 rounded-lg text-xs bg-blue-600/30 text-blue-300">
                  Scheduled
                </span>
              </td>

              <td className="px-4 py-3 font-mono text-gray-400">00:00</td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button className="p-2 rounded-lg bg-[#1f2228] hover:bg-[#2a2d33]">
                    👁️
                  </button>
                  <button className="p-2 rounded-lg bg-[#1f2228] hover:bg-[#2a2d33]">
                    ✏️
                  </button>
                  <button className="p-2 rounded-lg bg-[#1f2228] hover:bg-[#2a2d33]">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {/* END TABLE */}
      </div>
    </section>
  );
}
