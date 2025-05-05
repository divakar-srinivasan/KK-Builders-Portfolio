import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import residential from "../../../assets/8.jpg";
import commercial from "../../../assets/9.jpg";
import renovation from "../../../assets/7.jpg";
import interior from "../../../assets/10.jpeg";
import kitchen from "../../../assets/11.jpg";
import flooring from "../../../assets/12.jpg";
import roofing from "../../../assets/13.png";
import facade from "../../../assets/14.jpeg";

function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: "Residential Construction",
      desc: "Tailor-made homes crafted with precision and passion.",
      details: "At the heart of our residential construction service lies a commitment to creating bespoke homes that embody your vision and lifestyle. From groundbreaking architectural designs to immaculate finishing, we bring your dream home to life with unparalleled craftsmanship, ensuring it exudes comfort, style, and lasting value.",
      img: residential,
    },
    {
      title: "Commercial Buildings",
      desc: "Architecting spaces that define business excellence.",
      details: "Our commercial construction services are dedicated to crafting state-of-the-art spaces that fuel productivity and innovation. We design efficient, sustainable, and inspiring properties that align with the evolving demands of the modern business world, enabling your company to thrive in style.",
      img: commercial,
    },
    {
      title: "House Renovation",
      desc: "Reimagining homes, redefining elegance.",
      details: "Transform your living space with our expert house renovation services. From refreshing a single room to reinventing your entire home, we combine creativity, precision, and modern techniques to elevate every corner into a luxurious masterpiece tailored to your taste.",
      img: renovation,
    },
    {
      title: "Interior Fit-outs",
      desc: "Crafting exceptional interiors for extraordinary experiences.",
      details: "Our interior fit-out services redefine the way you live, work, and interact with your spaces. By seamlessly blending functionality with aesthetic finesse, we deliver custom-designed interiors that prioritize your comfort, productivity, and personal style, ensuring every detail resonates with perfection.",
      img: interior,
    },
    {
      title: "Modular Kitchens",
      desc: "Cooking made stylish, efficient, and delightful.",
      details: "Revolutionize your culinary experience with our tailored modular kitchens. Expertly combining sleek designs, innovative layouts, and smart storage solutions, we create kitchens that harmoniously balance beauty and functionality, making them the heart of your home.",
      img: kitchen,
    },
    {
      title: "Flooring Solutions",
      desc: "Sophisticated flooring for enduring charm and resilience.",
      details: "Explore an extensive range of premium flooring options designed to enhance your space's character and durability. From timeless hardwood elegance to contemporary tiles, our flooring solutions marry luxury with practicality, ensuring effortless maintenance and longevity.",
      img: flooring,
    },
    {
      title: "Roofing & Waterproofing",
      desc: "Shielding your property with unparalleled excellence.",
      details: "Our roofing and waterproofing services deliver a robust shield against nature's challenges. By utilizing cutting-edge materials and advanced techniques, we provide durable, weather-resistant solutions that ensure your property stays protected, secure, and energy-efficient for years to come.",
      img: roofing,
    },
    {
      title: "Exterior Facades",
      desc: "Transforming exteriors with striking elegance and durability.",
      details: "Elevate your property's curb appeal with our meticulously crafted exterior facades. Blending sophisticated designs with resilient materials, we create breathtaking exteriors that not only impress but also enhance energy efficiency and structural integrity.",
      img: facade,
    },
  ];

  // Animation variants for continuous jumping
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: [0, -15, 0], // Jumping sequence: start, peak, end
      transition: {
        y: {
          repeat: Infinity, // Loop infinitely
          repeatType: "loop", // Smooth looping
          duration: 2, // Duration of one complete jump
          ease: "easeInOut" // Smooth acceleration/deceleration
        },
        opacity: {
          duration: 0.5
        }
      }
    }
  };

  // Stagger animation for initial appearance
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 py-16 px-4 relative">
      <h3 className="text-4xl font-bold text-blue-900 mb-10 text-center">
        Our Construction Services
      </h3>

      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-xl cursor-pointer"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.05,
              y: -20, // Extra lift on hover
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedService(service)}
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h4 className="text-lg font-semibold text-blue-800 mb-1">
              {service.title}
            </h4>
            <p className="text-gray-600 text-sm">{service.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Selected Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-lg flex flex-col items-center relative mx-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
                onClick={() => setSelectedService(null)}
              >
                &times;
              </button>
              <img
                src={selectedService.img}
                alt={selectedService.title}
                className="w-full h-60 object-cover rounded-md mb-4"
              />
              <h4 className="text-2xl font-bold text-blue-800 mb-2">
                {selectedService.title}
              </h4>
              <p className="text-gray-700 text-md text-center mb-4">
                {selectedService.desc}
              </p>
              <h5 className="text-lg font-semibold text-blue-800 mb-2">Details</h5>
              <p className="text-gray-700 text-md text-center">
                {selectedService.details}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Services;