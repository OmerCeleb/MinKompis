// src/app/[locale]/customer/bookings/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared';
import { useToast } from '@/hooks';

interface Booking {
    id: string;
    provider: {
        id: string;
        name: string;
        avatar: string;
        service: string;
    };
    date: string;
    time: string;
    duration: number;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    price: number;
    message?: string;
    createdAt: string;
}

export default function CustomerBookingsPage() {
    const t = useTranslations('customer.bookings');
    const tCommon = useTranslations('common');
    const { showToast } = useToast();

    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    // Mock data - Backend'den gelecek
    const [bookings] = useState<Booking[]>([
        {
            id: '1',
            provider: {
                id: '1',
                name: 'Ayşe Yılmaz',
                avatar: 'https://i.pravatar.cc/150?img=1',
                service: 'Swedish Language Lessons - Beginner'
            },
            date: '2024-11-20',
            time: '14:00',
            duration: 60,
            status: 'CONFIRMED',
            price: 450,
            message: 'Looking forward to learning Swedish!',
            createdAt: '2024-11-10'
        },
        {
            id: '2',
            provider: {
                id: '3',
                name: 'Elena Popov',
                avatar: 'https://i.pravatar.cc/150?img=20',
                service: 'Document Translation - Turkish to Swedish'
            },
            date: '2024-11-22',
            time: '10:00',
            duration: 90,
            status: 'PENDING',
            price: 600,
            message: 'Need my diploma translated for university application.',
            createdAt: '2024-11-12'
        },
        {
            id: '3',
            provider: {
                id: '2',
                name: 'Mohamed Hassan',
                avatar: 'https://i.pravatar.cc/150?img=12',
                service: 'Home Cleaning Service'
            },
            date: '2024-11-15',
            time: '09:00',
            duration: 120,
            status: 'COMPLETED',
            price: 560,
            createdAt: '2024-11-10'
        },
        {
            id: '4',
            provider: {
                id: '4',
                name: 'Ali Demir',
                avatar: 'https://i.pravatar.cc/150?img=14',
                service: 'Personal Training Session'
            },
            date: '2024-11-08',
            time: '18:00',
            duration: 60,
            status: 'COMPLETED',
            price: 400,
            createdAt: '2024-11-01'
        },
        {
            id: '5',
            provider: {
                id: '1',
                name: 'Ayşe Yılmaz',
                avatar: 'https://i.pravatar.cc/150?img=1',
                service: 'Swedish Language Lessons - Beginner'
            },
            date: '2024-11-05',
            time: '14:00',
            duration: 60,
            status: 'CANCELLED',
            price: 450,
            createdAt: '2024-10-28'
        }
    ]);

    const statusColors = {
        PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        CONFIRMED: 'bg-green-100 text-green-800 border-green-200',
        COMPLETED: 'bg-blue-100 text-blue-800 border-blue-200',
        CANCELLED: 'bg-red-100 text-red-800 border-red-200'
    };

    const statusIcons = {
        PENDING: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        CONFIRMED: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
        ),
        COMPLETED: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
        ),
        CANCELLED: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
        )
    };

    // Filter bookings
    const upcomingBookings = bookings.filter(b =>
        (b.status === 'PENDING' || b.status === 'CONFIRMED') &&
        new Date(b.date) >= new Date()
    );

    const pastBookings = bookings.filter(b =>
        b.status === 'COMPLETED' ||
        b.status === 'CANCELLED' ||
        (new Date(b.date) < new Date() && b.status !== 'PENDING' && b.status !== 'CONFIRMED')
    );

    const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

    const handleCancelBooking = async (bookingId: string) => {
        if (!confirm(t('confirmCancel'))) return;

        try {
            // TODO: Backend API call
            await new Promise(resolve => setTimeout(resolve, 500));
            showToast(t('cancelSuccess'), 'success');
        } catch (error) {
            showToast(t('cancelError'), 'error');
        }
    };

    const handleReschedule = (bookingId: string) => {
        // TODO: Open reschedule modal
        showToast('Reschedule feature coming soon', 'info');
    };

    const handleLeaveReview = (bookingId: string) => {
        // TODO: Redirect to review page or open modal
        showToast('Review feature coming soon', 'info');
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                            {t('title')}
                        </h1>
                        <p className="text-neutral-600">{t('subtitle')}</p>
                    </div>
                    <Link href="/services">
                        <Button size="lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {t('newBooking')}
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200">
                <div className="border-b border-neutral-200">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`flex-1 px-6 py-4 font-semibold transition-all relative ${
                                activeTab === 'upcoming'
                                    ? 'text-primary-600'
                                    : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <span>{t('upcoming')}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                    activeTab === 'upcoming'
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'bg-neutral-100 text-neutral-600'
                                }`}>
                                    {upcomingBookings.length}
                                </span>
                            </div>
                            {activeTab === 'upcoming' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab('past')}
                            className={`flex-1 px-6 py-4 font-semibold transition-all relative ${
                                activeTab === 'past'
                                    ? 'text-primary-600'
                                    : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <span>{t('past')}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                    activeTab === 'past'
                                        ? 'bg-primary-100 text-primary-700'
                                        : 'bg-neutral-100 text-neutral-600'
                                }`}>
                                    {pastBookings.length}
                                </span>
                            </div>
                            {activeTab === 'past' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Bookings List */}
                <div className="p-6">
                    {displayedBookings.length > 0 ? (
                        <div className="space-y-4">
                            {displayedBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="border-2 border-neutral-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-sm transition-all"
                                >
                                    {/* Header */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <Link href={`/providers/${booking.provider.id}`}>
                                            <img
                                                src={booking.provider.avatar}
                                                alt={booking.provider.name}
                                                className="w-16 h-16 rounded-full object-cover ring-2 ring-neutral-100 hover:ring-primary-300 transition-all cursor-pointer"
                                            />
                                        </Link>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <div>
                                                    <Link
                                                        href={`/providers/${booking.provider.id}`}
                                                        className="font-bold text-neutral-900 hover:text-primary-600 transition-colors"
                                                    >
                                                        {booking.provider.name}
                                                    </Link>
                                                    <p className="text-sm text-neutral-600">{booking.provider.service}</p>
                                                </div>
                                                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${statusColors[booking.status]}`}>
                                                    {statusIcons[booking.status]}
                                                    {t(`status.${booking.status.toLowerCase()}`)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="grid sm:grid-cols-3 gap-4 mb-4 p-4 bg-neutral-50 rounded-lg">
                                        <div className="flex items-center gap-2 text-sm">
                                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <div className="text-xs text-neutral-500">{t('date')}</div>
                                                <div className="font-medium text-neutral-900">{booking.date}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <div className="text-xs text-neutral-500">{t('time')}</div>
                                                <div className="font-medium text-neutral-900">{booking.time} ({booking.duration} min)</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <div className="text-xs text-neutral-500">{t('price')}</div>
                                                <div className="font-bold text-primary-600">{booking.price} SEK</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    {booking.message && (
                                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                            <p className="text-sm text-blue-900 flex items-start gap-2">
                                                <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                                </svg>
                                                <span className="italic">{booking.message}</span>
                                            </p>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-3">
                                        {booking.status === 'PENDING' && (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleCancelBooking(booking.id)}
                                                    className="text-red-600 border-red-300 hover:bg-red-50"
                                                >
                                                    {t('cancel')}
                                                </Button>
                                                <Link href={`/customer/messages?provider=${booking.provider.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        {t('contactProvider')}
                                                    </Button>
                                                </Link>
                                            </>
                                        )}
                                        {booking.status === 'CONFIRMED' && (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleReschedule(booking.id)}
                                                >
                                                    {t('reschedule')}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleCancelBooking(booking.id)}
                                                    className="text-red-600 border-red-300 hover:bg-red-50"
                                                >
                                                    {t('cancel')}
                                                </Button>
                                                <Link href={`/customer/messages?provider=${booking.provider.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        {t('message')}
                                                    </Button>
                                                </Link>
                                            </>
                                        )}
                                        {booking.status === 'COMPLETED' && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleLeaveReview(booking.id)}
                                                >
                                                    {t('leaveReview')}
                                                </Button>
                                                <Link href={`/providers/${booking.provider.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        {t('bookAgain')}
                                                    </Button>
                                                </Link>
                                            </>
                                        )}
                                        {booking.status === 'CANCELLED' && (
                                            <Link href={`/providers/${booking.provider.id}`}>
                                                <Button variant="outline" size="sm">
                                                    {t('bookAgain')}
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                {activeTab === 'upcoming' ? t('noUpcoming') : t('noPast')}
                            </h3>
                            <p className="text-neutral-600 mb-6">
                                {activeTab === 'upcoming' ? t('noUpcomingDesc') : t('noPastDesc')}
                            </p>
                            {activeTab === 'upcoming' && (
                                <Link href="/services">
                                    <Button size="lg">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        {t('findServices')}
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}