import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'; 
import TheatreOwnerHome from './TheatreOwnerHome';
import AddScreen from './AddScreen';
import ViewAllScreens from './ViewAllScreens';
import MapMovieToScreen from './MapMovieToScreen';
import ViewAllMappings from './ViewAllMappings';
import './TheatreOwnerNavBar.css'; // Import CSS file
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

export default function TheatreOwnerNavBar() {
   const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="theatre-owner-container">
      <nav className="owner-navbar">
        <div className="navbar-brand">
        </div>
        <div className="navbar-links">
          <Link to="/theatreownerhome" className="nav-link">
            Home
          </Link>
          <Link to="/addscreen" className="nav-link">
            Add Screen
          </Link>
          <Link to="/viewallscreens" className="nav-link">
            View All Screens
          </Link>
          <Link to="/mapmovietoscreen" className="nav-link">
            Map Movie to Screen
          </Link>
          <Link to="/viewallmappings" className="nav-link">
            View All Mappings
          </Link>
          <button className='nav-link' onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path='/theatreownerhome' element={<TheatreOwnerHome/>} />
          <Route path='/addscreen' element={<AddScreen/>}/>
          <Route path='/viewallscreens' element={<ViewAllScreens/>}/>
          <Route path='/mapmovietoscreen' element={<MapMovieToScreen/>}/>
          <Route path='/viewallmappings' element={<ViewAllMappings/>}/>
        </Routes>
      </main>
    </div>
  )
}