import { useEffect, useState } from 'react';
import config from '../../Config';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ViewAllScreens() {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theatreownerid= useSelector((state) => state.auth.userDetails.id)

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const response = await axios.get(`${config.url}/theatreowner/viewallscreens/${theatreownerid}`);
        setScreens(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchScreens();
  }, [theatreownerid]);

  if (loading) {
    return <div className="screens-container-owner loading-state">Loading Screens...</div>;
  }

  if (error) {
    return <div className="screens-container-owner error-state">Error: {error.message}</div>;
  }

  if (screens.length === 0) {
    return <div className="screens-container-owner no-screens-state">No Screens found.</div>;
  }

  return (
    <div>
    <div className="screens-container-owner"><br/><br/>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>No of Executive Seats</th>
              <th>No of Normal Seats</th>
            </tr>
          </thead>
          <tbody>
            {screens.map(screen => (
              <tr key={screen.id}>
                <td>{screen.id}</td>
                <td>{screen.name}</td>
                <td>{screen.noofexecutiveseats}</td>
                <td>{screen.noofnormalseats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
