export default function AdminPatientPage() {
  return (
    <section className="flex-1 bg-[#0f1115] text-white p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <input
          type="text"
          placeholder="Search..."
          className="bg-[#181b20] px-4 py-2 rounded-lg text-sm outline-none border border-[#2a2d33]"
        />
      </div> 
      <div className="bg-[#181b20] rounded-xl p-6 h-[600] overflow-y-auto">
        <h2 className="font-medium mb-4">Patient List</h2>

        <table className="w-full text-sm">
          <thead className="bg-[#1f2228] text-gray-300 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left">Patient Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Age</th>
              <th className="px-4 py-3 text-left">Last Visits</th>
              <th className="px-4 py-3 text-right">Last Treatment</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-[#2a2d33] hover:bg-[#1a1d22]">
              <td className="px-4 py-3 font-medium">John Doe</td>
              <td className="px-4 py-3">+1 234 567 8901</td>
              <td className="px-4 py-3 text-gray-300"> Johndoe@gmail.com
              </td>
              <td className="px-4 py-3">29</td>
              <td className="px-4 py-3">2024-06-15</td>
              <td className="px-4 py-3 text-right">General Checkup</td>

            
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

       

      
        </div> 
    </section>
   

  );
}
