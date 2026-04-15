import { useState, useCallback } from 'react';
import { apiClient } from './api';

/**
 * Custom React hook for API calls with loading and error handling
 * @param {string} endpoint - The API endpoint
 * @param {string} method - HTTP method (get, post, put, patch, delete)
 * @param {object} options - Additional options for the request
 * @returns {object} - { execute, loading, error, data }
 */
export function useApi(endpoint, method = 'get', options = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(
    async (payload = {}) => {
      setLoading(true);
      setError(null);

      try {
        let response;

        switch (method.toLowerCase()) {
          case 'post':
            response = await apiClient.post(endpoint, payload, options);
            break;
          case 'put':
            response = await apiClient.put(endpoint, payload, options);
            break;
          case 'patch':
            response = await apiClient.patch(endpoint, payload, options);
            break;
          case 'delete':
            response = await apiClient.delete(endpoint, options);
            break;
          case 'get':
          default:
            response = await apiClient.get(endpoint, options);
            break;
        }

        setData(response);
        return response;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method, options]
  );

  return { execute, loading, error, data };
}

/**
 * Custom hook for file uploads
 * @param {string} endpoint - The API endpoint for file upload
 * @returns {object} - { upload, loading, error, data }
 */
export function useFileUpload(endpoint) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const upload = useCallback(
    async (file, additionalData = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.uploadFile(endpoint, file, additionalData);
        setData(response);
        return response;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  return { upload, loading, error, data };
}
