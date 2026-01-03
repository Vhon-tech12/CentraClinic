"use client";

import { motion } from "framer-motion";

const Hero = () => {
  /* ================= ANIMATIONS ================= */
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

  return (
    <section className="relative overflow-hidden bg-white text-black">
      {/* subtle background accent */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-white" />

      <motion.div
        className="relative max-w-7xl mx-auto px-6 md:px-10 py-32"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Announcement pill */}
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
          className="max-w-3xl text-5xl md:text-6xl font-extrabold leading-tight mb-6"
          variants={fadeUp}
        >
          Medical care that feels
          <br />
          <span className="text-indigo-600">personal and professional.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed mb-10"
          variants={fadeUp}
        >
          Expert ENT and aesthetic treatments delivered by board-certified
          specialists. We focus on accuracy, compassion, and long-term results —
          not rushed consultations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          variants={fadeUp}
        >
          <button
            className="px-7 py-3 rounded-full bg-black text-white font-semibold
            hover:bg-gray-900 transition"
          >
            Book a Consultation
          </button>

          <button
            className="px-7 py-3 rounded-full border border-black/20
            text-black hover:bg-black/5 transition"
          >
            See how it works →
          </button>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          className="mt-14 flex flex-wrap gap-10 text-gray-600"
          variants={fadeUp}
        >
          <div>
            <p className="text-2xl font-bold text-black">10+ Years</p>
            <p className="text-sm">Clinical Experience</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-black">Thousands</p>
            <p className="text-sm">Patients Served</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-black">Board-Certified</p>
            <p className="text-sm">Medical Specialists</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
