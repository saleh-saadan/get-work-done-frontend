// app/api.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.2:8000/api'; // Change to your Django server IP/port

// Helper to get stored tokens
export const getTokens = async () => {
  const access = await AsyncStorage.getItem('accessToken');
  const refresh = await AsyncStorage.getItem('refreshToken');
  return { access, refresh };
};

// Save tokens after login/register
export const saveTokens = async (access, refresh) => {
  await AsyncStorage.setItem('accessToken', access);
  await AsyncStorage.setItem('refreshToken', refresh);
};

// Clear tokens on logout
export const clearTokens = async () => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
};

// API request with auth header
export const apiRequest = async (endpoint, method = 'GET', body = null, auth = true) => {
  console.log(`Making ${method} request to ${endpoint}`, body); // log request
  const { access } = await getTokens();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (auth && access) {
    headers['Authorization'] = `Bearer ${access}`;
  }

  const config = {
    method,
    headers,
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  console.log('Response status:', response.status); // log status

  const data = await response.json();
  console.log('Response data:', data); // log data

  if (!response.ok) {
    let errorMessage = 'Request failed';
    if (data) {
      if (data.detail) errorMessage = data.detail;
      else if (data.message) errorMessage = data.message;
      else {
        // Combine all field errors
        const errors = Object.entries(data)
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
          .join('\n');
        if (errors) errorMessage = errors;
      }
    }
    throw new Error(errorMessage);
  }
  return data;
};