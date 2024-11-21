// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const JobList = () => {

//     const [jobs,setJobs] = useState([]);
//     useEffect(() => {
//         fetchJobs();
//     },[])

//     const fetchJobs = async() =>{
//         const token = localStorage.getItem('token');
//         try {
//             const response = await axios.get('http://localhost:5000/api/jobs/getJobs', {
//               headers: { 'Authorization': `Bearer ${token}` },
//             });
//             setJobs(response.data);
//             console.log(response.data);
//           } catch (error) {
//             console.error('Error fetching jobs:', error);
//           }
//     }
//   return (
//     <Container className="my-5">
//       <h2>Available Jobs </h2>
//       <Row>
//         <Col md={8}>
//         {jobs.map((job)=>(
//             <Card key={job._id}>
//               <Card.Body>
//                 <Card.Title>{job.jobTitle}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">{job.companyName}</Card.Subtitle>
//                 <Link to={`/jobDetails/${job._id}`}>
//                 <Button variant="primary">View Details</Button>
//                 </Link>
                
//               </Card.Body>
//             </Card>
  
//         ))}
          
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default JobList
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobList = () => {

    const [jobs, setJobs] = useState([]);
    
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/jobs/getJobs', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setJobs(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    return (
        <Container className="my-5">
            <h2>Available Jobs</h2>
            <Row>
                <Col md={8}>
                    {jobs.map((job) => (
                        <Card key={job._id} className="mb-4">
                            <Card.Body>
                                <Card.Title>
                                    <strong>{job.jobTitle}</strong>
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    <strong>{job.companyName}</strong>
                                </Card.Subtitle>
                                <Card.Text>
                                    <strong>Description: </strong>{job.description}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Requirements: </strong>{job.requirements}
                                </Card.Text>
                                <Link to={`/jobDetails/${job._id}`}>
                                    <Button variant="primary">View Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default JobList;
