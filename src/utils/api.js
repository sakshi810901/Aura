const API_URL = import.meta.env.VITE_BASE_URL;
const API_V1_STR = import.meta.env.VITE_API_V1_STR;

/**
 * API Client for FastAPI backend integration
 * Handles all HTTP requests with automatic error handling and token management
 */

class APIClient {
  constructor(baseUrl = API_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get authorization token from localStorage
   */
  getToken() {
    return localStorage.getItem('auth_token');
  }

  /**
   * Set authorization token in localStorage
   */
  setToken(token) {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Clear authorization token
   */
  clearToken() {
    localStorage.removeItem('auth_token');
  }

  /**
   * Build request headers with authentication
   */
  getHeaders(contentType = 'application/json') {
    const headers = {
      'Content-Type': contentType,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Make a GET request
   */
  async get(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
      ...options,
    });
    return this.handleResponse(response);
  }

  /**
   * Make a POST request
   */
  async post(endpoint, data = {}, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
      ...options,
    });
    return this.handleResponse(response);
  }

  /**
   * Make a PUT request
   */
  async put(endpoint, data = {}, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
      ...options,
    });
    return this.handleResponse(response);
  }

  /**
   * Make a PATCH request
   */
  async patch(endpoint, data = {}, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
      ...options,
    });
    return this.handleResponse(response);
  }

  /**
   * Make a DELETE request
   */
  async delete(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(),
      ...options,
    });
    return this.handleResponse(response);
  }

  /**
   * Handle API response and errors
   */
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const error = new Error(data.detail || data.message || 'API Error');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  /**
   * Upload file to the backend
   */
  async uploadFile(endpoint, file, additionalData = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const formData = new FormData();
    formData.append('file', file);

    // Add additional fields to FormData
    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key]);
    });

    const headers = {};
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    return this.handleResponse(response);
  }
}

export const apiClient = new APIClient(API_URL);
