import React from 'react';
import { FaSwimmingPool, FaSpa, FaWifi, FaShieldAlt, FaLeaf, FaUtensils, FaWind, FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';

const amenities = [
  { icon: <FaSwimmingPool className="text-3xl text-emerald-600 group-hover:scale-110 transition-transform" />, title: 'Infinity Pool', desc: 'Swim with breathtaking ocean views.' },
  { icon: <FaLeaf className="text-3xl text-emerald-600 group-hover:scale-110 transition-transform" />, title: 'Private Garden', desc: 'Lush, tranquil spaces for relaxation.' },
  { icon: <FaEye className="text-3xl text-emerald-600 group-hover:scale-110 transition-transform" />, title: 'Ocean View', desc: 'Panoramic vistas from every room.' },
  { icon: <FaUtensils className="text-3xl text-emerald-600 group-hover:scale-110 transition-transform" />, title: 'Chef-on-call', desc: 'Gourmet dining at your convenience.' },
  { icon: <FaWifi className="text-3xl text-emerald-600 group-hover:scale-110 transition-transform" />, title: 'Wi-Fi, AC & Security', desc: 'Modern comforts and peace of mind.' },
  { icon: <FaSpa className="text-3xl text-emerald-600 group-hover:scale-110 transition-transform" />, title: 'Spa & Yoga Lounge', desc: 'Wellness and serenity await.' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Amenities = () => (
  <motion.section className="max-w-5xl mx-auto px-4 py-16" initial="hidden" animate="show" variants={container}>
    <motion.h2 className="text-4xl font-serif font-bold text-center mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>Amenities</motion.h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {amenities.map((itemData, idx) => (
        <motion.div
          key={itemData.title}
          className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition-shadow group"
          variants={item}
          whileHover={{ scale: 1.04 }}
        >
          <div className="mb-4">{itemData.icon}</div>
          <h3 className="text-xl font-semibold mb-2 font-serif">{itemData.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{itemData.desc}</p>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default Amenities; 