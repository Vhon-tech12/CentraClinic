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
        className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-10 py-20 sm:py-28 md:py-32"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Announcement pill */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full
          bg-black/5 border border-black/10 text-xs sm:text-sm text-gray-700 mb-6 sm:mb-8"
          variants={fadeUp}
        >
          <span className="font-medium text-black">Centra Clinic PH</span>
          <span className="opacity-70">• Trusted ENT & Aesthetic Care</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="max-w-full sm:max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight mb-4 sm:mb-6"
          variants={fadeUp}
        >
          Medical care that feels
          <br />
          <span className="text-indigo-600">personal and professional.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="max-w-full sm:max-w-2xl text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-10"
          variants={fadeUp}
        >
          Expert ENT and aesthetic treatments delivered by board-certified
          specialists. We focus on accuracy, compassion, and long-term results — 
          not rushed consultations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
          variants={fadeUp}
        >
          <button
            className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-black text-white font-semibold
            hover:bg-gray-900 transition w-full sm:w-auto text-center"
          >
            Book a Consultation
          </button>

          <button
            className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-black/20
            text-black hover:bg-black/5 transition w-full sm:w-auto text-center"
          >
            See how it works →
          </button>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          className="mt-10 sm:mt-14 flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-10 text-gray-600"
          variants={fadeUp}
        >
          <div className="flex flex-col">
            <p className="text-xl sm:text-2xl font-bold text-black">10+ Years</p>
            <p className="text-sm sm:text-base">Clinical Experience</p>
          </div>

          <div className="flex flex-col">
            <p className="text-xl sm:text-2xl font-bold text-black">Thousands</p>
            <p className="text-sm sm:text-base">Patients Served</p>
          </div>

          <div className="flex flex-col">
            <p className="text-xl sm:text-2xl font-bold text-black">Board-Certified</p>
            <p className="text-sm sm:text-base">Medical Specialists</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
