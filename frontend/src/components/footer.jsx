import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';  // ✅ Use navigate hook

const Footer = () => {
  const navigate = useNavigate();  // ✅ Navigation hook

  // ✅ Navigation function for Quick Links
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);  // Smooth scrolling to the top after navigation
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-10">
      <div className="container mx-auto px-6 lg:px-20">

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-blue-600 rounded-lg p-8 mb-12 text-center md:flex md:items-center md:justify-between"
        >
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold">Ready to Build Your Dream Home?</h2>
            <p className="text-lg mt-2 text-gray-100">Contact us today for a free consultation!</p>
          </div>
          <button
            onClick={() => handleNavigation('/contact')}
            className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
          >
            Get a Quote
          </button>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Column 1: Company Info */}
          <div>
            <motion.img
              src={logo}
              alt="KK Builders Logo"
              className="h-16 w-auto mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              At KK Builders, we specialize in creating modern, sustainable, and luxurious homes tailored to your dreams.
            </p>
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-blue-500" />
              <span className="text-gray-300">+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <FaEnvelope className="text-blue-500" />
              <span className="text-gray-300">contact@kkbuilders.com</span>
            </div>
          </div>

          {/* Column 2: Quick Links with Navigation */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["Project", "About", "Contact"].map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(`/${item.toLowerCase()}`)}
                    className="relative text-white text-lg font-medium transition-all duration-300 ease-in-out 
                               hover:text-transparent bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text 
                               group"
                  >
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-sky-500 to-blue-800 
                                     transition-all duration-500 ease-in-out group-hover:w-full shadow-md 
                                     group-hover:shadow-blue-500/50"
                    ></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Office Location */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Office Location</h3>
            <p className="text-gray-400">Erode, Tamil Nadu</p>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          {[{ Icon: FaFacebookF, link: 'https://facebook.com' },
            { Icon: FaInstagram, link: 'https://instagram.com' },
            { Icon: FaTwitter, link: 'https://twitter.com' },
            { Icon: FaLinkedinIn, link: 'https://linkedin.com' }
          ].map(({ Icon, link }, index) => (
            <motion.a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-gray-400 hover:text-blue-400 transition duration-300"
            >
              <Icon className="text-2xl" />
            </motion.a>
          ))}
        </div>

        {/* Copyright and Privacy */}
        <div className="text-center text-gray-500 text-sm mt-10">
          <p>&copy; {new Date().getFullYear()} KK Builders. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</a>
            <span>|</span>
            <a href="/terms-of-service" className="hover:text-blue-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
