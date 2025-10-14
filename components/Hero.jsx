import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const heroBg = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80';

const Hero = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    {/* Background image with slow zoom */}
    <motion.img
      src={heroBg}
      alt="Paradise Prelude Villa"
      className="absolute inset-0 w-full h-full object-cover object-center -z-10 scale-110"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1.18, opacity: 1 }}
      transition={{ duration: 8, ease: 'easeInOut' }}
      loading="lazy"
    />
    {/* Overlay gradient for readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent -z-10" />
    {/* Hero Content */}
    <motion.div
      className="relative z-10 text-center px-4 py-32"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-2xl mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Paradise Prelude
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-white font-medium mb-8 drop-shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        The First Step of the Dream Paradise
      </motion.p>
      <Link
        to="/contact"
        className="inline-block px-8 py-4 bg-gradient-to-r from-[#CBA135] to-[#4ECDC4] hover:from-[#4ECDC4] hover:to-[#CBA135] text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gold-400"
      >
        Book Now
      </Link>
    </motion.div>
  </section>
);

export default Hero; 