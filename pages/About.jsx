import React from 'react';
import { motion } from 'framer-motion';

const About = () => (
  <motion.section className="max-w-4xl mx-auto px-4 py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    <motion.h2 className="text-4xl font-serif font-bold mb-8 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>About Paradise Prelude</motion.h2>
    <motion.p className="text-lg mb-6 text-gray-700 dark:text-gray-200 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
      Paradise Prelude is a beautiful old house lovingly transformed into a luxury villa. Once a cherished family home, its walls hold stories of generations past, now blended with the elegance and comfort of modern living. Every corner reflects a unique charm—original details preserved, lush gardens restored, and new life breathed into timeless architecture. Our villa invites you to experience the warmth of history and the beauty of a dream escape by the sea.
    </motion.p>
    <div className="grid md:grid-cols-2 gap-8 mb-10">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.7 }}>
        <h3 className="text-2xl font-serif font-semibold mb-2">Our Mission</h3>
        <p className="text-gray-700 dark:text-gray-200 mb-4">To offer an unparalleled escape where guests can unwind, rejuvenate, and reconnect with nature in the lap of luxury.</p>
        <h3 className="text-2xl font-serif font-semibold mb-2">Our Vision</h3>
        <p className="text-gray-700 dark:text-gray-200">To be the premier destination for those seeking tranquility, elegance, and unforgettable experiences by the sea.</p>
      </motion.div>
      <motion.div className="rounded-lg overflow-hidden shadow-lg" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.7 }}>
        <iframe
          title="Paradise Prelude Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019019145409!2d144.9630579153167!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f7fd81%3A0xf577c6e0b0b0b0b0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </div>
  </motion.section>
);

export default About; 