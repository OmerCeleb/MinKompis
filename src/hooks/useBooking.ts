// src/hooks/useBooking.ts
import { useState, useEffect, useCallback } from 'react';

export interface Booking {
    id: string;
    serviceId: string;
    providerId: string;
    customerId: string;
    providerName: string;
    providerAvatar: string;
    serviceName: string;
    date: string;
    time: string;
    duration: number;
    totalAmount: number;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
    message?: string;
    createdAt: string;
    customerName?: string;
    customerAvatar?: string;
}

export interface CreateBookingData {
    serviceId: string;
    providerId: string;
    date: string;
    time: string;
    duration: number;
    message?: string;
    totalAmount: number;
}

interface BookingState {
    bookings: Booking[];
    loading: boolean;
    error: string | null;
}

export function useBooking() {
    const [state, setState] = useState<BookingState>({
        bookings: [],
        loading: true,
        error: null
    });

    // Fetch bookings
    const fetchBookings = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // TODO: Backend API call
            // const response = await fetch('/api/bookings');
            // const data = await response.json();

            // Mock data
            await new Promise(resolve => setTimeout(resolve, 500));

            const mockBookings: Booking[] = [
                {
                    id: '1',
                    serviceId: 's1',
                    providerId: 'p1',
                    customerId: 'c1',
                    providerName: 'Ayşe Yılmaz',
                    providerAvatar: 'https://i.pravatar.cc/150?img=1',
                    serviceName: 'Swedish Language Lessons',
                    date: '2024-11-15',
                    time: '14:00',
                    duration: 60,
                    totalAmount: 350,
                    status: 'PENDING',
                    message: 'Hi, I would like to start learning Swedish. I am a complete beginner.',
                    createdAt: '2024-11-07T10:00:00'
                },
                {
                    id: '2',
                    serviceId: 's2',
                    providerId: 'p2',
                    customerId: 'c1',
                    providerName: 'Mehmet Demir',
                    providerAvatar: 'https://i.pravatar.cc/150?img=12',
                    serviceName: 'Home Cleaning Service',
                    date: '2024-11-10',
                    time: '10:00',
                    duration: 120,
                    totalAmount: 800,
                    status: 'ACCEPTED',
                    createdAt: '2024-11-05T15:30:00'
                }
            ];

            setState({
                bookings: mockBookings,
                loading: false,
                error: null
            });
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.message || 'Failed to fetch bookings'
            }));
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    // Create booking
    const createBooking = useCallback(async (data: CreateBookingData) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // TODO: Backend API call
            // const response = await fetch('/api/bookings', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(data)
            // });
            // const result = await response.json();

            // Mock creation
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newBooking: Booking = {
                id: Date.now().toString(),
                ...data,
                providerName: 'Provider Name',
                providerAvatar: 'https://i.pravatar.cc/150?img=1',
                serviceName: 'Service Name',
                customerId: 'current-user-id',
                status: 'PENDING',
                createdAt: new Date().toISOString()
            };

            setState(prev => ({
                ...prev,
                bookings: [newBooking, ...prev.bookings],
                loading: false
            }));

            return { success: true, booking: newBooking };
        } catch (error: any) {
            setState(prev => ({ ...prev, loading: false, error: error.message }));
            return { success: false, error: error.message };
        }
    }, []);

    // Update booking status
    const updateBookingStatus = useCallback(async (
        bookingId: string,
        status: Booking['status']
    ) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // TODO: Backend API call
            // await fetch(`/api/bookings/${bookingId}/status`, {
            //   method: 'PATCH',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ status })
            // });

            await new Promise(resolve => setTimeout(resolve, 500));

            setState(prev => ({
                ...prev,
                bookings: prev.bookings.map(b =>
                    b.id === bookingId ? { ...b, status } : b
                ),
                loading: false
            }));

            return { success: true };
        } catch (error: any) {
            setState(prev => ({ ...prev, loading: false, error: error.message }));
            return { success: false, error: error.message };
        }
    }, []);

    // Cancel booking
    const cancelBooking = useCallback(async (bookingId: string) => {
        return updateBookingStatus(bookingId, 'CANCELLED');
    }, [updateBookingStatus]);

    // Accept booking (for providers)
    const acceptBooking = useCallback(async (bookingId: string) => {
        return updateBookingStatus(bookingId, 'ACCEPTED');
    }, [updateBookingStatus]);

    // Reject booking (for providers)
    const rejectBooking = useCallback(async (bookingId: string) => {
        return updateBookingStatus(bookingId, 'REJECTED');
    }, [updateBookingStatus]);

    // Complete booking (for providers)
    const completeBooking = useCallback(async (bookingId: string) => {
        return updateBookingStatus(bookingId, 'COMPLETED');
    }, [updateBookingStatus]);

    // Get booking by ID
    const getBookingById = useCallback((id: string): Booking | undefined => {
        return state.bookings.find(b => b.id === id);
    }, [state.bookings]);

    // Filter bookings by status
    const getBookingsByStatus = useCallback((status: Booking['status']): Booking[] => {
        return state.bookings.filter(b => b.status === status);
    }, [state.bookings]);

    // Get upcoming bookings
    const getUpcomingBookings = useCallback((): Booking[] => {
        const now = new Date();
        return state.bookings
            .filter(b => {
                const bookingDate = new Date(b.date);
                return bookingDate > now && (b.status === 'ACCEPTED' || b.status === 'PENDING');
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [state.bookings]);

    // Get past bookings
    const getPastBookings = useCallback((): Booking[] => {
        const now = new Date();
        return state.bookings
            .filter(b => {
                const bookingDate = new Date(b.date);
                return bookingDate <= now || b.status === 'COMPLETED';
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [state.bookings]);

    return {
        bookings: state.bookings,
        loading: state.loading,
        error: state.error,
        createBooking,
        updateBookingStatus,
        cancelBooking,
        acceptBooking,
        rejectBooking,
        completeBooking,
        getBookingById,
        getBookingsByStatus,
        getUpcomingBookings,
        getPastBookings,
        refetch: fetchBookings
    };
}