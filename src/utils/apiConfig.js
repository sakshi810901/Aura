/**
 * API Configuration and Endpoints
 * Centralized definition of all FastAPI backend endpoints
 */

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  // User endpoints
  USERS: {
    GET_ALL: '/users',
    GET_ONE: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    GET_PROFILE: '/users/profile',
  },

  // Avatar endpoints
  AVATARS: {
    GET_ALL: '/avatars',
    GET_ONE: (id) => `/avatars/${id}`,
    CREATE: '/avatars',
    UPDATE: (id) => `/avatars/${id}`,
    DELETE: (id) => `/avatars/${id}`,
    UPLOAD_IMAGE: '/avatars/upload',
  },

  // Habits endpoints
  HABITS: {
    GET_ALL: '/habits',
    GET_ONE: (id) => `/habits/${id}`,
    CREATE: '/habits',
    UPDATE: (id) => `/habits/${id}`,
    DELETE: (id) => `/habits/${id}`,
    GET_PROGRESS: (id) => `/habits/${id}/progress`,
  },

  // Goals endpoints
  GOALS: {
    GET_ALL: '/goals',
    GET_ONE: (id) => `/goals/${id}`,
    CREATE: '/goals',
    UPDATE: (id) => `/goals/${id}`,
    DELETE: (id) => `/goals/${id}`,
    GET_PROGRESS: (id) => `/goals/${id}/progress`,
  },

  // Daily Routine endpoints
  ROUTINES: {
    GET_ALL: '/routines',
    GET_ONE: (id) => `/routines/${id}`,
    CREATE: '/routines',
    UPDATE: (id) => `/routines/${id}`,
    DELETE: (id) => `/routines/${id}`,
    LOG_ACTIVITY: (id) => `/routines/${id}/log`,
  },

  // Spending endpoints
  SPENDING: {
    GET_ALL: '/spending',
    GET_ONE: (id) => `/spending/${id}`,
    CREATE: '/spending',
    UPDATE: (id) => `/spending/${id}`,
    DELETE: (id) => `/spending/${id}`,
    GET_ANALYTICS: '/spending/analytics',
  },

  // XP and Gamification endpoints
  XP: {
    GET_USER_XP: '/xp/me',
    GET_LEADERBOARD: '/xp/leaderboard',
    LOG_ACTIVITY: '/xp/log',
  },

  // Dashboard endpoints
  DASHBOARD: {
    GET_SUMMARY: '/dashboard/summary',
    GET_STATS: '/dashboard/stats',
    GET_RECENT_ACTIVITY: '/dashboard/activity',
  },

  // Health Check
  HEALTH: {
    CHECK: '/health',
  },
};

/**
 * Get full URL for an endpoint
 * @param {string} endpoint - The endpoint path
 * @returns {string} - Full URL
 */
export const getFullUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

/**
 * Build query string from object
 * @param {object} params - Query parameters
 * @returns {string} - Query string
 */
export const buildQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return '';
  const query = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      query.append(key, params[key]);
    }
  });
  return query.toString() ? `?${query.toString()}` : '';
};

/**
 * Build endpoint with query parameters
 * @param {string} endpoint - The endpoint path
 * @param {object} params - Query parameters
 * @returns {string} - Endpoint with query string
 */
export const buildEndpoint = (endpoint, params) => {
  return `${endpoint}${buildQueryString(params)}`;
};
