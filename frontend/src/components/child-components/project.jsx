import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // Add Framer Motion
import bg1 from "../../assets/bg-3.jpg";

const Project = () => {

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // New State
  const [error, setError] = useState("");
  const [projectType, setProjectType] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/admin/get`);
        const projectDataWithImages = response.data.map((project) => {
          const base64Image = btoa(
            new Uint8Array(project.image.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          return { ...project, base64Image };
        });

        setProjects(projectDataWithImages);
        setFilteredProjects(projectDataWithImages);
      } catch (error) {
        setError("Error fetching the project details");
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectTypeChange = (type) => {
    setProjectType(type);

    if (type === "") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) => project.projectType === type);
      setFilteredProjects(filtered);
    }
  };

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
          Our Projects
        </h1>

        {/* Navigation Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["", "Prestigious", "Ongoing", "Completed", "Upcoming"].map((type) => (
            <button
              key={type}
              onClick={() => handleProjectTypeChange(type)}
              className={`px-5 py-2 rounded-full text-sm md:text-base font-semibold border backdrop-blur-md ${
                projectType === type
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-white/20 text-white hover:bg-white/30"
              } transition-all duration-300`}
            >
              {type === "" ? "All Projects" : `${type} Projects`}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 w-full max-w-7xl px-6">
          {error && <p className="text-red-500 text-center col-span-full">{error}</p>}

          {filteredProjects.length > 0 ? (
            filteredProjects.map((projectData, index) => (
              <motion.div
                key={projectData._id}
                className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fadeInUp relative"
                style={{ animationDelay: `${index * 0.1}s` }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedProject(projectData)}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 opacity-25 animate-continuous-shimmer"></div>

                <img
                  src={`data:image/jpeg;base64,${projectData.base64Image}`}
                  alt={projectData.projectName}
                  className="w-full h-60 object-cover rounded-t-2xl"
                />
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-white tracking-wide">{projectData.projectName}</h3>
                  <p className="text-white text-base line-clamp-4 leading-relaxed">
                    {projectData.description}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-red-600 text-3xl text-center col-span-full py-10">No projects found</p>
          )}
        </div>
      </div>

      {/* Selected Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-3xl flex flex-col items-center relative text-white overflow-hidden group"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Liquid Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-transparent to-blue-600/40 animate-pulse opacity-30"></div>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white hover:text-red-500 text-3xl font-bold"
                onClick={() => setSelectedProject(null)}
              >
                &times;
              </button>

              {/* Project Image */}
              <img
                src={`data:image/jpeg;base64,${selectedProject.base64Image}`}
                alt={selectedProject.projectName}
                className="w-full h-72 object-cover rounded-2xl mb-6 shadow-lg"
              />

              {/* Project Type */}
              <h4 className="text-3xl font-bold mb-2 tracking-wide text-blue-400">
                {selectedProject.projectType}
              </h4>

              {/* Project Description */}
              <p className="text-white/90 text-lg text-center leading-relaxed">
                {selectedProject.description}
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

export default Project;
