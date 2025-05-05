import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/");
  };

  // Handle scroll effect for desktop
  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) {
        const scrollY = window.scrollY;
        // Consider 300px scroll as "fully scrolled" for the effect
        const percentage = Math.min((scrollY / 300) * 100, 100);
        setScrollPercentage(percentage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Reset scroll percentage when switching to mobile
      if (window.innerWidth < 768) setScrollPercentage(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const navItems = [
    { name: "Projects", path: "/home/projects" },
    { name: "Blogs", path: "/home/blogs" }
    // Removed "Add Project" button here
  ];

  // Calculate background style
  const getNavStyle = () => {
    if (isMobile) {
      return { backgroundColor: 'rgb(30, 58, 138)' }; // Dark blue for mobile (bg-blue-900)
    }
    return {
      backgroundColor: `rgba(0,0,0, ${0.1 + (scrollPercentage / 100) * 0.9})`,
      backdropFilter: 'blur(8px)'
    };
  };

  return (
    <nav
      style={getNavStyle()}
      className="fixed top-0 left-0 w-full px-6 py-4 z-50 flex justify-between items-center transition-all duration-300 ease-in-out shadow-lg"
    >
      {/* Logo and Menu Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleMenu}
          className="md:hidden text-3xl text-white transition-transform duration-300 ease-in-out hover:scale-110 focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <img
          src={logo}
          alt="Logo"
          className="h-14 object-contain transition-all duration-300 ease-in-out hover:scale-105"
        />
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex space-x-8 text-lg font-medium">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="relative text-white transition-all duration-300 ease-in-out 
                         hover:text-transparent bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text 
                         group"
            >
              {item.name}
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-sky-500 to-blue-800 
                               transition-all duration-500 ease-in-out group-hover:w-full shadow-md 
                               group-hover:shadow-blue-500/50"
              ></span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button - Desktop Only */}
      <div className="hidden md:block">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold 
          hover:bg-red-700 transition-transform transform hover:scale-105"
        >
          🔒 Logout
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed inset-y-0 left-0 w-2/3 bg-blue-900 p-6 transform transition-transform duration-500 ease-in-out
          ${menuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}
      >
        <ul className="flex flex-col space-y-6">
          {navItems.map((item, index) => (
            <li key={index} className="border-b border-blue-800 last:border-none pb-2">
              <Link
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="relative text-white text-lg font-medium transition-all duration-300 ease-in-out 
                           hover:text-transparent bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text 
                           group block"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-sky-500 to-blue-800 
                                 transition-all duration-500 ease-in-out group-hover:w-full shadow-md 
                                 group-hover:shadow-blue-500/50"
                ></span>
              </Link>
            </li>
          ))}
          {/* Logout Button in Mobile Menu */}
          <li className="pt-4">
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg text-lg font-semibold 
              hover:bg-red-700 transition-transform transform hover:scale-105"
            >
              🔒 Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
