import { apiClient } from './api';

/**
 * Authentication Service
 * Handles user authentication, login, signup, and token management
 */

class AuthService {
  /**
   * Login user with email and password
   * Uses OAuth2 form-data format as required by FastAPI
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} - Access token and refresh token
   */
  async login(email, password) {
    try {
      // OAuth2 requires form data with "username" field (not "email")
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await apiClient.postFormData('/auth/login', formData);

      if (response.access_token) {
        apiClient.setToken(response.access_token);
        if (response.refresh_token) {
          localStorage.setItem('refresh_token', response.refresh_token);
        }
        // Store username (email) for dashboard greeting
        localStorage.setItem('username', email);
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Sign up new user
   * @param {object} userData - User data (email, password, name, etc.)
   * @returns {Promise<object>} - Created user data and token
   */
  async signup(userData) {
    try {
      const response = await apiClient.post('/auth/signup', userData);

      if (response.access_token) {
        apiClient.setToken(response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user || {}));
      }

      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiClient.clearToken();
      localStorage.removeItem('user');
    }
  }

  /**
   * Get current user from token
   * @returns {Promise<object>} - Current user data
   */
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/auth/me');
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      apiClient.clearToken();
      localStorage.removeItem('user');
      throw error;
    }
  }

  /**
   * Refresh access token
   * @returns {Promise<object>} - New token response
   */
  async refreshToken() {
    try {
      const response = await apiClient.post('/auth/refresh', {});

      if (response.access_token) {
        apiClient.setToken(response.access_token);
      }

      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      apiClient.clearToken();
      localStorage.removeItem('user');
      throw error;
    }
  }

  /**
   * Update user profile
   * @param {object} userData - Updated user data
   * @returns {Promise<object>} - Updated user data
   */
  async updateProfile(userData) {
    try {
      const response = await apiClient.put('/auth/profile', userData);
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  /**
   * Change password
   * @param {string} oldPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<object>} - Response from server
   */
  async changePassword(oldPassword, newPassword) {
    try {
      const response = await apiClient.post('/auth/change-password', {
        old_password: oldPassword,
        new_password: newPassword,
      });
      return response;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if user has valid token
   */
  isAuthenticated() {
    return !!apiClient.getToken();
  }

  /**
   * Get stored user data
   * @returns {object|null} - Stored user data or null
   */
  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export const authService = new AuthService();
