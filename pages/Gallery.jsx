import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  'https://unsplash.it/600/400?image=1050',
  'https://unsplash.it/600/400?image=1043',
  'https://unsplash.it/600/400?image=1039',
  'https://unsplash.it/600/400?image=1027',
  'https://unsplash.it/600/400?image=1015',
  'https://unsplash.it/600/400?image=1003',
  'https://unsplash.it/600/400?image=998',
  'https://unsplash.it/600/400?image=990',
  'https://unsplash.it/600/400?image=990',
  'https://unsplash.it/600/400?image=990',
  'https://unsplash.it/600/400?image=990',
  'https://unsplash.it/600/400?image=990',
  'https://unsplash.it/600/400?image=990',

];

const Gallery = () => {
  const [selected, setSelected] = useState(null);

  return (
    <motion.section className="max-w-6xl mx-auto px-4 py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <h2 className="text-4xl font-serif font-bold text-center mb-10">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <motion.button
            key={src}
            className="focus:outline-none group relative"
            onClick={() => setSelected(idx)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07, duration: 0.5 }}
          >
            <motion.img
              src={src}
              alt={`Paradise Prelude ${idx + 1}`}
              className="rounded-lg shadow-lg w-full h-64 object-cover"
              loading="lazy"
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 200 }}
            />
          </motion.button>
        ))}
      </div>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={images[selected]}
              alt={`Paradise Prelude ${selected + 1}`}
              className="max-w-full max-h-[80vh] rounded-lg shadow-2xl border-4 border-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Gallery; 