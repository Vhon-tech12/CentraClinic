"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // App Router navigation

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple authentication check (replace with real auth)
    if (email === "admin@example.com" && password === "admin123") {
      console.log("Login successful");
      router.push("/admin/dashboard"); // Redirect to admin page
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-gray-100 p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Admin Login</h2>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold text-white text-lg"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Forgot your password?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Reset here
          </a>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
