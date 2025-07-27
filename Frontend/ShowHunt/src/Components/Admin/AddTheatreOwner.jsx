import { useState } from 'react';
import axios from 'axios';
import config from '../../Config';
import { useNavigate } from 'react-router-dom';
import './AddTheatreOwner.css';

export default function AddTheatreOwner () {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    contact: '',
    bankname: '',
    accountnumber: '',
    ifsccode: '',
    theatrename: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/admin/addtheatreowner`, formData);
      if (response.status === 201) {
        navigate("/viewallowners");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="form-container-theatre">
      <div className="form-wrapper-theatre">
        <h3 className="form-heading">Theatre Owner Registration</h3>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Username</label>
              <input 
                type="text" 
                id="username" 
                className="form-input-theatre" 
                required 
                value={formData.username} 
                onChange={handleChange}
                placeholder="Enter username"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input 
                type="password" 
                id="password" 
                className="form-input-theatre" 
                required 
                value={formData.password} 
                onChange={handleChange}
                placeholder="Enter password"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Email</label>
              <input 
                type="email" 
                id="email" 
                className="form-input-theatre" 
                required 
                value={formData.email} 
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Contact</label>
              <input 
                type="text" 
                id="contact" 
                className="form-input-theatre" 
                required 
                value={formData.contact} 
                onChange={handleChange}
                placeholder="Enter contact number"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Bank Name</label>
              <input 
                type="text" 
                id="bankname" 
                className="form-input-theatre" 
                required 
                value={formData.bankname} 
                onChange={handleChange}
                placeholder="Enter bank name"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Account Number</label>
              <input 
                type="text" 
                id="accountnumber" 
                className="form-input-theatre" 
                required 
                value={formData.accountnumber} 
                onChange={handleChange}
                placeholder="Enter account number"
              />
            </div>

            <div className="input-group">
              <label className="input-label">IFSC Code</label>
              <input 
                type="text" 
                id="ifsccode" 
                className="form-input-theatre" 
                required 
                value={formData.ifsccode} 
                onChange={handleChange}
                placeholder="Enter IFSC code"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Theatre Name</label>
              <input 
                type="text" 
                id="theatrename" 
                className="form-input-theatre" 
                required 
                value={formData.theatrename} 
                onChange={handleChange}
                placeholder="Enter theatre name"
              />
            </div>

            <div className="input-group full-width">
              <label className="input-label">Address</label>
              <textarea 
                id="address" 
                className="form-textarea-theatre" 
                required 
                rows={3} 
                value={formData.address} 
                onChange={handleChange}
                placeholder="Enter complete address"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn-theatre">
            Register Theatre Owner
          </button>
        </form>
      </div>
    </div>
  );
};