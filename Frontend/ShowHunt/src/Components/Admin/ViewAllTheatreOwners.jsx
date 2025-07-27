import { useEffect, useState } from 'react';
import './ViewAllTheatreOwners.css';
import config from '../../Config';
import axios from 'axios';
import { Eye } from 'lucide-react'; // Or any eye icon from another library
import { useNavigate } from 'react-router-dom';

export default function ViewAllTheatreOwners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null); // State to store selected owner details
  const navigate=useNavigate()
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get(`${config.url}/admin/viewalltheatreowners`);
        setOwners(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwners();
  }, []);

  const handleView = async (id) => {
    try {
      const response = await axios.get(`${config.url}/admin/gettheatreowner/${id}`);
      setSelectedOwner(response.data); 
    } catch (error) {
      alert("Error fetching owner details");
    }
  };

  return (
    <div>
      <div className="users-container">
        <h2 className="users-heading">All Owners</h2>

        {loading && <div className="loading-state">Loading users...</div>}
        {error && <div className="error-state">Error: {error.message}</div>}
        {!loading && !error && owners.length === 0 && (
          <div className="no-users-state">No users found.</div>
        )}

        {!loading && !error && owners.length > 0 && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Theatre Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {owners.map((owner) => (
                  <tr key={owner.id}>
                    <td>{owner.id}</td>
                    <td>{owner.theatrename}</td>
                    <td>{owner.username}</td>
                    <td>{owner.email}</td>
                    <td>{owner.contact}</td>
                    <td className={owner.status ? 'status-active' : 'status-inactive'}>
                      {owner.status ? 'ACTIVE' : 'INACTIVE'}
                    </td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => handleView(owner.id)}
                        title="View Owner"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

{selectedOwner && (
  <div className="modal-view" onClick={() => setSelectedOwner(null)}>
    <div onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setSelectedOwner(null)}>×</button>
      <h3>Owner Details</h3>
      <p><strong>ID:</strong> {selectedOwner.id}</p>
      <p><strong>Theatre Name:</strong> {selectedOwner.theatrename}</p>
      <p><strong>Username:</strong> {selectedOwner.username}</p>
      <p><strong>Email:</strong> {selectedOwner.email}</p>
      <p><strong>Contact:</strong> {selectedOwner.contact}</p>
      <p><strong>Status:</strong> {selectedOwner.status ? 'ACTIVE' : 'INACTIVE'}</p>
      <p><strong>BankName:</strong> {selectedOwner.bankname}</p>
      <p><strong>Account No:</strong> {selectedOwner.accountnumber}</p>
      <p><strong>IFSC Code:</strong> {selectedOwner.ifsccode}</p>
      <p><strong>Address:</strong> {selectedOwner.address}</p>
      <div className="modal-actions">
       <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        axios.put(`${config.url}/admin/updatetheatreownerstatus/${selectedOwner.id}`)
          .then(() => {
            alert("Status updated!");
            setSelectedOwner(null);
          })
          .catch(() => alert("Failed to update status"));
      }}
    >
      Update Status
    </a>

    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        navigate(`/admin/update/${selectedOwner.id}`);
      }}
    >
      Update
    </a>
    </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
