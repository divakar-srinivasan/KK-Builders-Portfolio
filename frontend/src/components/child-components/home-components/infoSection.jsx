import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import office from "../../../assets/off6.png";

function InfoSection() {
  const [swap, setSwap] = useState(false);

  // Toggle swap every 5 seconds (reduced from 12)
  useEffect(() => {
    const interval = setInterval(() => {
      setSwap(prev => !prev);
    }, 5000); // Changed from 12000 to 5000 (5 seconds)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center gap-10 p-10 w-full max-w-7xl">
      {/* Image Section */}
      <motion.div
        className={`flex justify-center w-full md:w-1/2 ${swap ? 'md:order-2' : 'md:order-1'}`}
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        animate={{
          transition: { 
            duration: 1, // Reduced from 2 to 0.8 seconds
            ease: [0.25, 0.1, 0.25, 1]
          }
        }}
        transition={{ duration: 1, ease: "easeOut" }} // Slightly faster initial appear
        viewport={{ once: true }}
      >
        <motion.div
          className="rounded-2xl shadow-xl overflow-hidden cursor-pointer"
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            boxShadow: "0px 20px 30px rgba(0,0,0,0.2)",
            filter: "brightness(1.05)",
          }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            layout: { 
              duration: 1, // Reduced from 2 to 0.8
              ease: [0.25, 0.1, 0.25, 1]
            } 
          }}
          style={{ perspective: 1000 }}
          layout
        >
          <img 
            src={office} 
            alt="Office" 
            className="object-cover w-full max-w-[380px] h-auto" 
          />
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className={`w-full md:w-1/2 text-gray-800 flex flex-col justify-center ${swap ? 'md:order-1' : 'md:order-2'}`}
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        animate={{
          transition: { 
            duration: 1, // Reduced from 2 to 0.8
            ease: [0.25, 0.1, 0.25, 1]
          }
        }}
        transition={{ 
          duration: 1, 
          ease: "easeOut", 
          delay: 0.2, // Reduced from 0.3
          layout: {
            duration: 1, // Reduced from 2
            ease: [0.25, 0.1, 0.25, 1]
          }
        }}
        viewport={{ once: true }}
        layout
      >
        <motion.div layout>
          <h3 className="text-4xl font-bold mb-6 text-blue-900">Building the Future</h3>
          <p className="text-lg leading-relaxed mb-6">
            Our construction company is committed to delivering top-quality projects that stand the test of time.
            With a team of skilled professionals, we transform ideas into reality, ensuring excellence in every brick laid.
          </p>
          <ul className="list-disc pl-5 space-y-3 text-lg">
            <li>Experienced and dedicated team</li>
            <li>High-quality materials and craftsmanship</li>
            <li>On-time project completion</li>
            <li>Customer satisfaction is our priority</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default InfoSection;