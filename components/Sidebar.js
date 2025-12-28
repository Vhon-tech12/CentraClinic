"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  Bot,
  Download,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Patient Chart",
    href: "/admin/patients",
    icon: Users,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Stethoscope,
  },
  {
    label: "Appointment",
    href: "/admin/appointments",
    icon: Calendar,
  },
  {
    label: "AI Prescription",
    href: "/admin/ai",
    icon: Bot,
  },
  {
    label: "Export",
    href: "/admin/export",
    icon: Download,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#0f1216] text-gray-400 flex flex-col justify-between border-r border-gray-800">
      
      {/* TOP */}
      <div className="p-6">
        <nav className="space-y-2 text-sm">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="p-6 border-t border-gray-800 space-y-4">
        {/* PROFILE */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-700" />
          <div>
            <p className="text-sm font-medium text-white">
              Gustavo Xavier
            </p>
            <span className="text-xs text-yellow-400">Admin</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="space-y-2 text-sm">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 hover:text-white"
          >
            <Settings size={16} />
            Settings
          </Link>

          <button className="flex items-center gap-3 text-red-500 hover:text-red-400">
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
