import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import config from '../../Config';
import './MapMovieToScreen.css'; // Import CSS file
import { useNavigate } from 'react-router-dom';

export default function MapMovieToScreen() {
  const [movies, setMovies] = useState([]);
  const navigate=useNavigate();
  const [screens, setScreens] = useState([]);
  const theatreownerid = useSelector((state) => state.auth.userDetails.id);
  const [formData, setFormData] = useState({
    movieid: '',
    theatreid:'',
    showtime:'',
    fromdate:'',
    expirydate:'',
    executiveprice: '',
    normalprice: ''
  });
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {

    axios.get(`${config.url}/theatreowner/viewallmovies`)
      .then(res => {
        setMovies(res.data);
      })
      .catch(() => {
        alert("Movies not found");
      });

    axios.get(`${config.url}/theatreowner/viewallscreens/${theatreownerid}`)
      .then(res => {
        setScreens(res.data);
      })
      .catch(() => {
        alert("Screens not found");
      });
  }, [theatreownerid]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(`${config.url}/theatreowner/mapmovietoscreen`,formData);

      if (response.status === 200) {
        navigate("/theatreownerhome");
      }
    } catch (error) {
      console.error('Error adding screen:', error);
      alert('Failed to add screen. Please try again.');
    }
  };


  return (
    <div className="map-movie-container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="movie-form">
          <h3 className="form-title">Map Movie to Screen</h3>
          
          <div className="form-group-map">
            <span htmlFor="movieid" className="form-label-map">Select Movie Name</span>
            <select id="movieid" value={formData.movieid} onChange={handleChange} className="form-select" required>
              <option value=''>--Select Movie--</option>
              {
                movies.map(movie=>
                  <option key={movie.id} value={movie.id}>{movie.name}</option>
                )
              }
            </select>
          </div>

          <div className="form-group-map">
            <span htmlFor="theatreid" className="form-label-map">Select Screen</span>
            <select id="theatreid" value={formData.theatreid} onChange={handleChange} className="form-select" required>
              <option value=''>--Select Screen--</option>
              {
                screens.map(screen=>
                  <option key={screen.id} value={screen.id}>{screen.name}</option>
                )
              }
            </select>
          </div>

          <div className="form-group-map">
            <span htmlFor="showtime" className="form-label-map">Show Time (24 hrs)</span>
            <input 
              type='time' 
              id="showtime" 
              required 
              value={formData.showtime} 
              onChange={handleChange}
              className="form-input-map"
              placeholder="e.g., 14:30"
            />
          </div>
               <div className="form-group-map">
            <span htmlFor="fromdate" className="form-label-map">From Date</span>
            <input 
              type='date' 
              id="fromdate" 
              required 
              min={today}
              value={formData.fromdate} 
              onChange={handleChange}
              className="form-input-map"
            />
          </div>
          <div className="form-group-map">
            <span htmlFor="expirydate" className="form-label-map">Expiry Date</span>
            <input 
              type='date' 
              id="expirydate" 
              required 
              min={formData.fromdate}
              value={formData.expirydate} 
              onChange={handleChange}
              className="form-input-map"
              disabled={!formData.fromdate}
            />
          </div>

          <div className="form-row">
            <div className="form-group-map">
              <span htmlFor="executiveprice" className="form-label-map">Executive Seat Price</span>
              <input 
                type='number' 
                id="executiveprice" 
                required 
                value={formData.executiveprice} 
                onChange={handleChange}
                className="form-input-map"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group-map">
              <span htmlFor="normalprice" className="form-label-map">Normal Seat Price</span>
              <input 
                type='number' 
                id="normalprice" 
                required  
                value={formData.normalprice} 
                onChange={handleChange}
                className="form-input-map"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Map Movie to Screen
          </button>
        </form>
      </div>
    </div>
  );
}