'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';
import Link from 'next/link';

interface CustomerBooking {
    id: string;
    provider: {
        name: string;
        avatar: string;
    };
    service: string;
    date: string;
    time: string;
    duration: number;
    price: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    createdAt: string;
}

export default function CustomerBookingsPage() {
    const t = useTranslations('customer.bookings');
    const tCommon = useTranslations('common');

    const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

    // Mock bookings
    const mockBookings: CustomerBooking[] = [
        {
            id: '1',
            provider: {
                name: 'Ayşe Yılmaz',
                avatar: 'https://i.pravatar.cc/150?img=1'
            },
            service: 'Swedish Language Lessons - Beginner',
            date: '2024-11-08',
            time: '14:00',
            duration: 60,
            price: 350,
            status: 'confirmed',
            createdAt: '2024-11-01'
        },
        {
            id: '2',
            provider: {
                name: 'Erik Andersson',
                avatar: 'https://i.pravatar.cc/150?img=12'
            },
            service: 'Home Cleaning Service',
            date: '2024-11-10',
            time: '10:00',
            duration: 120,
            price: 800,
            status: 'pending',
            createdAt: '2024-11-05'
        },
        {
            id: '3',
            provider: {
                name: 'Maria Santos',
                avatar: 'https://i.pravatar.cc/150?img=45'
            },
            service: 'Translation Services',
            date: '2024-10-28',
            time: '15:00',
            duration: 60,
            price: 400,
            status: 'completed',
            createdAt: '2024-10-20'
        }
    ];

    const filteredBookings = mockBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        const today = new Date();

        if (activeTab === 'upcoming') {
            return booking.status !== 'cancelled' && bookingDate >= today;
        } else if (activeTab === 'past') {
            return booking.status === 'completed' || bookingDate < today;
        } else {
            return booking.status === 'cancelled';
        }
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'completed': return 'bg-blue-100 text-blue-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-neutral-100 text-neutral-700';
        }
    };

    const handleCancelBooking = (bookingId: string) => {
        if (confirm(t('confirmCancel'))) {
            // TODO: Backend integration
            console.log('Cancelling booking:', bookingId);
            alert(t('bookingCancelled'));
        }
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">{t('title')}</h1>
                <p className="text-neutral-600">{t('subtitle')}</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-2">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                            activeTab === 'upcoming'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                    >
                        {t('upcoming')}
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                            activeTab === 'past'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                    >
                        {t('past')}
                    </button>
                    <button
                        onClick={() => setActiveTab('cancelled')}
                        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                            activeTab === 'cancelled'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                    >
                        {t('cancelled')}
                    </button>
                </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">{t('noBookings')}</h3>
                        <p className="text-neutral-600 mb-6">{t('noBookingsDesc')}</p>
                        <Link href="/services">
                            <Button>{t('browseServices')}</Button>
                        </Link>
                    </div>
                ) : (
                    filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-6">

                                {/* Provider Info */}
                                <img
                                    src={booking.provider.avatar}
                                    alt={booking.provider.name}
                                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                                />

                                <div className="flex-1 min-w-0">
                                    {/* Service & Provider */}
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                                                {booking.service}
                                            </h3>
                                            <p className="text-sm text-neutral-600">
                                                {t('with')} {booking.provider.name}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                                            {t(booking.status)}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-neutral-700">{booking.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-neutral-700">{booking.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span className="text-neutral-700">{booking.duration} {t('minutes')}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-semibold text-neutral-900">{booking.price} SEK</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <Link href={`/customer/messages?provider=${booking.provider.name}`}>
                                            <Button variant="outline" size="sm">
                                                {t('message')}
                                            </Button>
                                        </Link>
                                        {booking.status === 'confirmed' && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleCancelBooking(booking.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                {t('cancel')}
                                            </Button>
                                        )}
                                        {booking.status === 'completed' && (
                                            <Link href={`/providers/${booking.provider.name}`}>
                                                <Button variant="outline" size="sm">
                                                    {t('leaveReview')}
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}