import React from 'react';
import { motion } from 'framer-motion';

const Location = () => (
  <motion.section className="max-w-4xl mx-auto px-4 py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
    <motion.h2 className="text-4xl font-serif font-bold mb-8 text-center text-[#CBA135]" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      Convenient Location
    </motion.h2>
    <motion.p className="text-lg mb-6 text-gray-200 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
      Located a short distance from the exit of the southern expressway, Paradise Prelude is easily accessible from Colombo and just minutes away from Galle – the capital city of the southern province and a world heritage site. Our villa is also close to a variety of well-renowned travel destinations on the southern coast.
    </motion.p>
      <motion.div className="rounded-lg overflow-hidden shadow-lg" initial={{opacity: 0, y: 30}}
                  animate={{opacity: 1, y: 0}} transition={{delay: 0.4, duration: 0.7}}>
          <iframe
              title="Paradise Prelude Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d592.4623954026537!2d80.29657420565898!3d5.997312506266524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2slk!4v1762927138066!5m2!1sen!2slk"
              width="100%"
              height="300"
              style={{border: 0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
      </motion.div>
  </motion.section>
);

export default Location; 