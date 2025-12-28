

export default function AdminPage() {
  return (
    <>
      <section className="bg-white">
        {/* HERO SECTION */}
        <div className="relative w-full h-[300] bg-linear-to-r from-blue-600 to-purple-600 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Admin Dashboard
          </h1>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              Welcome to the Admin Panel
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Manage your clinic's operations, view reports, and oversee user data from this centralized dashboard.
            </p>
          </div>

          {/* PLACEHOLDER FOR ADMIN FEATURES */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-blue-50 text-center">
              <h3 className="text-2xl font-semibold mb-3 text-blue-700">
                User Management
              </h3>
              <p className="text-gray-600">
                Manage patient and staff accounts.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-purple-50 text-center">
              <h3 className="text-2xl font-semibold mb-3 text-purple-700">
                Reports
              </h3>
              <p className="text-gray-600">
                View analytics and generate reports.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-green-50 text-center">
              <h3 className="text-2xl font-semibold mb-3 text-green-700">
                Settings
              </h3>
              <p className="text-gray-600">
                Configure system preferences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
