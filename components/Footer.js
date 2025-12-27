import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full">

      {/* CTA SECTION */}
      <div className="bg-purple-600  to-indigo-600 py-20 px-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Patients Love Centra Clinic Ph
        </h2>

        <p className="text-purple-100 max-w-xl mx-auto mb-8">
          Real stories from real patients who trust Centra Clinic Ph with their
          healthcare meds.
        </p>

        <button className="inline-flex items-center gap-3 bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition">
          Book your appointment today
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white">
          </span>
        </button>
      </div>

      {/* MAIN FOOTER */}
      <div className="bg-[#0b0720] text-gray-300 px-6 py-16">
        <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-4">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/centraLogo.jpg"
                alt="Centra Clinic Ph"
                width={40}
                height={40}
              />
              <h3 className="text-white font-semibold">
                Centra Clinic Ph
              </h3>
            </div>

            <p className="text-sm mb-4">
              Modern care. Human touch
            </p>

            <div className="flex gap-3">
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 cursor-pointer">
                📘
              </span>
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 cursor-pointer">
                📸
              </span>
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 cursor-pointer">
                🐦
              </span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Quick links
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#">Services</Link></li>
              <li><Link href="#">Meet our team</Link></li>
              <li><Link href="#">FAQ's</Link></li>
            </ul>
          </div>

          {/* CLINIC HOURS */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Clinic Hours
            </h4>
            <p className="text-sm mb-2">
              Mon - Sat: 9:00am - 6:00pm
            </p>
            <p className="text-sm mb-4">
              Sunday - closed
            </p>

            <p className="text-sm leading-relaxed">
              Location: 1488 A. Apolinario St.
              corner Calhoun, Barangay Pio Del Pilar,
              Makati City
            </p>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Stay updated
            </h4>

            <p className="text-sm mb-4">
              Get treatment, advice, prescription — all in one place
            </p>

            <div className="flex bg-white/10 rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder-gray-400"
              />
              <button className="bg-white text-black px-5 py- text-sm font-medium rounded-full m-1">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Centra Clinic Ph. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
