import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';

const initialState = {
  name: '',
  email: '',
  phone: '',
  checkin: null,
  checkout: null,
  message: '',
};

const BookingForm = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    if (!form.phone) errs.phone = 'Phone is required';
    if (!form.checkin) errs.checkin = 'Check-in date is required';
    if (!form.checkout) errs.checkout = 'Check-out date is required';
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleDate = (date, field) => {
    setForm({ ...form, [field]: date });
    setErrors({ ...errors, [field]: undefined });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    console.log('Booking Inquiry:', form);
    setForm(initialState);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg border border-[#CBA135]/20 p-8 space-y-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <input type="text" name="name" value={form.name} onChange={handleChange} className="peer w-full bg-transparent border-b-2 border-[#CBA135] text-white placeholder-transparent focus:outline-none focus:border-[#4ECDC4] py-2" placeholder="Name" />
          <label className="absolute left-0 top-2 text-[#CBA135] text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-xs">Name *</label>
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="relative">
          <input type="email" name="email" value={form.email} onChange={handleChange} className="peer w-full bg-transparent border-b-2 border-[#CBA135] text-white placeholder-transparent focus:outline-none focus:border-[#4ECDC4] py-2" placeholder="Email" />
          <label className="absolute left-0 top-2 text-[#CBA135] text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-xs">Email *</label>
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="peer w-full bg-transparent border-b-2 border-[#CBA135] text-white placeholder-transparent focus:outline-none focus:border-[#4ECDC4] py-2" placeholder="Phone" />
          <label className="absolute left-0 top-2 text-[#CBA135] text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-xs">Phone *</label>
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <DatePicker
              selected={form.checkin}
              onChange={date => handleDate(date, 'checkin')}
              className="peer w-full bg-transparent border-b-2 border-[#CBA135] text-white placeholder-transparent focus:outline-none focus:border-[#4ECDC4] py-2"
              placeholderText="Check-in"
              dateFormat="yyyy-MM-dd"
            />
            <label className="absolute left-0 top-2 text-[#CBA135] text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-xs">Check-in *</label>
            {errors.checkin && <p className="text-red-400 text-xs mt-1">{errors.checkin}</p>}
          </div>
          <div className="flex-1 relative">
            <DatePicker
              selected={form.checkout}
              onChange={date => handleDate(date, 'checkout')}
              className="peer w-full bg-transparent border-b-2 border-[#CBA135] text-white placeholder-transparent focus:outline-none focus:border-[#4ECDC4] py-2"
              placeholderText="Check-out"
              dateFormat="yyyy-MM-dd"
            />
            <label className="absolute left-0 top-2 text-[#CBA135] text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-xs">Check-out *</label>
            {errors.checkout && <p className="text-red-400 text-xs mt-1">{errors.checkout}</p>}
          </div>
        </div>
      </div>
      <div className="relative">
        <textarea name="message" value={form.message} onChange={handleChange} rows={4} className="peer w-full bg-transparent border-b-2 border-[#CBA135] text-white placeholder-transparent focus:outline-none focus:border-[#4ECDC4] py-2" placeholder="Message" />
        <label className="absolute left-0 top-2 text-[#CBA135] text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-xs">Message</label>
      </div>
      <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#CBA135] to-[#4ECDC4] hover:from-[#4ECDC4] hover:to-[#CBA135] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gold-400">
        Send Message
      </button>
      <AnimatePresence>
        {submitted && (
          <motion.p className="text-emerald-400 text-center mt-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.5 }}>
            Thank you! Your inquiry has been sent.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default BookingForm; 