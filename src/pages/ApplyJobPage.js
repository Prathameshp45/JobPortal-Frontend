// src/components/ApplyJobPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplyJobPage = ({ match }) => {
  const [job, setJob] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

  const jobId = match.params.id; // Get job ID from route params

  // Fetch job details from backend API
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Error fetching job details.');
      }
    };
    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Basic validation
    if (!name || !email || !resume) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('jobId', jobId); // Send jobId to the backend
    formData.append('resume', resume);

    try {
      const response = await axios.post('/api/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting application:', error);
      setError('Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div className="container">
      <h2>Apply for the {job.jobTitle} at {job.jobCompany}</h2>
      <h5>{job.jobDescription}</h5>
      <p><strong>Requirements:</strong> {job.jobRequirements}</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input 
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="resume">Upload Resume</label>
          <input
            type="file"
            id="resume"
            className="form-control"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default ApplyJobPage;
