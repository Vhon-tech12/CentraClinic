import Image from "next/image";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <section className="bg-white">
        {/* HERO SECTION */}
        <div className="relative w-full h-[300] bg-linear-to-r from-blue-600 to-purple-600 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            About Centra Clinic PH
          </h1>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

          {/* INTRO */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              Your Partner in Modern Healthcare
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Centra Clinic PH is a patient-centered healthcare platform designed
              to make medical consultations accessible, efficient, and reliable.
              By combining trusted medical professionals with modern technology,
              we aim to improve healthcare experiences for every Filipino.
            </p>
          </div>

          {/* MISSION & VISION */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-8 rounded-3xl bg-blue-50">
              <h3 className="text-2xl font-semibold mb-3 text-blue-700">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To provide accessible and high-quality healthcare services through
                innovative digital solutions that connect patients with trusted
                medical professionals anytime, anywhere.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-purple-50">
              <h3 className="text-2xl font-semibold mb-3 text-purple-700">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become a leading digital healthcare platform in the Philippines,
                empowering communities with reliable medical care and technology-
                driven health solutions.
              </p>
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div>
            <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
              Why Choose Centra Clinic PH?
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl border hover:shadow-lg transition">
                <h4 className="font-semibold text-lg mb-2">
                  Licensed Professionals
                </h4>
                <p className="text-gray-600 text-sm">
                  Consult with verified and experienced healthcare providers you
                  can trust.
                </p>
              </div>

              <div className="p-6 rounded-2xl border hover:shadow-lg transition">
                <h4 className="font-semibold text-lg mb-2">
                  Easy Online Consultations
                </h4>
                <p className="text-gray-600 text-sm">
                  Book appointments and receive medical advice from the comfort of
                  your home.
                </p>
              </div>

              <div className="p-6 rounded-2xl border hover:shadow-lg transition">
                <h4 className="font-semibold text-lg mb-2">
                  Secure & Confidential
                </h4>
                <p className="text-gray-600 text-sm">
                  Your medical records and personal data are protected with
                  industry-standard security.
                </p>
              </div>
            </div>
          </div>

          {/* CLOSING */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Healthcare Made Simple
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At Centra Clinic PH, we believe healthcare should be accessible,
              reliable, and patient-focused. Our platform bridges the gap between
              patients and healthcare providers—bringing quality care closer to
              you.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
