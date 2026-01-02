"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full px-6 md:px-10 py-5 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/centraLogo.jpg"
            alt="Centra Clinic PH Logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-xl font-semibold text-gray-800">
            Centra
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/service">Service</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="bg-gray-800 text-white rounded-full px-6 py-2 hover:bg-gray-900 transition font-medium"
          >
            Login
          </Link>
          <Link
            href="/appointment"
            className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700 transition font-medium"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-white rounded-xl shadow-lg p-5 space-y-4">
          <Link href="/" onClick={() => setIsOpen(false)} className="block">
            Home
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block">
            About
          </Link>
          <Link href="/service" onClick={() => setIsOpen(false)} className="block">
            Service
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block">
            Contact
          </Link>

          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-gray-800 text-white rounded-full px-6 py-2 font-medium"
          >
            Login
          </Link>

          <Link
            href="/appointment"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-blue-600 text-white rounded-full px-6 py-2 font-medium"
          >
            Book Appointment
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
