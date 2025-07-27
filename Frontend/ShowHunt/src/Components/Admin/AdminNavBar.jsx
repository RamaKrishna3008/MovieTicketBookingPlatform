import React from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import ViewAllUsers from './ViewAllUsers';
import ViewAllTheatreOwners from './ViewAllTheatreOwners';
import AddTheatreOwner from './AddTheatreOwner';
import ViewAllMovies from './ViewAllMovies';
import AddMovie from './AddMovie';
import "./AdminNavBar.css"
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import UpdateTheatreOwner from './UpdateTheatreOwner.jsx';


export default function AdminNavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <div className="admin-navbar">
        <Link to="/adminhome" className="nav-link">Home</Link>
        <Link to="/viewallusers" className="nav-link">View All Users</Link>
        <Link to="/addtheatreowner" className="nav-link">Add Theatre Owner</Link>
        <Link to="/viewallowners" className="nav-link">View All Owners</Link>
        <Link to="/addmovie" className="nav-link">Add Movie</Link>
        <Link to="/viewallmovies" className="nav-link">View All Movies</Link>
        <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <Routes>
        <Route path='/adminhome' element={<AdminHome />} />
        <Route path='/viewallusers' element={<ViewAllUsers />} />
        <Route path='/viewallowners' element={<ViewAllTheatreOwners />} />
        <Route path='/addtheatreowner' element={<AddTheatreOwner />} />
        <Route path='/addmovie' element={<AddMovie />} />
        <Route path='/viewallmovies' element={<ViewAllMovies />} />
        <Route path="/admin/update/:id" element={<UpdateTheatreOwner />} />
      </Routes>
    </div>
  );
}
