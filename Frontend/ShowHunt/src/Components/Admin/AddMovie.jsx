import { useState } from 'react';
import axios from 'axios';
import config from '../../Config';
import { useNavigate } from 'react-router-dom';
import './AddMovie.css';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    name: '',
    cast: '',
    description: '',
    language:'',
    genre: '',
    duration: '',
    releasedate: ''
  });

  const [posterFile, setPosterFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const movieBlob = new Blob([JSON.stringify(formData)], {
        type: 'application/json'
      });

      const form = new FormData();
      form.append('movie', movieBlob);
      form.append('poster', posterFile);

      const response = await axios.post(`${config.url}/admin/addmovie`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        navigate("/viewallmovies");
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Failed to add movie. Please try again.');
    }
  };

  return (
    <div className="add-movie-container">
      <div className="form-wrapper-movie">
        <div className="header">
          <h3 className="title-movie">🎬 Add New Movie</h3>
          <p className="subtitle">Fill in the details to add a new movie to the database</p>
        </div>

        <form onSubmit={handleSubmit} className="movie-form" encType="multipart/form-data">
          <div className="form-row">
            <div className="input-group">
              <label className="form-label-movie">Movie Name</label>
              <input 
                type="text" 
                id="name" 
                className="form-input-movie"
                required 
                value={formData.name} 
                onChange={handleChange}
                placeholder="Enter movie name"
              />
            </div>
             <div className="input-group">
              <label className="form-label-movie">Language</label>
              <input 
                type="text" 
                id="language" 
                className="form-input-movie"
                required 
                value={formData.language} 
                onChange={handleChange}
                placeholder="e.g., English,Telugu"
              />
            </div>

            <div className="input-group">
              <label className="form-label-movie">Genre</label>
              <input 
                type="text" 
                id="genre" 
                className="form-input-movie"
                required 
                value={formData.genre} 
                onChange={handleChange}
                placeholder="e.g., Action, Drama, Comedy"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="form-label-movie">Cast</label>
            <input 
              type="text" 
              id="cast" 
              className="form-input-movie"
              required 
              value={formData.cast} 
              onChange={handleChange}
              placeholder="Enter main cast members"
            />
          </div>

          <div className="input-group">
            <label className="form-label-movie">Description</label>
            <textarea 
              id="description" 
              className="form-textarea-movie"
              required 
              rows={4} 
              value={formData.description} 
              onChange={handleChange}
              placeholder="Enter movie description..."
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label className="form-label-movie">Duration (minutes)</label>
              <input 
                type="number" 
                id="duration" 
                className="form-input-movie"
                required 
                value={formData.duration} 
                onChange={handleChange}
                placeholder="120"
                min="1"
              />
            </div>

            <div className="input-group">
              <label className="form-label-movie">Release Date</label>
              <input 
                type="date" 
                id="releasedate" 
                className="form-input-movie"
                required 
                value={formData.releasedate} 
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="form-label-movie">Movie Poster</label>
            <input 
              type="file"
              accept="image/*"
              className="form-input-movie"
              onChange={(e) => setPosterFile(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            <span className="button-text">✨ Add Movie</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
