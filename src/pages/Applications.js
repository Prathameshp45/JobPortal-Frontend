import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Applications() {
  const [applications, setApplications] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // If data was passed via Link's state
    if (location.state && location.state.applications) {
      setApplications(location.state.applications);
    } else {
      // If data is not passed, fetch it from the API
      const fetchApplications = async () => {
        try {
          const response = await axios.get('/api/applications'); // API call to fetch user applications
          setApplications(response.data);
        } catch (error) {
          console.error('Error fetching applications', error);
        }
      };

      fetchApplications();
    }
  }, [location.state]);

  return (
    <div className="container">
      <h2>Your Applications</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.job.title}</td>
              <td>{application.job.company}</td>
              <td>{application.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Applications;
