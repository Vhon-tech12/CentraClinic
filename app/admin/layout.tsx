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
    <div className="flex min-h-screen bg-[#111418] text-gray-200">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
