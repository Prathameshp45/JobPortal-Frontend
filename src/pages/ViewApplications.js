import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap"; // Import modal components

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [currentJob, setCurrentJob] = useState(null); // Holds the job to be edited
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newJobDescription, setNewJobDescription] = useState("");
  const [newRequirements, setNewRequirements] = useState("");

  useEffect(() => {
    fetchJobs(); // Fetch jobs on component mount
  }, []);

  const fetchJobs = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/jobs/getJobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(response.data); // Set jobs to state
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleEditClick = (job) => {
    setCurrentJob(job); // Set the job being edited
    setNewJobTitle(job.jobTitle); // Set initial values for the modal form
    setNewCompanyName(job.companyName); // Set company name
    setNewJobDescription(job.jobDescription); // Set job description
    setNewRequirements(job.requirements); // Set job requirements
    setShowModal(true); // Open the modal
  };

  const handleUpdateJob = async () => {
    const token = localStorage.getItem("token");
    if (!newJobTitle || !newCompanyName || !newJobDescription || !newRequirements) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/jobs/updateJob/${currentJob._id}`,
        {
          jobTitle: newJobTitle,
          companyName: newCompanyName,
          jobDescription: newJobDescription,
          requirements: newRequirements,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === currentJob._id
            ? { ...job, jobTitle: newJobTitle, companyName: newCompanyName, jobDescription: newJobDescription, requirements: newRequirements }
            : job
        )
      );
      setShowModal(false); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleDeleteClick = async (jobId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/jobs/deleteJob/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs(); // Refresh the job list after deletion
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>All Jobs</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>
                <Link to={`/applications/${job._id}`} className="btn btn-link">
                  {job.jobTitle}
                </Link>
              </td>
              <td>{job.companyName}</td>
              <td>
                <button
                  className="btn btn-primary ml-2"
                  onClick={() => handleEditClick(job)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDeleteClick(job._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Job Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="jobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="jobDescription">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newJobDescription}
                onChange={(e) => setNewJobDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="requirements">
              <Form.Label>Requirements</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newRequirements}
                onChange={(e) => setNewRequirements(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateJob}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobList;
