"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmile,
  faBookmark,
  faHeart,
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
      {/* ABOUT SECTION */}
      <section className="bg-linear-to-br from-purple-600 to-purple-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">
              Discover Centra Clinic Ph
            </h2>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Your trusted partner in health and wellness. We're dedicated to delivering exceptional, personalized healthcare that empowers you to live your best life.
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT IMAGE */}
            <div className="relative h-[520] rounded-3xl overflow-hidden bg-white">
              <Image
                src="/Centra-Clinic.jpg"
                alt="Centra Clinic Doctor"
                fill
                className="object-cover"
              />
            </div>

            {/* RIGHT FEATURES */}
            <div className="space-y-6">
              <Feature icon={<FontAwesomeIcon icon={faUserMd} />} title="Certified Medical Experts">
                Our team consists of only licensed and verified healthcare professionals dedicated to your well-being.
              </Feature>

              <Feature icon={<FontAwesomeIcon icon={faCalendarCheck} />} title="Same Day Appointments">
                No long waits – book and consult instantly with our efficient scheduling system.
              </Feature>

              <Feature icon={<FontAwesomeIcon icon={faShieldAlt} />} title="Secure Digital Health Records">
                Access all your past visits, tests, and prescriptions securely in one place.
              </Feature>

              <Feature icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} title="Convenient In-Person Care">
                Choose what works for you – visit our modern, welcoming physical clinic.
              </Feature>

                {/* CTA */}
                <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-4 bg-white text-purple-600
                px-8 py-4 rounded-full font-semibold shadow
               hover:bg-gray-100 transition"
              >
               Book Appointment
                 <span className="bg-purple-600 text-white w-9 h-9 rounded-full
                   flex items-center justify-center">
    →
  </span>
</Link>

            </div>
          </div>
        </div>
      </section>

      {/* ENDORSE SECTION */}
      <section className="bg-linear-to-b from-gray-50 to-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Getting Care Has Never <br className="hidden md:block" /> Been Easier
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Our streamlined process makes healthcare accessible in just three simple steps – designed with you in mind.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <EndorseCard
            icon={<FontAwesomeIcon icon={faBrain} />}
            title="Mental Health Support"
            text="Private therapy and counseling from licensed professionals to support your mental well-being."
          />
           <EndorseCard
           icon={<FontAwesomeIcon icon={faCalendarAlt} />}
           title="Book Instantly"
           text="Schedule your appointment effortlessly through our user-friendly web app."
          />
           <EndorseCard
            icon={<FontAwesomeIcon icon={faStethoscope} />}
            title="Consult & Follow Up"
            text="Receive comprehensive treatment, expert advice, and prescriptions all in one convenient place."
         />
          </div>


          <div className="mt-12">
            <button className="inline-flex items-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Your Journey
              <span className="bg-white text-purple-600 w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:rotate-12">
                →
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

/* REUSABLE COMPONENTS */

const Feature = ({ icon, title, children }) => (
  <div className="flex items-center gap-4 bg-purple-500/50 p-5 rounded-2xl hover:bg-purple-500/60 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
    <div className="w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center text-white text-xl">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-semibold text-lg">{title}</h4>
      <p className="text-purple-200 text-sm leading-relaxed">{children}</p>
    </div>
  </div>
);

const EndorseCard = ({ icon, title, text }) => (
  <div className="rounded-2xl p-8 shadow-sm border text-center hover:shadow-lg hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-2 bg-white">
    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-linear-to-br from-purple-600 to-purple-800 text-white flex items-center justify-center transition-transform hover:scale-110">
      {icon}
    </div>
    <h4 className="font-semibold text-lg text-gray-800">{title}</h4>
    <p className="text-gray-600 text-sm mt-2 leading-relaxed">{text}</p>
  </div>
);

export default About;
