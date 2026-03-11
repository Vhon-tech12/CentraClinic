"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/secretary/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Appointments",
    href: "/secretary/appointments",
    icon: Calendar,
  },
];

export default function SecretaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside className="w-64 min-h-screen bg-white text-gray-600 flex flex-col justify-between border-r border-gray-200 shadow-sm">
        {/* TOP */}
        <div>
          {/* LOGO AREA */}
          <div className="flex items-center gap-3 p-6 border-b border-gray-200">
            <img
              src="/centraLogo.jpg"
              alt="Centra Clinic"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-sm font-semibold text-gray-800">
                Centra Clinic
              </h1>
              <p className="text-xs text-gray-500">Secretary Panel</p>
            </div>
          </div>

          {/* MENU */}
          <div className="p-6">
            <nav className="space-y-2 text-sm">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="p-6 border-t border-gray-200 space-y-4">
          {/* ACTIONS */}
          <div className="space-y-2 text-sm">
            <Link
              href="/secretary/settings"
              className="flex items-center gap-3 hover:text-gray-800"
            >
              <Settings size={16} />
              Settings
            </Link>
            <button
              className="flex items-center gap-3 text-red-600 hover:text-red-700"
              suppressHydrationWarning
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </div>
      </aside>

      {/* PAGE CONTENT */}
      <main className="flex-1 min-h-screen overflow-x-hidden p-6">
        {children}
      </main>
    </div>
  );
}

