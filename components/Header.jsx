import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Amenities', path: '/amenities' },
  { name: 'Location', path: '/location' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'FAQs', path: '/faqs' },
  { name: 'Contact', path: '/contact' },
];

const Header = ({ dark, setDark }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#2C2C2C]/95 shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold font-serif tracking-tight text-[#CBA135]">Paradise Prelude</Link>
        <nav className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${isActive ? 'text-[#4ECDC4]' : 'text-gray-200 hover:text-[#CBA135]'}`
              }
              end={link.path === '/'}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors"
            onClick={() => setDark(d => !d)}
            aria-label="Toggle dark mode"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
          <button className="md:hidden p-2" onClick={() => setMobileOpen(o => !o)}>
            <FaBars className="text-2xl text-[#CBA135]" />
          </button>
        </div>
      </div>
      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#2C2C2C]/95 px-4 py-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              className="text-lg font-medium text-white"
              onClick={() => setMobileOpen(false)}
              end={link.path === '/'}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header; 