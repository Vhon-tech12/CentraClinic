import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

const testimonials = [
  {
    name: "Maria Santos",
    username: "@maria_santos",
    role: "Teacher",
    image: "/Sen3.avif",
    message:
      "The clinic was clean and organized, and the staff were friendly and accommodating. The consultation and procedure went smoothly, and I appreciated how attentive Dr. Ong was to both the medical and aesthetic aspects of my care. Highly recommend!",
    date: "Dec 12, 2024",
    rating: 5,
  },
  {
    name: "Carlos Rivera",
    username: "@carlos_rivera",
    role: "Engineer",
    image: "/Sen1.avif",
    message:
      "I had a great experience at Centra Clinic for my ENT consultation. Dr. John Emmanuel Ong was very professional, knowledgeable, and approachable. He explained everything clearly and made me feel comfortable throughout the visit.",
    date: "Nov 28, 2024",
    rating: 5,
  },
  {
    name: "Elena Gomez",
    username: "@elena_gomez",
    role: "Business Owner",
    image: "/Sen2.avif",
    message:
      "Outstanding service! The facial treatment I received was top-notch. The results exceeded my expectations, and the team ensured I was comfortable every step of the way. Centra Clinic truly cares about their patients.",
    date: "Oct 15, 2024",
    rating: 5,
  },
];

const Sentiments = () => {
  return (
    <section className="py-20 px-6 bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto text-center">

        {/* HEADER */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          What Our Patients Say
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-lg leading-relaxed">
          Hear from real patients who have experienced exceptional care at Centra Clinic PH. Their stories reflect our commitment to quality healthcare and personalized service.
        </p>

        <p className="text-base text-indigo-600 mb-16 font-semibold">
          Trusted by <span className="text-2xl font-bold">57,000+</span> satisfied patients
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 text-left shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* QUOTE ICON */}
              <div className="mb-4">
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="text-indigo-200 text-3xl group-hover:text-indigo-300 transition-colors"
                />
              </div>

              {/* RATING */}
              <div className="flex mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>

              {/* MESSAGE */}
              <p className="text-gray-700 leading-relaxed mb-6 text-base">
                {item.message}
              </p>

              {/* USER */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-indigo-100">
                  <Image
                    src={item.image}
                    alt={`Profile picture of ${item.name}, a satisfied patient at Centra Clinic PH`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.username}
                  </p>
                  <p className="text-xs text-indigo-600 font-medium">
                    {item.role}
                  </p>
                </div>

                {/* DATE */}
                <p className="text-xs text-gray-400 ml-auto">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Sentiments;

