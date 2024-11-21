import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(''); // To store the role of the user

  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserRole(token);
    }
  }, []);

  // Fetch user role from backend
  const fetchUserRole = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/getUserInfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      // Login API call
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token); // Save token
      setSuccess('Login successful!');
      setIsAuthenticated(true);

      // Fetch user role after login
      fetchUserRole(token);

      // Navigate based on role
      setTimeout(() => {
        if (response.data.role === 'admin') {
          navigate('/user/dashboard');
        } else {
          navigate('/admin/dashboard');
        }
      }, 1000);
    } catch (err) {
      console.error('Login error:', err.response);
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setRole('');
    navigate('/login');
  };

  return (
    <div className="container">
      {!isAuthenticated ? (
        <>
          <h2>Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </>
      ) : (
        <div>
          <h2>Welcome, {role === 'admin' ? 'Admin' : 'User'}!</h2>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
