// src/lib/api/index.ts

// Export API client
export { apiClient } from './client';

// Export configuration
export { API_CONFIG, API_ENDPOINTS } from './config';

// Export all types
export * from './types';

// Export all services
export * from './services';

// Re-export commonly used services for convenience
export { api } from './services';