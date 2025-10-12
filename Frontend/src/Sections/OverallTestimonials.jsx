import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Mango Maniac",
    role: "Pickle Enthusiast",
    text: "I tried Amma's Achar and now my life has meaning. 10/10 would dip my paratha again.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=10",
  },
  {
    id: 2,
    name: "Chilli Champion",
    role: "Professional Doubter",
    text: "Honestly thought it was just pickles… but WOW. Now I dream in mango achar.",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 3,
    name: "Garlic Guru",
    role: "Snack Addict",
    text: "I opened one jar and 3 minutes later, it was gone. Amma, what magic is this?",
    rating: 4,
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 4,
    name: "Lemon Legend",
    role: "Professional Taste Tester",
    text: "My granddaughter said I should stop eating pickles… I said NO. Amma's Achar forever!",
    rating: 5,
    image: "https://i.pravatar.cc/100?img=13",
  },
];

const OverallTestimonials = () => {
  return (
    <div className="bg-[#FFF8E7] py-16 px-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
        What People Say About Amma's Pickles
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl shadow-md w-80 p-6 hover:scale-105 transform transition duration-300 flex flex-col items-center text-center"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">{t.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{t.role}</p>
            <p className="text-gray-600 mb-4 italic">"{t.text}"</p>
            <div className="flex justify-center">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallTestimonials;
