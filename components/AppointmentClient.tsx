import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function Example() {
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      {/* Background blur */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-xlmax-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-6xl"
        />
      </div>

      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Schedule an Appointment
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Fill out the form below and we'll get back to you as soon as possible to confirm your appointment.
        </p>
      </div>

      {/* Form */}
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* First name */}
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900  outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          {/* Last name */}
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold text-gray-900">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900  outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          {/* Patient Type */}
          <div className="sm:col-span-2">
            <label htmlFor="patient-type" className="block text-sm font-semibold text-gray-900">
              Patient Type
            </label>
            <div className="mt-2.5 relative">
              <select
                id="patient-type"
                name="patient-type"
                required
                defaultValue=""
                className="block w-full appearance-none rounded-md bg-white px-3.5 py-2 pr-10 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
              >
                <option value="" disabled>
                  Select patient type
                </option>
                <option value="new">New Patient</option>
                <option value="existing">Existing Patient</option>
              </select>

              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-900">
              Phone number
            </label>
            <div className="mt-2.5 flex rounded-md bg-white  outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600">
              <select className="rounded-l-md bg-transparent py-2 pl-3 pr-6 text-gray-500 focus:outline-none">
                <option>PH</option>
                <option>US</option>
                <option>CA</option>
              </select>
              <input
                id="phone-number"
                name="phone-number"
                type="text"
                placeholder="0917 123 4567"
                className="block w-full px-3 py-2 text-base text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900  outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          {/* Privacy */}
          <div className="flex gap-x-4 sm:col-span-2">
            <input
              id="agree"
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="agree" className="text-sm text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy policy
              </a>
              .
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            Let&apos;s talk
          </button>
        </div>
      </form>
    </div>
  )
}
