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
    description:
      "Receive expert diagnosis, personalized prescriptions, and professional advice from our board-certified specialists in a comfortable, confidential setting.",
    icon: faStethoscope,
  },
  {
    title: "Diagnostic & Lab Tests",
    description:
      "State-of-the-art testing with rapid, accurate results delivered securely to your account, ensuring timely and informed healthcare decisions.",
    icon: faFlask,
    featured: true,
  },
  {
    title: "Facial Treatments",
    description:
      "Advanced aesthetic procedures to rejuvenate your skin, reduce signs of aging, and enhance your natural beauty using safe, clinically proven techniques.",
    icon: faFaceSmile,
  },
  {
    title: "Lip Enhancement",
    description:
      "Precision treatments to sculpt and volumize lips with natural-looking results, tailored to your facial structure and preferences.",
    icon: faList,
  },
  {
    title: "IV Drip Nutrition",
    description:
      "Customized IV therapies designed to restore essential vitamins, boost immunity, and improve overall wellness and energy levels.",
    icon: faSyringe,
  },
  {
    title: "Tattoo Removal",
    description:
      "Advanced laser technology that safely and effectively removes unwanted tattoos with minimal discomfort and downtime.",
    icon: faEraser,
  },
];

export default function ServicesPage() {
  return (
    <section className="bg-white">
      {/* HERO */}
      <div className="bg-linear-to-r from-indigo-600 to-blue-600 py-24 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our Medical & Aesthetic Services
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-indigo-100">
          Centra Clinic PH offers comprehensive healthcare and aesthetic solutions
          delivered by licensed professionals using modern medical technology.
        </p>
      </div>

      {/* SERVICES */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={
                "relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl " +
                (service.featured
                  ? "bg-linear-to-br from-indigo-600 to-blue-700 text-white border-indigo-600"
                  : "bg-white border-gray-200")
              }
            >
              {/* FEATURED BADGE */}
              {service.featured && (
                <span className="absolute top-6 right-6 text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                  Most Booked
                </span>
              )}

              {/* ICON */}
              <div
                className={
                  "w-16 h-16 rounded-full flex items-center justify-center mb-6 " +
                  (service.featured
                    ? "bg-white/20 text-white"
                    : "bg-indigo-100 text-indigo-600")
                }
              >
                <FontAwesomeIcon icon={service.icon} className="text-2xl" />
              </div>

              {/* TITLE */}
              <h3
                className={
                  "text-xl font-bold mb-3 " +
                  (service.featured ? "text-white" : "text-gray-800")
                }
              >
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className={
                  "leading-relaxed mb-8 " +
                  (service.featured
                    ? "text-indigo-100"
                    : "text-gray-600")
                }
              >
                {service.description}
              </p>

              {/* CTA */}
              <Link
                href="/appointment"
                className={
                  "inline-flex items-center gap-2 font-semibold transition-all " +
                  (service.featured
                    ? "text-white hover:text-indigo-200"
                    : "text-indigo-600 hover:text-indigo-700")
                }
              >
                Book this service →
              </Link>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Ready to Prioritize Your Health?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            Schedule your appointment today and experience modern, patient-focused
            healthcare with Centra Clinic PH.
          </p>

          <Link
            href="/appointment"
            className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 to-blue-600 text-white px-12 py-5 rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-105 font-semibold text-lg"
          >
            Book an Appointment
            <span className="bg-white text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
