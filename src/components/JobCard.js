import React from 'react';
import { Link } from 'react-router-dom';

function JobCard() {
  // Static job data (hardcoded for demo purposes)
  const job = {
    title: 'Software Engineer',
    company: 'Tech Corp',
    description: 'Develop software solutions for clients.',
    requirements: '3+ years of experience, React, Node.js',
    _id: '1', // Simulating a job ID for routing
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{job.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
        <p className="card-text">{job.description || 'No description available'}</p>
        <p className="card-text">
          <strong>Requirements:</strong> {job.requirements || 'No requirements listed'}
        </p>
        {/* Static link for View Details */}
        {job._id ? (
          <Link to={`/jobs/${job._id}`} className="btn btn-primary">
            View Details
          </Link>
        ) : (
          <button className="btn btn-secondary" disabled>
            No Details Available
          </button>
        )}
      </div>
    </div>
  );
}

export default JobCard;
