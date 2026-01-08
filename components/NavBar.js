"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const profileRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/service" },
    { name: "Contact", href: "/contact" },
  ];

  // Handle scroll, login state, and clicking outside
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setIsOpen(false);
      setProfileOpen(false);
    };

    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    const handleClickOutside = (e) => {
      if (profileRef.current && e.target && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("auth-change", checkLoginStatus);
    document.addEventListener("mousedown", handleClickOutside);

    checkLoginStatus();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("auth-change", checkLoginStatus);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setProfileOpen(false);
    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200"
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
            <span className="block text-xl font-extrabold text-gray-900">Centra</span>
            <span className="block text-xs text-gray-500 tracking-wide">Clinic PH</span>
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

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 relative">
          {isLoggedIn ? (
            <>
              <Link
                href="/appointment"
                className="px-6 py-2 rounded-full bg-black text-white
                font-semibold shadow-md hover:bg-gray-900 transition"
              >
                Book Appointment
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full
                  border border-gray-300 hover:bg-gray-100 transition"
                >
                  <div className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
                    J
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold text-sm">Juan Dela Cruz</p>
                      <p className="text-xs text-gray-500 truncate">juandelacruz@gmail.com</p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Account
                    </Link>

                    <Link
                      href="/appointments"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Appointments
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm
                      text-red-600 hover:bg-gray-100 border-t"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-6 py-2 rounded-full bg-indigo-600 text-white
                font-semibold shadow-md hover:bg-indigo-700 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-900 text-3xl"
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block text-gray-700 font-medium hover:text-indigo-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col px-6 py-4 gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/appointment"
                  className="px-6 py-2 rounded-full bg-black text-white font-semibold text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Book Appointment
                </Link>

                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  My Account
                </Link>

                <Link
                  href="/appointments"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  My Appointments
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
