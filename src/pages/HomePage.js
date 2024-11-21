import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const HomePage = () => {
  const [jobs, setJobs] = useState([]); 
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        console.log('Raw Response:', response);

        if (!response.ok) {
          console.error('Response Status:', response.status);
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        console.log('Response Data:', data);

        if (data && Array.isArray(data.jobs)) {
          setJobs(data.jobs); // Update state with jobs array
        } else {
          setMessage('No jobs available at the moment');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setMessage('An error occurred while fetching jobs');
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (job) => {
    alert(`You have successfully applied for the position of ${job.jobTitle} at ${job.jobCompany}`);
  };

  return (
    <Container className="my-5">
      <h2>Available Job Listings</h2>
      {message && <div style={styles.message}>{message}</div>}
      <Row>
        {jobs.length === 0 ? (
          <Col>
            <p>No jobs available</p>
          </Col>
        ) : (
          jobs.map((job) => (
            <Col md={4} key={job.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{job.jobTitle}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{job.jobCompany}</Card.Subtitle>
                  <Card.Text>
                    <strong>Description:</strong> {job.jobDescription}
                  </Card.Text>
                  <Card.Text>
                    <strong>Requirements:</strong> {job.jobRequirements}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleApply(job)}>
                    Apply Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

// Inline styles for messages
const styles = {
  message: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f8f9fa',
    color: '#333',
  },
};

export default HomePage;
