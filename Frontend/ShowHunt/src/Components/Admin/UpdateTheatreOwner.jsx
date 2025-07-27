import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../Config';
import axios from 'axios';
import './UpdateTheatreOwner.css';

export default function UpdateTheatreOwner() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${config.url}/admin/gettheatreowner/${id}`)
      .then(res => {
        setOwner(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Owner not found");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setOwner({ ...owner, [id]: value });
  };

  const handleUpdate = async () => {
    try {
      const { _id, ...ownerToUpdate } = owner;
      await axios.put(`${config.url}/admin/updatetheatreowner`, ownerToUpdate);
      alert("Owner updated successfully");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message); 
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading owner details...</div>
      </div>
    );
  }

  if (!owner) {
    return (
      <div className="loading-container">
        <div className="loading-text">Owner not found</div>
      </div>
    );
  }

  return (
    <div className="update-owner-container">
      <h1>Update Theatre Owner</h1>
      <div className="update-form">
        <div className="form-row">
          <label data-readonly>
            ID:
            <input 
              type="text" 
              id="id" 
              value={owner.id || ''} 
              readOnly 
            />
          </label>
          <label data-readonly>
            Username:
            <input 
              type="text" 
              id="username" 
              value={owner.username || ''} 
              readOnly 
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Theatre Name:
            <input 
              type="text" 
              id="theatrename" 
              value={owner.theatrename || ''} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              id="email" 
              value={owner.email || ''} 
              onChange={handleChange} 
              required 
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Contact:
            <input 
              type="text" 
              id="contact" 
              value={owner.contact || ''} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Bank Name:
            <input 
              type="text" 
              id="bankname" 
              value={owner.bankname || ''} 
              onChange={handleChange} 
              required 
            />
          </label>
        </div>

        <label>
          IFSC Code:
          <input 
            type="text" 
            id="ifsccode" 
            value={owner.ifsccode || ''} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>
          Theatre Address:
          <textarea 
            id="address" 
            value={owner.address || ''} 
            onChange={handleChange} 
            required 
            placeholder="Enter complete theatre address..."
          />
        </label>

        <button className="update-button" onClick={handleUpdate}>
          Update Owner Details
        </button>
      </div>
    </div>
  );
}