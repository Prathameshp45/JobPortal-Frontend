import React, { useState } from 'react';
import axios from 'axios';

function JobPostPage() {
  const [jobTitle, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:5000/api/jobs/create`, 
        {
            jobTitle,companyName,jobDescription,requirements
        },
        {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  return (
    <div>
      <h2>Create a Job Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            value={jobTitle}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={jobDescription}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Requirements</label>
          <textarea
            className="form-control"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Post Job
        </button>
      </form>
    </div>
  );
}

export default JobPostPage;
