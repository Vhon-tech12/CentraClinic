
import Footer from "../../components/Footer";



export default function ContactPage() {
  return (
     <>
    <section className="bg-[#faf9f7] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-24">
        
        {/* TITLE */}
        <h1 className="text-sm tracking-widest text-gray-700 mb-10 uppercase">
          Which department do you want to get in touch with?
        </h1>

        <form className="space-y-8">
          
          {/* AREA OF CONCERN */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">
              Area of Concern
            </label>
            <select
              className="w-full rounded-lg border border-[#f2dede] bg-[#fff6f6]
                         px-4 py-4 text-sm focus:outline-none focus:ring-2
                         focus:ring-[#e7bcbc]"
              required
            >
              <option>General Question</option>
              <option>Appointment Booking</option>
              <option>Medical Consultation</option>
              <option>Aesthetic Services</option>
              <option>Billing & Payments</option>
            </select>
          </div>

          {/* FULL NAME */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">
              Full Name (Required)
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-4 py-4
                         text-sm focus:outline-none focus:ring-2
                         focus:ring-indigo-500"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">
              Email (Required)
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-200 px-4 py-4
                         text-sm focus:outline-none focus:ring-2
                         focus:ring-indigo-500"
              required
            />
          </div>

          {/* CONTACT NUMBER */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">
              Contact Number (Required)
            </label>
            <input
              type="tel"
              className="w-full rounded-lg border border-gray-200 px-4 py-4
                         text-sm focus:outline-none focus:ring-2
                         focus:ring-indigo-500"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2 uppercase">
              Description (Required)
            </label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-gray-200 px-4 py-4
                         text-sm resize-none focus:outline-none focus:ring-2
                         focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          {/* CAPTCHA PLACEHOLDER */}
          <div className="flex items-center gap-3 border border-gray-300 rounded-lg
                          px-4 py-3 w-fit bg-white">
            <input type="checkbox" className="w-5 h-5" />
            <span className="text-sm text-gray-700">I’m not a robot</span>
            <span className="ml-auto text-xs text-gray-400">reCAPTCHA</span>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-[#f1d6d2] text-gray-700 py-4 rounded-lg
                       tracking-widest uppercase text-sm font-medium
                       hover:bg-[#e8c3be] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
       <Footer />
    </>
  );
}
