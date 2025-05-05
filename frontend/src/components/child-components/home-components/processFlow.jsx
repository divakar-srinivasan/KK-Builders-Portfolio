import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import img1 from "../../../assets/15.jpg";

const ProcessFlow = () => {
  const projectSteps = [
    "Process from the Start",
    "New Client",
    "Site Visit (On-going Projects)",
    "Token Advance",
    "Plan Approval",
    "OK",
  ];

  const workSteps = [
    "Requirement Analysis",
    "Project Planning",
    "Design & Architecture",
    "Construction & Execution",
    "Quality Check",
    "Project Handover",
  ];

  const StepBlock = ({ step, index }) => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

    return (
      <div className="flex flex-col items-center mb-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold w-60 text-center"
        >
          {step}
        </motion.div>
        {index !== projectSteps.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
          >
            <FaArrowDown className="mt-3 animate-bounce text-lg text-gray-400" />
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col justify-center items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.85)", // Adjusted brightness
        }}
      ></div>

      {/* White gradient overlay (top & bottom) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 w-full h-12 bg-gradient-to-b from-white/75 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white/75 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="relative flex flex-col lg:flex-row justify-center items-center min-h-[85vh] px-6 py-6 text-white mt-6">
        {/* Left - Project Process */}
        <div className="w-full lg:w-1/2 flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-200 underline">
            Project Process Flow
          </h2>
          {projectSteps.map((step, index) => (
            <StepBlock key={index} step={step} index={index} />
          ))}
        </div>

        {/* Space between flows */}
        <div className="hidden lg:block w-12"></div>

        {/* Right - Work Process */}
        <div className="w-full lg:w-1/2 flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-200 underline">
            Work Process Flow
          </h2>
          {workSteps.map((step, index) => (
            <StepBlock key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;
