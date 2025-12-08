// src/lib/api/services/user.service.ts
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { User, UpdateProfileRequest, ChangePasswordRequest } from '../types';

export const userService = {
    /**
     * Get user profile
     */
    async getProfile() {
        return apiClient.get<User>(API_ENDPOINTS.USERS.PROFILE);
    },

    /**
     * Update user profile
     */
    async updateProfile(data: UpdateProfileRequest) {
        return apiClient.put<User>(API_ENDPOINTS.USERS.UPDATE_PROFILE, data);
    },

    /**
     * Change password
     */
    async changePassword(data: ChangePasswordRequest) {
        return apiClient.post(API_ENDPOINTS.USERS.CHANGE_PASSWORD, data);
    },

    /**
     * Upload avatar
     */
    async uploadAvatar(file: File, onProgress?: (progress: number) => void) {
        return apiClient.uploadFile<{ url: string }>(
            API_ENDPOINTS.USERS.UPLOAD_AVATAR,
            file,
            onProgress
        );
    },

    /**
     * Delete account
     */
    async deleteAccount() {
        return apiClient.delete(API_ENDPOINTS.USERS.DELETE_ACCOUNT);
    },
};