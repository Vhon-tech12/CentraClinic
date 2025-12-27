import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full px-10 py-5 flex items-center justify-between bg-white">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/centraLogo.jpg"
          alt="Centra Clinic PH Logo"
          width={40}
          height={40}
          className="object-contain"
          priority
        />
        <span className="text-xl font-semibold text-gray-800">
          Centra
        </span>
      </Link>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/service">Service</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>

      {/* Action */}
      <div>
        <Link
          href="/login"
          className="bg-blue-600 text-white font-medium rounded-full px-6 py-2 hover:bg-blue-700 transition-colors"
        >
          Book Appointment
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;
