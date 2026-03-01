// app/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.47:8000/api'; // Use your IP

// Token helpers
export const getTokens = async () => {
  const access = await AsyncStorage.getItem('accessToken');
  const refresh = await AsyncStorage.getItem('refreshToken');
  return { access, refresh };
};

export const saveTokens = async (access, refresh) => {
  await AsyncStorage.setItem('accessToken', access);
  await AsyncStorage.setItem('refreshToken', refresh);
};

export const clearTokens = async () => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
  await AsyncStorage.removeItem('user');
};

// User helpers
export const saveUser = async (user) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async () => {
  const userStr = await AsyncStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// API request with auth header
export const apiRequest = async (endpoint, method = 'GET', body = null, auth = true) => {
  console.log(`Making ${method} request to ${endpoint}`, body);
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
  console.log('Response status:', response.status);

  const data = await response.json();
  console.log('Response data:', data);

  if (!response.ok) {
    let errorMessage = 'Request failed';
    if (data) {
      if (data.detail) errorMessage = data.detail;
      else if (data.message) errorMessage = data.message;
      else {
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

// Fetch current user
export const fetchCurrentUser = async () => {
  const user = await apiRequest('/users/me/', 'GET', null, true);
  await saveUser(user);
  return user;
};