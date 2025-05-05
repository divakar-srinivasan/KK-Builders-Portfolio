import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/nav";
import Home from "./components/child-components/home";
import About from "./components/child-components/about";
import Project from "./components/child-components/project";
import Contact from "./components/child-components/contact";
import Footer from "./components/footer";
import Architect from "./components/child-components/architect";
import Blog from "./components/child-components/blog";
import Intro from "./components/intro";

function App() {
  const [showIntro, setShowIntro] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem("introPlayed");
    if (!alreadyPlayed) {
      setShowIntro(true);
      setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem("introPlayed", "true");
        navigate("/"); 
      }, 5000); 
    }
  }, [navigate]);

  if (showIntro && location.pathname === "/") {
    return <Intro />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/architect" element={<Architect />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
