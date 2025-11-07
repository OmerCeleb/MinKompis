// src/app/[locale]/dashboard/bookings/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';
import { useBooking } from '@/hooks';

export default function DashboardBookingsPage() {
    const t = useTranslations('dashboard.bookings');
    const tCommon = useTranslations('common');

    const {
        bookings,
        loading,
        error,
        getUpcomingBookings,
        getPastBookings,
        getBookingsByStatus,
        acceptBooking,
        rejectBooking,
        completeBooking
    } = useBooking();

    const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'pending'>('upcoming');
    const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

    const upcomingBookings = getUpcomingBookings();
    const pastBookings = getPastBookings();
    const pendingBookings = getBookingsByStatus('PENDING');

    const handleAccept = async (bookingId: string) => {
        const result = await acceptBooking(bookingId);
        if (result.success) {
            // TODO: Show success toast
            console.log('Booking accepted!');
        }
    };

    const handleReject = async (bookingId: string) => {
        const confirmed = window.confirm(t('confirmDecline'));
        if (!confirmed) return;

        const result = await rejectBooking(bookingId);
        if (result.success) {
            // TODO: Show success toast
            console.log('Booking rejected');
        }
    };

    const handleComplete = async (bookingId: string) => {
        const result = await completeBooking(bookingId);
        if (result.success) {
            // TODO: Show success toast
            console.log('Booking completed!');
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
        <div className="p-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                    {t('title')}
                </h1>
                <p className="text-neutral-600">
                    {t('subtitle')}
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-neutral-200">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                        activeTab === 'pending'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-600 hover:text-neutral-900'
                    }`}
                >
                    {t('pending')} ({pendingBookings.length})
                </button>
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                        activeTab === 'upcoming'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-600 hover:text-neutral-900'
                    }`}
                >
                    {t('upcoming')} ({upcomingBookings.length})
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                        activeTab === 'past'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-600 hover:text-neutral-900'
                    }`}
                >
                    {t('past')} ({pastBookings.length})
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
                    {activeTab === 'pending' && pendingBookings.length === 0 && (
                        <div className="bg-white rounded-xl p-12 text-center">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                {t('noBookings')}
                            </h3>
                            <p className="text-neutral-600">
                                {t('noBookingsDesc')}
                            </p>
                        </div>
                    )}

                    {activeTab === 'upcoming' && upcomingBookings.length === 0 && (
                        <div className="bg-white rounded-xl p-12 text-center">
                            <div className="text-6xl mb-4">📅</div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                {t('noBookings')}
                            </h3>
                            <p className="text-neutral-600">
                                {t('noBookingsDesc')}
                            </p>
                        </div>
                    )}

                    {activeTab === 'past' && pastBookings.length === 0 && (
                        <div className="bg-white rounded-xl p-12 text-center">
                            <div className="text-6xl mb-4">🕐</div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                {t('noBookings')}
                            </h3>
                            <p className="text-neutral-600">
                                {t('noBookingsDesc')}
                            </p>
                        </div>
                    )}

                    {/* Pending Bookings */}
                    {activeTab === 'pending' && pendingBookings.map(booking => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex gap-4">
                                    <img
                                        src={booking.customerAvatar || 'https://i.pravatar.cc/150?img=10'}
                                        alt={booking.customerName}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-neutral-900">
                                            {booking.serviceName}
                                        </h3>
                                        <p className="text-sm text-neutral-600">
                                            Customer: {booking.customerName || 'New Customer'}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                  {t(booking.status.toLowerCase())}
                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                                <div>
                                    <span className="text-neutral-500">{t('date')}</span>
                                    <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <span className="text-neutral-500">{t('time')}</span>
                                    <p className="font-medium">{booking.time}</p>
                                </div>
                                <div>
                                    <span className="text-neutral-500">{t('price')}</span>
                                    <p className="font-medium">{booking.totalAmount} SEK</p>
                                </div>
                            </div>

                            {booking.message && (
                                <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                                    <p className="text-sm text-neutral-600 font-medium mb-1">{t('notes')}</p>
                                    <p className="text-sm text-neutral-700">{booking.message}</p>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Button
                                    onClick={() => handleAccept(booking.id)}
                                    disabled={loading}
                                    className="flex-1"
                                >
                                    {t('accept')}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleReject(booking.id)}
                                    disabled={loading}
                                    className="flex-1"
                                >
                                    {t('decline')}
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Upcoming Bookings */}
                    {activeTab === 'upcoming' && upcomingBookings.map(booking => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex gap-4">
                                    <img
                                        src={booking.customerAvatar || 'https://i.pravatar.cc/150?img=10'}
                                        alt={booking.customerName}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-neutral-900">
                                            {booking.serviceName}
                                        </h3>
                                        <p className="text-sm text-neutral-600">
                                            {booking.customerName || 'Customer'}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                  {t(booking.status.toLowerCase())}
                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                                <div>
                                    <span className="text-neutral-500">{t('date')}</span>
                                    <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <span className="text-neutral-500">{t('time')}</span>
                                    <p className="font-medium">{booking.time}</p>
                                </div>
                                <div>
                                    <span className="text-neutral-500">{t('duration')}</span>
                                    <p className="font-medium">{booking.duration} min</p>
                                </div>
                            </div>

                            {booking.status === 'ACCEPTED' && (
                                <Button
                                    onClick={() => handleComplete(booking.id)}
                                    disabled={loading}
                                    fullWidth
                                >
                                    {t('markComplete')}
                                </Button>
                            )}
                        </div>
                    ))}

                    {/* Past Bookings */}
                    {activeTab === 'past' && pastBookings.map(booking => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4 flex-1">
                                    <img
                                        src={booking.customerAvatar || 'https://i.pravatar.cc/150?img=10'}
                                        alt={booking.customerName}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-neutral-900">
                                            {booking.serviceName}
                                        </h3>
                                        <p className="text-sm text-neutral-600 mb-2">
                                            {booking.customerName || 'Customer'} • {new Date(booking.date).toLocaleDateString()}
                                        </p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                      {t(booking.status.toLowerCase())}
                    </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-neutral-500">{t('price')}</p>
                                    <p className="font-semibold text-lg">{booking.totalAmount} SEK</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}