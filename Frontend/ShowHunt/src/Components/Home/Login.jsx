import { useState } from 'react';
import config from './../../Config';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';

function Login() {
  const [formData, setformData] = useState({
    username:"",
    password:""
});
const dispatch = useDispatch();
const [error, setError] = useState();
const handleChange = (e) => {
       const {id,value} =  e.target;
       setformData({...formData,[id]:value})
   }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try
    {
      const response=await axios.post(`${config.url}/auth/checklogin`,formData)
      if(response.status===200)
      {
         const { role, userDetails } = response.data;
         dispatch(loginSuccess({ role, userDetails }));
        alert('Login Success');
      }
      else
      {
        setError("Login Failed")
        setformData({
          username:"",
          password:""
        })
      }
    }
    catch(error)
    {
      if(error.response)
           {
            alert("Login Failed")
           }
           else
           {
            setError("Unexpected Error...")
           }
    }
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h2 className='home-heading'>Login to Your Account</h2>
        <p>Access exclusive content and manage your bookings.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
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
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-large">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don`t have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;