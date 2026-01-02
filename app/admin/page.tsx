import StatCard from "@/components/StatCard"
import Activity from "@/components/Activity"

export default function DashboardPage() {
  return ( 
          <section className="flex-1 bg-[#0f1115] text-white p-6 space-y-6">
            
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              
              <input
              type="text"
              placeholder="Search..."
              className="bg-[1811b20] px-4 py-2 rounded-lg text-sm outline-none"/>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard title="Customers" value="1,234" change="+11.01%" positive />
              <StatCard title="Visitors" value="567"change="+0.03%" positive  />
              <StatCard title="New Appointment" value="1,156" change="+13.01%" positive />
              <StatCard title="Active Users" value="89"change="+1.01%" positive  />
            </div> 

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-[#181b20] rounded-xl p-6 h-[320]">
                <h2 className="font-medium mb-4">Total Users</h2>
                <div className="h-full flex-items-center justify-center text-gray-500">Line Chart goes here
               </div>
              </div>
              
              <div className="bg-[#181b20] rounded-xl p-6 h-[320]overflow-y-auto">
                <h2 className="font-meduim mb-4">Activity</h2> 
                <ul className="space-y-4 text-sm">
                  <Activity text="You added a new appointment" time="2 hours ago" />
                  <Activity text="New user registered" time="3 hours ago" />
                  <Activity text="Server rebooted" time="5 hours ago" />
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-[#181b20] rounded-xl p-6 h-[260]">
                <h2 className="font-medium mb-4">Recent Appointments</h2>
                <div className="h-full flex-items-center justify-center text-gray-500">Table goes here
               </div>
              </div>

              <div className="bg-[#181b20] rounded-xl p-6 h-[260]">
                <h2 className="font-medium mb-4">Consultation in Progress</h2>
                <div className="h-full flex-items-center justify-center text-gray-500">Chart Placeholder
               </div>
              </div>

            </div>
           





          </section>

  )


}