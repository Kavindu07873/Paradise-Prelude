import React from 'react';
import { motion } from 'framer-motion';
import { getIconComponent } from '../config/amenities';

const AmenityCard = ({ icon, iconComponent, title, desc }) => {
  const IconComponent = icon || getIconComponent(iconComponent);
  
  return (
  <motion.div
    className="flex flex-col items-center text-center p-6 bg-white/20 backdrop-blur-md rounded-xl shadow-lg border border-[#CBA135]/20 hover:shadow-2xl transition-all group cursor-pointer"
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.98 }}
  >
    <motion.div
      className="mb-4 text-4xl text-[#4ECDC4] group-hover:rotate-6 group-hover:scale-110 transition-transform"
      whileHover={{ rotate: 6, scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <IconComponent className="text-3xl text-emerald-600 group-hover:scale-110 transition-transform" />
    </motion.div>
    <h3 className="text-xl font-serif font-semibold mb-2 text-[#CBA135]">{title}</h3>
    <p className="text-gray-100 font-sans">{desc}</p>
  </motion.div>
  );
};

export default AmenityCard; 