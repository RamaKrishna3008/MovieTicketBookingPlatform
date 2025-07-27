import { useState, useEffect } from 'react';
import {
  User,
  LogIn,
  Calendar,
  MapPin,
  Ticket,
  CreditCard,
  Film,
} from 'lucide-react';

import { Route, Routes, Link} from 'react-router-dom';
import "./HomeNavBar.css"
import Login from './Login';
import Registration from './Registration';

function HomeNavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Calendar size={24} />,
      title: "Easy Booking",
      description: "Book your tickets in just a few clicks with our user-friendly interface"
    },
    {
      icon: <MapPin size={24} />,
      title: "Multiple Locations",
      description: "Find theaters near you with our extensive network of cinema partners"
    },
    {
      icon: <CreditCard size={24} />,
      title: "Secure Payment",
      description: "Safe and secure payment processing with multiple payment options"
    }
  ];

  return (
    <div className="App">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href='/' className='logo'style={{ textDecoration: 'none' }}>
            <Film/>
            <span >ShowHunt</span>
          </a>


          <div className="auth-buttons">
            <Link to="/login" className="btn btn-outline">
              <LogIn size={18} />
              Login
            </Link>
            <a href="/register" className="btn btn-primary">
              <User size={18} />
              Register
            </a>
          </div>
        </div>
      </nav>

      
      <Routes>
        <Route path='/' element={
          <>
            <section className="hero" id="home">
              <div className="hero-content">
                <h1>Book Your Movie Experience</h1>
                <p>
                  Discover the latest movies, find showtimes, and book tickets instantly.
                  Your perfect movie night is just a click away.
                </p>
                <div className="hero-buttons">
                  <a href="/login" className="btn btn-primary btn-large">
                    <Ticket size={20} />
                    Book Now
                  </a>
                  <a href="/login" className="btn btn-outline btn-large">
                    <MapPin size={20} />
                    Find Movies
                  </a>
                </div>
              </div>
            </section>

            <section className="features-section">
              <div className="container">
                <h2 className="section-title">Why Choose ShowHunt?</h2>
                <div className="features-grid">
                  {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                      <div className="feature-icon">
                        {feature.icon}
                      </div>
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-description">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
      </Routes>

      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-bottom">
            <p>&copy; 2025 ShowHunt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeNavBar;