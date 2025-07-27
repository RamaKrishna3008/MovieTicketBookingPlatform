import { useEffect, useState } from 'react';
import config from '../../Config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './UserHome.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function UserHome() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const userid = useSelector((state) => state.auth.userDetails.id);
  const userDetails = useSelector((state) => state.auth.userDetails);
  
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/user/movie/${movieId}/timings`);
  };


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${config.url}/user/home`);
        setMovies(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [userid]);

  if (loading) {
    return (
      <div className="user-home-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading Movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-home-container">
        <div className="error-state">
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="user-home-container">
        <div className="no-movies-state">
          <p>No Movies found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-home-container">
      <div className="user-home-header">
        <h2 className="movies-heading">
          Welcome, {userDetails.name || 'User'}!
        </h2>
        
        
      </div>
      
      <div className="movie-cards-wrapper">
        {movies.map(movie => (
          <div 
            key={movie.id} 
            className="movie-card-home"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={movie.movieposter}
              alt={movie.name}
              className="movie-poster-home"
              onError={(e) => {
                e.target.src = '/default-poster.jpg';
              }}
            />
            <div className="movie-info-home">
              <div className="movie-name">
                {movie.name}
              </div>
              <div className="movie-language">
                <span className="language-tag">{movie.language}</span>
                <span className="genre-tag">{movie.genre}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
