import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import type { Metadata } from "next";
import "../globals.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const metadata: Metadata = {
  title: "Centra Clinic",
  description: "Centra Clinic Management System",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      {/* Navbar shows on all public pages */}
      <NavBar />
      {children}
      <Footer />
    </Providers>
  );
}

