import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import bg1 from "../../assets/bg-3.jpg";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blog/get");
        const blogDataWithImages = response.data.map((blog) => {
          const base64Image = btoa(
            new Uint8Array(blog.image.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          return { ...blog, base64Image };
        });

        setBlogs(blogDataWithImages);
        setFilteredBlogs(blogDataWithImages);
      } catch (error) {
        setError("Error fetching blog details");
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const sortedBlogs = [...blogs];
    if (sortOrder === "newest") {
      sortedBlogs.sort((a, b) => new Date(b.date_published) - new Date(a.date_published));
    } else {
      sortedBlogs.sort((a, b) => new Date(a.date_published) - new Date(b.date_published));
    }
    setFilteredBlogs(sortedBlogs);
  }, [sortOrder, blogs]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-5 py-16">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-10 drop-shadow-lg animate-fadeInDown">
          Our Blogs
        </h1>

        {/* Filter Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setSortOrder("newest")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              sortOrder === "newest"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setSortOrder("oldest")}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              sortOrder === "oldest"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Old
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 w-full max-w-7xl px-6">
          {error && <p className="text-red-500 text-center col-span-full">{error}</p>}

          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fadeInUp relative"
                style={{ animationDelay: `${index * 0.1}s` }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedBlog(blog)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 opacity-25 animate-continuous-shimmer"></div>

                <img
                  src={`data:image/jpeg;base64,${blog.base64Image}`}
                  alt={blog.title}
                  className="w-full h-60 object-cover rounded-t-2xl"
                />
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-bold text-white tracking-wide">{blog.title}</h3>
                  <p className="text-white/80 text-sm italic">By {blog.author}</p>
                  <p className="text-white text-base line-clamp-4 leading-relaxed">
                    {blog.content}
                  </p>
                  <p className="text-sm text-white/70">
                    Published on: {new Date(blog.date_published).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-red-600 text-3xl text-center col-span-full py-10">No blogs found</p>
          )}
        </div>
      </div>

      {/* Selected Blog Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-3xl flex flex-col items-center relative text-white overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-transparent to-blue-600/40 animate-pulse opacity-30"></div>

              <button
                className="absolute top-4 right-4 text-white hover:text-red-500 text-3xl font-bold"
                onClick={() => setSelectedBlog(null)}
              >
                &times;
              </button>

              <img
                src={`data:image/jpeg;base64,${selectedBlog.base64Image}`}
                alt={selectedBlog.title}
                className="w-full h-72 object-cover rounded-2xl mb-6 shadow-lg"
              />

              <h4 className="text-3xl font-bold mb-2 tracking-wide text-blue-400">
                {selectedBlog.title}
              </h4>
              <p className="text-white/80 italic mb-4">By {selectedBlog.author}</p>
              <p className="text-white/90 text-lg text-center leading-relaxed">
                {selectedBlog.content}
              </p>
              <p className="text-sm text-white/70 mt-4">
                Published on: {new Date(selectedBlog.date_published).toLocaleDateString()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animations */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes continuous-shimmer {
          0% {
            background-position: -200% 0;
          }
          50% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-continuous-shimmer {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 75%);
          background-size: 200% 100%;
          animation: continuous-shimmer 4s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Blog;
