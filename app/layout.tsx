import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import ConditionalNavBar from "@/components/ConditionalNavBar";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export const metadata: Metadata = {
  title: "Centra Clinic",
  description: "Centra Clinic Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Wrap the entire app with Providers (SessionProvider inside) */}
        <Providers>
          {/* Navbar will now have access to session */}
          <ConditionalNavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
