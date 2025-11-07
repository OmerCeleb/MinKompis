// src/app/[locale]/customer/bookings/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';
import { useBooking } from '@/hooks';

export default function CustomerBookingsPage() {
    const t = useTranslations('customer.bookings');
    const tCommon = useTranslations('common');

    const {
        bookings,
        loading,
        error,
        getUpcomingBookings,
        getPastBookings,
        cancelBooking
    } = useBooking();

    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    const upcomingBookings = getUpcomingBookings();
    const pastBookings = getPastBookings();

    const handleCancelBooking = async (bookingId: string) => {
        const confirmed = window.confirm('Are you sure you want to cancel this booking?');
        if (!confirmed) return;

        const result = await cancelBooking(bookingId);
        if (result.success) {
            // TODO: Show success toast
            console.log('Booking cancelled successfully');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'ACCEPTED':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'REJECTED':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'COMPLETED':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'CANCELLED':
                return 'bg-neutral-100 text-neutral-800 border-neutral-200';
            default:
                return 'bg-neutral-100 text-neutral-800 border-neutral-200';
        }
    };

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">Error loading bookings: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                    My Bookings
                </h1>
                <p className="text-neutral-600">
                    View and manage your booking requests and appointments
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-neutral-200">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                        activeTab === 'upcoming'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-600 hover:text-neutral-900'
                    }`}
                >
                    Upcoming ({upcomingBookings.length})
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                        activeTab === 'past'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-600 hover:text-neutral-900'
                    }`}
                >
                    Past ({pastBookings.length})
                </button>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 h-48 animate-pulse"></div>
                    ))}
                </div>
            ) : (
                /* Bookings List */
                <div className="space-y-4">

                    {/* Upcoming Bookings */}
                    {activeTab === 'upcoming' && (
                        <>
                            {upcomingBookings.length === 0 ? (
                                <div className="bg-white rounded-xl p-12 text-center">
                                    <div className="text-6xl mb-4">📅</div>
                                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                        No upcoming bookings
                                    </h3>
                                    <p className="text-neutral-600 mb-6">
                                        Start exploring services and book your first appointment
                                    </p>
                                    <Link href="/services">
                                        <Button>Browse Services</Button>
                                    </Link>
                                </div>
                            ) : (
                                upcomingBookings.map(booking => (
                                    <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex gap-4">
                                                <img
                                                    src={booking.providerAvatar}
                                                    alt={booking.providerName}
                                                    className="w-16 h-16 rounded-full"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-lg text-neutral-900">
                                                        {booking.serviceName}
                                                    </h3>
                                                    <p className="text-sm text-neutral-600">
                                                        with {booking.providerName}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                                            <div>
                                                <span className="text-neutral-500 block mb-1">Date</span>
                                                <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <span className="text-neutral-500 block mb-1">Time</span>
                                                <p className="font-medium">{booking.time}</p>
                                            </div>
                                            <div>
                                                <span className="text-neutral-500 block mb-1">Duration</span>
                                                <p className="font-medium">{booking.duration} min</p>
                                            </div>
                                            <div>
                                                <span className="text-neutral-500 block mb-1">Price</span>
                                                <p className="font-medium">{booking.totalAmount} SEK</p>
                                            </div>
                                        </div>

                                        {booking.message && (
                                            <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                                                <p className="text-sm font-medium text-neutral-600 mb-1">Your message:</p>
                                                <p className="text-sm text-neutral-700">{booking.message}</p>
                                            </div>
                                        )}

                                        <div className="flex gap-3">
                                            <Link href={`/providers/${booking.providerId}`} className="flex-1">
                                                <Button variant="outline" fullWidth>
                                                    View Provider
                                                </Button>
                                            </Link>
                                            {booking.status === 'PENDING' && (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleCancelBooking(booking.id)}
                                                    disabled={loading}
                                                    className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                                                >
                                                    Cancel Request
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </>
                    )}

                    {/* Past Bookings */}
                    {activeTab === 'past' && (
                        <>
                            {pastBookings.length === 0 ? (
                                <div className="bg-white rounded-xl p-12 text-center">
                                    <div className="text-6xl mb-4">🕐</div>
                                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                        No past bookings
                                    </h3>
                                    <p className="text-neutral-600">
                                        Your completed bookings will appear here
                                    </p>
                                </div>
                            ) : (
                                pastBookings.map(booking => (
                                    <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex gap-4 flex-1">
                                                <img
                                                    src={booking.providerAvatar}
                                                    alt={booking.providerName}
                                                    className="w-12 h-12 rounded-full"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-neutral-900">
                                                        {booking.serviceName}
                                                    </h3>
                                                    <p className="text-sm text-neutral-600 mb-2">
                                                        {booking.providerName} • {new Date(booking.date).toLocaleDateString()}
                                                    </p>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-neutral-500">Total</p>
                                                <p className="font-semibold text-lg">{booking.totalAmount} SEK</p>
                                            </div>
                                        </div>

                                        {booking.status === 'COMPLETED' && (
                                            <div className="mt-4 pt-4 border-t border-neutral-200">
                                                <Button variant="outline" fullWidth size="sm">
                                                    Leave a Review
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}