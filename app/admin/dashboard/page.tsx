"use client";

import { useState, useEffect } from "react";
import StatCard from "@/components/StatCard";
import dynamic from "next/dynamic";
import { 
  Search, 
  Bell, 
  Calendar, 
  TrendingUp, 
  Filter,
  MoreHorizontal,
  Eye
} from "lucide-react";

/* -------------------- RECHARTS (CLIENT ONLY) -------------------- */
const LineChart = dynamic(() => import("recharts").then(m => m.LineChart), { ssr: false });
const Line = dynamic(() => import("recharts").then(m => m.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(m => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(m => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(m => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false });
const PieChart = dynamic(() => import("recharts").then(m => m.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then(m => m.Pie), { ssr: false });
const Legend = dynamic(() => import("recharts").then(m => m.Legend), { ssr: false });

import { Cell } from "recharts";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* -------------------- DATA -------------------- */
  const totalUsersData = [
    { month: "Jan", users: 400 }, { month: "Feb", users: 600 }, { month: "Mar", users: 800 },
    { month: "Apr", users: 1200 }, { month: "May", users: 1500 }, { month: "Jun", users: 1800 },
    { month: "Jul", users: 2000 }, { month: "Aug", users: 2200 }, { month: "Sep", users: 2400 },
    { month: "Oct", users: 2600 }, { month: "Nov", users: 2800 }, { month: "Dec", users: 3000 },
  ];

  const consultationData = [
    { name: "Ear", value: 45 }, { name: "Nose", value: 25 },
    { name: "Throat", value: 20 }, { name: "Aesthetics", value: 10 },
  ];

  const recentActivities = [
    { id: "A-001", name: "Glory Mae T.", service: "Acne Intense Facial", type: "Appointment", payment: "-", price: "-" },
    { id: "A-002", name: "Glory Mae T.", service: "Carbon Facial", type: "Appointment", payment: "-", price: "-" },
    { id: "A-003", name: "Glory Mae T.", service: "Brightening Laser", type: "Appointment", payment: "-", price: "-" },
    { id: "T-001", name: "Monic Yabat", service: "AquaPure", type: "Transaction", payment: "Cash", price: "₱3,000" },
    { id: "T-002", name: "Cendy De Vera", service: "Pevonia Light", type: "Transaction", payment: "Cash", price: "₱4,000" },
    { id: "T-003", name: "Sofie Vidal", service: "Cryo Facial", type: "Transaction", payment: "Cash", price: "₱7,000" },
  ];

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#a855f7"];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Title Section */}
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-0.5">Monitor clinic appointments, services, and revenue today.</p>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients, services..."
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm w-64 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              {/* Quick Filter */}
              <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* WELCOME BANNER */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute right-20 bottom-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
          <div className="relative">
            <h2 className="text-xl font-semibold">Welcome Back Doctor 👋</h2>
            <p className="text-sm opacity-90 mt-1">Here's what's happening with your clinic today.</p>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <StatCard title="Revenue" value="₱12,500+" change="+11.01%" positive type="revenue" />
          <StatCard title="Expenses" value="₱12,500+" change="-0.03%" positive={false} type="expenses" />
          <StatCard title="Appointments" value="34" change="+3.55%" positive type="appointments" />
          <StatCard title="Customers" value="721K" change="+6.08%" positive type="customers" />
        </div>

        {/* CHARTS ROW */}
        {mounted && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* LINE CHART */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Monthly Users</h3>
                  <p className="text-sm text-gray-500 mt-0.5">User growth over time</p>
                </div>
                <div className="flex items-center gap-2">
                  <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                    <option>This Year</option>
                    <option>Last Year</option>
                  </select>
                </div>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={totalUsersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value >= 1000 ? `${value / 1000}k` : value}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#6366f1" 
                      strokeWidth={3} 
                      dot={false}
                      activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* PIE CHART */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Service Distribution</h3>
                <p className="text-sm text-gray-500 mt-0.5">Consultation breakdown by type</p>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={consultationData}
                      dataKey="value"
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      nameKey="name"
                    >
                      {consultationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value) => <span className="text-sm text-gray-600 ml-1">{value}</span>}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* RECENT ACTIVITIES */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Recent Activities</h3>
              <p className="text-sm text-gray-500 mt-0.5">Latest appointments and transactions</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
                View All
              </button>
            </div>
          </div>

          {/* CARD STYLE FOR MOBILE */}
          <div className="flex flex-col gap-3 p-4 sm:hidden">
            {recentActivities.map(item => (
              <div key={item.id} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-gray-500">{item.id}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    item.type === "Appointment" 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "bg-emerald-50 text-emerald-700"
                  }`}>
                    {item.type}
                  </span>
                </div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600 mt-0.5">{item.service}</p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{item.payment}</span>
                  <span className="font-semibold text-gray-900">{item.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* TABLE FOR DESKTOP */}
          <div className="overflow-x-auto hidden sm:block">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentActivities.map((item) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{item.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{item.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.service}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.type === "Appointment"
                            ? "bg-indigo-50 text-indigo-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{item.payment}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{item.price}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

