// src/lib/api/services/favorite.service.ts
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type { Favorite, FavoriteListResponse } from '../types';

export const favoriteService = {
    /**
     * Get all favorites
     */
    async getFavorites() {
        return apiClient.get<FavoriteListResponse>(API_ENDPOINTS.FAVORITES.LIST);
    },

    /**
     * Add provider to favorites
     */
    async addFavorite(providerId: string) {
        return apiClient.post<Favorite>(API_ENDPOINTS.FAVORITES.ADD, {
            providerId,
        });
    },

    /**
     * Remove provider from favorites
     */
    async removeFavorite(providerId: string) {
        return apiClient.delete(API_ENDPOINTS.FAVORITES.REMOVE(providerId));
    },
};