import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import UserHome from './UserHome';
import './UserNavBar.css'
import {ChevronDown, Edit, Film, LogOut, ShoppingBag, User} from 'lucide-react';
import MovieTimings from './ShowMovieTimes';
import SeatSelection from './SeatSelection';
import CustomerCareBot from './CustomerCareBot';
import viewAllBookings from './viewAllBookings';
import ViewAllBookings from './viewAllBookings';
import ProfileUpdate from './ProfileUpdate';

export default function UserNavBar() {

  
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
   const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout clicked'); 
    setShowUserMenu(false);
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const handleOrdersClick = () => {
    navigate('/user/orders');
    setShowUserMenu(false);
  };

  const handleEditProfileClick = () => {
    navigate('/updateprofile');
    setShowUserMenu(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="user-container">
      <nav className="user-navbar">
        <div className="navbar-brand">
           <Link to="/userhome"className='home-showhunt'>
           <Film/>&nbsp;
            <span >ShowHunt</span>
            </Link>
        </div>
        <div className="navbar-links">
          <Link to="/support">
          <button className="professional-support-button">Need Help? Contact Support</button>
          </Link>
          
           <div className="user-menu-container">
          <button 
            className="user-menu-button"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <User size={20} />
            <span className="user-name">{userDetails.name || 'User'}</span>
            <ChevronDown 
              size={16} 
              className={`chevron ${showUserMenu ? 'rotated' : ''}`}
            />
          </button>
          
          {showUserMenu && (
            <div className="user-dropdown-menu">
              <div className="user-info">
                <div className="user-avatar">
                  <User size={24} />
                </div>
                <div className="user-details">
                  <p className="user-name-dropdown">{userDetails.name || 'User'}</p>
                  <p className="user-email">{userDetails.email}</p>
                </div>
              </div>
              
              <div className="menu-divider"></div>
              
              <button className="menu-item" onClick={handleOrdersClick}>
                <ShoppingBag size={18} />
                <span>My Orders</span>
              </button>
              
              <button className="menu-item" onClick={handleEditProfileClick}>
                <Edit size={18} />
                <span>Edit Profile</span>
              </button>
              
              <div className="menu-divider"></div>
              
              <button className="menu-item logout-item" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/userhome" replace />} />
          <Route path="*" element={<Navigate to="/userhome" replace />} />
          <Route path="/user/movie/:id/timings" element={<MovieTimings />} />
          <Route path='/movie/seats/' element={<SeatSelection/>}/>
          <Route path='/userhome' element={<UserHome/>} />
          <Route path="/support" element={<CustomerCareBot />} />
          <Route path='/user/orders' element={<ViewAllBookings/>}/>
          <Route path='/updateprofile' element={<ProfileUpdate/>}/>
        </Routes>
      </main>
    </div>
  )
}
