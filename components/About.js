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
  faCalendarAlt,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <>
      {/* ================= ABOUT SECTION ================= */}
      <section className="relative bg-linear-to-br from-purple-600 via-purple-700 to-purple-900 py-24 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Discover Centra Clinic PH
            </h2>
            <p className="text-purple-200 max-w-2xl mx-auto text-lg">
              Your trusted partner in health and wellness with modern,
              patient-centered healthcare solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="relative h-[520] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/Centra-Doctor.jpg"
                alt="Centra Clinic PH"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <Feature icon={faUserMd} title="Certified Medical Experts">
                Our doctors are licensed, experienced, and committed to
                high-quality patient care.
              </Feature>

              <Feature icon={faCalendarCheck} title="Same-Day Appointments">
                Book and consult with specialists without long waiting times.
              </Feature>

              <Feature icon={faShieldAlt} title="Secure Health Records">
                Your medical data is protected with secure digital systems.
              </Feature>

              <Feature icon={faMapMarkerAlt} title="In-Clinic & Online Care">
                Choose between online consultation or visiting our clinic.
              </Feature>

              <Link
                href="/appointment"
                className="inline-flex items-center gap-4 mt-8 bg-white text-purple-700 px-9 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition"
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

      {/* ================= PROCESS / FEATURES SECTION ================= */}
      <section className="bg-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-purple-600 font-semibold mb-3">
            Patient Care Process
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Everything you need <br /> to manage your care
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-20">
            A seamless healthcare journey from booking to follow-up,
            designed with patients in mind.
          </p>

          <div className="grid gap-14 md:grid-cols-3 text-left">
            <SimpleFeature
              icon={faCalendarAlt}
              title="Easy Appointment Booking"
              text="Schedule your visit online with real-time availability."
              link="/appointment"
            />

            <SimpleFeature
              icon={faStethoscope}
              title="Expert Medical Consultation"
              text="Get accurate diagnosis and care from certified specialists."
              link="/services"
            />

            <SimpleFeature
              icon={faShieldAlt}
              title="Secure Health Records"
              text="Access your medical data safely anytime, anywhere."
              link="/privacy"
            />
          </div>
        </div>
      </section>
    </>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Feature = ({ icon, title, children }) => (
  <div className="flex gap-4 p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur hover:bg-white/20 transition">
    <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl">
      <FontAwesomeIcon icon={icon} />
    </div>
    <div>
      <h4 className="text-white font-semibold text-lg">{title}</h4>
      <p className="text-purple-200 text-sm">{children}</p>
    </div>
  </div>
);

const SimpleFeature = ({ icon, title, text, link }) => (
  <div>
    <div className="flex items-center gap-3 mb-4 text-purple-600">
      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h4 className="font-semibold text-gray-900 text-lg">{title}</h4>
    </div>

    <p className="text-gray-600 mb-4">{text}</p>

    <Link
      href={link}
      className="text-purple-600 font-medium inline-flex items-center gap-1 hover:underline"
    >
      Learn more →
    </Link>
  </div>
);

export default About;
