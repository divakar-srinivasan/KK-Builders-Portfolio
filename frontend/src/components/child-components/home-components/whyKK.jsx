import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function WhyUs() {
  const stats = [
    { number: 12, suffix: "+", label: "Years of Experience" },
    { number: 65, suffix: "+", label: "Completed Projects" },
    { number: 25, suffix: "+", label: "On-going Projects" },
    { number: 5, suffix: "+", label: "Years of Warranty" },
    { number: 320, suffix: "+", label: "Constructional Workers" },
    { number: 108000, suffix: "+", label: "Sqft Completed" },
  ];

  // Intersection Observer Hook
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <div ref={ref} className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-gray-500 to-[#FFD700] animate-bg-move brightness-95"></div>

      {/* White gradient overlay (top & bottom) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 w-full h-12 bg-gradient-to-b from-white/70 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white/70 to-transparent"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
        >
          Why KK Construction?
        </motion.h2>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-gray-900"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <p className="text-5xl font-extrabold">
                {inView && <CountUp start={0} end={stat.number} duration={2} key={inView} />}
                {stat.suffix}
              </p>
              <p className="text-lg text-gray-800">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ONE STOP SOLUTION Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-900">ONE STOP SOLUTION</h3>
          <p className="text-gray-800 mt-2 text-lg">
            Approval + Agreement + Design + Construction + Interior + Hand Over The Key
          </p>
        </motion.div>
      </div>

      {/* Background Animation */}
      <style jsx>{`
        @keyframes bg-move {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        .animate-bg-move {
          background-size: 400% 400%;
          animation: bg-move 12s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default WhyUs;
