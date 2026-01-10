import React from "react";
import Link from "next/link";
import Footer from "../../components/Footer";

const services = [
  {
    title: "General Consultations",
    description:
      "Receive expert diagnosis, personalized prescriptions, and professional advice from our board-certified specialists in a comfortable, confidential setting.",
    image: "Medical Team Discussion (1).png", // add your images in public/images
  },
  {
    title: "Diagnostic & Lab Tests",
    description:
      "State-of-the-art testing with rapid, accurate results delivered securely to your account, ensuring timely and informed healthcare decisions.",
    image: "Medical Discussion Scene.png",
    featured: true,
  },
  {
    title: "Facial Treatments",
    description:
      "Advanced aesthetic procedures to rejuvenate your skin, reduce signs of aging, and enhance your natural beauty using safe, clinically proven techniques.",
    image: "Serenity Spa_ Facial Treatment Bliss.png",
  },
  {
    title: "Ear, Nose & Throat Care",
    description:
      "Precision treatments to address ear, nose, and throat conditions with expert care and modern medical techniques.",
    image: "Close-Up Of Human Ear.png",
  },
  {
    title: "IV Drip Nutrition",
    description:
      "Customized IV therapies designed to restore essential vitamins, boost immunity, and improve overall wellness and energy levels.",
    image: "Healthcare Professional in Action.png",
  },
  {
    title: "Tattoo Removal",
    description:
      "Advanced laser technology that safely and effectively removes unwanted tattoos with minimal discomfort and downtime.",
    image: "Cosmetic Procedure Close-Up.png",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-linear-to-r from-indigo-600 to-blue-600 py-24 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Our Medical & Aesthetic Services</h1>
        <p className="max-w-3xl mx-auto text-lg text-indigo-100">
          Centra Clinic PH offers comprehensive healthcare and aesthetic solutions
          delivered by licensed professionals using modern medical technology.
        </p>
      </section>

      {/* Services Sections */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {services.map((service, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <section
              key={idx}
              className={`flex flex-col md:flex-row items-center ${
                !isEven ? "md:flex-row-reverse" : ""
              } gap-10`}
            >
              {/* Image */}
              <div className="md:w-1/2">
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-3xl shadow-xl object-cover w-full h-80 md:h-96"
                />
              </div>

              {/* Text */}
              <div className="md:w-1/2 space-y-6">
                {service.featured && (
                  <span className="inline-block text-sm font-semibold bg-indigo-600 text-white px-4 py-1 rounded-full">
                    Most Booked
                  </span>
                )}
                <h2 className="text-3xl font-bold">{service.title}</h2>
                <p className="text-gray-700">{service.description}</p>
                <Link
                  href="/appointment"
                  className={`inline-block mt-2 px-8 py-3 rounded-full font-semibold ${
                    service.featured
                      ? "bg-indigo-600 text-white hover:bg-indigo-500"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  Book this Service
                </Link>
              </div>
            </section>
          );
        })}
      </div>

      <Footer />
    </>
  );
}
