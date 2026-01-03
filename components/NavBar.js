"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/service" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setIsOpen(false); // close mobile menu on scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      role="navigation"
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-200"
          : "bg-linear-to-br from-indigo-50 via-white to-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/centraLogo.jpg"
            alt="Centra Clinic PH"
            width={42}
            height={42}
            priority
            className="rounded-full"
          />
          <div className="leading-tight">
            <span className="block text-xl font-extrabold text-gray-900">
              Centra
            </span>
            <span className="block text-xs text-gray-500 tracking-wide">
              Clinic PH
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="relative hover:text-indigo-600 transition-colors
                after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
                after:bg-indigo-600 after:transition-all after:duration-300
                hover:after:w-full"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 rounded-full border border-gray-300
            text-gray-700 hover:bg-gray-100 transition font-medium"
          >
            Login
          </Link>

          <Link
            href="/appointment"
            className="px-6 py-2 rounded-full bg-black
            text-white font-semibold shadow-md
            hover:bg-gray-900 hover:shadow-lg transition"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-900 text-3xl focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-max-height duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 space-y-5 bg-white shadow-lg rounded-b-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-gray-800 hover:text-indigo-600 transition"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t space-y-3">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center px-6 py-2 rounded-full
              border border-gray-300 text-gray-700 font-medium
              hover:bg-gray-100 transition"
            >
              Login
            </Link>

            <Link
              href="/appointment"
              onClick={() => setIsOpen(false)}
              className="block text-center px-6 py-2 rounded-full
              bg-black text-white font-semibold
              hover:bg-gray-900 transition"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
