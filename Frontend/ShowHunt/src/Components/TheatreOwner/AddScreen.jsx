import { useState } from 'react';
import axios from 'axios';
import config from '../../Config';
import { useNavigate } from 'react-router-dom';
import './AddScreen.css';
import { useSelector } from 'react-redux';

const AddScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    theatreownerid: useSelector((state) => state.auth.userDetails.id),
    noofexecutiveseats: '',
    noofnormalseats: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/theatreowner/addscreen`, formData);

      if (response.status === 201) {
        navigate("/theatreownerhome");
      }
    } catch (error) {
      console.error('Error adding screen:', error);
      alert('Failed to add screen. Please try again.');
    }
  };

  return (
    <div className="add-screen-container">
       
      <div className="form-container">
        <div className="form-header">
          <h3>🎬 Add New Screen</h3>
        </div>

        <form onSubmit={handleSubmit} className="screen-form">
          <div className="form-row">
            <div className="input-group">
              <label className="form-label">Screen Name</label>
              <input 
                type="text" 
                id="name" 
                className="form-input"
                required 
                value={formData.name} 
                onChange={handleChange}
                placeholder="Enter Screen name"
              />
            </div>

            <div className="input-group">
              <label className="form-label">Your Id</label>
              <input 
                type="number" 
                id="theatreownerid" 
                className="form-input"
                required 
                value={formData.theatreownerid} 
                readOnly
              />
            </div>
          </div>

          <div className="input-group">
            <label className="form-label">No Of Executive Seats</label>
            <input 
              type="number" 
              id="noofexecutiveseats" 
              className="form-input"
              required 
              value={formData.noofexecutiveseats} 
              onChange={handleChange}
              placeholder="Enter number of executive seats"
              min="0"
            />
          </div>

          <div className="input-group">
            <label className="form-label">No Of Normal Seats</label>
            <input
              type="number" 
              id="noofnormalseats" 
              className="form-input"
              required 
              value={formData.noofnormalseats} 
              onChange={handleChange}
              placeholder="Enter number of normal seats"
              min="0"
            />
          </div>
         
          <button type="submit" className="submit-button">
            <span className="button-text">Add Screen</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScreen;