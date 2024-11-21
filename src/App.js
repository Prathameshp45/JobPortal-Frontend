import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import axios from 'axios';

import HomePage from './pages/HomePage';
import JobPostPage from './pages/JobPostPage';
import JobDetailPage from './pages/JobDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobList from './pages/JobList';
import 'font-awesome/css/font-awesome.min.css';
// import 'font-awesome/css/font-awesome.min.css';
import Notifications from './components/Notifications';


import JobPostForm from './pages/JobPostForm'; 
// import ViewApplicants from './pages/ViewApp?licants'; // Admin view applicants page
import Sidebar from './components/Sidebar'; 
import ViewApplications from './pages/ViewApplications'
import 'bootstrap/dist/css/bootstrap.min.css';
// import ViewApplicants from './pages/ViewApplicants';
import Profile from './pages/Profile'
import AllApplicationsPage from './pages/AllApplicationsPage';
// Component to conditionally render Sidebar based on route
// import AdminLayout from './components/AdminLayout';
// import { NotificationsProvider } from './context/notificationsContext';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  
  // Show sidebar only on /admin/* paths
  const showSidebar = location.pathname.startsWith('/admin');

  return (
    


    
    <>
      {showSidebar && <Sidebar />}
      <div className="container">
        {children}
      </div>
    </>
  );
};

function App() {
  return (
    
    
    
    
    <AuthProvider>
      <Router>
        <Navbar />
        <AdminLayout>
          <Routes>

            {/* General Routes */}
            
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Job-related routes */}
            <Route path="/job-post" element={<JobPostPage />} />
            <Route path="/jobs/" element={<JobList />} />
            <Route path="/jobDetails/:id" element={<JobDetailPage />} />

            {/* Admin Routes (with Sidebar) */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/create-job" element={<JobPostForm />} />
            {/* <Route path="/admin/applications" element={<ViewApplications />} />  Make sure the path is correct */}
            <Route path="/admin/applicants" element={<ViewApplications />} /> 

            {/* User Dashboard */}
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route  path="/applications/:jobId"element={<AllApplicationsPage />} /> {/* New route */}

            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications /> } />

          </Routes>
        </AdminLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
