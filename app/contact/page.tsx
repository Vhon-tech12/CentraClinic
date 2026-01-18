"use client";

import Footer from "@/components/Footer";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    department: "",
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    alert("Message sent successfully!");
    setForm({ department: "", name: "", email: "", message: "" });
  };

  return (
    <>
      <section className="bg-[#faf9f7] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24">
          {/* TITLE */}
          <h1 className="text-sm tracking-widest text-gray-700 mb-10 uppercase">
            Which department do you want to get in touch with?
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* AREA OF CONCERN */}
            <div>
              <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">
                Area of Concern
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#f2dede] bg-[#fff6f6]
                           px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#e8b4b4]"
              >
                <option value="">Select a department</option>
                <option value="appointments">Appointments</option>
                <option value="billing">Billing & Payments</option>
                <option value="medical">Medical Records</option>
                <option value="technical">Technical Support</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>

            {/* FULL NAME */}
            <div>
              <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Juan Dela Cruz"
                className="w-full rounded-lg border border-gray-200 bg-white
                           px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@email.com"
                className="w-full rounded-lg border border-gray-200 bg-white
                           px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Write your message here..."
                className="w-full rounded-lg border border-gray-200 bg-white
                           px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full rounded-lg bg-black text-white py-4 text-sm
                         tracking-widest uppercase hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
