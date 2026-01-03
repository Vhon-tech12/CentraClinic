"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faCalendarCheck,
  faShieldAlt,
  faMapMarkerAlt,
  faBrain,
  faCalendarAlt,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <>
      {/* ================= ABOUT SECTION ================= */}
      <section className="relative bg-linear-to-br from-purple-600 via-purple-700 to-purple-900 py-24 overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              Discover Centra Clinic PH
            </h2>
            <p className="text-purple-200/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Your trusted partner in health and wellness. We deliver modern,
              personalized healthcare designed around your needs.
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <div className="relative h-[520] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/Centra-Doctor.jpg"
                alt="Centra Clinic PH"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Features */}
            <div className="space-y-6">
              <Feature
                icon={<FontAwesomeIcon icon={faUserMd} />}
                title="Certified Medical Experts"
              >
                Our doctors and specialists are fully licensed, experienced, and
                committed to high-quality patient care.
              </Feature>

              <Feature
                icon={<FontAwesomeIcon icon={faCalendarCheck} />}
                title="Same-Day Appointments"
              >
                Book and consult with our specialists on the same day — no long
                queues or delays.
              </Feature>

              <Feature
                icon={<FontAwesomeIcon icon={faShieldAlt} />}
                title="Secure Health Records"
              >
                Your medical history, prescriptions, and results are safely
                stored and accessible anytime.
              </Feature>

              <Feature
                icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
                title="In-Clinic & Online Care"
              >
                Choose between virtual consultations or visiting our modern
                physical clinic.
              </Feature>

              {/* CTA */}
              <Link
                href="/appointment"
                className="inline-flex items-center gap-4 mt-8
                bg-linear-to-r from-white to-purple-100
                text-purple-700 px-9 py-4 rounded-full
                font-semibold shadow-lg
                hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Book Appointment
                <span className="bg-purple-600 text-white w-9 h-9 rounded-full flex items-center justify-center">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS SECTION ================= */}
      <section className="relative bg-linear-to-b from-gray-50 to-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5">
            A Simple, Patient-Focused Care Process
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            From booking to recovery, our process is designed to give you a
            smooth, secure, and stress-free healthcare experience.
          </p>

          {/* Steps */}
          <div className="mt-20 grid gap-10 md:grid-cols-3">
            <ProcessCard
              step="01"
              icon={<FontAwesomeIcon icon={faCalendarAlt} />}
              title="Book Your Appointment"
              text="Select your service, preferred doctor, and schedule using our fast and secure booking system."
            />

            <ProcessCard
              step="02"
              icon={<FontAwesomeIcon icon={faStethoscope} />}
              title="Consult With Specialists"
              text="Meet with our board-certified ENT and aesthetic specialists for accurate diagnosis and treatment."
            />

            <ProcessCard
              step="03"
              icon={<FontAwesomeIcon icon={faBrain} />}
              title="Follow-Up & Ongoing Care"
              text="Access prescriptions, records, and follow-up care anytime through our secure patient system."
            />
          </div>

          {/* CTA */}
          <div className="mt-16">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-3
              bg-linear-to-r from-purple-600 to-purple-800
              text-white px-10 py-4 rounded-full font-semibold
              shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Your Care Journey
              <span className="bg-white text-purple-700 w-9 h-9 rounded-full flex items-center justify-center">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Feature = ({ icon, title, children }) => {
  return (
    <div className="flex gap-4 p-6 rounded-2xl
      bg-white/10 backdrop-blur-md border border-white/10
      hover:bg-white/20 transition-all duration-300
      hover:shadow-xl hover:-translate-y-1">
      
      <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-700
        rounded-xl flex items-center justify-center text-white text-xl shadow-md">
        {icon}
      </div>

      <div>
        <h4 className="text-white font-semibold text-lg">{title}</h4>
        <p className="text-purple-200/90 text-sm leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  );
};

const ProcessCard = ({ step, icon, title, text }) => {
  return (
    <div className="relative rounded-3xl bg-white p-8
      border shadow-sm hover:shadow-xl
      transition-all duration-300 hover:-translate-y-2">

      <span className="absolute -top-4 left-6
        bg-purple-600 text-white text-sm font-bold
        px-4 py-1 rounded-full shadow">
        Step {step}
      </span>

      <div className="w-14 h-14 mb-6 rounded-xl
        bg-linear-to-br from-purple-600 to-purple-800
        text-white flex items-center justify-center text-xl shadow-md">
        {icon}
      </div>

      <h4 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h4>
      <p className="text-gray-600 text-sm leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default About;
