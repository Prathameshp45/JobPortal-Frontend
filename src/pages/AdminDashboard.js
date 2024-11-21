// import axios from 'axios';
// import React, { useState } from 'react';

// const JobPostForm = () => {
//     const [jobTitle, setTitle] = useState('');
//     const [companyName, setCompanyName] = useState('');
//     const [jobDescription, setDescription] = useState('');
//     const [requirements, setRequirements] = useState('');
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       const token = localStorage.getItem('token');
//       try {
//         const response = await axios.post(`http://localhost:5000/api/jobs/create`, 
//           {
//               jobTitle,companyName,jobDescription,requirements
//           },
//           {
//           headers: { 'Authorization': `Bearer ${token}` },
//         });
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching job:', error);
//       }
//     };
  
//     return (
//       <div>
//         <h2>Create a Job Post</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Job Title</label>
//             <input
//               type="text"
//               className="form-control"
//               value={jobTitle}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Company Name</label>
//             <input
//               type="text"
//               className="form-control"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               value={jobDescription}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Requirements</label>
//             <textarea
//               className="form-control"
//               value={requirements}
//               onChange={(e) => setRequirements(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Post Job
//           </button>
//         </form>
//       </div>
//     );
// };

// // Inline Styles
// const styles = {
//   contentSection: {
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//   },
//   formGroup: {
//     marginBottom: '15px',
//   },
//   input: {
//     width: '100%',
//     padding: '10px',
//     margin: '5px 0',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   textarea: {
//     width: '100%',
//     height: '100px',
//     padding: '10px',
//     margin: '5px 0',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     padding: '10px 15px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   message: {
//     marginBottom: '20px',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     backgroundColor: '#f8f9fa',
//     color: '#333',
//   },
// };

// export default JobPostForm;

import React from 'react';
import { Route, Routes } from 'react-router-dom';  // Import Routes instead of Switch
import AdminSidebar from './AdminSidebar';
import JobPostForm from './JobPostForm';
import ApplicantsList from './ApplicantsList';

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ marginLeft: '250px', padding: '20px', flex: 1 }}>
        <Routes>  {/* Use Routes here instead of Switch */}
          <Route path="/admin/create-job" element={<JobPostForm />} />
          <Route path="/admin/applicants" element={<ApplicantsList />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
