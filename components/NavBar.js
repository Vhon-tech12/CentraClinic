"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; // modern icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Service", href: "/service" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/centraLogo.jpg"
            alt="Centra Clinic PH Logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-2xl font-bold text-gray-800">Centra</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.name} className="hover:text-blue-600 transition-colors">
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="px-5 py-2 rounded-full border border-gray-800 text-gray-800 hover:bg-gray-100 transition font-medium"
          >
            Login
          </Link>
          <Link
            href="/appointment"
            className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg rounded-xl mx-4 my-2 p-5 space-y-4 transform transition-transform duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 font-medium text-lg hover:text-blue-600 transition-colors"
          >
            {link.name}
          </Link>
        ))}

        <Link
          href="/login"
          onClick={() => setIsOpen(false)}
          className="block text-center px-6 py-2 rounded-full border border-gray-800 text-gray-800 hover:bg-gray-100 transition font-medium"
        >
          Login
        </Link>
        <Link
          href="/appointment"
          onClick={() => setIsOpen(false)}
          className="block text-center px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
        >
          Book Appointment
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
