import axios from 'axios';
import axiosRetry from 'axios-retry';

import {API_CONFIG} from '../constants/endpoints';
import {tokenService} from '../services/tokenService';
import {normalizeApiError} from '../utils/apiError';

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,

  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,

  retryCondition: error => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code === 'ECONNABORTED'
    );
  },
});

apiClient.interceptors.request.use(async config => {
  const token = await tokenService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  response => response,

  async error => {
    if (error?.response?.status === 401) {
      await tokenService.removeToken();
    }

    return Promise.reject(normalizeApiError(error));
  },
);