
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
    description: "Receive expert diagnosis, personalized prescriptions, and professional advice from our board-certified specialists in a comfortable, confidential setting.",
    icon: faStethoscope,
  },
  {
    title: "Diagnostic & Lab Tests",
    description: "State-of-the-art testing with rapid, accurate results delivered securely to your account, ensuring timely and informed healthcare decisions.",
    icon: faFlask,
    active: true,
  },
  {
    title: "Facial Treatments",
    description: "Advanced aesthetic procedures to rejuvenate your skin, reduce signs of aging, and enhance your natural beauty with safe, effective techniques.",
    icon: faFaceSmile,
  },
  {
    title: "Ear, Nose & Throat Care",
    description: "Medical and procedural care for ear, nose, and throat conditions.",
    icon: faList,
  },
  {
    title: "IV Drip Nutrition",
    description: "Replenish your body with essential vitamins and nutrients through customized IV drips, promoting wellness, energy, and overall vitality.",
    icon: faSyringe,
  },
  {
    title: "Tattoo Removal",
    description: "Safe and effective laser technology to remove unwanted tattoos, restoring your skin's natural appearance with minimal discomfort.",
    icon: faEraser,
  },
];

function Service() {
  return (
    <section className="py-20 bg-linear-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Comprehensive Medical <br /> Support for Every Need
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
          Discover our full range of healthcare services, designed to meet your medical and aesthetic needs with the highest standards of care, convenience, and expertise.
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={
                "rounded-3xl border p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group " +
                (service.active
                  ? "bg-linear-to-br from-indigo-600 to-blue-700 text-white border-indigo-600 shadow-2xl"
                  : "bg-white hover:shadow-2xl border-gray-200")
              }
            >
              {/* ICON */}
              <div
                className={
                  "w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 " +
                  (service.active
                    ? "bg-white/20 text-white"
                    : "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200")
                }
              >
                <FontAwesomeIcon icon={service.icon} className="text-2xl" />
              </div>

              {/* TITLE */}
              <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className={
                  "text-base mb-8 leading-relaxed " +
                  (service.active
                    ? "text-indigo-100"
                    : "text-gray-600")
                }
              >
                {service.description}
              </p>
<Link
  href="/service"
  className={
    "text-base font-semibold inline-flex items-center gap-2 transition-all duration-300 " +
    (service.active
      ? "text-white hover:text-indigo-200"
      : "text-indigo-600 hover:text-indigo-700 group-hover:translate-x-1")
  }
>
  Learn more →
</Link>

            </div>
          ))}
        </div>

        <Link
              href="/login"
              className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 to-blue-600 text-white px-12 py-5 rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-105 font-semibold text-lg"
            >
              Book an Appointment
              <span className="bg-white text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center">
                →
              </span>
                    </Link>         
      </div>
    </section>
  );
}

export default Service;