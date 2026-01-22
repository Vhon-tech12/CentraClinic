import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Leslie Alexander",
    role: "Patient",
    image: "sen1.avif",
    message:
      "The staff at Centra Clinic PH were very professional and accommodating. Booking an appointment online was fast and easy.",
    rating: 5,
    sentiment: "Happy 😊",
  },
  {
    name: "Michael Foster",
    role: "Patient",
    image: "/sen2.avif",
    message:
      "I felt safe knowing my medical records were securely stored. The doctors were very attentive and caring.",
    rating: 4,
    sentiment: "Satisfied 🙂",
  },
  {
    name: "Leonard Krasner",
    role: "Patient",
    image: "/sen3.avif",
    message:
      "Clean facility, friendly staff, and smooth consultation process. Highly recommended clinic!",
    rating: 5,
    sentiment: "Thrilled 😄",
  },
  {
    name: "Emily Selman",
    role: "Patient",
    image: "/sen3.avif",
    message:
      "Centra Clinic PH made my consultation stress-free. The online system saved me so much time.",
    rating: 5,
    sentiment: "Relaxed 😌",
  },
  {
    name: "Floyd Miles",
    role: "Patient",
    image: "sen2.avif",
    message:
      "Doctors explained everything clearly. I appreciate how organized and efficient the clinic is.",
    rating: 4,
    sentiment: "Grateful 🙏",
  },
  {
    name: "Courtney Henry",
    role: "Patient",
    image: "/sen1.avif",
    message:
      "Very smooth experience from booking to consultation. Will definitely come back.",
    rating: 5,
    sentiment: "Happy 😊",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 px-6 bg-linear-to-b from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            We have worked with <br />
            thousands of amazing people
          </h2>
        </div>

        {/* Masonry layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="break-inside-avoid rounded-xl border border-gray-200 bg-white p-6 shadow-lg hover:shadow-2xl transition duration-300"
            >
              {/* Sentiment */}
              <p className="text-sm font-medium text-purple-600 mb-2">
                {item.sentiment}
              </p>

              {/* Testimonial Message */}
              <p className="text-gray-600 mb-4 leading-relaxed">“{item.message}”</p>

              {/* Star Rating */}
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }, (_, i) =>
                  i < item.rating ? (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300 mr-1" />
                  )
                )}
              </div>

              {/* Patient Info */}
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-16">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
