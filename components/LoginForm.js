"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-indigo-100 to-purple-100">
      <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Sign in to continue to your account</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              <FontAwesomeIcon icon={faEnvelope} className="inline-block mr-2 text-gray-400" />
              Email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              <FontAwesomeIcon icon={faLock} className="inline-block mr-2 text-gray-400" />
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link href="/" className="text-indigo-600 hover:underline text-sm font-medium">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg 
                       shadow-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-1/2 py-2 px-4 border border-gray-300 rounded-lg
                       hover:bg-gray-100 transition-colors"
          >
            <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
            Google
          </Link>
        </div>

        {/* Sign Up */}
        <p className="text-center mt-6 text-gray-500">
          Don’t have an account?{" "}
          <Link href="/" className="text-indigo-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
