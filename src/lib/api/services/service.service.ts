// src/lib/api/services/service.service.ts
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
    Service,
    CreateServiceRequest,
    UpdateServiceRequest,
} from '../types';

export const serviceService = {
    /**
     * Get all services
     */
    async getServices() {
        return apiClient.get<Service[]>(API_ENDPOINTS.SERVICES.LIST);
    },

    /**
     * Get service by ID
     */
    async getServiceById(id: string) {
        return apiClient.get<Service>(API_ENDPOINTS.SERVICES.GET(id));
    },

    /**
     * Create new service
     */
    async createService(data: CreateServiceRequest) {
        return apiClient.post<Service>(API_ENDPOINTS.SERVICES.CREATE, data);
    },

    /**
     * Update service
     */
    async updateService(id: string, data: UpdateServiceRequest) {
        return apiClient.put<Service>(API_ENDPOINTS.SERVICES.UPDATE(id), data);
    },

    /**
     * Delete service
     */
    async deleteService(id: string) {
        return apiClient.delete(API_ENDPOINTS.SERVICES.DELETE(id));
    },

    /**
     * Get services by provider
     */
    async getServicesByProvider(providerId: string) {
        return apiClient.get<Service[]>(
            API_ENDPOINTS.SERVICES.BY_PROVIDER(providerId)
        );
    },
};