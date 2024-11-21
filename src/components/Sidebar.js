import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Sidebar.css'; // Import the CSS file

const AdminNavbar = () => {
  const location = useLocation(); // Get the current location

  const isAdminRoute = location.pathname.startsWith('/admin');

  // Render nothing if the route is not an admin route
  if (!isAdminRoute) {
    return null;
  }

  return (
    <Navbar expand="lg" className="admin-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/admin/dashboard"></Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav" className="justify-content-center">
          <Nav>
            <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/create-job">Create Job</Nav.Link>
            <Nav.Link as={Link} to="/admin/applicants">Applicants</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
