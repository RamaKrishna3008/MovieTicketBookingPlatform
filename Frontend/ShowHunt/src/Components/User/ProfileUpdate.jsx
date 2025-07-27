import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import config from '../../Config';
import './ProfileUpdate.css';
import { updateUserDetails } from '../../redux/authSlice'; 

export default function ProfileUpdate() {
  const [user, setUser] = useState(useSelector((state) => state.auth.userDetails));

  const dispatch = useDispatch();


  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const handleUpdate = async () => {
    try {
      const { id, ...userToUpdate } = user;
      const response = await axios.put(`${config.url}/user/updateuser`, {
        id,
        ...userToUpdate,
      });

      alert("User updated successfully");
      if(response.status===200)
      dispatch(updateUserDetails(userToUpdate));
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Update failed");
    }
  };

  

  

  return (
    <div className="update-user-container">
      <h1>Update Profile</h1>
      <div className="update-form">
        <div className="form-row">
          <label>ID:
            <input type="text" id="id" value={user.id} readOnly />
          </label>
          <label>Email:
            <input type="email" id="email" value={user.email} onChange={handleChange} required readOnly />
          </label>
        </div>

        <div className="form-row">
          <label>Name:
            <input type="text" id="name" value={user.name} onChange={handleChange} required />
          </label>
          <label>Contact:
            <input type="text" id="contact" value={user.contact} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-row">
          <label>Password:
            <input type="password" id="password" value={user.password} onChange={handleChange} required />
          </label>
        </div>

        <button className="update-button" onClick={handleUpdate}>
          Update Details
        </button>
      </div>
    </div>
  );
}
