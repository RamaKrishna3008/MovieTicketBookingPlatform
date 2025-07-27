import { useEffect, useState } from 'react';
import config from '../../Config';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ViewAllMappings() {
  const [mappings, setMappings] = useState([]);
  const [vacancyMap, setVacancyMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theatreownerid = useSelector((state) => state.auth.userDetails.id);

  useEffect(() => {
    const fetchMappingsAndVacancies = async () => {
      try {
        const response = await axios.get(`${config.url}/theatreowner/viewallmappings?id=${theatreownerid}`);
        const mappingsData = Array.isArray(response.data) ? response.data : [];
        setMappings(mappingsData);

        const vacancyResponses = await Promise.all(
          mappingsData.map(mapping =>
            axios.get(`${config.url}/theatreowner/viewvacancy?id=${mapping.id}`)
          )
        );

        const newVacancyMap = {};
        mappingsData.forEach((mapping, index) => {
          newVacancyMap[mapping.id] = Math.floor(vacancyResponses[index].data);
        });

        setVacancyMap(newVacancyMap);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMappingsAndVacancies();
  }, [theatreownerid]);

  if (loading) {
    return <div className="mappings-container loading-state">Loading Mappings...</div>;
  }

  if (error) {
    return <div className="mappings-container error-state">Error: {error.message}</div>;
  }

  if (mappings.length === 0) {
    return <div className="mappings-container no-mappings-state">No Mappings found.</div>;
  }

  return (
    <div className="mappings-container"><br/><br/>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Screen</th>
              <th>Show Time</th>
              <th>Expiry Date</th>
              <th>Executive Price</th>
              <th>Normal Price</th>
              <th>Occupancy %</th>
            </tr>
          </thead>
          <tbody>
            {mappings.map(mapping => (
              <tr key={mapping.id}>
                <td>{mapping.movie.name}</td>
                <td>{mapping.screen.name}</td>
                <td>{mapping.showTime}</td>
                <td>{mapping.expiryDate}</td>
                <td>{mapping.executiveprice}</td>
                <td>{mapping.normalprices}</td>
                <td>{100-(vacancyMap[mapping.id]?.toFixed(2))}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}