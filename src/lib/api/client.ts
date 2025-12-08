// src/lib/api/client.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from './config';

// API Response interface
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    errors?: Record<string, string[]>;
}

// API Error interface
export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}

class ApiClient {
    private client: AxiosInstance;
    private refreshing: boolean = false;
    private refreshSubscribers: ((token: string) => void)[] = [];

    constructor() {
        this.client = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                const token = this.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

                // Handle 401 Unauthorized
                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (this.refreshing) {
                        return new Promise((resolve) => {
                            this.refreshSubscribers.push((token: string) => {
                                if (originalRequest.headers) {
                                    originalRequest.headers.Authorization = `Bearer ${token}`;
                                }
                                resolve(this.client(originalRequest));
                            });
                        });
                    }

                    originalRequest._retry = true;
                    this.refreshing = true;

                    try {
                        const refreshToken = this.getRefreshToken();
                        if (!refreshToken) {
                            throw new Error('No refresh token');
                        }

                        const response = await this.client.post('/auth/refresh', {
                            refreshToken,
                        });

                        const { token } = response.data.data;
                        this.setToken(token);

                        this.refreshSubscribers.forEach((callback) => callback(token));
                        this.refreshSubscribers = [];

                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return this.client(originalRequest);
                    } catch (refreshError) {
                        this.clearTokens();
                        window.location.href = '/auth/login';
                        return Promise.reject(refreshError);
                    } finally {
                        this.refreshing = false;
                    }
                }

                return Promise.reject(this.handleError(error));
            }
        );
    }

    private handleError(error: AxiosError): ApiError {
        if (error.response) {
            const data = error.response.data as any;
            return {
                message: data?.message || 'An error occurred',
                statusCode: error.response.status,
                errors: data?.errors,
            };
        } else if (error.request) {
            return {
                message: 'No response from server',
                statusCode: 0,
            };
        } else {
            return {
                message: error.message || 'An error occurred',
                statusCode: 0,
            };
        }
    }

    // Token management
    private getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(API_CONFIG.TOKEN_KEY);
    }

    private getRefreshToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(API_CONFIG.REFRESH_TOKEN_KEY);
    }

    public setToken(token: string): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(API_CONFIG.TOKEN_KEY, token);
    }

    public setRefreshToken(token: string): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(API_CONFIG.REFRESH_TOKEN_KEY, token);
    }

    public clearTokens(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(API_CONFIG.TOKEN_KEY);
        localStorage.removeItem(API_CONFIG.REFRESH_TOKEN_KEY);
    }

    // HTTP methods
    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.client.get<ApiResponse<T>>(url, config);
        return response.data;
    }

    async post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        const response = await this.client.post<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    async put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        const response = await this.client.put<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    async patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        const response = await this.client.patch<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.client.delete<ApiResponse<T>>(url, config);
        return response.data;
    }

    // File upload helper
    async uploadFile<T = any>(
        url: string,
        file: File,
        onProgress?: (progress: number) => void
    ): Promise<ApiResponse<T>> {
        const formData = new FormData();
        formData.append('file', file);

        return this.post<T>(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(progress);
                }
            },
        });
    }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing
export default ApiClient;