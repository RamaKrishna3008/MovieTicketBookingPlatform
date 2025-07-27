import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './CustomerCareBot.css'; 
import config from '../../Config';

const CustomerCareBot = () => {
  const userEmail = useSelector((state) => state.auth.userDetails.name); 
  const customerName = userEmail;

  const [issueType, setIssueType] = useState('Booking Issue');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.url}/user/ask`, {
        customerName,
        issueType,
        message
      });
      setResponse(res.data.responseMessage);
    } catch (err) {
      console.error(err);
      setResponse("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="bot-container">
      <h3>💬 Customer Care Bot</h3>
      <form onSubmit={handleSubmit} className="bot-form">
        <div className="user-info">
          <label><strong>User:</strong> {customerName}</label>
        </div>

        <select value={issueType} onChange={(e) => setIssueType(e.target.value)}>
          <option>Booking Issue</option>
          <option>Refund Request</option>
          <option>Payment Failure</option>
          <option>Cancellation Request</option>
          <option>Other</option>
        </select>

        <textarea
          placeholder="Describe your issue..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {response && (
        <div className="bot-response">
          <strong>Bot:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default CustomerCareBot;
