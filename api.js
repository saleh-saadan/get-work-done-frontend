// app/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// REPLACE THIS with your current machine IP (check 'ipconfig' or 'ifconfig')
// Note: 'localhost' or '127.0.0.1' usually won't work on physical devices or emulators.
const API_URL = 'http://192.168.1.14:8000/api';

// ============================
// TOKEN STORAGE
// ============================

export const getTokens = async () => {
  try {
    const access = await AsyncStorage.getItem('accessToken');
    const refresh = await AsyncStorage.getItem('refreshToken');
    return { access, refresh };
  } catch (e) {
    return { access: null, refresh: null };
  }
};

export const saveTokens = async (access, refresh) => {
  if (access) await AsyncStorage.setItem('accessToken', access);
  if (refresh) await AsyncStorage.setItem('refreshToken', refresh);
};

export const clearTokens = async () => {
  await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
};

// ============================
// USER STORAGE
// ============================

export const saveUser = async (user) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const getUser = async () => {
  const userStr = await AsyncStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// ============================
// TOKEN REFRESH LOGIC
// ============================

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const refreshToken = async () => {
  const { refresh } = await getTokens();
  if (!refresh) throw new Error('No refresh token available');

  const response = await fetch(`${API_URL}/users/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  const data = await response.json();

  if (!response.ok) {
    await clearTokens();
    throw new Error(data?.detail || 'Session expired');
  }

  // Save the new access token (usually refresh stays the same in SimpleJWT unless configured)
  await saveTokens(data.access, refresh);
  return data.access;
};

// ============================
// CORE API REQUEST
// ============================

/**
 * @param {string} endpoint - e.g., '/users/login/'
 * @param {string} method - 'GET', 'POST', etc.
 * @param {object|null} body - Request body object
 * @param {boolean} auth - Whether to include Bearer token
 */
export const apiRequest = async (endpoint, method = 'GET', body = null, auth = true) => {
  const makeRequest = async (token = null) => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (auth && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    };

    console.log(`[API] → ${method} ${endpoint}`);
    
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // 1. Handle Token Expiry
      if (auth && response.status === 401 && !endpoint.includes('refresh')) {
        return handle401(endpoint, method, body);
      }

      // 2. Parse Django Errors (Extracting strings from arrays/objects)
      let errorMessage = 'Request failed';
      if (data) {
        if (data.detail) {
          errorMessage = data.detail;
        } else if (typeof data === 'object') {
          errorMessage = Object.entries(data)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(' ') : val}`)
            .join('\n');
        }
      }
      
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    return data;
  };

  const handle401 = async (endpoint, method, body) => {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await refreshToken();
        isRefreshing = false;
        onRefreshed(newToken);
        return await makeRequest(newToken);
      } catch (err) {
        isRefreshing = false;
        throw err;
      }
    }

    return new Promise((resolve, reject) => {
      subscribeTokenRefresh(async (token) => {
        try {
          resolve(await makeRequest(token));
        } catch (err) {
          reject(err);
        }
      });
    });
  };

  // Initial call setup
  let token = null;
  if (auth) {
    const tokens = await getTokens();
    token = tokens.access;
    if (!token) throw new Error('Please log in to continue');
  }

  return await makeRequest(token);
};

// ============================
// USER ACTIONS
// ============================

export const fetchCurrentUser = async () => {
  const user = await apiRequest('/users/me/');
  await saveUser(user);
  return user;
};