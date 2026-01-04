"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white text-black">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-white" />

      <motion.div
        className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-10 py-20 sm:py-28 md:py-32"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Announcement */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
          bg-black/5 border border-black/10 text-sm text-gray-700 mb-8"
          variants={fadeUp}
        >
          <span className="font-medium text-black">Centra Clinic PH</span>
          <span className="opacity-70">• Trusted ENT & Aesthetic Care</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="max-w-3xl text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
          variants={fadeUp}
        >
          Medical care that feels
          <br />
          <span className="text-indigo-600">
            personal and professional.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="max-w-2xl text-lg text-gray-600 mb-10"
          variants={fadeUp}
        >
          Expert ENT and aesthetic treatments delivered by board-certified
          specialists. We focus on accuracy, compassion, and long-term results.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={fadeUp}
        >
          <button className="px-7 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition">
            Book a Consultation
          </button>

          <button className="px-7 py-3 rounded-full border border-black/20 hover:bg-black/5 transition">
            See how it works →
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-14 flex flex-wrap gap-10 text-gray-600"
          variants={fadeUp}
        >
          <div>
            <p className="text-2xl font-bold text-black">10+ Years</p>
            <p>Clinical Experience</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-black">Thousands</p>
            <p>Patients Served</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-black">Board-Certified</p>
            <p>Medical Specialists</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
