import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faFlask,
  faFaceSmile,
  faList,
  faSyringe,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    title: "General Consultations",
    description: "Diagnosis, prescriptions, and experts advice in minutes.",
    icon: faStethoscope,
  },
  {
    title: "Diagnostic & Lab Tests",
    description: "Fast accurate reports delivered directly to your account.",
    icon: faFlask,
    active: true,
  },
  {
    title: "Facial Treatments",
    description: "Designed to rejuvenate, refresh, and enhance your natural beauty.",
    icon: faFaceSmile,
  },
  {
    title: "Lip Treatment",
    description:
      "About sculpting, enhancing, and giving you the confidence to slay, day and night.",
    icon: faList,
  },
  {
    title: "Drip Nutrition",
    description: "Drips and infusions are all the rage right now.",
    icon: faSyringe,
  },
  {
    title: "Breaking up Tattoo",
    description:
      "Ever thought about tattoo removal but hesitated? What’s holding you back?",
    icon: faEraser,
  },
];

function Service() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* TITLE */}
        <h2 className="text-3xl font-bold mb-3">
          Medical Support for <br /> Every Need
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto mb-12">
          Comprehensive healthcare service designed all your medicals needs
          with convenience and expertise.
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {services.map((service, index) => (
            <div
              key={index}
              className={
                "rounded-2xl border p-6 text-left transition-all duration-300 hover:-translate-y-1 " +
                (service.active
                  ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                  : "bg-white hover:shadow-lg")
              }
            >
              {/* ICON */}
              <div
                className={
                  "w-12 h-12 rounded-full flex items-center justify-center mb-4 " +
                  (service.active
                    ? "bg-white/20 text-white"
                    : "bg-purple-100 text-purple-600")
                }
              >
                <FontAwesomeIcon icon={service.icon} className="text-lg" />
              </div>

              {/* TITLE */}
              <h3 className="font-semibold mb-2">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className={
                  "text-sm mb-6 " +
                  (service.active
                    ? "text-purple-100"
                    : "text-gray-500")
                }
              >
                {service.description}
              </p>

              {/* LINK */}
              <Link
                href="#"
                className={
                  "text-sm font-medium inline-flex items-center gap-2 " +
                  (service.active
                    ? "text-white"
                    : "text-gray-700 hover:text-purple-600")
                }
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>

        {/* CTA BUTTON */}
        <button className="inline-flex items-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-full shadow hover:bg-purple-700 transition">
          Book Appointment
          <span className="bg-white text-purple-600 w-8 h-8 rounded-full flex items-center justify-center">
            →
          </span>
        </button>

      </div>
    </section>
  );
}

export default Service;
