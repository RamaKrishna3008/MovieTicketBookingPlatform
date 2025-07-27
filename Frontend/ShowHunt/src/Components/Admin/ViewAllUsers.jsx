import { useEffect, useState } from 'react';
import './ViewAllUsers.css';
import config from '../../Config';
import axios from 'axios';

export default function ViewAllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config.url}/admin/viewallusers`);
        setUsers(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="users-container loading-state">Loading users...</div>;
  }

  if (error) {
    return <div className="users-container error-state">Error: {error.message}</div>;
  }

  if (users.length === 0) {
    return <div className="users-container no-users-state">No users found.</div>;
  }

  return (
    <div>
    <div className="users-container">
      <h2 className="users-heading">All Users</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
