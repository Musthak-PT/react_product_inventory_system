// src/api.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Replace with your Django backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set JWT token to Axios headers
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Function to handle JWT token response and update Axios headers
export const handleAuthToken = (response) => {
  const token = response.data.access; // Adjust as per your JWT response structure
  if (token) {
    setAuthToken(token);
  }
};

// Example API request function with JWT token included
export const createOrUpdateProduct = async (data) => {
  try {
    const response = await axiosInstance.post('/apis/products/create_or_update/', data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default axiosInstance;
