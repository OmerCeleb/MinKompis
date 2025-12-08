// src/lib/api/services/booking.service.ts
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import type {
    Booking,
    CreateBookingRequest,
    UpdateBookingStatusRequest,
    BookingListRequest,
    BookingListResponse,
} from '../types';

export const bookingService = {
    /**
     * Get all bookings
     */
    async getBookings(params: BookingListRequest = {}) {
        return apiClient.get<BookingListResponse>(API_ENDPOINTS.BOOKINGS.LIST, {
            params,
        });
    },

    /**
     * Get booking by ID
     */
    async getBookingById(id: string) {
        return apiClient.get<Booking>(API_ENDPOINTS.BOOKINGS.GET(id));
    },

    /**
     * Create new booking
     */
    async createBooking(data: CreateBookingRequest) {
        return apiClient.post<Booking>(API_ENDPOINTS.BOOKINGS.CREATE, data);
    },

    /**
     * Update booking status
     */
    async updateBookingStatus(id: string, data: UpdateBookingStatusRequest) {
        return apiClient.patch<Booking>(API_ENDPOINTS.BOOKINGS.UPDATE(id), data);
    },

    /**
     * Cancel booking
     */
    async cancelBooking(id: string) {
        return apiClient.post<Booking>(API_ENDPOINTS.BOOKINGS.CANCEL(id));
    },

    /**
     * Accept booking (provider)
     */
    async acceptBooking(id: string) {
        return apiClient.post<Booking>(API_ENDPOINTS.BOOKINGS.ACCEPT(id));
    },

    /**
     * Reject booking (provider)
     */
    async rejectBooking(id: string) {
        return apiClient.post<Booking>(API_ENDPOINTS.BOOKINGS.REJECT(id));
    },

    /**
     * Complete booking (provider)
     */
    async completeBooking(id: string) {
        return apiClient.post<Booking>(API_ENDPOINTS.BOOKINGS.COMPLETE(id));
    },

    /**
     * Get customer bookings
     */
    async getCustomerBookings(params: BookingListRequest = {}) {
        return apiClient.get<BookingListResponse>(API_ENDPOINTS.BOOKINGS.CUSTOMER, {
            params,
        });
    },

    /**
     * Get provider bookings
     */
    async getProviderBookings(params: BookingListRequest = {}) {
        return apiClient.get<BookingListResponse>(API_ENDPOINTS.BOOKINGS.PROVIDER, {
            params,
        });
    },
};
