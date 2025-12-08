// src/lib/api/services/auth.service.ts
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    User,
} from '../types';

export const authService = {
    /**
     * Login user
     */
    async login(credentials: LoginRequest) {
        const response = await apiClient.post<LoginResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            credentials
        );

        if (response.data?.token) {
            apiClient.setToken(response.data.token);
        }
        if (response.data?.refreshToken) {
            apiClient.setRefreshToken(response.data.refreshToken);
        }

        return response;
    },

    /**
     * Register new user
     */
    async register(data: RegisterRequest) {
        const response = await apiClient.post<RegisterResponse>(
            API_ENDPOINTS.AUTH.REGISTER,
            data
        );

        if (response.data?.token) {
            apiClient.setToken(response.data.token);
        }
        if (response.data?.refreshToken) {
            apiClient.setRefreshToken(response.data.refreshToken);
        }

        return response;
    },

    /**
     * Logout user
     */
    async logout() {
        try {
            await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
        } finally {
            apiClient.clearTokens();
        }
    },

    /**
     * Refresh access token
     */
    async refreshToken(refreshToken: string) {
        const response = await apiClient.post<RefreshTokenResponse>(
            API_ENDPOINTS.AUTH.REFRESH,
            { refreshToken }
        );

        if (response.data?.token) {
            apiClient.setToken(response.data.token);
        }

        return response;
    },

    /**
     * Get current user
     */
    async getCurrentUser() {
        return apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
    },

    /**
     * Verify email
     */
    async verifyEmail(token: string) {
        return apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
    },

    /**
     * Request password reset
     */
    async forgotPassword(email: string) {
        return apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    },

    /**
     * Reset password
     */
    async resetPassword(token: string, newPassword: string) {
        return apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
            token,
            newPassword,
        });
    },

    /**
     * Initialize BankID authentication
     */
    async initBankID() {
        return apiClient.post(API_ENDPOINTS.AUTH.BANKID_INIT);
    },

    /**
     * Collect BankID result
     */
    async collectBankID(orderRef: string) {
        return apiClient.post(API_ENDPOINTS.AUTH.BANKID_COLLECT, { orderRef });
    },
};