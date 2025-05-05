import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
import AddProject from './pages/projectPages/addProject';
import ProjectDisplay from './pages/projectPages/displayProject';
import DisplayBlog from './pages/blogPages/displayBlog';
import AddBlog from './pages/blogPages/addBlog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>}>
        <Route index element={<ProjectDisplay />} />
          <Route path="projects" element={<ProjectDisplay />} />
          <Route path="projects/addProject" element={<AddProject />} />
          <Route path="blogs" element={<DisplayBlog />} />
          <Route path="blogs/addBlog" element={<AddBlog />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App
