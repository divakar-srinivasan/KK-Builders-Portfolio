import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../../../assets/16.jpg";
import img2 from "../../../assets/17.jpg";
import img3 from "../../../assets/18.png";
import img4 from "../../../assets/19.avif";
import img5 from "../../../assets/20.jpg";
import img6 from "../../../assets/21.webp";
import img7 from "../../../assets/22.jpg";
import img8 from "../../../assets/25.jpg";

const vendors = [
  { name: "Amman TRY Steel", image: img1 },
  { name: "Kiscol Steel", image: img2 },
  { name: "JSW Steel", image: img3 },
  { name: "UltraTech Cement", image: img4 },
  { name: "Dalmia Cement", image: img5 },
  { name: "Ambuja Cement", image: img6 },
  { name: "Maha Cement", image: img7 },
  { name: "Tata steel", image: img8 },
];

const VendorSlideshow = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-full text-white py-12">
      <motion.h2
        className="text-center text-4xl font-bold mb-10 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        OUR VENDORS
      </motion.h2>

      <div className="max-w-6xl mx-auto px-6">
        <Slider {...settings}>
          {vendors.map((vendor, index) => (
            <motion.div
              key={index}
              className="text-center px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="bg-white rounded-xl shadow-xl p-6 transition-all transform hover:scale-105 hover:shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <img
                  src={vendor.image}
                  alt={`${vendor.name} Logo`}
                  className="w-full h-44 object-contain rounded-lg mb-4"
                />
                <p className="mt-4 font-semibold text-lg text-gray-900">{vendor.name}</p>
              </motion.div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default VendorSlideshow;
