import React from "react";
import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Montserrat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel - Centra Clinic",
  description: "Admin dashboard for Centra Clinic",
};

type AdminLayoutProps = React.PropsWithChildren<{}>;

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

