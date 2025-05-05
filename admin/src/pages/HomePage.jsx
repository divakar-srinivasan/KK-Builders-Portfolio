import ProjectDisplay from './projectPages/displayProject';
import Nav from '../pages/nav'; 
import { Outlet } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-home min-h-screen">
      <Nav />
      <div className="container mx-auto mt-10 px-6">
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
