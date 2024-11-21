import axios from 'axios';

const updateApplicationStatus = async (status) => {
  try {
    const response = await axios.post('http://localhost:5000/api/application/status', { status });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error updating application status:', error);
  }
};

// Example usage:
updateApplicationStatus('approved');
