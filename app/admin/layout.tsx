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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ADMIN WRAPPER */}
        <div className="flex min-h-screen bg-[#111418] text-gray-200">
          
          {/* SIDEBAR */}
          <Sidebar />

          {/* MAIN CONTENT */}
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
