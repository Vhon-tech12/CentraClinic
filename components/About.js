"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmile,
  faBookmark,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <>
      {/* ABOUT SECTION */}
      <section className="bg-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-2">
              Centra Clinic Ph
            </h2>
            <p className="text-purple-200">
              We're committed to providing you with high quality healthcare experience
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
              <Feature icon="✔" title="Certified Medical Experts">
                Only licensed and verified professionals.
              </Feature>

              <Feature icon="⏱" title="Same Day Appointment">
                No long waits book and consult instantly.
              </Feature>

              <Feature icon="🔒" title="Secure Digital Health Records">
                Access all your past visits, test and protections.
              </Feature>

              <Feature icon="🌍" title="In-Person">
                Choose what works for you - physical clinic
              </Feature>

              {/* CTA */}
              <button className="mt-6 inline-flex items-center gap-4 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold shadow hover:bg-gray-100 transition">
                Book Appointment
                <span className="bg-purple-600 text-white w-9 h-9 rounded-full flex items-center justify-center">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ENDORSE SECTION */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Getting Care Has Never <br className="hidden md:block" /> Been Easier
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our streamlined process makes healthcare accessible in just three simple steps
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <EndorseCard
            icon={<FontAwesomeIcon icon={faSmile} />}
            title="Mental Health"
            text="Private therapy and test help from licensed professionals"
          />
           <EndorseCard
           icon={<FontAwesomeIcon icon={faBookmark} />}
           title="Book Instantly"
           text="Schedule your appointment via web app"
          />
           <EndorseCard
            icon={<FontAwesomeIcon icon={faHeart} />}
            title="Consult & Follow Up"
            text="Get treatment, advice, prescription all in one place"
         />
          </div>


          <div className="mt-12">
            <button className="inline-flex items-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow hover:bg-purple-700 transition">
              Start Now
              <span className="bg-white text-purple-600 w-9 h-9 rounded-full flex items-center justify-center">
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
  <div className="flex items-center gap-4 bg-purple-500/50 p-5 rounded-2xl">
    <div className="w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center text-white text-xl">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-semibold">{title}</h4>
      <p className="text-purple-200 text-sm">{children}</p>
    </div>
  </div>
);

const EndorseCard = ({ icon, title, text }) => (
  <div className="rounded-2xl p-8 shadow-sm border text-center">
    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center">
      {icon}
    </div>
    <h4 className="font-semibold text-lg">{title}</h4>
    <p className="text-gray-500 text-sm mt-2">{text}</p>
  </div>
);

export default About;
