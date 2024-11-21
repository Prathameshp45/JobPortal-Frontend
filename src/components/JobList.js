// src/components/JobList.js
import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { getJobs } from '../services/jobService';
import { useAuth } from '../hooks/useAuth';

function JobList() {
  const { user } = useAuth(); // Get user data from the context or local storage
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (user && user.role === 'admin') {
        setError('Admins cannot view job listings.');
        setLoading(false);
        return;
      }

      try {
        const jobsData = await getJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Job Listings</h2>
      <div className="list-group">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        ) : (
          <p>No jobs available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default JobList;
