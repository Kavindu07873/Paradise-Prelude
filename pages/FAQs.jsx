import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'Is breakfast included in the stay?',
    a: 'No, but we can arrange them for  all guests.'
  },
  {
    q: 'Is the villa family-friendly?',
    a: 'Absolutely! We welcome families and have amenities for children.'
  },
  {
    q: 'Do you offer airport transfers?',
    a: 'Yes, airport transfers can be arranged upon request.'
  },
  {
    q: 'Is there WiFi and Smart TV?',
    a: 'Yes, high-speed WiFi and Smart TV are available throughout the villa.'
  },
];

const FAQs = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      <motion.h2 className="text-4xl font-serif font-bold text-center mb-8 text-[#CBA135]" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        FAQs About Villa
      </motion.h2>
      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <motion.div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
            <button
              className="w-full text-left px-6 py-4 font-serif text-lg text-[#CBA135] focus:outline-none flex justify-between items-center"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              {item.q}
              <span className="ml-2 text-xl">{open === idx ? '-' : '+'}</span>
            </button>
            <AnimatePresence initial={false}>
              {open === idx && (
                <motion.div
                  className="px-6 pb-4 text-gray-100"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQs; 