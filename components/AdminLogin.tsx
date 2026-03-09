"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Keep your logic unchanged
    if (email === "admin@example.com" && password === "admin123") {
      console.log("Login successful");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-10 rounded-3xl shadow-lg border border-gray-200"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4 text-2xl">
            🏥
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center">Clinic Admin Login</h2>
          <p className="text-gray-500 mt-2 text-sm text-center">
            Manage patients, appointments, and clinic records securely.
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="admin@clinic.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors font-semibold text-white text-lg"
        >
          Login
        </button>

        {/* Forgot Password */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Forgot your password?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Reset here
          </a>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;