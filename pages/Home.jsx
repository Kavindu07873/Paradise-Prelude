import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const heroBg = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80';

const galleryImages = [
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
];

const reviews = [
  {
    name: 'Emily R.',
    text: 'A truly magical stay! The villa is stunning, the staff attentive, and the location perfect for exploring the southern coast.',
    rating: 5,
  },
  {
    name: 'Liam S.',
    text: 'We loved the infinity pool and the ocean views. Every detail was perfect. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Sofia D.',
    text: 'The most relaxing holiday we have ever had. The garden and spa are a dream. Will return!',
    rating: 5,
  },
  {
    name: 'Arjun K.',
    text: 'Great location, clean and safe with some Nice natural attractions. Just 10 min from the beach, very easy to find family and better based on the amenities.',
    rating: 4,
  },
  {
    name: 'Chai, France',
    text: 'Lovely and quiet. Well located. Happy return. Very unique. Perfectly clean. All green property, everything in one place.',
    rating: 5,
  },
  {
    name: 'Deepu, Singapore',
    text: 'Amazing resort. Beautiful, serene, and lovely hospitality. The views are out of a novel, and the swimming pool. You feel isolated from the ocean but simultaneously safe. Will return to visit again.',
    rating: 5,
  },
];

const WHATSAPP_NUMBER = '1234567890';
const DEFAULT_MESSAGE = encodeURIComponent("Hello Paradise Prelude! I'd like to inquire about availability.");

const Home = () => (
  <>
    {/* Hero Section */}
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <motion.img
        src={heroBg}
        alt="Paradise Prelude Villa"
        className="absolute inset-0 w-full h-full object-cover object-center -z-10 scale-110"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1.18, opacity: 1 }}
        transition={{ duration: 8, ease: 'easeInOut' }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent -z-10" />
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
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#CBA135] to-[#4ECDC4] hover:from-[#4ECDC4] hover:to-[#CBA135] text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gold-400"
          >
            Book Your Stay
          </Link>
        </motion.div>
      </motion.div>
    </section>
    {/* Gallery Preview Slider */}
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif font-bold text-white mb-6">Gallery Preview</h2>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="rounded-2xl"
      >
        {galleryImages.map((img, idx) => (
          <SwiperSlide key={img}>
            <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-[#CBA135]/20 bg-gray-900/60">
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col items-start">
                <span className="text-lg font-serif font-semibold text-white drop-shadow">Gallery Image {idx + 1}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-6">
        <Link to="/gallery" className="px-8 py-3 bg-gradient-to-r from-[#CBA135] to-[#4ECDC4] hover:from-[#4ECDC4] hover:to-[#CBA135] text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105">
          View Full Gallery
        </Link>
      </div>
    </section>
    {/* Guest Reviews Slider */}
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif font-bold text-white mb-6">Guest Reviews</h2>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="rounded-2xl"
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx}>
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 text-center h-full flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-[#CBA135] text-xl">★</span>
                ))}
              </div>
              <p className="text-lg text-gray-100 font-serif mb-4">“{review.text}”</p>
              <div className="text-[#4ECDC4] font-semibold">{review.name}</div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-6">
        <Link to="/reviews" className="px-8 py-3 bg-gradient-to-r from-[#CBA135] to-[#4ECDC4] hover:from-[#4ECDC4] hover:to-[#CBA135] text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105">
          Read More Reviews
        </Link>
      </div>
    </section>
    {/* Floating WhatsApp Button */}
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
    </a>
  </>
);

export default Home; 