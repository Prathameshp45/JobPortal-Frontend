// import React from 'react';
// import { Link } from 'react-router-dom';

// function UserDashboard() {
//   // Static data for jobs (to be browsed)
//   const jobs = [
//     { id: 1, title: 'Software Engineer', company: 'ABC Corp', location: 'New York, NY' },
//     { id: 2, title: 'Product Manager', company: 'XYZ Ltd', location: 'San Francisco, CA' },
//     { id: 3, title: 'UI/UX Designer', company: 'Design Co', location: 'Remote' },
//   ];

//   // Static data for applications (jobs the user has applied for)
//   const applications = [
//     { id: 1, jobTitle: 'Software Engineer', company: 'ABC Corp', status: 'Under Review' },
//     { id: 2, jobTitle: 'UI/UX Designer', company: 'Design Co', status: 'Interview Scheduled' },
//   ];

//   // Static user profile data
//   const userProfile = {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     location: 'New York, NY',
//   };

//   return (
//     <div className="container">
//       <h2>User Dashboard</h2>
//       <p>Welcome to your dashboard! Here you can apply for jobs and manage your applications.</p>

//       {/* Displaying Jobs */}
//       <div>
//         <h4>Browse Jobs</h4>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Job Title</th>
//               <th>Company</th>
//               <th>Location</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job.id}>
//                 <td>{job.id}</td>
//                 <td>{job.title}</td>
//                 <td>{job.company}</td>
//                 <td>{job.location}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <Link to="/jobs" className="btn btn-primary">
//           Browse All Jobs
//         </Link>
//       </div>

//       {/* Displaying Applications */}
//       <div className="mt-4">
//         <h4>Your Applications</h4>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Job Title</th>
//               <th>Company</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {applications.map((application) => (
//               <tr key={application.id}>
//                 <td>{application.id}</td>
//                 <td>{application.jobTitle}</td>
//                 <td>{application.company}</td>
//                 <td>{application.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <Link to="/applications" className="btn btn-secondary">
//           View All Applications
//         </Link>
//       </div>

//       {/* User Profile */}
//       <div className="mt-4">
//         <h4>Your Profile</h4>
//         <p><strong>Name:</strong> {userProfile.name}</p>
//         <p><strong>Email:</strong> {userProfile.email}</p>
//         <p><strong>Location:</strong> {userProfile.location}</p>
//         <Link to="/profile" className="btn btn-info">
//           View or Edit Profile
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserDashboard() {
  // State for jobs and applications (mocked data)
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    // Fetching job data (static data for now, replace with real API call)
    const fetchJobs = async () => {
      // Replace with an actual API call to get jobs
      const jobData = [
        { id: 1, title: 'Software Engineer', company: 'ABC Corp', location: 'New York, NY' },
        { id: 2, title: 'UI/UX Designer', company: 'Design Co', location: 'Remote' },
      ];
      setJobs(jobData);
    };

    // Fetching application data (static data for now, replace with real API call)
    const fetchApplications = async () => {
      // Replace with an actual API call to get user's applications
      const applicationData = [
        {
          id: 1,
          job: { title: 'Software Engineer', company: 'ABC Corp', location: 'New York, NY' },
          status: 'Under Review',
        },
        {
          id: 2,
          job: { title: 'UI/UX Designer', company: 'Design Co', location: 'Remote' },
          status: 'Interview Scheduled',
        },
      ];
      setApplications(applicationData);
    };

    // Fetching user profile data (static data for now, replace with real API call)
    const fetchUserProfile = async () => {
      // Replace with an actual API call to get user profile
      const profileData = { name: 'John Doe', email: 'john.doe@example.com', location: 'New York, NY' };
      setUserProfile(profileData);
    };

    // Fetch data
    fetchJobs();
    fetchApplications();
    fetchUserProfile();
  }, []);

  return (
    <div className="container">
      <h2>User Dashboard</h2>
      <p>Welcome to your dashboard! Here you can apply for jobs and manage your applications.</p>

      {/* Displaying Jobs */}
      <div>
        <h4>Browse Jobs</h4>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/jobs" className="btn btn-primary">
          Browse All Jobs
        </Link>
      </div>

      {/* Displaying Applications */}
      <div className="mt-4">
        <h4>Your Applications</h4>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.job.title}</td>
                <td>{application.job.company}</td>
                <td>{application.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/applications" className="btn btn-secondary">
          View All Applications
        </Link>
      </div>

      {/* User Profile */}
      <div className="mt-4">
        <h4>Your Profile</h4>
        <p><strong>Name:</strong> {userProfile.name}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        <p><strong>Location:</strong> {userProfile.location}</p>
        <Link to="/profile" className="btn btn-info">
          View or Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default UserDashboard;
