"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Sample accounts
    if (email === "admin@example.com" && password === "admin123") {
      console.log("Admin login successful");
      router.push("/admin/dashboard");

    } else if (email === "secretary@example.com" && password === "secretary123") {
      console.log("Secretary login successful");
      router.push("/secretary/dashboard");

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

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4 text-2xl">
            🏥
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Centra Clinic Login
          </h2>
          <p className="text-gray-500 mt-2 text-sm text-center">
            Login as Admin or Secretary
          </p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Login */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          Login
        </button>

      </form>
    </div>
  );
};

export default AdminLogin;