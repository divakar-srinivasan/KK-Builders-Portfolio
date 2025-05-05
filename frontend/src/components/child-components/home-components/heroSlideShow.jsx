import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function HeroSlideshow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[2500ms] ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <motion.div className="absolute z-10 flex flex-wrap justify-center px-4 text-center">
        {["Construction", "is", "the", "art", "of", "turning", "vision", "into", "reality."].map((word, index) => (
          <motion.span
            key={index}
            className="text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg mx-1"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: index * 0.2 }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      <motion.button
        onClick={() => navigate("/contact")}
        className="absolute bottom-6 bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md"
        whileHover={{ scale: 1.1 }}
      >
        Contact Us
      </motion.button>
    </div>
  );
}

export default HeroSlideshow;
