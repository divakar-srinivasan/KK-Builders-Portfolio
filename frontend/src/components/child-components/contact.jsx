import React, { useState } from 'react';
import img1 from '../../assets/1.jpg';
import { motion } from 'framer-motion';
import axios from 'axios';  // Import Axios

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    constructionType: '',
    projectSize: '',
    budget: '',
    timeline: '',
    additionalQueries: '',
    howDidYouHearAboutUs: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Make POST request to the backend API
      const response = await axios.post('http://localhost:5000/api/contact/send-email', formData);

      if (response.status === 200) {
        setSuccess(true);
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({});
      }
    } catch (err) {
      console.error('Error sending email:', err);
      setError('There was an error sending your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${img1})` }}
    >
      <div className="min-h-screen bg-black/80 flex justify-center items-center py-12 px-6 lg:px-20">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-white/95 rounded-lg shadow-2xl w-full max-w-4xl p-10 md:p-16"
        >

          {/* Header */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-extrabold text-gray-900 mb-8 text-center tracking-tight"
          >
            Contact <span className="text-blue-600">Us</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-600 text-lg mb-10 text-center leading-relaxed"
          >
            Have questions or need a quote? Fill out the form below and we'll get back to you shortly.
          </motion.p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Form Fields */}
            {[
              { id: "name", label: "Full Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
              { id: "phone", label: "Phone Number", type: "tel" },
              { id: "location", label: "Location", type: "text" },
              { id: "projectSize", label: "Project Size (sq. ft.)", type: "number" },
              { id: "budget", label: "Budget", type: "text" },
              { id: "timeline", label: "Timeline", type: "text" }
            ].map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 transform hover:scale-105"
                  required
                />
              </motion.div>
            ))}

            {/* Construction Type */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label htmlFor="constructionType" className="block text-sm font-medium text-gray-700">Construction Type</label>
              <select
                id="constructionType"
                name="constructionType"
                value={formData.constructionType}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 transform hover:scale-105"
                required
              >
                <option value="">Select</option>
                <option value="New Construction">New Construction</option>
                <option value="Renovation">Renovation</option>
                <option value="Custom Home">Custom Home</option>
                <option value="Multi-Family Housing">Multi-Family Housing</option>
              </select>
            </motion.div>

            {/* Additional Queries */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="md:col-span-2"
            >
              <label htmlFor="additionalQueries" className="block text-sm font-medium text-gray-700">Additional Queries</label>
              <textarea
                id="additionalQueries"
                name="additionalQueries"
                value={formData.additionalQueries}
                onChange={handleChange}
                rows="4"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 transform hover:scale-105"
              />
            </motion.div>

            {/* How Did You Hear About Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="md:col-span-2"
            >
              <label htmlFor="howDidYouHearAboutUs" className="block text-sm font-medium text-gray-700">How Did You Hear About Us?</label>
              <select
                id="howDidYouHearAboutUs"
                name="howDidYouHearAboutUs"
                value={formData.howDidYouHearAboutUs}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 transform hover:scale-105"
                required
              >
                <option value="">Select</option>
                <option value="Google">Google</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Other">Other</option>
              </select>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="md:col-span-2"
            >
              <button
                type="submit"
                className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white py-3 px-6 rounded-md shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105`}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </motion.div>
          </form>

          {/* Error/Sucess message */}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          {success && <p className="text-green-500 mt-4 text-center">Message sent successfully!</p>}

        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
