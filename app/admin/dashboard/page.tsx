"use client";

import { useState, useEffect } from "react";
import StatCard from "@/components/StatCard";
import dynamic from "next/dynamic";

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
const Cell = dynamic(() => import("recharts").then(m => m.Cell), { ssr: false });
const Legend = dynamic(() => import("recharts").then(m => m.Legend), { ssr: false });

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* -------------------- DATA -------------------- */
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
    { name: "Facial", value: 45 },
    { name: "Laser", value: 25 },
    { name: "Consultation", value: 20 },
    { name: "Others", value: 10 },
  ];

  /* 🔥 COMBINED TABLE DATA */
  const recentActivities = [
    // APPOINTMENTS (name lang ng nag-book)
    { id: "A-001", name: "Glory Mae T.", service: "Acne Intense Facial", type: "Appointment", payment: "-", price: "-" },
    { id: "A-002", name: "Glory Mae T.", service: "Carbon Facial", type: "Appointment", payment: "-", price: "-" },
    { id: "A-003", name: "Glory Mae T.", service: "Brightening Laser", type: "Appointment", payment: "-", price: "-" },

    // TRANSACTIONS
    { id: "T-001", name: "Monic Yabat", service: "AquaPure", type: "Transaction", payment: "Cash", price: "₱3,000" },
    { id: "T-002", name: "Cendy De Vera", service: "Pevonia Light", type: "Transaction", payment: "Cash", price: "₱4,000" },
    { id: "T-003", name: "Sofie Vidal", service: "Cryo Facial", type: "Transaction", payment: "Cash", price: "₱7,000" },
  ];

  const COLORS = ["#6c63ff", "#4fd1c5", "#f6ad55", "#a78bfa"];

  return (
    <section className="flex flex-col bg-gray-50 min-h-screen">
      <div className="flex-1 p-6 sm:p-8 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <input
            type="text"
            placeholder="Search..."
            className="bg-white px-5 py-3 rounded-lg border border-gray-200 w-full sm:w-64"
          />
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard title="Revenue" value="₱12,500+" change="+11.01%" positive />
          <StatCard title="Expenses" value="₱12,500+" change="-0.03%" />
          <StatCard title="Appointments" value="34" change="+3.55%" positive />
          <StatCard title="Customers" value="721K" change="+6.08%" positive />
        </div>

        {/* CHART ROW */}
        {mounted && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* LINE CHART */}
            <div className="xl:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="font-medium mb-4">Total Users</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={totalUsersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#6c63ff" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* PIE CHART */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="font-medium mb-4">Service Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={consultationData} dataKey="value" cx="50%" cy="50%" outerRadius={90} label>
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
        )}

        {/* 🔥 ONE TABLE ONLY */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Recent Activities</h2>
            <span className="text-sm text-blue-600 cursor-pointer">See All</span>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-2 text-left">ID</th>
                <th className="pb-2 text-left">Name</th>
                <th className="pb-2 text-left">Service</th>
                <th className="pb-2 text-left">Type</th>
                <th className="pb-2 text-left">Payment</th>
                <th className="pb-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map(item => (
                <tr key={item.id} className="border-b last:border-none hover:bg-gray-50">
                  <td className="py-3">{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.service}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${item.type === "Appointment"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"}`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td>{item.payment}</td>
                  <td className="font-medium">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
