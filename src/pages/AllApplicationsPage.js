import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobApplicationsPage = () => {
  const { jobId } = useParams(); // Get jobId from URL
  const [applications, setApplications] = useState([]); // Applications state
  const [companyName, setCompanyName] = useState(''); // Company name state
  const [error, setError] = useState(''); // Error state
  const [resumes, setResumes] = useState({}); // Fetched resumes by user ID
  const [loadingStatus, setLoadingStatus] = useState({}); // Loading state for status change

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/applications/job/${jobId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        setApplications(response.data.applications || []);
        setCompanyName(response.data.companyName || '');
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching applications');
      }
    };

    fetchApplications();
  }, [jobId]);

  const fetchResume = async (userId) => {
    if (resumes[userId]) return resumes[userId];

    try {
      const response = await axios.get(
        `http://localhost:5000/api/resumes/getResumeByUserId/${userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setResumes((prev) => ({ ...prev, [userId]: response.data.fileUrl }));
      return response.data.fileUrl;
    } catch (err) {
      console.error(`Error fetching resume for user ${userId}:`, err);
      setResumes((prev) => ({ ...prev, [userId]: null })); // Mark as unavailable
      return null;
    }
  };

  const handleResumeLink = async (userId) => {
    const resumeUrl = await fetchResume(userId);
    if (resumeUrl) {
      window.open(resumeUrl, '_blank'); // Open the resume link in a new tab
    } else {
      alert('Resume is unavailable.');
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    setLoadingStatus((prev) => ({ ...prev, [applicationId]: true })); // Set loading state
    try {
      const response = await axios.put(
        `http://localhost:5000/api/application/updateApplication/${applicationId}`,
        { status: newStatus },
        // {
        //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        // }
      );
      // setApplications((prev) =>
      //   prev.map((app) =>
      //     app._id === applicationId ? { ...app, status: newStatus } : app
      //   )
      // );
      alert(`Application has been ${newStatus.toLowerCase()}.`);
    } catch (err) {
      console.error("Error updating application status:", err);
      setError('Failed to update application status. Please try again.');
    } finally {
      setLoadingStatus((prev) => ({ ...prev, [applicationId]: false })); // Reset loading state
    }
  };
  
  return (
    <div>
      <h1>Applications for Job:</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {companyName && <h2>Company: {companyName}</h2>}

      {applications.length === 0 ? (
        <p>No applications found for this job.</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li
              key={app._id}
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                margin: '10px 0',
              }}
            >
              <p>
                <strong>Name:</strong> {app.userId?.name || 'N/A'}
              </p>
              <p>
                <strong>Email:</strong> {app.userId?.email || 'N/A'}
              </p>
              <p>
                <strong>Status:</strong> {app.status}
              </p>
              <p>
                <strong>Resume:</strong>{' '}
                <button
                  onClick={() => handleResumeLink(app.userId?._id)}
                  disabled={resumes[app.userId?._id] === null}
                  style={{
                    textDecoration: 'underline',
                    color: 'blue',
                    background: 'none',
                    border: 'none',
                    cursor: resumes[app.userId?._id] === null ? 'not-allowed' : 'pointer',
                  }}
                >
                  {resumes[app.userId?._id] === null ? 'Unavailable' : 'View Resume'}
                </button>
              </p>
              {app.status === 'Pending' && (
                <div>
                  <button
                    onClick={() => handleStatusChange(app._id, 'Accepted')}
                    disabled={loadingStatus[app._id]}
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      marginRight: '10px',
                      cursor: loadingStatus[app._id] ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {loadingStatus[app._id] ? 'Processing...' : 'Accept'}
                  </button>
                  <button
                    onClick={() => handleStatusChange(app._id, 'Rejected')}
                    disabled={loadingStatus[app._id]}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      cursor: loadingStatus[app._id] ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {loadingStatus[app._id] ? 'Processing...' : 'Reject'}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobApplicationsPage;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const JobApplicationsPage = () => {
//   const { jobId } = useParams(); // Get jobId from URL
//   const [applications, setApplications] = useState([]); // Applications state
//   const [companyName, setCompanyName] = useState(''); // Company name state
//   const [error, setError] = useState(''); // Error state
//   const [resumes, setResumes] = useState({}); // Fetched resumes by user ID
//   const [loadingStatus, setLoadingStatus] = useState({}); // Loading state for status change

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/applications/job/${jobId}`,
//           {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//           }
//         );
//         setApplications(response.data.applications || []);
//         setCompanyName(response.data.companyName || '');
//       } catch (err) {
//         setError(err.response?.data?.message || 'Error fetching applications');
//       }
//     };

//     fetchApplications();
//   }, [jobId]);

//   const fetchResume = async (userId) => {
//     if (resumes[userId]) return resumes[userId];

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/resumes/getResumeByUserId/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         }
//       );
//       setResumes((prev) => ({ ...prev, [userId]: response.data.fileUrl }));
//       return response.data.fileUrl;
//     } catch (err) {
//       console.error(`Error fetching resume for user ${userId}:`, err);
//       setResumes((prev) => ({ ...prev, [userId]: null })); // Mark as unavailable
//       return null;
//     }
//   };

//   const handleStatusChange = async (applicationId, newStatus) => {
//     setLoadingStatus((prev) => ({ ...prev, [applicationId]: true })); // Set loading state
//     try {
//       const response = await axios.patch(
//         `http://localhost:5000/api/applications/${applicationId}`,
//         { status: newStatus },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         }
//       );
//       // Update status in the local state after successful API call
//       setApplications((prev) =>
//         prev.map((app) =>
//           app._id === applicationId ? { ...app, status: newStatus } : app
//         )
//       );
//       alert(`Application has been ${newStatus.toLowerCase()}.`);
//     } catch (err) {
//       console.error('Error updating application status:', err);
//       setError('Failed to update application status. Please try again.');
//     } finally {
//       setLoadingStatus((prev) => ({ ...prev, [applicationId]: false })); // Reset loading state
//     }
//   };
  

//   return (
//     <div>
//       <h1>Applications for Job:</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {companyName && <h2>Company: {companyName}</h2>}

//       {applications.length === 0 ? (
//         <p>No applications found for this job.</p>
//       ) : (
//         <ul>
//           {applications.map((app) => (
//             <li
//               key={app._id}
//               style={{
//                 border: '1px solid #ddd',
//                 padding: '10px',
//                 margin: '10px 0',
//               }}
//             >
//               <p>
//                 <strong>Name:</strong> {app.userId?.name || 'N/A'}
//               </p>
//               <p>
//                 <strong>Email:</strong> {app.userId?.email || 'N/A'}
//               </p>
//               <p>
//                 <strong>Status:</strong> {app.status}
//               </p>
//               <p>
//                 <strong>Resume:</strong>{' '}
//                 <button
//                   onClick={() => handleResumeLink(app.userId?._id)}
//                   disabled={resumes[app.userId?._id] === null}
//                   style={{
//                     textDecoration: 'underline',
//                     color: 'blue',
//                     background: 'none',
//                     border: 'none',
//                     cursor: resumes[app.userId?._id] === null ? 'not-allowed' : 'pointer',
//                   }}
//                 >
//                   {resumes[app.userId?._id] === null ? 'Unavailable' : 'View Resume'}
//                 </button>
//               </p>
//               {app.status === 'Pending' && (
//                 <div>
//                   <button
//                     onClick={() => handleStatusChange(app._id, 'Accepted')}
//                     disabled={loadingStatus[app._id]}
//                     style={{
//                       backgroundColor: 'green',
//                       color: 'white',
//                       marginRight: '10px',
//                       cursor: loadingStatus[app._id] ? 'not-allowed' : 'pointer',
//                     }}
//                   >
//                     {loadingStatus[app._id] ? 'Processing...' : 'Accept'}
//                   </button>
//                   <button
//                     onClick={() => handleStatusChange(app._id, 'Rejected')}
//                     disabled={loadingStatus[app._id]}
//                     style={{
//                       backgroundColor: 'red',
//                       color: 'white',
//                       cursor: loadingStatus[app._id] ? 'not-allowed' : 'pointer',
//                     }}
//                   >
//                     {loadingStatus[app._id] ? 'Processing...' : 'Reject'}
//                   </button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default JobApplicationsPage;
