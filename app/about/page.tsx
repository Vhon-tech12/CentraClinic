import Image from "next/image";
import Footer from "../../components/Footer";

export default function AboutCentraClinic() {
  return (
    <>
    <section className="relative isolate overflow-hidden bg-white py-24">
      {/* TOP GRADIENT */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-[calc(50%-11rem)] w-[36rem h-24rem
          -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc]
          opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem sm:h-48rem"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-sm uppercase tracking-widest text-indigo-600 mb-4">
            About Centra Clinic
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
            On a mission to modernize and{" "}
            <span className="text-indigo-600">simplify healthcare</span>
          </h2>

          <p className="text-gray-600 max-w-xl mb-10">
            By combining clinical workflows with intelligent digital tools, 
            Centra Clinic helps healthcare providers focus less on paperwork and more on what truly matters—patient care. 
            From appointment scheduling to SOAP notes and AI-assisted prescriptions, 
            every feature is designed to improve efficiency, accuracy, and patient outcomes.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Our Mission
          </h3>

          <p className="text-gray-600 mb-4">
            To empower healthcare professionals with intelligent tools that
            improve clinical decisions, reduce manual workload, and enhance the
            overall patient experience. 

          </p>

          <p className="text-gray-600 mb-10">
            Centra Clinic integrates appointment management, SOAP notes,
            e-prescriptions, and AI-driven insights into one seamless system.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-8 max-w-lg">
            <div>
              <p className="text-3xl font-bold text-indigo-600">10K+</p>
              <p className="text-sm text-gray-500">Patients Served</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">100+</p>
              <p className="text-sm text-gray-500">Healthcare Providers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">24/7</p>
              <p className="text-sm text-gray-500">Clinic Accessibility</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">AI-Powered</p>
              <p className="text-sm text-gray-500">Clinical Support</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/Centraa.jpg"
              alt="Clinic Team"
              width={800}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/ear.jpg"
              alt="Doctor Consultation"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/throat.jpg"
              alt="Clinic Workspace"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM GRADIENT */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          className="relative left-[calc(50%+3rem)] w-[36rem h-[24rem
          -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc]
          opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem sm:h-[48rem"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
    <Footer />
    </>
    
  );
}
