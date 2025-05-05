// DisplayBlog.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Typing animation hook
const useTypingEffect = (text, typingSpeed = 100, erasingSpeed = 50, delay = 1000) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer;
    if (isTyping) {
      if (index < text.length) {
        timer = setTimeout(() => {
          setDisplayText(text.substring(0, index + 1));
          setIndex(index + 1);
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsTyping(false);
        }, delay);
      }
    } else {
      if (index > 0) {
        timer = setTimeout(() => {
          setDisplayText(text.substring(0, index - 1));
          setIndex(index - 1);
        }, erasingSpeed);
      } else {
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timer);
  }, [index, isTyping, text, typingSpeed, erasingSpeed, delay]);

  return displayText;
};

const DisplayBlog = () => {

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [blogIdToDelete, setBlogIdToDelete] = useState(null);

  const [editFields, setEditFields] = useState({
    title: "",
    author: "",
    date_published: "",
    content: "",
    image: null,
  });

  const navigate = useNavigate();
  const loadingText = useTypingEffect("Loading blog details...", 100, 50, 1000);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/blog/get`);
        const blogDataWithImages = response.data.map((blog) => {
          const base64Image = btoa(
            new Uint8Array(blog.image.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
          );
          return { ...blog, base64Image };
        });
        setBlogs(blogDataWithImages);
      } catch (error) {
        console.error("Error fetching the blogs:", error);
        setError("Error fetching the blogs.");
      }
    };
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setEditFields({
      title: blog.title,
      author: blog.author,
      date_published: blog.date_published.split("T")[0],
      content: blog.content,
      image: null,
    });
  };

  const handleUpdate = async () => {
    if (!editingBlog) return;

    const formData = new FormData();
    formData.append("title", editFields.title);
    formData.append("author", editFields.author);
    formData.append("date_published", editFields.date_published);
    formData.append("content", editFields.content);
    if (editFields.image) {
      formData.append("image", editFields.image);
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/api/blog/update/${editingBlog._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === editingBlog._id
            ? {
                ...response.data.blog,
                base64Image: editFields.image ? URL.createObjectURL(editFields.image) : blog.base64Image,
              }
            : blog
        )
      );

      setEditingBlog(null);
    } catch (error) {
      console.error("Error updating blog:", error);
      setError("Failed to update the blog.");
    }
  };

  const handleDelete = (blogId) => {
    setBlogIdToDelete(blogId);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/blog/delete/${blogIdToDelete}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogIdToDelete));
      setShowConfirmModal(false);
      setBlogIdToDelete(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
      setError("Failed to delete the blog.");
    }
  };

  return (
    <div className="py-20 px-6">
      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="flex justify-end mb-8">
        <button
          onClick={() => navigate("/home/blogs/addBlog")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          ➕ Add Blog
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer"
              
              initial={{ opacity: 0, y: "100vh" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={`data:image/jpeg;base64,${blog.base64Image}`}
                  onClick={() => setSelectedBlog(blog)}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 truncate">{blog.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{blog.author}</p>
              </div>
              <div className="p-3 flex justify-center space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(blog);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(blog._id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  🗑️ Delete
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-2xl text-center text-red-600">{loadingText}</p>
        )}
      </div>

      {/* View Details Popup */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative shadow-lg">
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-3 right-4 text-red-600 text-3xl hover:text-4xl"
              >
                ×
              </button>
              <img
                src={`data:image/jpeg;base64,${selectedBlog.base64Image}`}
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedBlog.title}</h2>
              <p className="text-gray-600 mb-1">
                <strong>Author:</strong> {selectedBlog.author}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Published:</strong> {new Date(selectedBlog.date_published).toLocaleDateString()}
              </p>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedBlog.content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingBlog && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-lg">
              <button
                onClick={() => setEditingBlog(null)}
                className="absolute top-3 right-4 text-2xl text-gray-600"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
              <label className="block mb-2 text-sm font-semibold">Title</label>
              <input
                type="text"
                value={editFields.title}
                onChange={(e) => setEditFields({ ...editFields, title: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
              <label className="block mb-2 text-sm font-semibold">Author</label>
              <input
                type="text"
                value={editFields.author}
                onChange={(e) => setEditFields({ ...editFields, author: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
              <label className="block mb-2 text-sm font-semibold">Date Published</label>
              <input
                type="date"
                value={editFields.date_published}
                onChange={(e) => setEditFields({ ...editFields, date_published: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
              <label className="block mb-2 text-sm font-semibold">Content</label>
              <textarea
                value={editFields.content}
                onChange={(e) => setEditFields({ ...editFields, content: e.target.value })}
                rows="4"
                className="w-full mb-4 p-2 border rounded"
              />
              <label className="block mb-2 text-sm font-semibold">Image</label>
              <input
                type="file"
                onChange={(e) => setEditFields({ ...editFields, image: e.target.files[0] })}
                className="mb-4"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleUpdate}
                  className="w-[48%] bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingBlog(null)}
                  className="w-[48%] bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
              <h3 className="text-xl font-bold mb-4">Are you sure?</h3>
              <p className="text-gray-600 mb-6">This action cannot be undone.</p>
              <div className="flex justify-between">
                <button
                  onClick={confirmDelete}
                  className="w-[48%] bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="w-[48%] bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DisplayBlog;
