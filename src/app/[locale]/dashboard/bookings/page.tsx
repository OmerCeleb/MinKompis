// src/app/[locale]/dashboard/bookings/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';
import { useBooking, useToast } from '@/hooks';

export default function DashboardBookingsPage() {
    const t = useTranslations('dashboard.bookings');
    const tCommon = useTranslations('common');
    const tToast = useTranslations('toast');
    const { showToast } = useToast();

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
            showToast(tToast('booking.accepted'), 'success');
        } else {
            showToast(result.error || tToast('booking.acceptError'), 'error');
        }
    };

    const handleReject = async (bookingId: string) => {
        showToast(tToast('booking.confirmDecline'), 'warning', {
            action: {
                label: tToast('common.confirm'),
                onClick: async () => {
                    const result = await rejectBooking(bookingId);
                    if (result.success) {
                        showToast(tToast('booking.rejected'), 'success');
                    } else {
                        showToast(result.error || tToast('booking.rejectError'), 'error');
                    }
                }
            }
        });
    };

    const handleComplete = async (bookingId: string) => {
        const result = await completeBooking(bookingId);
        if (result.success) {
            showToast(tToast('booking.completed'), 'success');
        } else {
            showToast(result.error || tToast('booking.completeError'), 'error');
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

            {/* Content */}
            <div className="space-y-4">
                {activeTab === 'pending' && (
                    <>
                        {pendingBookings.length === 0 ? (
                            <div className="text-center py-12 bg-neutral-50 rounded-lg">
                                <p className="text-neutral-600">{t('noPendingBookings')}</p>
                            </div>
                        ) : (
                            pendingBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex gap-4">
                                            <img
                                                src={booking.customerAvatar}
                                                alt={booking.customerName}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-neutral-900">
                                                    {booking.customerName}
                                                </h3>
                                                <p className="text-sm text-neutral-600">
                                                    {booking.serviceName}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                                            {t(booking.status.toLowerCase())}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                        <div>
                                            <span className="text-neutral-600">{t('date')}:</span>
                                            <span className="ml-2 font-medium">{booking.date}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">{t('time')}:</span>
                                            <span className="ml-2 font-medium">{booking.time}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">{t('duration')}:</span>
                                            <span className="ml-2 font-medium">{booking.duration} {t('minutes')}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">{t('price')}:</span>
                                            <span className="ml-2 font-medium">{booking.totalAmount} SEK</span>
                                        </div>
                                    </div>

                                    {booking.message && (
                                        <div className="mb-4 p-4 bg-neutral-50 rounded-lg">
                                            <p className="text-sm text-neutral-700">{booking.message}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <Button
                                            onClick={() => handleAccept(booking.id)}
                                            variant="primary"
                                            size="sm"
                                        >
                                            {t('accept')}
                                        </Button>
                                        <Button
                                            onClick={() => handleReject(booking.id)}
                                            variant="outline"
                                            size="sm"
                                        >
                                            {t('decline')}
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}

                {activeTab === 'upcoming' && (
                    <>
                        {upcomingBookings.length === 0 ? (
                            <div className="text-center py-12 bg-neutral-50 rounded-lg">
                                <p className="text-neutral-600">{t('noUpcomingBookings')}</p>
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
                                                src={booking.customerAvatar}
                                                alt={booking.customerName}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-neutral-900">
                                                    {booking.customerName}
                                                </h3>
                                                <p className="text-sm text-neutral-600">
                                                    {booking.serviceName}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                                            {t(booking.status.toLowerCase())}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                        <div>
                                            <span className="text-neutral-600">{t('date')}:</span>
                                            <span className="ml-2 font-medium">{booking.date}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">{t('time')}:</span>
                                            <span className="ml-2 font-medium">{booking.time}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">{t('duration')}:</span>
                                            <span className="ml-2 font-medium">{booking.duration} {t('minutes')}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">{t('price')}:</span>
                                            <span className="ml-2 font-medium">{booking.totalAmount} SEK</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => handleComplete(booking.id)}
                                        variant="primary"
                                        size="sm"
                                    >
                                        {t('markComplete')}
                                    </Button>
                                </div>
                            ))
                        )}
                    </>
                )}

                {activeTab === 'past' && (
                    <>
                        {pastBookings.length === 0 ? (
                            <div className="text-center py-12 bg-neutral-50 rounded-lg">
                                <p className="text-neutral-600">{t('noPastBookings')}</p>
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
                                                src={booking.customerAvatar}
                                                alt={booking.customerName}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-neutral-900">
                                                    {booking.customerName}
                                                </h3>
                                                <p className="text-sm text-neutral-600">
                                                    {booking.serviceName}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                                            {t(booking.status.toLowerCase())}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-neutral-600">{t('date')}:</span>
                                            <span className="ml-2 font-medium">{booking.date}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">{t('time')}:</span>
                                            <span className="ml-2 font-medium">{booking.time}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">{t('duration')}:</span>
                                            <span className="ml-2 font-medium">{booking.duration} {t('minutes')}</span>
                                        </div>
                                        <div>
                                            <span className="text-neutral-600">{t('price')}:</span>
                                            <span className="ml-2 font-medium">{booking.totalAmount} SEK</span>
                                        </div>
                                    </div>
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