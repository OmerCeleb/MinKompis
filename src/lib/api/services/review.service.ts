// src/lib/api/services/review.service.ts
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
    Review,
    CreateReviewRequest,
    ReplyToReviewRequest,
    ReviewListRequest,
    ReviewListResponse,
} from '../types';

export const reviewService = {
    /**
     * Get all reviews
     */
    async getReviews(params: ReviewListRequest = {}) {
        return apiClient.get<ReviewListResponse>(API_ENDPOINTS.REVIEWS.LIST, {
            params,
        });
    },

    /**
     * Get review by ID
     */
    async getReviewById(id: string) {
        return apiClient.get<Review>(API_ENDPOINTS.REVIEWS.GET(id));
    },

    /**
     * Create new review
     */
    async createReview(data: CreateReviewRequest) {
        return apiClient.post<Review>(API_ENDPOINTS.REVIEWS.CREATE, data);
    },

    /**
     * Update review
     */
    async updateReview(id: string, data: Partial<CreateReviewRequest>) {
        return apiClient.put<Review>(API_ENDPOINTS.REVIEWS.UPDATE(id), data);
    },

    /**
     * Delete review
     */
    async deleteReview(id: string) {
        return apiClient.delete(API_ENDPOINTS.REVIEWS.DELETE(id));
    },

    /**
     * Get reviews by provider
     */
    async getReviewsByProvider(providerId: string, params: ReviewListRequest = {}) {
        return apiClient.get<ReviewListResponse>(
            API_ENDPOINTS.REVIEWS.BY_PROVIDER(providerId),
            { params }
        );
    },

    /**
     * Reply to review (provider only)
     */
    async replyToReview(reviewId: string, data: ReplyToReviewRequest) {
        return apiClient.post<Review>(
            API_ENDPOINTS.REVIEWS.REPLY(reviewId),
            data
        );
    },
};