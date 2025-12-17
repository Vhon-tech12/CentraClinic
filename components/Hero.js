import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="px-10 py-14 bg-white">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">

        {/* LEFT CARD */}
        <div className="h-[500] rounded-3xl p-10 bg-linear-to-br from-yellow-100 to-purple-200 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold leading-snug mb-4">
              “Centra” Center for <br />
              Ear, Nose, Throat <br />
              and Aesthetics
            </h1>

            <p className="text-gray-700 mb-6">
              We assure that all medical and surgical procedures are done
              by board certified doctors to maximize aesthetic results while
              reducing risk and complications.
            </p>

            <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full">
              📘 Book Appointment
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl w-fit shadow">
            <p className="text-sm font-semibold">
              More than 10+ doctors
            </p>
            <p className="text-xs text-gray-500">
              in your Centra Clinic PH
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative h-[500] rounded-3xl overflow-hidden">
          <Image
            src="/Centra-Doctor.jpg"
            alt="Doctor"
            fill
            priority
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
