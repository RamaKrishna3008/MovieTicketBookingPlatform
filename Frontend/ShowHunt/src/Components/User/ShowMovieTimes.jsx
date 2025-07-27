import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../Config';
import DateTimings from './DateTimings';
import './ShowMovieTimes.css';

export default function MovieTimings() {
  const { id } = useParams(); 
  const [timings, setTimings] = useState([]);
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const response = await axios.get(`${config.url}/user/movie/timings/${id}`);
        setTimings(response.data.timings); 
        setMovieData(response.data.movieData); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimings();
  }, [id]);

  const handleTimeSelect = (date, time, timeObj) => {
    console.log(`Selected: ${date} at ${time}`, timeObj);
   
  };

  const handleDateSelect = (dateIndex) => {
    setSelectedDateIndex(dateIndex);
  };

  // Helper function to format duration
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  // Helper function to format date for button display
  const formatDateForButton = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };
    
    let formattedDate = date.toLocaleDateString('en-US', options);
    
    if (date.toDateString() === today.toDateString()) {
      return { label: 'Today', date: formattedDate };
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return { label: 'Tomorrow', date: formattedDate };
    }
    
    return { label: formattedDate, date: '' };
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-text">Loading movie details...</div>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-text">Error: {error.message}</div>
    </div>
  );

  if (!movieData) return (
    <div className="error-container">
      <div className="loading-text">No movie data available</div>
    </div>
  );

  return (
    <div className="movie-timings-container">
      {/* Backdrop Section */}
      <div className="backdrop-section">
        <div 
          className="backdrop-image"
          style={{
            backgroundImage: `url(${movieData.movieposter})`,
          }}
        ></div>
        <div className="backdrop-overlay"></div>

        <div className="movie-info-overlay">
          <div className="movie-content-wrapper">
            {/* Movie Poster */}
            <div>
              <img 
                src={movieData.movieposter} 
                alt={movieData.name}
                className="movie-poster-timings"
              />
            </div>

            {/* Movie Details */}
            <div className="movie-details">
              <h1 className="movie-title">{movieData.name}</h1>
              
              <div className="movie-meta">
                <span className="genre-badge">{movieData.genre}</span>
                <span className="meta-item">{formatDuration(movieData.duration)}</span>
                <span className="meta-item">{movieData.language}</span>
              </div>
              
              <p className="movie-description">
                {movieData.description}
              </p>
              
              <div className="movie-info">
                <div className="info-row">
                  <span className="info-label">Cast: &nbsp;
                  <span className="info-value">{movieData.cast}</span>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Release Date:&nbsp;
                  <span className="info-value">{movieData.releasedate}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timings Section */}
      <div className="timings-section">
        <h3 className="timings-title-movie">Show Timings</h3>
        
        {timings.length === 0 ? (
          <div className="no-timings">
            No show timings available at the moment.
          </div>
        ) : (
          <>
            <div className="date-selector">
              {timings.map((dateEntry, dateIndex) => {
                const dateInfo = formatDateForButton(dateEntry.date);
                return (
                  <button
                    key={dateIndex}
                    className={`date-button ${selectedDateIndex === dateIndex ? 'active' : ''}`}
                    onClick={() => handleDateSelect(dateIndex)}
                  >
                    <span className="date-label">{dateInfo.label}</span>
                    {dateInfo.date && <span className="date-detail">{dateInfo.date}</span>}
                  </button>
                );
              })}
            </div>

            {/* Selected Date Timings */}
            <div className="selected-date-timings">
              {timings[selectedDateIndex] && (
                <DateTimings 
                  key={selectedDateIndex}
                  dateEntry={timings[selectedDateIndex]}
                  onTimeSelect={handleTimeSelect}
                  hideDate={true}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}