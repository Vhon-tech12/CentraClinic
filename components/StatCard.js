"use client";

import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Calendar, 
  Users 
} from "lucide-react";

const iconMap = {
  revenue: DollarSign,
  expenses: CreditCard,
  appointments: Calendar,
  customers: Users,
};

const colorMap = {
  revenue: {
    bg: "bg-indigo-50",
    icon: "text-indigo-600",
    border: "border-indigo-500",
  },
  expenses: {
    bg: "bg-red-50",
    icon: "text-red-600",
    border: "border-red-500",
  },
  appointments: {
    bg: "bg-green-50",
    icon: "text-green-600",
    border: "border-green-500",
  },
  customers: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    border: "border-purple-500",
  },
};

export default function StatCard({
  title,
  value,
  change,
  positive = false,
  type = "revenue",
}) {
  const Icon = iconMap[type] || DollarSign;
  const colors = colorMap[type] || colorMap.revenue;

  return (
    <div className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${colors.bg} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            positive 
              ? "bg-green-50 text-green-600" 
              : "bg-red-50 text-red-600"
          }`}
        >
          {positive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {change}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>

      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${colors.border}`} />
    </div>
  );
}

