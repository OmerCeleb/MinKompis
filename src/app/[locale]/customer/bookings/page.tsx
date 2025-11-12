// src/app/[locale]/customer/bookings/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';
import { useBooking, useToast } from '@/hooks';

export default function CustomerBookingsPage() {
    const t = useTranslations('customer.bookings');
    const tCommon = useTranslations('common');
    const tToast = useTranslations('toast');
    const { showToast } = useToast();

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
        showToast(tToast('booking.confirmCancel'), 'warning', {
            action: {
                label: tToast('common.confirm'),
                onClick: async () => {
                    const result = await cancelBooking(bookingId);
                    if (result.success) {
                        showToast(tToast('booking.cancelled'), 'success');
                    } else {
                        showToast(result.error || tToast('booking.cancelError'), 'error');
                    }
                }
            }
        });
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

            {/* Content */}
            <div className="space-y-4">
                {activeTab === 'upcoming' && (
                    <>
                        {upcomingBookings.length === 0 ? (
                            <div className="text-center py-12 bg-neutral-50 rounded-lg">
                                <p className="text-neutral-600 mb-4">You don't have any upcoming bookings</p>
                                <Link href="/services">
                                    <Button>Browse Services</Button>
                                </Link>
                            </div>
                        ) : (
                            upcomingBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex gap-4">
                                            <img
                                                src={booking.providerAvatar}
                                                alt={booking.providerName}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-neutral-900">
                                                    {booking.providerName}
                                                </h3>
                                                <p className="text-sm text-neutral-600">
                                                    {booking.serviceName}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                        <div>
                                            <span className="text-neutral-600">Date:</span>
                                            <span className="ml-2 font-medium">{booking.date}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">Time:</span>
                                            <span className="ml-2 font-medium">{booking.time}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">Duration:</span>
                                            <span className="ml-2 font-medium">{booking.duration} minutes</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">Total:</span>
                                            <span className="ml-2 font-medium">{booking.totalAmount} SEK</span>
                                        </div>
                                    </div>

                                    {booking.status === 'PENDING' && (
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={() => handleCancelBooking(booking.id)}
                                                variant="outline"
                                                size="sm"
                                            >
                                                Cancel Booking
                                            </Button>
                                            <Link href={`/customer/messages?conversation=${booking.providerId}`}>
                                                <Button variant="primary" size="sm">
                                                    Message Provider
                                                </Button>
                                            </Link>
                                        </div>
                                    )}

                                    {booking.status === 'ACCEPTED' && (
                                        <Link href={`/customer/messages?conversation=${booking.providerId}`}>
                                            <Button variant="primary" size="sm">
                                                Message Provider
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            ))
                        )}
                    </>
                )}

                {activeTab === 'past' && (
                    <>
                        {pastBookings.length === 0 ? (
                            <div className="text-center py-12 bg-neutral-50 rounded-lg">
                                <p className="text-neutral-600">You don't have any past bookings</p>
                            </div>
                        ) : (
                            pastBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="bg-white border border-neutral-200 rounded-lg p-6"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex gap-4">
                                            <img
                                                src={booking.providerAvatar}
                                                alt={booking.providerName}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-neutral-900">
                                                    {booking.providerName}
                                                </h3>
                                                <p className="text-sm text-neutral-600">
                                                    {booking.serviceName}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                        <div>
                                            <span className="text-neutral-600">Date:</span>
                                            <span className="ml-2 font-medium">{booking.date}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">Time:</span>
                                            <span className="ml-2 font-medium">{booking.time}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">Duration:</span>
                                            <span className="ml-2 font-medium">{booking.duration} minutes</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">Total:</span>
                                            <span className="ml-2 font-medium">{booking.totalAmount} SEK</span>
                                        </div>
                                    </div>

                                    {booking.status === 'COMPLETED' && (
                                        <Link href={`/provider/${booking.providerId}?review=true`}>
                                            <Button variant="primary" size="sm">
                                                Leave a Review
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>

            {loading && (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
            )}
        </div>
    );
}