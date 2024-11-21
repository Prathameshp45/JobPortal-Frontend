import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token is missing.');

        const response = await axios.get(
          `http://localhost:5000/api/application/getApplicationByUserId`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Check if the response has an array of applications
        const applications = response.data.application || [];

        // Filter applications with "Accepted" status
        const acceptedApplications = applications.filter(
          (application) => application.status === 'Accepted'
        );

        setNotifications(acceptedApplications);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to fetch notifications. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
    fetchjobs();
  }, []); // Run when the component mounts

  const fetchjobs = async()  =>{
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token is missing.');

      const response = await axios.get(
        `http://localhost:5000/api/jobs/getJobs`,
        {
          headers: { Authorization: `Bearer ${token}`},
        }
      );
      console.log(response.data);
      setJobs(response.data);
      
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to fetch notifications. Please try again.');
    }
  }
  const filterdjobs = (id) =>{
    const filtered = jobs.find((job) => job._id === id);
    return filtered.jobTitle;
  }

  return (
    <div>
      <h2>Accepted Applications</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && !error && (
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li key={notification._id}>
                                <p><strong>User Name:</strong> {notification.userId?.name || 'N/A'}</p>

                <p><strong>Job Title:</strong> {filterdjobs(notification.jobId._id) || 'N/A' }</p>
                <p><strong>Status:</strong> {notification.status}</p>
                {/* <p><strong>Application ID:</strong> {notification._id}</p> */}
              </li>
            ))
          ) : (
            <p>No applications with status "Accepted" found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Notifications;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error("Token is missing.");
    
//         const decodedToken = jwtDecode(token); // Decode JWT token
//         const userId = decodedToken.userId; // Assuming userId is stored in the token
    
//         const response = await axios.get(
//           `http://localhost:5000/api/notifications/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
    
//         setNotifications(response.data);
//       } catch (err) {
//         console.error("Error fetching notifications:", err);
//         setError("Failed to fetch notifications. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };fetchNotifications()
    
//   }, []); // Reload notifications whenever the component mounts
  
//   return (
//     <div>
//       <h2>Notifications</h2>
//       {isLoading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {!isLoading && !error && (
//         <ul>
//           {notifications.length > 0 ? (
//             notifications.map((notification) => (
//               <li key={notification._id}>
//                 <p>{notification.message}</p>
//                 <span>Status: {notification.status || 'N/A'}</span>
//               </li>
//             ))
//           ) : (
//             <p>No notifications available.</p>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Notifications;
