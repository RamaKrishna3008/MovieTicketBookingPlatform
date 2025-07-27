import { useEffect, useState } from 'react';
import './ViewAllMovies.css';
import config from '../../Config';
import axios from 'axios';

export default function ViewAllMovies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${config.url}/admin/viewallmovies`);
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = movies.filter(movie =>
      movie.name.toLowerCase().includes(lowercasedSearch) ||
      movie.cast.toLowerCase().includes(lowercasedSearch) ||
      movie.genre.toLowerCase().includes(lowercasedSearch)
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  if (loading) {
    return <div className="movies-container loading-state">Loading movies...</div>;
  }

  if (error) {
    return <div className="movies-container error-state">Error: {error.message}</div>;
  }

  if (filteredMovies.length === 0) {
    return (
      <div className="movies-container no-movies-state">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        No movies found.
      </div>
    );
  }

  return (
    <div className="movies-container">
      <h2 className="movies-heading-view">All Movies</h2>

      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Poster</th>
              <th>Cast</th>
              <th>Description</th>
              <th>Genre</th>
              <th>Duration</th>
              <th>Release Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map(movie => (
              <tr key={movie.id}>
                <td>{movie.name}</td>
                <td>
                  <img
                    src={movie.movieposter}
                    alt="poster"
                    className="highlighted-poster"
                  />
                </td>
                <td>{movie.cast}</td>
                <td>{movie.description}</td>
                <td>{movie.genre}</td>
                <td>{Math.floor(movie.duration / 60) + " hrs " + (movie.duration % 60) + " mins"}</td>
                <td>{movie.releasedate}</td>
                <td><a href="#">View Bookings</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
