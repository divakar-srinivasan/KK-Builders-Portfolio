import React from "react";
import Slideshow from "./home-components/slideshow";
import img3D1 from "../../assets/24.jpg";
import img3D2 from "../../assets/23.jpg";
import img3D3 from "../../assets/24.jpg";

import imgStructural1 from "../../assets/4.jpg";
import imgStructural2 from "../../assets/5.jpg";
import imgStructural3 from "../../assets/6.jpg";

import imgPlumbing1 from "../../assets/7.jpg";
import imgPlumbing2 from "../../assets/8.jpg";
import imgPlumbing3 from "../../assets/9.jpg";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const architectSections = [
  {
    title: "3D Elevation",
    images: [img3D1, img3D2, img3D3],
    description:
      "Experience the future of your dream home with our state-of-the-art 3D elevation designs. By offering a realistic preview of your project, we ensure every texture, lighting, and proportion is meticulously visualized before construction begins. This advanced approach guarantees alignment with your expectations, enabling precise adjustments for an aesthetically pleasing and structurally sound design.",
  },
  {
    title: "Structural Drawing",
    images: [imgStructural1, imgStructural2, imgStructural3],
    description:
      "Our structural drawings provide the backbone of your construction, ensuring safety, stability, and longevity. These detailed plans incorporate essential components such as load-bearing walls, beams, columns, and foundations. Designed to meet rigorous engineering standards, they form the blueprint for a robust and secure building, standing strong for generations to come.",
  },
  {
    title: "Plumbing Drawing",
    images: [imgPlumbing1, imgPlumbing2, imgPlumbing3],
    description:
      "Discover efficient and sustainable plumbing solutions with our meticulously crafted plumbing drawings. From precise layouts for water supply systems to effective drainage and sanitation frameworks, these designs guarantee seamless functionality and adherence to building codes. With a focus on minimizing future maintenance costs, we ensure optimal water flow and waste management for every project.",
  },
];


const Architect = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 py-16">
      {/* Page Header */}
      <motion.div
        className="max-w-5xl mx-auto text-center px-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-wide leading-tight">
          Build Your Dream Home with <span className="text-yellow-600">KK Construction</span>
        </h1>
        <p className="text-lg text-gray-800 leading-relaxed max-w-3xl mx-auto">
          At KK Construction, we specialize in crafting bespoke homes that reflect your unique vision and lifestyle.
          Our expert team ensures <span className="font-semibold text-yellow-700">innovation</span>,{" "}
          <span className="font-semibold text-yellow-700">sustainability</span>, and{" "}
          <span className="font-semibold text-yellow-700">top-tier execution</span> from concept to completion.
          Let us bring your architectural dreams to life with precision and professionalism.
        </p>
      </motion.div>

      {/* Architectural Sections */}
      <div className="max-w-6xl mx-auto px-6 mt-12 space-y-20">
        {architectSections.map((section, index) => (
          <motion.section
            key={index}
            className="bg-white shadow-xl rounded-xl p-8 transform transition duration-500 hover:scale-[1.02] hover:shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-semibold text-gray-900 mb-4 border-l-4 border-yellow-500 pl-4">
              {section.title}
            </h2>
            {/* Ensure the images array is passed correctly */}
            <Slideshow images={section.images} />
            <p className="text-gray-700 mt-6 text-lg leading-relaxed italic">
              {section.description}
            </p>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default Architect;
