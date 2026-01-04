"use client";

import StatCard from "@/components/StatCard";
import Activity from "@/components/Activity";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardPage() {
  const totalUsersData = [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 600 },
    { month: "Mar", users: 800 },
    { month: "Apr", users: 1200 },
    { month: "May", users: 1500 },
    { month: "Jun", users: 1800 },
    { month: "Jul", users: 2000 },
    { month: "Aug", users: 2200 },
    { month: "Sep", users: 2400 },
    { month: "Oct", users: 2600 },
    { month: "Nov", users: 2800 },
    { month: "Dec", users: 3000 },
  ];

  const consultationData = [
    { name: "Ear", value: 38.6 },
    { name: "Nose", value: 22.5 },
    { name: "Throat", value: 30.8 },
    { name: "Aesthetics", value: 8.1 },
  ];

  const prescriptionsData = [
    { month: "Jan", count: 120 },
    { month: "Feb", count: 180 },
    { month: "Mar", count: 150 },
    { month: "Apr", count: 210 },
    { month: "May", count: 260 },
    { month: "Jun", count: 300 },
  ];

  const consultationsBreakdown = [
    { name: "Online", value: 65 },
    { name: "In-Clinic", value: 25 },
    { name: "Follow-up", value: 10 },
  ];

  const COLORS = ["#6c63ff", "#4fd1c5", "#a78bfa", "#f6ad55"];

  return (
    <section className="flex flex-col bg-[#0f1115] text-white min-h-screen">
      <div className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#181b20] px-5 py-3 rounded-lg text-sm outline-none w-full sm:w-64"
          />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard title="Customers" value="721K" change="+11.01%" positive />
          <StatCard title="Visits" value="367K" change="-0.03%" />
          <StatCard title="New Appointment" value="1,156" change="+3.55%" positive />
          <StatCard title="Active Users" value="239K" change="+6.08%" positive />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Line Chart */}
          <div className="xl:col-span-2 bg-[#181b20] rounded-xl p-6 xl:p-8 h-80 sm:h-96">
            <h2 className="font-medium mb-4">Total Users (Jan — Dec)</h2>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={totalUsersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2c2f36" />
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#6c63ff" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-[#181b20] rounded-xl p-6 xl:p-8 h-80 sm:h-96">
            <h2 className="font-medium mb-4">Consultations In Progress</h2>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={consultationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {consultationData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Bar Chart */}
          <div className="bg-[#181b20] rounded-xl p-6 xl:p-8 h-80 sm:h-96">
            <h2 className="font-medium mb-4">AI Prescriptions Generated</h2>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={prescriptionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2c2f36" />
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="count" fill="#6c63ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Chart */}
          <div className="bg-[#181b20] rounded-xl p-6 xl:p-8 h-80 sm:h-96">
            <h2 className="font-medium mb-4">Consultations</h2>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={consultationsBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {consultationsBreakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}