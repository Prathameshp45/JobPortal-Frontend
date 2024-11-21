import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobDetailPage = () => {
  const [job, setJob] = useState(null); 
  const [resume, setResume] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  const applyJob = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `http://localhost:5000/api/application/apply/${id}`,
        {},
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );
      alert(response.data);
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('An error occurred while applying for the job.');
    }
  };

  const handleResume = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('resume', resume);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/resumes/upload/${id}`,
        formData,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert(response.data);
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('An error occurred while uploading the resume.');
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (resume) {
      await handleResume();
    }
    await applyJob();
    setShowModal(false);
  };

  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col md={8}>
            <Card key={job._id}>
              <Card.Body>
                <Card.Title>{job.jobTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.companyName}</Card.Subtitle>
                <Card.Text>{job.jobDescription}</Card.Text>
                <Card.Text><strong>Requirements:</strong> {job.requirements}</Card.Text>
                <Button 
                  variant="primary"
                  onClick={() => setShowModal(true)} 
                >
                  Apply
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Upload Your Resume</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="resume-upload" className="col-form-label">Select Resume:</label>
                    <input 
                      type="file" 
                      id="resume-upload" 
                      className="form-control"
                      onChange={(e) => setResume(e.target.files[0])}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleApply}>Apply for Job</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetailPage;
