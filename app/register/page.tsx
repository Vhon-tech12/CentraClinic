"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function RegisterPage() {
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-indigo-100 to-purple-100">
      <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>

        <p className="text-center text-gray-500 mb-4">
          Register with Google to get started
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faGoogle} />
            <span className="ml-2">Register with Google</span>
          </button>
        </div>

        <p className="text-center mt-6 text-gray-500">
          Only verified Google emails are allowed for registration.
        </p>
      </div>
    </div>
  );
}
