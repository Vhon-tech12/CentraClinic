
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.05, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)", transition: { duration: 0.3 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    hover: { scale: 1.05, transition: { duration: 0.5 } },
  };

  return (
    <section className="px-6 md:px-10 py-14 bg-linear-to-br from-blue-50 to-indigo-100">
      <motion.div
        className="grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* LEFT CARD */}
        <motion.div
          className="h-[500] rounded-3xl p-10 bg-linear-to-br from-blue-100 to-indigo-200 flex flex-col justify-between shadow-lg"
          variants={cardVariants}
          whileHover="hover"
        >
          <div>
            <h2 className="text-lg font-semibold text-indigo-600 mb-2">
              Expert Care for Your Health & Beauty
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold leading-snug mb-4 text-gray-800">
              “Centra” Center for <br />
              Ear, Nose, Throat <br />
              and Aesthetics
            </h1>

            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Experience world-class medical and aesthetic treatments performed by board-certified specialists. We prioritize your safety, comfort, and satisfaction with personalized care that delivers exceptional results.
            </p>

            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              📞 Consult Now
            </button>
          </div>

          <div className="bg-white p-5 rounded-xl w-fit shadow-md hover:shadow-lg transition-shadow duration-300 animate-pulse">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">👨‍⚕️</span>
              <p className="text-sm font-semibold text-gray-800">
                10+ Experienced Doctors
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Dedicated to your care at Centra Clinic PH
            </p>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="relative h-[500] rounded-3xl overflow-hidden shadow-lg"
          variants={imageVariants}
          whileHover="hover"
        >
          <Image
            src="/Centra-Doctor.jpg"
            alt="Professional doctor at Centra Clinic providing expert ENT and aesthetic care"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
