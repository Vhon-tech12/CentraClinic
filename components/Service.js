import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const services = [
  {
    title: "General Consultations",
    description:
      "Diagnosis, prescriptions, and experts advice in minutes.",
  },
  {
    title: "Diagnostic & Lab Tests",
    description:
      "Fast accurate reports delivered directly to your account.",
    active: true,
  },
  {
    title: "Facial Treatments",
    description:
      "Designed to rejuvenate, refresh, and enhance your natural beauty.",
  },
  {
    title: "Lip Treatment",
    description:
      "About sculpting, enhancing, and giving you the confidence to slay, day and night.",
  },
  {
    title: "Drip Nutrition",
    description:
      "Drips and infusions are all the rage right now.",
  },
  {
    title: "Breaking up Tattoo",
    description:
      "Ever thought about tattoo removal but hesitated? What’s holding you back?",
  },
];

function Service() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold mb-3">
          Medical Support for <br /> Every Need
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto mb-12">
          Comprehensive healthcare service designed all your medicals needs
          with convenience and expertise.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {services.map(function (service, index) {
            return (
              <div
                key={index}
                className={
                  "rounded-2xl border p-6 text-left transition-all duration-300 " +
                  (service.active
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white hover:shadow-lg")


                }
              >
                <div
                  className={
                    "w-10 h-10 rounded-full flex items-center justify-center mb-4 " +
                    (service.active
                      ? "bg-white/20 text-white"
                      : "bg-purple-100 text-purple-600")
                  }
                >
                  ⊙
                </div>

                <h3 className="font-semibold mb-2">
                  {service.title}
                </h3>

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

                <button
                  className={
                    "text-sm font-medium flex items-center gap-1 " +
                    (service.active
                      ? "text-white"
                      : "text-gray-700 hover:text-purple-600")
                  }
                >
                </button>
              </div>
            );
          })}
        </div>

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
