"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/service" },
    { name: "FAQs", href: "/FAQs" },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile & profile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
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
                className={`hover:text-indigo-600 transition ${
                  pathname === link.href
                    ? "text-indigo-600"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {status === "loading" ? null : !session ? (
            <Link
              href="/login"
              className="px-5 py-2 rounded-full border border-gray-300
              text-gray-700 hover:bg-gray-100 transition font-medium"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                href="/appointment"
                className="px-6 py-2 rounded-full bg-black
                text-white font-semibold hover:bg-gray-900 transition"
              >
                Book Appointment
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1 rounded-full
                  hover:bg-gray-100 transition"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="User Avatar"
                      width={34}
                      height={34}
                      className="rounded-full border"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600
                    flex items-center justify-center text-white font-semibold">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className="text-sm font-medium text-gray-700 max-w-[100] truncate">
                    {session.user.name || session.user.email}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white
                  border rounded-xl shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {session.user.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user.email}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2
                      text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-gray-900"
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-transform duration-300 origin-top ${
          isOpen ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 space-y-5 bg-white shadow-lg rounded-b-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-lg font-medium text-gray-800 hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t space-y-4">
            {!session ? (
              <Link
                href="/login"
                className="block text-center px-6 py-2 rounded-full
                border border-gray-300 text-gray-700 font-medium hover:bg-gray-100"
              >
                Login
              </Link>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full border"
                    />
                  ) : (
                    <FaUserCircle className="text-4xl text-gray-500" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {session.user.name || "User"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/appointment"
                  className="block text-center px-6 py-2 rounded-full
                  bg-black text-white font-semibold hover:bg-gray-900"
                >
                  Book Appointment
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full text-center px-6 py-2 rounded-full
                  border border-gray-300 text-red-600 font-medium hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
