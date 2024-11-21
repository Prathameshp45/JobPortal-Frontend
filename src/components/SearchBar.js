// // HomePage.js
// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import SearchBar from './SearchBar';

// const HomePage = () => {
//   const jobs = [
//     {
//       id: 1,
//       jobTitle: 'Software Engineer',
//       jobCompany: 'Tech Corp',
//       jobDescription: 'Develop software solutions for clients.',
//       jobRequirements: '3+ years of experience, React, Node.js',
//     },
//     {
//       id: 2,
//       jobTitle: 'Data Scientist',
//       jobCompany: 'Data Inc.',
//       jobDescription: 'Analyze and interpret complex data to help businesses.',
//       jobRequirements: '2+ years of experience, Python, Machine Learning',
//     },
//     {
//       id: 3,
//       jobTitle: 'Product Manager',
//       jobCompany: 'Productify',
//       jobDescription: 'Lead product development teams and ensure product success.',
//       jobRequirements: '5+ years of experience, Leadership, Agile',
//     },
//   ];

//   const [searchQuery, setSearchQuery] = useState('');

//   // Filter jobs based on the search query
//   const filteredJobs = jobs.filter(
//     (job) =>
//       job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.jobCompany.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleApply = (job) => {
//     alert(`You have successfully applied for the position of ${job.jobTitle} at ${job.jobCompany}`);
//   };

//   return (
//     <Container className="my-5">
//       <h2>Available Job Listings</h2>

//       {/* Search Bar */}
//       <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Using the SearchBar component */}

//       <Row>
//         {filteredJobs.map((job) => (
//           <Col md={4} key={job.id} className="mb-4">
//             <Card>
//               <Card.Body>
//                 <Card.Title>{job.jobTitle}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">{job.jobCompany}</Card.Subtitle>
//                 <Card.Text>
//                   <strong>Description:</strong> {job.jobDescription}
//                 </Card.Text>
//                 <Card.Text>
//                   <strong>Requirements:</strong> {job.jobRequirements}
//                 </Card.Text>
//                 <Button variant="primary" onClick={() => handleApply(job)}>
//                   Apply Now
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default HomePage;
