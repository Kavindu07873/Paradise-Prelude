import React from 'react';
import { motion } from 'framer-motion';

const About = () => (
  <motion.section className="max-w-4xl mx-auto px-4 py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    <motion.h2 className="text-4xl font-serif font-bold mb-8 text-center text-[#CBA135]" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>About Paradise Prelude</motion.h2>
    <motion.p className="text-lg mb-6 text-gray-200 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>
      Paradise Prelude is a beautiful old house lovingly transformed into a luxury villa. Once a cherished family home, its walls hold stories of generations past, now blended with the elegance and comfort of modern living. Every corner reflects a unique charm—original details preserved, lush gardens restored, and new life breathed into timeless architecture. Our villa invites you to experience the warmth of history and the beauty of a dream escape by the sea.
    </motion.p>
    <div className="grid md:grid-cols-2 gap-8 mb-10">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.7 }}>
        <h3 className="text-2xl font-serif font-semibold mb-2 text-[#4ECDC4]">Our Mission</h3>
        <p className="text-gray-200 mb-4">To offer an unparalleled escape where guests can unwind, rejuvenate, and reconnect with nature in the lap of luxury.</p>
        <h3 className="text-2xl font-serif font-semibold mb-2 text-[#4ECDC4]">Our Vision</h3>
        <p className="text-gray-200">To be the premier destination for those seeking tranquility, elegance, and unforgettable experiences by the sea.</p>
      </motion.div>
      <motion.div className="rounded-lg overflow-hidden shadow-lg" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.7 }}>
        <iframe
          title="Paradise Prelude Location"
          src="https://www.google.com/maps/place//@5.9975111,80.2959983,18.25z/data=!4m9!1m8!3m7!1s0x3ae173bb6932fce3:0x4a35b903f9c64c03!2sGalle,+Sri+Lanka!3b1!8m2!3d6.0328948!4d80.2167912!16zL20vMDI3M21r?hl=en&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
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