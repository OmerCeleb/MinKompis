// src/app/[locale]/dashboard/settings/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';

export default function DashboardSettingsPage() {
    const t = useTranslations('dashboard.settings');
    const tCommon = useTranslations('common');
    const tCat = useTranslations('categories');

    const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'service' | 'notifications'>('profile');
    const [loading, setLoading] = useState(false);

    // Profile Settings State
    const [profileData, setProfileData] = useState({
        firstName: 'Ayşe',
        lastName: 'Yılmaz',
        businessName: "Ayşe's Swedish Lessons",
        phone: '+46 70 123 4567',
        location: 'Stockholm',
        bio: 'Experienced Swedish teacher specializing in helping Turkish speakers learn Swedish quickly.',
        profilePhoto: 'https://i.pravatar.cc/150?img=1'
    });

    // Account Settings State
    const [accountData, setAccountData] = useState({
        email: 'ayse.yilmaz@email.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Service Settings State
    const [serviceData, setServiceData] = useState({
        languages: ['tr', 'sv', 'en'],
        categories: ['education'],
        hourlyRate: 350,
        availability: {
            monday: { enabled: true, hours: '09:00-17:00' },
            tuesday: { enabled: true, hours: '09:00-17:00' },
            wednesday: { enabled: true, hours: '09:00-17:00' },
            thursday: { enabled: true, hours: '09:00-17:00' },
            friday: { enabled: true, hours: '09:00-17:00' },
            saturday: { enabled: false, hours: '' },
            sunday: { enabled: false, hours: '' }
        }
    });

    // Notification Settings State
    const [notificationData, setNotificationData] = useState({
        emailNotifications: true,
        newBookings: true,
        messages: true,
        reviews: true,
        promotions: false,
        smsNotifications: false
    });

    const availableLanguages = [
        { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
        { code: 'so', name: 'Soomaali', flag: '🇸🇴' },
        { code: 'es', name: 'Español', flag: '🇪🇸' }
    ];

    const categories = [
        { id: 'education', name: tCat('education'), icon: '📚' },
        { id: 'home', name: tCat('home'), icon: '🏠' },
        { id: 'official', name: tCat('official'), icon: '📋' },
        { id: 'health', name: tCat('health'), icon: '💪' },
        { id: 'business', name: tCat('business'), icon: '💼' },
        { id: 'creative', name: tCat('creative'), icon: '🎨' }
    ];

    const handleSaveProfile = async () => {
        setLoading(true);
        // TODO: Backend integration
        console.log('Saving profile:', profileData);
        setTimeout(() => {
            setLoading(false);
            alert('Profile updated successfully!');
        }, 1000);
    };

    const handleSaveAccount = async () => {
        setLoading(true);
        // TODO: Backend integration
        console.log('Saving account:', accountData);
        setTimeout(() => {
            setLoading(false);
            alert('Account updated successfully!');
        }, 1000);
    };

    const handleSaveService = async () => {
        setLoading(true);
        // TODO: Backend integration
        console.log('Saving service settings:', serviceData);
        setTimeout(() => {
            setLoading(false);
            alert('Service settings updated successfully!');
        }, 1000);
    };

    const handleSaveNotifications = async () => {
        setLoading(true);
        // TODO: Backend integration
        console.log('Saving notifications:', notificationData);
        setTimeout(() => {
            setLoading(false);
            alert('Notification preferences updated successfully!');
        }, 1000);
    };

    const toggleLanguage = (code: string) => {
        setServiceData({
            ...serviceData,
            languages: serviceData.languages.includes(code)
                ? serviceData.languages.filter(l => l !== code)
                : [...serviceData.languages, code]
        });
    };

    const toggleCategory = (id: string) => {
        setServiceData({
            ...serviceData,
            categories: serviceData.categories.includes(id)
                ? serviceData.categories.filter(c => c !== id)
                : [...serviceData.categories, id]
        });
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
                <div className="flex gap-2 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex-1 min-w-[140px] px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                            activeTab === 'profile'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {t('profile')}
                        </div>
                    </button>

                    <button
                        onClick={() => setActiveTab('account')}
                        className={`flex-1 min-w-[140px] px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                            activeTab === 'account'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            {t('account')}
                        </div>
                    </button>

                    <button
                        onClick={() => setActiveTab('service')}
                        className={`flex-1 min-w-[140px] px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                            activeTab === 'service'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {t('service')}
                        </div>
                    </button>

                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`flex-1 min-w-[140px] px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                            activeTab === 'notifications'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {t('notifications')}
                        </div>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">

                {/* Profile Settings */}
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('profileSettings')}</h2>

                        {/* Profile Photo */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-3">{t('profilePhoto')}</label>
                            <div className="flex items-center gap-6">
                                <img
                                    src={profileData.profilePhoto}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover ring-4 ring-neutral-100"
                                />
                                <div>
                                    <Button size="sm" variant="outline">
                                        {t('changePhoto')}
                                    </Button>
                                    <p className="text-xs text-neutral-500 mt-2">{t('photoRequirements')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Name */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">{t('firstName')}</label>
                                <input
                                    type="text"
                                    value={profileData.firstName}
                                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">{t('lastName')}</label>
                                <input
                                    type="text"
                                    value={profileData.lastName}
                                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Business Name */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">{t('businessName')}</label>
                            <input
                                type="text"
                                value={profileData.businessName}
                                onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Phone & Location */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">{t('phone')}</label>
                                <input
                                    type="tel"
                                    value={profileData.phone}
                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">{t('location')}</label>
                                <input
                                    type="text"
                                    value={profileData.location}
                                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">{t('bio')}</label>
                            <textarea
                                rows={4}
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            />
                        </div>

                        <Button onClick={handleSaveProfile} disabled={loading} size="lg">
                            {loading ? t('saving') : t('saveChanges')}
                        </Button>
                    </div>
                )}

                {/* Account Settings */}
                {activeTab === 'account' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('accountSettings')}</h2>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">{t('email')}</label>
                            <input
                                type="email"
                                value={accountData.email}
                                onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        <div className="border-t border-neutral-200 pt-6">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-4">{t('changePassword')}</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">{t('currentPassword')}</label>
                                    <input
                                        type="password"
                                        value={accountData.currentPassword}
                                        onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">{t('newPassword')}</label>
                                    <input
                                        type="password"
                                        value={accountData.newPassword}
                                        onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">{t('confirmPassword')}</label>
                                    <input
                                        type="password"
                                        value={accountData.confirmPassword}
                                        onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button onClick={handleSaveAccount} disabled={loading} size="lg">
                            {loading ? t('saving') : t('saveChanges')}
                        </Button>

                        <div className="border-t border-neutral-200 pt-6">
                            <h3 className="text-lg font-semibold text-red-600 mb-3">{t('dangerZone')}</h3>
                            <p className="text-sm text-neutral-600 mb-4">{t('dangerZoneDesc')}</p>
                            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                {t('deleteAccount')}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Service Settings */}
                {activeTab === 'service' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('serviceSettings')}</h2>

                        {/* Languages */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-3">{t('languages')}</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {availableLanguages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => toggleLanguage(lang.code)}
                                        className={`p-4 border-2 rounded-lg transition-all text-left ${
                                            serviceData.languages.includes(lang.code)
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-neutral-200 hover:border-neutral-300'
                                        }`}
                                    >
                                        <span className="text-2xl mb-2 block">{lang.flag}</span>
                                        <span className="text-sm font-medium text-neutral-900">{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-3">{t('categories')}</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => toggleCategory(cat.id)}
                                        className={`p-4 border-2 rounded-lg transition-all text-left ${
                                            serviceData.categories.includes(cat.id)
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-neutral-200 hover:border-neutral-300'
                                        }`}
                                    >
                                        <span className="text-2xl mb-2 block">{cat.icon}</span>
                                        <span className="text-sm font-medium text-neutral-900">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Default Hourly Rate */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">{t('defaultHourlyRate')}</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    value={serviceData.hourlyRate}
                                    onChange={(e) => setServiceData({ ...serviceData, hourlyRate: Number(e.target.value) })}
                                    className="w-48 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                                <span className="text-neutral-600">SEK/hour</span>
                            </div>
                        </div>

                        <Button onClick={handleSaveService} disabled={loading} size="lg">
                            {loading ? t('saving') : t('saveChanges')}
                        </Button>
                    </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('notificationSettings')}</h2>

                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                                <div>
                                    <div className="font-medium text-neutral-900">{t('emailNotifications')}</div>
                                    <div className="text-sm text-neutral-600">{t('emailNotificationsDesc')}</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notificationData.emailNotifications}
                                    onChange={(e) => setNotificationData({ ...notificationData, emailNotifications: e.target.checked })}
                                    className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                                <div>
                                    <div className="font-medium text-neutral-900">{t('newBookings')}</div>
                                    <div className="text-sm text-neutral-600">{t('newBookingsDesc')}</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notificationData.newBookings}
                                    onChange={(e) => setNotificationData({ ...notificationData, newBookings: e.target.checked })}
                                    className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                                <div>
                                    <div className="font-medium text-neutral-900">{t('messages')}</div>
                                    <div className="text-sm text-neutral-600">{t('messagesDesc')}</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notificationData.messages}
                                    onChange={(e) => setNotificationData({ ...notificationData, messages: e.target.checked })}
                                    className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                                <div>
                                    <div className="font-medium text-neutral-900">{t('reviews')}</div>
                                    <div className="text-sm text-neutral-600">{t('reviewsDesc')}</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notificationData.reviews}
                                    onChange={(e) => setNotificationData({ ...notificationData, reviews: e.target.checked })}
                                    className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                                <div>
                                    <div className="font-medium text-neutral-900">{t('promotions')}</div>
                                    <div className="text-sm text-neutral-600">{t('promotionsDesc')}</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notificationData.promotions}
                                    onChange={(e) => setNotificationData({ ...notificationData, promotions: e.target.checked })}
                                    className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                                <div>
                                    <div className="font-medium text-neutral-900">{t('smsNotifications')}</div>
                                    <div className="text-sm text-neutral-600">{t('smsNotificationsDesc')}</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notificationData.smsNotifications}
                                    onChange={(e) => setNotificationData({ ...notificationData, smsNotifications: e.target.checked })}
                                    className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                />
                            </label>
                        </div>

                        <Button onClick={handleSaveNotifications} disabled={loading} size="lg">
                            {loading ? t('saving') : t('saveChanges')}
                        </Button>
                    </div>
                )}

            </div>

        </div>
    );
}