// src/components/ApplyJobForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ApplyJobForm({ jobId }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !coverLetter) {
      alert('Please provide a cover letter and upload your resume.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('coverLetter', coverLetter);
    formData.append('resume', resume);

    try {
      const response = await axios.post(`/api/applications/apply/${jobId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });

      setIsSubmitting(false);
      setMessage(response.data.message);
      navigate('/user'); // Redirect to the user page after successful submission
    } catch (error) {
      console.error('Error applying for the job:', error);
      setIsSubmitting(false);
      setMessage('Failed to submit the application. Please try again.');
    }
  };

  return (
    <div>
      <h2>Apply for Job</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Cover Letter</label>
          <textarea
            className="form-control"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Resume</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Apply for Job'}
        </button>
      </form>
    </div>
  );
}

export default ApplyJobForm;
