import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Change here
import { Link } from 'react-router-dom';

function Profile() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    location: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Replace with actual API endpoint
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setIsEditing(false);  // Stop editing after saving
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile!');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="container">
      <h2>User Profile</h2>
      {isEditing ? (
        <div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={profileData.location}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Location:</strong> {profileData.location}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
