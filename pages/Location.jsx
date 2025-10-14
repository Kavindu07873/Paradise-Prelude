import React from 'react';
import { motion } from 'framer-motion';

const Location = () => (
  <motion.section className="max-w-4xl mx-auto px-4 py-16">
    <motion.h2 className="text-4xl font-serif font-bold mb-8 text-center text-[#CBA135]" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      Convenient Location
    </motion.h2>
    <motion.p className="text-lg mb-6 text-gray-200 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
      Located a short distance from the exit of the southern expressway, Paradise Prelude is easily accessible from Colombo and just minutes away from Galle – the capital city of the southern province and a world heritage site. Our villa is also close to a variety of well-renowned travel destinations on the southern coast.
    </motion.p>
    <motion.div className="rounded-lg overflow-hidden shadow-lg" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
      <iframe
        title="Paradise Prelude Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019019145409!2d144.9630579153167!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f7fd81%3A0xf577c6e0b0b0b0b0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </motion.div>
  </motion.section>
);

export default Location; 