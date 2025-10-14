import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    name: 'Emily R.',
    text: 'A truly magical stay! The villa is stunning, the staff attentive, and the location perfect for exploring the southern coast.',
    rating: 5,
  },
  {
    name: 'Liam S.',
    text: 'We loved the infinity pool and the ocean views. Every detail was perfect. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Sofia D.',
    text: 'The most relaxing holiday we have ever had. The garden and spa are a dream. Will return!',
    rating: 5,
  },
];

const Reviews = () => {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((idx + 1) % reviews.length);
  const prev = () => setIdx((idx - 1 + reviews.length) % reviews.length);

  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      <motion.h2 className="text-4xl font-serif font-bold text-center mb-8 text-[#CBA135]" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        Guest Reviews
      </motion.h2>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              {[...Array(reviews[idx].rating)].map((_, i) => (
                <FaStar key={i} className="text-[#CBA135] text-xl" />
              ))}
            </div>
            <p className="text-lg text-gray-100 font-serif mb-4">“{reviews[idx].text}”</p>
            <div className="text-[#4ECDC4] font-semibold">{reviews[idx].name}</div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between mt-6">
          <button onClick={prev} className="px-4 py-2 bg-[#CBA135] text-white rounded-full font-semibold hover:bg-[#4ECDC4] transition">Prev</button>
          <button onClick={next} className="px-4 py-2 bg-[#CBA135] text-white rounded-full font-semibold hover:bg-[#4ECDC4] transition">Next</button>
        </div>
      </div>
    </section>
  );
};

export default Reviews; 