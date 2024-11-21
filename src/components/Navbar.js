import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Navbar() {
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch user info when the component mounts
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Fetch user details
        const response = await axios.get('http://localhost:5000/api/auth/getUserInfo', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setUser(response.data);

        // Fetch notifications for regular users
        if (!response.data.isAdmin) {
          fetchNotifications();
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
  };

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    try {
      // Fetch notifications for the logged-in user (only if not admin)
      const response = await axios.get('http://localhost:5000/api/application/getApplicationByUserId', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const notifications = response.data?.notifications || [];
      const unreadNotifications = notifications.filter((notification) => !notification.read);
      setUnreadCount(unreadNotifications.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUnreadCount(0);  // Reset unread notifications count
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Job Portal
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Profile and Notification icons for non-admins only */}
                {!user.isAdmin && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        <i className="fa fa-user" style={{ fontSize: '1.5em' }}></i> Profile
                      </Link>
                    </li>

                    {/* Notification Icon for regular users */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/notifications" style={{ position: 'relative' }}>
                        <i className="fa fa-bell" style={{ fontSize: '1.5em' }}></i>
                        {unreadCount > 0 && (
                          <span
                            className="badge bg-danger"
                            style={{
                              position: 'absolute',
                              top: '-5px',
                              right: '-10px',
                              fontSize: '0.75em',
                              padding: '2px 6px',
                              borderRadius: '50%',
                            }}
                          >
                            {unreadCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  </>
                )}

                {/* Logout Button */}
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
