import Image from "next/image";
import Footer from "../../components/Footer";
import Link from "next/link";

import { FaUserMd, FaLaptopMedical, FaShieldAlt } from "react-icons/fa";

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full h-[400] bg-linear-to-r from-blue-600 to-purple-600 flex items-center justify-center">
        {/* Optional background image */}
        {/* <Image src="/images/clinic-hero.jpg" alt="Clinic" fill className="object-cover opacity-30" /> */}
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
          About Centra Clinic PH
        </h1>
      </section>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">

        {/* INTRO */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Your Partner in Modern Healthcare
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Centra Clinic PH is a patient-centered healthcare platform designed
            to make medical consultations accessible, efficient, and reliable.
            By combining trusted medical professionals with modern technology,
            we aim to improve healthcare experiences for every Filipino.
          </p>
        </div>

        {/* MISSION & VISION */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="p-10 rounded-3xl bg-linear-to-tr from-blue-50 to-blue-100 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To provide accessible and high-quality healthcare services through
              innovative digital solutions that connect patients with trusted
              medical professionals anytime, anywhere.
            </p>
          </div>
          <div className="p-10 rounded-3xl bg-linear-to-tr from-purple-50 to-purple-100 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4 text-purple-700">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To become a leading digital healthcare platform in the Philippines,
              empowering communities with reliable medical care and technology-
              driven health solutions.
            </p>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Centra Clinic PH?
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-8 rounded-2xl bg-white border hover:shadow-xl transition">
              <FaUserMd className="text-blue-600 text-5xl mb-4" />
              <h4 className="font-semibold text-lg mb-2 text-center">Licensed Professionals</h4>
              <p className="text-gray-600 text-center text-sm">
                Consult with verified and experienced healthcare providers you can trust.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-2xl bg-white border hover:shadow-xl transition">
              <FaLaptopMedical className="text-purple-600 text-5xl mb-4" />
              <h4 className="font-semibold text-lg mb-2 text-center">Easy Online Consultations</h4>
              <p className="text-gray-600 text-center text-sm">
                Book appointments and receive medical advice from the comfort of your home.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-2xl bg-white border hover:shadow-xl transition">
              <FaShieldAlt className="text-indigo-600 text-5xl mb-4" />
              <h4 className="font-semibold text-lg mb-2 text-center">Secure & Confidential</h4>
              <p className="text-gray-600 text-center text-sm">
                Your medical records and personal data are protected with industry-standard security.
              </p>
            </div>
          </div>
        </div>

        {/* CLOSING + CTA */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Healthcare Made Simple</h2>
          <p className="text-gray-700 leading-relaxed">
            At Centra Clinic PH, we believe healthcare should be accessible,
            reliable, and patient-focused. Our platform bridges the gap between
            patients and healthcare providers—bringing quality care closer to you.
          </p>
          <Link
            href="/appointment"
            className="inline-block mt-4 px-10 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:scale-105 transition transform shadow-lg"
          >
            Book an Appointment
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
