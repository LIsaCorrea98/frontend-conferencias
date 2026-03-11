// src/api/httpClient.ts
import axios from 'axios';

// API configuration for microservices
const API_CONFIG = {
  USER_SERVICE: 'http://localhost:8081/api',
  PROJECT_SERVICE: 'http://localhost:8082/api',
  TASK_SERVICE: 'http://localhost:8083/api',
};

const setupInterceptors = (instance: any) => {
  instance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      // General error handling - Use console instead of blocking alerts
      if (!error.response) {
        console.warn('Network Error: Please check if the service is running or if CORS is enabled.');
      } else if (error.response.status === 503) {
        console.warn('Service Unavailable (503)', error.config?.url);
      } else if (error.response.status === 404) {
        console.warn('Recurso no encontrado (404)', error.config?.url);
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

// Create specific clients
export const userHttp = setupInterceptors(
  axios.create({ baseURL: API_CONFIG.USER_SERVICE })
);

export const projectHttp = setupInterceptors(
  axios.create({ baseURL: API_CONFIG.PROJECT_SERVICE })
);

export const taskHttp = setupInterceptors(
  axios.create({ baseURL: API_CONFIG.TASK_SERVICE })
);