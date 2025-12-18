import Image from "next/image";

const testimonials = [
  {
    name: "Arc Joan",
    username: "@jo_arche9",
    role: "Developer",
    image: "/Sen3.avif",
    message:
      "The clinic was clean and organized, and the staff were friendly and accommodating. The consultation and procedure went smoothly, and I appreciated how attentive Dr. Ong was to both the medical and aesthetic aspects of my care.",
    date: "Dec 12, 2025",
  },
  {
    name: "Arc Joan",
    username: "@jo_arche9",
    role: "Designer",
    image: "/Sen1.avif",
    message:
      "I had a great experience at Ear, Nose, and Throat Aesthetics with Dr. John Emmanuel Ong. He was very professional, knowledgeable, and approachable throughout my visit. Dr. Ong took the time to explain my condition and treatment options clearly.",
    date: "Dec 12, 2025",
  },
  {
    name: "Arc Joan",
    username: "@jo_arche9",
    role: "Developer",
    image: "/Sen2.avif",
    message:
      "The clinic was clean and organized, and the staff were friendly and accommodating. The consultation and procedure went smoothly, and I appreciated how attentive Dr. Ong was to both the medical and aesthetic aspects of my care.",
    date: "Dec 12, 2025",
  },
];

const Sentiments = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">

        {/* HEADER */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Patients Love Centra Clinic Ph
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-4">
          Real stories from real patients who trust Centra Clinic Ph with their
          healthcare meds.
        </p>

        <p className="text-sm text-gray-500 mb-12">
          Trusted by <span className="font-semibold">57,00+</span> users
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 text-left shadow-sm"
            >
              {/* USER */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.username}
                  </p>
                </div>

                <span className="ml-auto text-sm font-medium text-gray-600">
                  {item.role}
                </span>
              </div>

              {/* MESSAGE */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {item.message}
              </p>

              {/* DATE */}
              <p className="text-xs text-gray-400">
                {item.date}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Sentiments;

