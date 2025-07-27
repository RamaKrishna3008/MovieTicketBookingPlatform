import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import config from '../../Config';
import './viewAllBookings.css'; 

export default function ViewAllBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const useremail = useSelector((state) => state.auth.userDetails.email);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${config.url}/user/viewMyBookings?email=${useremail}`);
        setBookings(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (useremail) fetchBookings();
  }, [useremail]);

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
      case 'confirmed':
        return 'status-badge status-success';
      case 'pending':
        return 'status-badge status-pending';
      case 'failed':
      case 'cancelled':
        return 'status-badge status-failed';
      default:
        return 'status-badge status-pending';
    }
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  if (loading) {
    return (
      <div className="booking-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-container">
        <div className="error-container">
          <p className="error-text">Error fetching bookings: {error.message}</p>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="booking-container">
        <div className="no-bookings-container">
          <p className="no-bookings-text">No bookings found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <h2>My Bookings</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Movie</th>
            <th>Movie Name</th>
            <th>Show Time</th>
            <th>Show Date</th>            
            <th>Seats</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>
                <img 
                  src={booking.mapping?.movie?.movieposter || '/placeholder-movie.jpg'} 
                  alt="Movie Poster"
                  className="movie-poster"
                />
              </td>
              <td>{booking.mapping?.movie?.name}</td>
              <td>{booking.showtime}</td>
              <td>{new Date(booking.showdate).toLocaleDateString()}</td>
              <td className="seats-cell">{booking.seatNumbers?.join(', ')}</td>
              <td className="amount-cell">₹{booking.amount}</td>
              <td>
                <span className={getStatusBadgeClass(booking.status)}>
                  {booking.status}
                </span>
              </td>              
              <td>
                <button 
                  className="details-button"
                  onClick={() => openModal(booking)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
{showModal && selectedBooking && (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={closeModal}>
        ×
      </button>
      
      <img
        src={selectedBooking.mapping?.movie?.movieposter || '/placeholder-movie.jpg'}
        alt="Movie Poster"
        className="modal-image"
      />
      
      <div className="modal-body">
        <div className="modal-header">
          <h3 className="modal-title">Booking Details</h3>
          <span className="modal-movie-name">
           Movie Name: {selectedBooking.mapping?.movie?.name || 'Unknown Movie'}
          </span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Booking ID:</span>
          <span className="detail-value">{selectedBooking.id}</span>
        </div>
        
        
        <div className="detail-row">
          <span className="detail-label">Order ID:</span>
          <span className="detail-value payment-id-value">
            {selectedBooking.razorpayOrderId || 'N/A'}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{selectedBooking.email}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Screen Name:</span>
          <span className="detail-value">{selectedBooking.mapping.screen.name}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Show Date:</span>
          <span className="detail-value">
            {new Date(selectedBooking.showdate).toLocaleDateString()}
          </span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Show Time:</span>
          <span className="detail-value">{selectedBooking.showtime}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Selected Seats:</span>
          <span className="detail-value seats-cell">
            {selectedBooking.seatNumbers?.join(', ')}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Payment Status:</span>
          <span className={getStatusBadgeClass(selectedBooking.status)}>
            {selectedBooking.status}
          </span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Amount Paid:</span>
          <span className="detail-value amount-cell">₹{selectedBooking.amount}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Payment Time:</span>
          <span className="detail-value">
            {new Date(selectedBooking.paymentTime).toLocaleString()}
          </span>
        </div>
        
        
      </div>
    </div>
  </div>
)}

    </div>
  );
}
