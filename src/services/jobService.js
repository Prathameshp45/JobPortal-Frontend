import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';

export const loginUser = async ({ email, password }) => {
  const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
  return response.data;
};

export const registerUser = async ({ email, password, role }) => {
  const response = await axios.post(`${apiUrl}/auth/register`, { email, password, role });
  return response.data;
};

export const getJobs = async () => {
  const response = await axios.get(`${apiUrl}/jobs`);
  return response.data;
};

export const postJob = async (job) => {
  const response = await axios.post(`${apiUrl}/jobs`, job);
  return response.data;
};

export const getJobById = async (id) => {
  const response = await axios.get(`${apiUrl}/jobs/${id}`);
  return response.data;
};

export const applyForJob = async (id, resume) => {
  const formData = new FormData();
  formData.append('resume', resume);
  const response = await axios.post(`${apiUrl}/jobs/${id}/apply`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
