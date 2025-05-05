import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { motion } from "framer-motion";


const AddProject = () => {

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState(""); // New state
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const submitButtonRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || !description || !projectType) {
      setMessage({ text: "⚠️ Please fill all fields including project type.", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("description", description);
    formData.append("projectType", projectType); // Include project type

    try {
      await axios.post(`${BASE_URL}/api/admin/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ text: "✅ Project created successfully!", type: "success" });
      setSelectedFile(null);
      setDescription("");
      setProjectType("");
      setImagePreview(null);
    } catch (error) {
      setMessage({ text: "❌ Failed to create project", type: "error" });
      console.error(error);
    }
  };

  return (
    <motion.div
      className="bg-add min-h-screen flex justify-center items-center p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-color shadow-xl rounded-2xl p-8 w-full max-w-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.h1
          className="text-2xl font-bold text-black mb-6 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          Add Project
        </motion.h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Dropzone for Image Upload */}
          <motion.div
            {...getRootProps({
              className: `border-2 border-dashed p-6 rounded-xl text-center cursor-pointer ${
                isDragActive ? "border-blue-600 bg-blue-200" : "border-gray-600"
              }`,
            })}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
            aria-label="Upload Project Image"
          >
            <input {...getInputProps()} />
            <p className="text-gray-800 text-lg">
              {isDragActive ? "📂 Drop the image here..." : "Drag & drop an image or click to upload"}
            </p>
            {imagePreview && (
              <motion.img
                src={imagePreview}
                alt="Preview"
                className="mt-4 rounded-lg w-full h-48 object-cover shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.div>

          {selectedFile && (
            <motion.p
              className="text-sm text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              📁 Selected: {selectedFile.name}
            </motion.p>
          )}

          {/* Description Field */}
          <motion.textarea
            name="description"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="border border-gray-700 rounded-md p-3 w-full focus:ring focus:ring-blue-400 shadow-sm"
            ref={inputRef}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          />

          {/* Project Type Dropdown */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <label htmlFor="projectType" className="block mb-2 text-gray-900 font-semibold">
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full border border-gray-700 rounded-md p-3 focus:ring focus:ring-blue-400 shadow-sm"
            >
              <option value="">Select a project type</option>
              <option value="Prestigious">Prestigious Project</option>
              <option value="Ongoing">Ongoing Project</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              ref={cancelButtonRef}
            >
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              ref={submitButtonRef}
            >
              Add Project
            </motion.button>
          </motion.div>

          {/* Message Display */}
          {message.text && (
            <motion.p
              className={`text-center mt-4 font-medium ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {message.text}
            </motion.p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddProject;
