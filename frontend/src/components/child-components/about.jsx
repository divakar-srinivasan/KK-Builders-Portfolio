import bg1 from '../../assets/5.jpg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '../../assets/1.jpg';

function About() {
  const teamMembers = [
    { name: "Karthik", role: "CEO & Founder", img: img1, desc: "Leading with vision and integrity, driving the company towards excellence." },
  ];

  const faqData = [
    { question: "What services do you offer?", answer: "We provide construction, architectural design, and project management services with a focus on sustainability and quality." },
    { question: "How can I get a quote for my project?", answer: "You can request a quote by filling out the contact form on our website or by calling our customer service team." },
    { question: "Do you offer eco-friendly building solutions?", answer: "Yes, we prioritize eco-friendly materials and sustainable construction practices to reduce our environmental impact." },
    { question: "What is your project completion timeline?", answer: "Timelines vary depending on the project scope, but we ensure timely delivery with regular updates to keep clients informed." },
    { question: "Do you handle renovation or remodeling projects?", answer: "Yes, we undertake renovations and remodeling with precision and attention to detail." },
    { question: "What areas do you serve?", answer: "We serve clients across multiple regions with a strong local presence and expertise." },
    { question: "Do you provide warranties for your construction work?", answer: "Yes, we offer warranties for structural integrity and quality of work as part of our commitment to customer satisfaction." },
    { question: "Can I see examples of your past projects?", answer: "Certainly! You can browse our portfolio on our website or schedule a visit to one of our completed projects." },
    { question: "What is your payment structure?", answer: "We offer flexible payment options and provide a detailed breakdown of costs at every stage of the project." },
    { question: "How do you ensure quality and safety during construction?", answer: "We adhere to rigorous quality standards and safety protocols, with a dedicated team monitoring every stage of the project." }
  ];
  

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <div className="min-h-screen bg-black/80 py-24 px-6 lg:px-32 flex justify-center items-center">

        <motion.div
          className="max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >

          <div className="p-14">

            {/* Header */}
            <h1 className="text-5xl font-extrabold text-gray-900 mb-14 text-center tracking-tight">
              About <span className="text-blue-600">Us</span>
            </h1>

            {/* Vision Section */}
            <div className="mb-14 border-b pb-10">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Vision</h2>
              <p className="text-gray-600 leading-8 text-lg">
                We envision a future where every structure is built with
                <span className="text-blue-600 font-semibold"> innovation, sustainability,</span> and excellence.
                Our goal is to lead the construction industry by transforming ideas into reality, setting new standards
                in <span className="font-semibold">quality</span> and <span className="font-semibold">reliability</span>.
              </p>
            </div>

            {/* Mission Section */}
            <div className="mb-14 border-b pb-10">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-8 text-lg">
                Our mission is to deliver exceptional construction services that exceed client expectations.
                We leverage <span className="text-blue-600 font-semibold">cutting-edge technology</span>, sustainable
                practices, and a customer-centric approach to build spaces that inspire and endure.
              </p>
            </div>

            {/* Our Team Section with Alternating Layout */}
            <div className="mb-14">
              <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Meet Our Team</h2>

              <div className="flex flex-col gap-12">
                {teamMembers.map((team, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className={`flex flex-col md:flex-row items-center rounded-xl shadow-lg overflow-hidden bg-gray-50 border border-gray-200
                      ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Image */}
                    <div className="w-full md:w-1/2 h-80">
                      <img src={team.img} alt={team.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 p-8">
                      <h3 className="text-3xl font-bold text-gray-900">{team.name}</h3>
                      <p className="text-lg text-blue-600 font-medium">{team.role}</p>
                      <p className="text-gray-600 mt-4 leading-7">{team.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-14">
              <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Frequently Asked Questions</h2>

              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="border-b border-gray-300 py-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="text-2xl font-medium text-gray-900">{faq.question}</h3>
                      <motion.span
                        className="text-blue-600 text-3xl"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                      >
                        {openIndex === index ? '-' : '+'}
                      </motion.span>
                    </div>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 text-gray-700"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="text-center mt-16">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/contact"
                  className="inline-block bg-blue-600 text-white text-lg font-bold py-4 px-12 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
