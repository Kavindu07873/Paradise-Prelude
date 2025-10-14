import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Amenities from './pages/Amenities';
import Contact from './pages/Contact';
import Location from './pages/Location';
import Reviews from './pages/Reviews';
import FAQs from './pages/FAQs';
import { AnimatePresence, motion } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageFade><Home /></PageFade>} />
        <Route path="/gallery" element={<PageFade><Gallery /></PageFade>} />
        <Route path="/about" element={<PageFade><About /></PageFade>} />
        <Route path="/amenities" element={<PageFade><Amenities /></PageFade>} />
        <Route path="/contact" element={<PageFade><Contact /></PageFade>} />
        <Route path="/location" element={<PageFade><Location /></PageFade>} />
        <Route path="/reviews" element={<PageFade><Reviews /></PageFade>} />
        <Route path="/faqs" element={<PageFade><FAQs /></PageFade>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageFade({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <Router>
      <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 overflow-x-hidden">
        <Header dark={dark} setDark={setDark} />
        <main className="flex-1 relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 