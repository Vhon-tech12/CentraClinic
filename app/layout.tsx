import type { Metadata } from "next";
import "./globals.css";
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
        {/* Root layout - no navbar here */}
        {/* Navbar is now in route groups: (public) layout */}
        {children}
      </body>
    </html>
  );
}
