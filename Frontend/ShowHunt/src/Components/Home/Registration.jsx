import axios from 'axios';
import { useState } from 'react';
import config from '../../Config';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [formData, setformData] = useState({
    name: "",
    password: "",
    email: "",
    contact: ""
  });
  const [error, setError] = useState(null);
  const [errorM, setErrorM] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();


  const resetFormFields = () => {
      setOtp("")
      setformData({
    name: "",
    password: "",
    email: "",
    contact: ""
  })
   };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setformData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(`${config.url}/user/sendotp`, {
        email: formData.email,
        name: formData.name,
      });

      if (response.status === 200) {
        setShowOtp(true);
      }
    } catch (error) {
      setError("Error sending OTP. Try again.");
    }
  };

  const verifyOtp = async () => {
  try {
    const res = await axios.post(`${config.url}/user/verifyotp`, {
      email: formData.email,
      otp,
    });

    if (res.status === 200) {
      setShowOtp(false);
      const registerResponse = await axios.post(`${config.url}/user/adduser`, formData);
      if (registerResponse.status === 201) {
        navigate("/login");
      }
    }
    
  }catch(error)
        {
           if(error.status===400){
             setErrorM("Invalid OTP. Try again.");
            }
          else
            {
              setShowOtp(false);
               resetFormFields(); 
               if(error.response)
           {
            setError("Registation Failed")
           }
           else
           {
            setError("Unexpected Error...")
           }
          }
          
        }
   }


  return (
    <div className="hero">
      <div className="hero-content">
        <h2 className='home-heading'>Create Your Account</h2>
        <p>Join ShowHunt to book your favorite movie tickets.</p>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <input
              type="tel"
              id="contact"
              className="form-control"
              value={formData.contact}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              title="Password must contain at least 8 characters, including uppercase, lowercase, number, and special character."
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-large">
            Register
          </button>
        </form>

        <p className="signup-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>

      {showOtp && (
        <div className="otp-modal-backdrop">
          <div className="otp-modal">
            <h3>Email Verification</h3>
            <p>Enter the OTP sent to your email.</p>
             {errorM && (
          <div className="error-box">
            {errorM}
          </div>
        )}
            <input
              type="text"
              id="otp"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
            <button className="btn btn-success" onClick={verifyOtp}>
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registration;
