import React from 'react';
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full px-10 py-5 flex items-center justify-between bg-white">
      {/* Logo */}
      <div className="text-xl font-bold flex items-center gap-2">
        <span className="text-blue-600">◎</span>
        Centra
      </div>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-8 text-gray-600">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/service">Service</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link href="login" className="text-gray-700 font-medium">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
