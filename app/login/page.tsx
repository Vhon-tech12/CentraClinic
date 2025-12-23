export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-8 grid md:grid-cols-2 gap-10">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Get in touch
          </h1>
          <p className="text-gray-600 mb-8">
            We’d love to hear from you. Please fill out this form.
          </p>

          <div className="space-y-6">
            <div>
              <p className="font-semibold text-gray-800">Our friendly team is here to help.</p>
              <p className="text-gray-600">Mon–Sat from 8am to 6pm</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800">Phone</p>
              <p className="text-gray-600">+1 (555) 000-0000</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <p className="text-gray-600">hi@agency.com</p>
            </div>

            <div>
              <p className="font-semibold text-gray-800">Office</p>
              <p className="text-gray-600">
                1488 A. Apolinario St. corner Calhoun, Barangay Pio Del Pilar,
                Makati City
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">First name</label>
              <input
                type="text"
                placeholder="First name"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                This is a hint text to help user.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium">Last name</label>
              <input
                type="text"
                placeholder="Last name"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                This is a hint text to help user.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone number</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date & Time</label>
            <input
              type="datetime-local"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              rows={4}
              placeholder="Leave us a message..."
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-sm text-gray-600">
              You agree to our friendly privacy policy.
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

