import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3>Admin Panel</h3>
      <ul style={styles.sidebarList}>
        <li style={styles.sidebarItem}>
          <Link to="/admin/create-job" style={styles.sidebarLink}>
            Create Job
          </Link>
        </li>
        <li style={styles.sidebarItem}>
          <Link to="/admin/view-applicants" style={styles.sidebarLink}>
            View Applicants
          </Link>
        </li>
      </ul>
    </div>
  );
};

// Inline Styles for Sidebar
const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRight: '2px solid #ddd',
  },
  sidebarList: {
    listStyleType: 'none',
    padding: 0,
  },
  sidebarItem: {
    margin: '15px 0',
  },
  sidebarLink: {
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '18px',
  },
};

export default AdminSidebar;
