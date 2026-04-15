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
   * @throws {Error} - With user-friendly error message
   */
  async login(email, password) {
    try {
      // Validate inputs
      if (!email || !email.trim()) {
        throw new Error('Please enter your email address');
      }
      if (!password || !password.trim()) {
        throw new Error('Please enter your password');
      }

      // OAuth2 requires form data with "username" field (not "email")
      const formData = new FormData();
      formData.append('username', email.trim());
      formData.append('password', password.trim());

      const response = await apiClient.postFormData('/auth/login', formData);

      if (response.access_token) {
        apiClient.setToken(response.access_token);
        if (response.refresh_token) {
          localStorage.setItem('refresh_token', response.refresh_token);
        }
        // Store username (email) for dashboard greeting
        localStorage.setItem('username', email.trim());
      } else {
        throw new Error('Login failed: No access token received from server');
      }

      return response;
    } catch (error) {
      // Re-throw with proper error message
      const errorMsg = error.message || 'Login failed. Please try again.';
      console.error('[v0] Login error:', errorMsg);
      throw new Error(errorMsg);
    }
  }

  /**
   * Sign up new user
   * @param {object} userData - User data (full_name, email, password)
   * @returns {Promise<object>} - Created user data
   * @throws {Error} - With user-friendly error message
   */
  async signup(userData) {
    try {
      // Validate inputs
      if (!userData.full_name || !userData.full_name.trim()) {
        throw new Error('Please enter your full name');
      }
      if (userData.full_name.trim().length < 2) {
        throw new Error('Full name must be at least 2 characters');
      }
      if (!userData.email || !userData.email.trim()) {
        throw new Error('Please enter your email address');
      }
      if (!userData.password || !userData.password.trim()) {
        throw new Error('Please enter a password');
      }
      if (userData.password.length < 8) {
        throw new Error('Your password is too short. Please use at least 8 characters to keep your account secure.');
      }

      const response = await apiClient.post('/auth/signup', {
        full_name: userData.full_name.trim(),
        email: userData.email.trim(),
        password: userData.password.trim(),
      });

      // Return the created user data
      return response;
    } catch (error) {
      // Re-throw with proper error message
      const errorMsg = error.message || 'Sign up failed. Please try again.';
      console.error('[v0] Signup error:', errorMsg);
      throw new Error(errorMsg);
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
