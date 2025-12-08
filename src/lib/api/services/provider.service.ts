// src/lib/api/services/provider.service.ts
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
    Provider,
    ProviderListRequest,
    ProviderListResponse,
} from '../types';

export const providerService = {
    /**
     * Get list of providers with filters
     */
    async getProviders(params: ProviderListRequest = {}) {
        return apiClient.get<ProviderListResponse>(API_ENDPOINTS.PROVIDERS.LIST, {
            params,
        });
    },

    /**
     * Get provider by ID
     */
    async getProviderById(id: string) {
        return apiClient.get<Provider>(API_ENDPOINTS.PROVIDERS.GET(id));
    },

    /**
     * Get featured providers
     */
    async getFeaturedProviders(limit: number = 6) {
        return apiClient.get<Provider[]>(API_ENDPOINTS.PROVIDERS.FEATURED, {
            params: { limit },
        });
    },

    /**
     * Search providers
     */
    async searchProviders(query: string, params: ProviderListRequest = {}) {
        return apiClient.get<ProviderListResponse>(API_ENDPOINTS.PROVIDERS.SEARCH, {
            params: { q: query, ...params },
        });
    },

    /**
     * Create provider profile
     */
    async createProvider(data: Partial<Provider>) {
        return apiClient.post<Provider>(API_ENDPOINTS.PROVIDERS.CREATE, data);
    },

    /**
     * Update provider profile
     */
    async updateProvider(id: string, data: Partial<Provider>) {
        return apiClient.put<Provider>(API_ENDPOINTS.PROVIDERS.UPDATE(id), data);
    },

    /**
     * Delete provider profile
     */
    async deleteProvider(id: string) {
        return apiClient.delete(API_ENDPOINTS.PROVIDERS.DELETE(id));
    },

    /**
     * Get provider statistics
     */
    async getProviderStats(id: string) {
        return apiClient.get(API_ENDPOINTS.PROVIDERS.STATS(id));
    },
};