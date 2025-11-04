// src/app/[locale]/dashboard/bookings/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';

interface Booking {
    id: string;
    customer: {
        name: string;
        avatar: string;
        phone: string;
        email: string;
    };
    service: string;
    date: string;
    time: string;
    duration: number;
    price: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
    createdAt: string;
}

export default function DashboardBookingsPage() {
    const t = useTranslations('dashboard.bookings');
    const tCommon = useTranslations('common');

    const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    // Mock bookings data
    const mockBookings: Booking[] = [
        {
            id: '1',
            customer: {
                name: 'Sarah Johnson',
                avatar: 'https://i.pravatar.cc/150?img=44',
                phone: '+46 70 123 4567',
                email: 'sarah.j@email.com'
            },
            service: 'Swedish Language Lessons - Beginner',
            date: '2024-11-08',
            time: '14:00',
            duration: 60,
            price: 350,
            status: 'confirmed',
            notes: 'First lesson, please focus on pronunciation',
            createdAt: '2024-11-01'
        },
        {
            id: '2',
            customer: {
                name: 'Ahmed Ali',
                avatar: 'https://i.pravatar.cc/150?img=35',
                phone: '+46 70 987 6543',
                email: 'ahmed.ali@email.com'
            },
            service: 'Swedish Language Lessons - Intermediate',
            date: '2024-11-10',
            time: '10:00',
            duration: 60,
            price: 400,
            status: 'pending',
            createdAt: '2024-11-05'
        },
        {
            id: '3',
            customer: {
                name: 'Maria Garcia',
                avatar: 'https://i.pravatar.cc/150?img=38',
                phone: '+46 70 555 1234',
                email: 'maria.g@email.com'
            },
            service: 'Swedish Conversation Practice',
            date: '2024-11-12',
            time: '16:00',
            duration: 45,
            price: 300,
            status: 'confirmed',
            notes: 'Would like to practice job interview conversations',
            createdAt: '2024-11-03'
        },
        {
            id: '4',
            customer: {
                name: 'David Lee',
                avatar: 'https://i.pravatar.cc/150?img=42',
                phone: '+46 70 888 9999',
                email: 'david.lee@email.com'
            },
            service: 'Swedish Language Lessons - Beginner',
            date: '2024-10-28',
            time: '13:00',
            duration: 60,
            price: 350,
            status: 'completed',
            createdAt: '2024-10-20'
        },
        {
            id: '5',
            customer: {
                name: 'Emma Svensson',
                avatar: 'https://i.pravatar.cc/150?img=47',
                phone: '+46 70 777 6666',
                email: 'emma.s@email.com'
            },
            service: 'Swedish Language Lessons - Intermediate',
            date: '2024-10-25',
            time: '11:00',
            duration: 60,
            price: 400,
            status: 'completed',
            createdAt: '2024-10-15'
        },
        {
            id: '6',
            customer: {
                name: 'John Doe',
                avatar: 'https://i.pravatar.cc/150?img=51',
                phone: '+46 70 444 3333',
                email: 'john.doe@email.com'
            },
            service: 'Swedish Conversation Practice',
            date: '2024-11-05',
            time: '15:00',
            duration: 45,
            price: 300,
            status: 'cancelled',
            createdAt: '2024-10-28'
        }
    ];

    const [bookings, setBookings] = useState(mockBookings);

    // Filter bookings by tab
    const filteredBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (activeTab === 'upcoming') {
            return (booking.status === 'pending' || booking.status === 'confirmed') && bookingDate >= today;
        } else if (activeTab === 'past') {
            return booking.status === 'completed';
        } else {
            return booking.status === 'cancelled';
        }
    });

    const statusColors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        confirmed: 'bg-green-100 text-green-700 border-green-200',
        completed: 'bg-blue-100 text-blue-700 border-blue-200',
        cancelled: 'bg-red-100 text-red-700 border-red-200'
    };

    const statusLabels: Record<string, string> = {
        pending: t('pending'),
        confirmed: t('confirmed'),
        completed: t('completed'),
        cancelled: t('cancelled')
    };

    const handleAccept = (bookingId: string) => {
        setBookings(bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'confirmed' as const } : b
        ));
    };

    const handleDecline = (bookingId: string) => {
        if (confirm(t('confirmDecline'))) {
            setBookings(bookings.map(b =>
                b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
            ));
        }
    };

    const handleComplete = (bookingId: string) => {
        setBookings(bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'completed' as const } : b
        ));
    };

    const getBookingCount = (tab: 'upcoming' | 'past' | 'cancelled') => {
        return bookings.filter(booking => {
            const bookingDate = new Date(booking.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (tab === 'upcoming') {
                return (booking.status === 'pending' || booking.status === 'confirmed') && bookingDate >= today;
            } else if (tab === 'past') {
                return booking.status === 'completed';
            } else {
                return booking.status === 'cancelled';
            }
        }).length;
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
                        {getBookingCount('upcoming') > 0 && (
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                activeTab === 'upcoming' ? 'bg-white/20' : 'bg-neutral-200'
                            }`}>
                {getBookingCount('upcoming')}
              </span>
                        )}
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
                        {getBookingCount('past') > 0 && (
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                activeTab === 'past' ? 'bg-white/20' : 'bg-neutral-200'
                            }`}>
                {getBookingCount('past')}
              </span>
                        )}
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
                        {getBookingCount('cancelled') > 0 && (
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                activeTab === 'cancelled' ? 'bg-white/20' : 'bg-neutral-200'
                            }`}>
                {getBookingCount('cancelled')}
              </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
                        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-2">{t('noBookings')}</h3>
                        <p className="text-neutral-600">{t('noBookingsDesc')}</p>
                    </div>
                ) : (
                    filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all">
                            <div className="flex items-start gap-6">

                                {/* Customer Avatar */}
                                <img
                                    src={booking.customer.avatar}
                                    alt={booking.customer.name}
                                    className="w-16 h-16 rounded-full flex-shrink-0"
                                />

                                {/* Booking Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-neutral-900 mb-1">
                                                {booking.customer.name}
                                            </h3>
                                            <p className="text-sm text-neutral-600 mb-2">{booking.service}</p>
                                            <div className="flex items-center gap-4 text-sm text-neutral-600">
                                                <div className="flex items-center gap-1.5">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="font-medium">{booking.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{booking.time} ({booking.duration} min)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-neutral-900 mb-2">
                                                {booking.price} SEK
                                            </div>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[booking.status]}`}>
                        {statusLabels[booking.status]}
                      </span>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    {booking.notes && (
                                        <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                                            <p className="text-sm text-neutral-700">
                                                <span className="font-medium">{t('notes')}:</span> {booking.notes}
                                            </p>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex items-center gap-3">
                                        {booking.status === 'pending' && (
                                            <>
                                                <Button
                                                    onClick={() => handleAccept(booking.id)}
                                                    size="sm"
                                                    className="flex-1"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {t('accept')}
                                                </Button>
                                                <Button
                                                    onClick={() => handleDecline(booking.id)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    {t('decline')}
                                                </Button>
                                            </>
                                        )}

                                        {booking.status === 'confirmed' && (
                                            <Button
                                                onClick={() => handleComplete(booking.id)}
                                                size="sm"
                                                variant="outline"
                                                className="flex-1 border-green-300 text-green-600 hover:bg-green-50"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {t('markComplete')}
                                            </Button>
                                        )}

                                        <Button
                                            onClick={() => setSelectedBooking(booking)}
                                            size="sm"
                                            variant="ghost"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            {t('viewDetails')}
                                        </Button>

                                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                                            <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-neutral-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-neutral-900">{t('bookingDetails')}</h2>
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Customer Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-neutral-900 mb-4">{t('customerInfo')}</h3>
                                <div className="flex items-start gap-4">
                                    <img
                                        src={selectedBooking.customer.avatar}
                                        alt={selectedBooking.customer.name}
                                        className="w-16 h-16 rounded-full"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-neutral-900 mb-2">{selectedBooking.customer.name}</h4>
                                        <div className="space-y-1 text-sm text-neutral-600">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span>{selectedBooking.customer.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span>{selectedBooking.customer.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Service Details */}
                            <div>
                                <h3 className="text-lg font-semibold text-neutral-900 mb-4">{t('serviceDetails')}</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-600">{t('service')}:</span>
                                        <span className="font-medium text-neutral-900">{selectedBooking.service}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-600">{t('date')}:</span>
                                        <span className="font-medium text-neutral-900">{selectedBooking.date}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-600">{t('time')}:</span>
                                        <span className="font-medium text-neutral-900">{selectedBooking.time}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-600">{t('duration')}:</span>
                                        <span className="font-medium text-neutral-900">{selectedBooking.duration} min</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-600">{t('price')}:</span>
                                        <span className="font-medium text-neutral-900">{selectedBooking.price} SEK</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-600">{t('status')}:</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[selectedBooking.status]}`}>
                      {statusLabels[selectedBooking.status]}
                    </span>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {selectedBooking.notes && (
                                <div>
                                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">{t('notes')}</h3>
                                    <p className="text-neutral-700 bg-neutral-50 p-4 rounded-lg">{selectedBooking.notes}</p>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-neutral-200">
                            <Button
                                onClick={() => setSelectedBooking(null)}
                                fullWidth
                            >
                                {tCommon('close')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}