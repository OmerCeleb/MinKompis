// src/lib/api/services/upload.service.ts
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { UploadResponse } from '../types';

export const uploadService = {
    /**
     * Upload image
     */
    async uploadImage(
        file: File,
        onProgress?: (progress: number) => void
    ) {
        return apiClient.uploadFile<UploadResponse>(
            API_ENDPOINTS.UPLOAD.IMAGE,
            file,
            onProgress
        );
    },

    /**
     * Upload document
     */
    async uploadDocument(
        file: File,
        onProgress?: (progress: number) => void
    ) {
        return apiClient.uploadFile<UploadResponse>(
            API_ENDPOINTS.UPLOAD.DOCUMENT,
            file,
            onProgress
        );
    },

    /**
     * Upload avatar
     */
    async uploadAvatar(
        file: File,
        onProgress?: (progress: number) => void
    ) {
        return apiClient.uploadFile<UploadResponse>(
            API_ENDPOINTS.UPLOAD.AVATAR,
            file,
            onProgress
        );
    },

    /**
     * Validate file before upload
     */
    validateFile(file: File, maxSize: number, allowedTypes: string[]): {
        valid: boolean;
        error?: string;
    } {
        if (file.size > maxSize) {
            return {
                valid: false,
                error: `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`,
            };
        }

        if (!allowedTypes.includes(file.type)) {
            return {
                valid: false,
                error: `File type ${file.type} is not allowed`,
            };
        }

        return { valid: true };
    },
};