// Updated SeatSelection.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './SeatSelection.css';
import config from '../../Config';

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { mappingId, showTime, date } = location.state || {};
  const userEmail = useSelector((state) => state.auth.userDetails.email);

  const [seats, setSeats] = useState([]);
  const [movieData, setMovieData] = useState({
    name: '',
    movieposter: '',
    genre: '',
    duration: '',
    language: ''
  });
  const [screenName, setScreenName] = useState('');
  const [priceOfNormalSeat, setPriceOfNormalSeat] = useState(0);
  const [priceOfExeSeat, setPriceOfExeSeat] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBookingMap, setShowBookingMap] = useState(false);

  const handleSeatClick = (seat) => {
  if (seat.booked) return;

  const isSelected = selectedSeats.find(s => s.seatNumber === seat.seatNumber);
  
  if (isSelected) {
    setSelectedSeats(prev => prev.filter(s => s.seatNumber !== seat.seatNumber));
  } else {
    if (selectedSeats.length >= 6) {
      alert('You can select a maximum of 6 seats.');
      return;
    }
    setSelectedSeats(prev => [...prev, seat]);
  }
};


  const handlePayment = async () => {
    const amount = selectedSeats.reduce((total, seat) => {
      return total + (seat.seatNumber.includes('E') ? priceOfExeSeat : priceOfNormalSeat);
    }, 0);

    try {
      const response = await axios.post(`${config.url}/user/create-order`, {
        amount: amount * 100,
        seatNumbers: selectedSeats.map(seat => seat.seatNumber),
        mappingId,
        showTime,
        date,
        email: userEmail
        
      });

      const order = response.data;

      const options = {
        key: 'rzp_test_d3yeHrfHXiLZIN',
        amount: order.amount,
        currency: 'INR',
        name: movieData.name,
        description: 'Movie Ticket Booking',
        order_id: order.id,
        handler: async function (response) {
          await axios.post(`${config.url}/user/payment/confirm`, {
            razorpayOrderId: order.id,
            razorpayPaymentId: response.razorpay_payment_id
          });
          alert('Payment successful! Seats booked.');
          navigate('/userhome');
        },
        theme: {
          color: '#0b5ed7'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  useEffect(() => {
    if (!mappingId || !showTime) {
      navigate('/userhome');
      return;
    }

    const fetchSeatsData = async () => {
      try {
        const response = await axios.get(
          `${config.url}/user/movie/seats/${mappingId}/${showTime}/${date}`
        );
        setSeats(response.data.seats);
        
        setMovieData({
          name: response.data.movie.name || '',
          movieposter: response.data.movie.movieposter || '/default-poster.jpg',
          genre: response.data.movie.genre || 'N/A',
          duration: response.data.movie.duration || 'N/A',
          language: response.data.movie.language || 'N/A',
        });
        
        setScreenName(response.data.screen.name);
        setPriceOfNormalSeat(response.data.normalprices);
        setPriceOfExeSeat(response.data.executiveprice);
      } catch (error) {
        console.error('Error fetching seats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeatsData();
  }, [mappingId, showTime, navigate]);

  const renderSeats = () => {
    const executiveSeats = seats.filter(seat => seat.seatNumber.includes('E'));
    const normalSeats = seats.filter(seat => seat.seatNumber.includes('N'));

    return (
      <div className="seats-container">
        <div className="seat-legend">
          <div className="legend-item">
            <div className="legend-seat legend-available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-seat legend-executive"></div>
            <span>Executive</span>
          </div>
          <div className="legend-item">
            <div className="legend-seat legend-selected"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="legend-seat legend-booked"></div>
            <span>Booked</span>
          </div>
        </div>
        <div className="screen-container">
          <div className="screen"></div>
        </div>
        
        {executiveSeats.length > 0 && (
          <>
            <div className="section-label-seat">Executive - ₹{priceOfExeSeat}</div>
            <div className="seats-grid">
              {executiveSeats.map((seat) => (
                <div
                  key={seat.id}
                  className={`seat ${seat.booked ? 'booked' : selectedSeats.some(s => s.seatNumber === seat.seatNumber) ? 'selected' : 'executive available'}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  <span className="seat-label-seat">{seat.seatNumber}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {normalSeats.length > 0 && (
          <>
            <div className="section-divider"></div>
            <div className="section-label-seat">Normal - ₹{priceOfNormalSeat}</div>
            <div className="seats-grid">
              {normalSeats.map((seat) => (
                <div
                  key={seat.id}
                  className={`seat ${seat.booked ? 'booked' : selectedSeats.some(s => s.seatNumber === seat.seatNumber) ? 'selected' : 'normal available'}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  <span className="seat-label-seat">{seat.seatNumber}</span>
                </div>
              ))}
            </div>
          </>
        )}

        
      </div>
    );
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      return total + (seat.seatNumber.includes('E') ? priceOfExeSeat : priceOfNormalSeat);
    }, 0);
  };

  const BookingMap = () => (
    <div className="booking-map-overlay" onClick={() => setShowBookingMap(false)}>
      <div className="booking-map-container" onClick={(e) => e.stopPropagation()}>
        <div className="booking-map-header">
          <h2 className="booking-map-title">🎬 Booking Summary</h2>
          <button 
            className="booking-map-close" 
            onClick={() => setShowBookingMap(false)}
          >
            ✕
          </button>
        </div>
        
        <div className="booking-map-content">
          <div className="booking-movie-section">
            <img 
              src={movieData.movieposter} 
              alt={movieData.name}
              className="booking-map-poster"
              onError={(e) => {
                e.target.src = '/default-poster.jpg';
              }}
            />
            <div className="booking-movie-details">
              <h3 className="booking-movie-name">{movieData.name}</h3>
              <div className="booking-detail-row">
                <span className="booking-label">Screen Name:</span>
                <span className="booking-value">{screenName}</span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-label">Date:</span>
                <span className="booking-value">{formatDate(date)}</span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-label">Time:</span>
                <span className="booking-value">{formatTime(showTime)}</span>
              </div>
              {movieData.language !== 'N/A' && (
                <div className="booking-detail-row">
                  <span className="booking-label"> Language:</span>
                  <span className="booking-value">{movieData.language}</span>
                </div>
              )}
              {movieData.genre !== 'N/A' && (
                <div className="booking-detail-row">
                  <span className="booking-label"> Genre:</span>
                  <span className="booking-value">{movieData.genre}</span>
                </div>
              )}
            </div>
          </div>

          <div className="booking-seats-section">
            <h4 className="booking-section-title"> Selected Seats</h4>
            <div className="booking-seats-grid">
              {selectedSeats.map((seat, index) => (
                <div key={seat.id} className="booking-seat-card">
                  <div className="booking-seat-number">{seat.seatNumber}</div>
                  <div className="booking-seat-type">
                    {seat.seatNumber.includes('E') ? 'Executive' : 'Normal'}
                  </div>
                  <div className="booking-seat-price">
                    ₹{seat.seatNumber.includes('E') ? priceOfExeSeat : priceOfNormalSeat}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="booking-summary-section">
  <div className="booking-summary-row">
    <span className="summary-label">Total Seats:</span>
    <span className="summary-value">{selectedSeats.length}</span>
  </div>

  {selectedSeats.filter(seat => seat.seatNumber.includes('E')).length > 0 && (
    <div className="booking-summary-row">
      <span className="summary-label">Executive Seats:</span>
      <span className="summary-value">
        {selectedSeats.filter(seat => seat.seatNumber.includes('E')).length} × ₹{priceOfExeSeat}
      </span>
    </div>
  )}

  {selectedSeats.filter(seat => seat.seatNumber.includes('N')).length > 0 && (
    <div className="booking-summary-row">
      <span className="summary-label">Normal Seats:</span>
      <span className="summary-value">
        {selectedSeats.filter(seat => seat.seatNumber.includes('N')).length} × ₹{priceOfNormalSeat}
      </span>
    </div>
  )}

  <div className="booking-summary-total">
    <span className="total-label">Total Amount:</span>
    <span className="total-value">₹{calculateTotalPrice()}</span>
  </div>
</div>


          <button className="booking-map-pay-button" onClick={handlePayment}>
            Proceed to Payment - ₹{calculateTotalPrice()}
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="seat-selection-page">
        <div className="loading-container">
          <p>Loading seat information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="seat-selection-page">
      <div className="movie-details-card">
        <img 
          src={movieData.movieposter} 
          alt={movieData.name}
          className="movie-poster-seat"
          onError={(e) => {
            e.target.src = '/default-poster.jpg'; 
          }}
        />
        <div className="movie-info">
          <h1 className="movie-title-seat">{movieData.name}</h1>
          <div className="movie-detail-item">
            <span className="detail-icon">Screen Name: </span>
            <span>{screenName}</span>
          </div>
          <div className="movie-detail-item">
            <span className="detail-icon">Date: </span>
            <span>{formatDate(date)}</span>
          </div>
          <div className="movie-detail-item">
            <span className="detail-icon">Show Time: </span>
            <span>{formatTime(showTime)}</span>
          </div>
          {movieData.genre !== 'N/A' && (
            <div className="movie-detail-item">
              <span className="detail-icon">Genre: </span>
              <span>{movieData.genre}</span>
            </div>
          )}
          {movieData.duration !== 'N/A' && (
            <div className="movie-detail-item">
              <span className="detail-icon">Duration: </span>
              <span>{Math.floor(movieData.duration/60) } hrs {movieData.duration%60} mins </span>
            </div>
          )}
          {movieData.language !== 'N/A' && (
            <div className="movie-detail-item">
              <span className="detail-icon">Language: </span>
              <span>{movieData.language}</span>
            </div>
          )}
        </div>
      </div>

      {renderSeats()}

      {selectedSeats.length > 0 && (
        <div className="payment-container">
          <div className="payment-buttons-group">
            <button 
              className="view-booking-button" 
              onClick={() => setShowBookingMap(true)}
            >
             View Booking Details
            </button>
            <button className="pay-now-button" onClick={handlePayment}>
              Book {selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''} - Pay ₹{calculateTotalPrice()}
            </button>
          </div>
        </div>
      )}

      {showBookingMap && <BookingMap />}
    </div>
  );
};

export default SeatSelection;
