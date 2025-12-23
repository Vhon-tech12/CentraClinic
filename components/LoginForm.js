"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              <FontAwesomeIcon icon={faEnvelope} className="inline-block mr-2" />
              Email
            </label>
             <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
            </div>
               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                 <FontAwesomeIcon icon={faLock} className="inline-block mr-2" />
                 Password
                  </label>
                    <input
                      type="password"
                        id="password"
                           value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              />
              <div className="text-right mt-4">
                <Link href="/"className="text-blue-600 hover:underline">
                Forgot Password?
                </Link>
              </div>
             <button
               type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md 
                 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                 >
                  Login
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Dont have an account?
          <Link href="/"className="text-blue-600" >
          Sign Up
          </Link>
        </p>
        <div className="mt-4">
          <p className="text-center text-gray-600 mb-2">Or login with: </p>
          <div className="flex justify-center space-x-4">
            <Link href="/"className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
            <FontAwesomeIcon icon={faFacebookF} className="w-3" />
            </Link>
            <Link href="/"className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
            <FontAwesomeIcon icon={faGoogle} className="w-3" />
            </Link>
    
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
