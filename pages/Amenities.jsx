import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getAllAmenities, getAmenityCategories, getAmenitiesByCategory, amenitiesAnimationVariants, getAmenitiesWithIcons } from '../config/amenities';
import AmenityCard from '../components/AmenityCard';

const Amenities = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const allAmenities = getAllAmenities();
  const categories = getAmenityCategories();
  
  const filteredAmenities = getAmenitiesWithIcons(
    selectedCategory === 'all' 
      ? allAmenities 
      : getAmenitiesByCategory(selectedCategory)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.h2 
        className="text-4xl font-serif font-bold text-center mb-10 text-[#CBA135]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Amenities
      </motion.h2>

      {/* Category Filter */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-[#CBA135] text-white shadow-lg'
              : 'bg-white/20 text-gray-300 hover:bg-white/30'
          }`}
        >
          All Amenities
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 capitalize ${
              selectedCategory === category
                ? 'bg-[#CBA135] text-white shadow-lg'
                : 'bg-white/20 text-gray-300 hover:bg-white/30'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Amenities Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        variants={amenitiesAnimationVariants.container}
        initial="hidden"
        animate="show"
        key={selectedCategory} // Re-trigger animation when category changes
      >
        {filteredAmenities.map((amenity) => (
          <motion.div
            key={amenity.id}
            variants={amenitiesAnimationVariants.item}
            whileHover={{ scale: 1.04 }}
          >
            <AmenityCard
              iconComponent={amenity.iconComponent}
              title={amenity.title}
              desc={amenity.description}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* No results message */}
      {filteredAmenities.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-400 text-lg">No amenities found in this category.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Amenities; 