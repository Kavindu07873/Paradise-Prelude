import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '+94710178210';
const DEFAULT_MESSAGE = encodeURIComponent("Hello Paradise Prelude! I'd like to inquire about availability.");

const Contact = () => {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`;

  return (
    <motion.section
      className="max-w-2xl mx-auto px-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="text-4xl font-serif font-bold text-center mb-8 text-[#CBA135]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Contact via WhatsApp
      </motion.h2>

      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 text-center border border-[#CBA135]/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <p className="text-lg text-gray-200 mb-6">
          We handle all bookings and inquiries on WhatsApp.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold rounded-full shadow-lg transition-colors"
        >
          <FaWhatsapp className="text-2xl" />
          Chat on WhatsApp
        </a>
      </motion.div>
    </motion.section>
  );
};

export default Contact;