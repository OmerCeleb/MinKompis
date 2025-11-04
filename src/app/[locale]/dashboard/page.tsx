// src/app/[locale]/dashboard/page.tsx
'use client';

import { useTranslations } from 'next-intl';

export default function DashboardOverviewPage() {
    const t = useTranslations('dashboard');

    // Mock data
    const stats = [
        {
            label: t('totalEarnings'),
            value: '24,500 SEK',
            change: '+12.5%',
            trend: 'up',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            label: t('completedJobs'),
            value: '245',
            change: '+18',
            trend: 'up',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            label: t('activeBookings'),
            value: '8',
            change: '+3',
            trend: 'up',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            label: t('averageRating'),
            value: '4.9',
            change: '127 reviews',
            trend: 'neutral',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            )
        }
    ];

    const recentBookings = [
        {
            id: '1',
            customer: 'Sarah Johnson',
            avatar: 'https://i.pravatar.cc/150?img=44',
            service: 'Swedish Lessons',
            date: '2024-11-08',
            time: '14:00',
            status: 'confirmed',
            price: '350 SEK'
        },
        {
            id: '2',
            customer: 'Ahmed Ali',
            avatar: 'https://i.pravatar.cc/150?img=35',
            service: 'Swedish Lessons',
            date: '2024-11-10',
            time: '10:00',
            status: 'pending',
            price: '350 SEK'
        },
        {
            id: '3',
            customer: 'Maria Garcia',
            avatar: 'https://i.pravatar.cc/150?img=38',
            service: 'Swedish Lessons',
            date: '2024-11-12',
            time: '16:00',
            status: 'confirmed',
            price: '350 SEK'
        }
    ];

    const statusColors: Record<string, string> = {
        confirmed: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        completed: 'bg-blue-100 text-blue-700',
        cancelled: 'bg-red-100 text-red-700'
    };

    const statusLabels: Record<string, string> = {
        confirmed: t('confirmed'),
        pending: t('pending'),
        completed: t('completed'),
        cancelled: t('cancelled')
    };

    return (
        <div className="space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">{t('welcomeBack')}</h1>
                <p className="text-neutral-600">{t('dashboardSubtitle')}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                                {stat.icon}
                            </div>
                            {stat.trend !== 'neutral' && (
                                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</h3>
                        <p className="text-sm text-neutral-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
                <div className="p-6 border-b border-neutral-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-neutral-900">{t('recentBookings')}</h2>
                        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            {t('viewAll')}
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-neutral-200">
                    {recentBookings.map((booking) => (
                        <div key={booking.id} className="p-6 hover:bg-neutral-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <img
                                    src={booking.avatar}
                                    alt={booking.customer}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-neutral-900">{booking.customer}</h4>
                                    <p className="text-sm text-neutral-600">{booking.service}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-neutral-900 font-medium">{booking.date}</div>
                                    <div className="text-sm text-neutral-600">{booking.time}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-neutral-900 mb-1">{booking.price}</div>
                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[booking.status]}`}>
                    {statusLabels[booking.status]}
                  </span>
                                </div>
                                <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                                    <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
                <button className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all text-left group">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">{t('addNewService')}</h3>
                    <p className="text-sm text-neutral-600">{t('addNewServiceDesc')}</p>
                </button>

                <button className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all text-left group">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">{t('manageAvailability')}</h3>
                    <p className="text-sm text-neutral-600">{t('manageAvailabilityDesc')}</p>
                </button>

                <button className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all text-left group">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">{t('viewAnalytics')}</h3>
                    <p className="text-sm text-neutral-600">{t('viewAnalyticsDesc')}</p>
                </button>
            </div>

        </div>
    );
}