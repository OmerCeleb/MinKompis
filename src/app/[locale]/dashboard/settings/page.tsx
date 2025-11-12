// src/app/[locale]/dashboard/settings/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';
import { useToast } from '@/hooks';

export default function DashboardSettingsPage() {
    const t = useTranslations('dashboard.settings');
    const tCommon = useTranslations('common');
    const tCat = useTranslations('categories');
    const tToast = useTranslations('toast');
    const { showToast } = useToast();

    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);

    // Profile Settings State
    const [profileData, setProfileData] = useState({
        firstName: 'Ayşe',
        lastName: 'Yılmaz',
        phone: '+46 70 123 4567',
        bio: 'Experienced Turkish translator and educator with 5+ years of experience helping families integrate into Swedish society.',
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
        try {
            // TODO: Backend integration
            console.log('Saving profile:', profileData);
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast(tToast('settings.profileUpdated'), 'success');
        } catch (error) {
            showToast(tToast('settings.profileError'), 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAccount = async () => {
        setLoading(true);
        try {
            // TODO: Backend integration
            console.log('Saving account:', accountData);
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast(tToast('settings.accountUpdated'), 'success');
        } catch (error) {
            showToast(tToast('settings.accountError'), 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveService = async () => {
        setLoading(true);
        try {
            // TODO: Backend integration
            console.log('Saving service settings:', serviceData);
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast(tToast('settings.serviceUpdated'), 'success');
        } catch (error) {
            showToast(tToast('settings.serviceError'), 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNotifications = async () => {
        setLoading(true);
        try {
            // TODO: Backend integration
            console.log('Saving notifications:', notificationData);
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast(tToast('settings.notificationsUpdated'), 'success');
        } catch (error) {
            showToast(tToast('settings.notificationsError'), 'error');
        } finally {
            setLoading(false);
        }
    };

    const toggleLanguage = (code: string) => {
        setServiceData(prev => ({
            ...prev,
            languages: prev.languages.includes(code)
                ? prev.languages.filter(l => l !== code)
                : [...prev.languages, code]
        }));
    };

    const toggleCategory = (id: string) => {
        setServiceData(prev => ({
            ...prev,
            categories: prev.categories.includes(id)
                ? prev.categories.filter(c => c !== id)
                : [...prev.categories, id]
        }));
    };

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
                    onClick={() => setActiveTab('profile')}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                        activeTab === 'profile'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-600 hover:text-neutral-900'
                    }`}
                >
                    {t('tabs.profile')}
                </button>
                <button
                    onClick={() => setActiveTab('account')}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                        activeTab === 'account'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-600 hover:text-neutral-900'
                    }`}
                >
                    {t('tabs.account')}
                </button>
                <button
                    onClick={() => setActiveTab('service')}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                        activeTab === 'service'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-600 hover:text-neutral-900'
                    }`}
                >
                    {t('tabs.service')}
                </button>
                <button
                    onClick={() => setActiveTab('notifications')}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                        activeTab === 'notifications'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-600 hover:text-neutral-900'
                    }`}
                >
                    {t('tabs.notifications')}
                </button>
            </div>

            {/* Content */}
            <div className="max-w-3xl">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('profile.subtitle')}</h2>

                        {/* Profile Photo */}
                        <div className="flex items-center gap-6">
                            <img
                                src={profileData.profilePhoto}
                                alt="Profile"
                                className="w-24 h-24 rounded-full"
                            />
                            <div>
                                <Button variant="outline" size="sm" className="mb-2">
                                    {t('profile.changePhoto')}
                                </Button>
                                <p className="text-sm text-neutral-600">{t('profile.profilePhoto')}</p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                    {t('profile.firstName')}
                                </label>
                                <input
                                    type="text"
                                    value={profileData.firstName}
                                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                    {t('profile.lastName')}
                                </label>
                                <input
                                    type="text"
                                    value={profileData.lastName}
                                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                {t('profile.phone')}
                            </label>
                            <input
                                type="tel"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                {t('profile.bio')}
                            </label>
                            <textarea
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <p className="text-sm text-neutral-500 mt-1">{t('profile.bioHint')}</p>
                        </div>

                        <Button
                            onClick={handleSaveProfile}
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? t('common.saving') : t('profile.saveChanges')}
                        </Button>
                    </div>
                )}

                {/* Account Settings */}
                {activeTab === 'account' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('account.subtitle')}</h2>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                {t('account.email')}
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="email"
                                    value={accountData.email}
                                    disabled
                                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg bg-neutral-50"
                                />
                                <span className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                                    {t('account.emailVerified')}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-neutral-200 pt-6">
                            <h3 className="font-semibold text-neutral-900 mb-4">{t('account.changePassword')}</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        {t('account.currentPassword')}
                                    </label>
                                    <input
                                        type="password"
                                        value={accountData.currentPassword}
                                        onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        {t('account.newPassword')}
                                    </label>
                                    <input
                                        type="password"
                                        value={accountData.newPassword}
                                        onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                        {t('account.confirmPassword')}
                                    </label>
                                    <input
                                        type="password"
                                        value={accountData.confirmPassword}
                                        onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleSaveAccount}
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? t('common.saving') : t('account.saveChanges')}
                        </Button>
                    </div>
                )}{/* Service Settings */}
                {activeTab === 'service' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('service.subtitle')}</h2>

                        {/* Languages */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-3">
                                {t('service.languages')}
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {availableLanguages.map(lang => (
                                    <button
                                        key={lang.code}
                                        type="button"
                                        onClick={() => toggleLanguage(lang.code)}
                                        className={`p-3 rounded-lg border-2 transition-all ${
                                            serviceData.languages.includes(lang.code)
                                                ? 'border-primary-600 bg-primary-50'
                                                : 'border-neutral-200 hover:border-neutral-300'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{lang.flag}</span>
                                            <span className="font-medium text-neutral-900">{lang.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-3">
                                {t('service.categories')}
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => toggleCategory(cat.id)}
                                        className={`p-3 rounded-lg border-2 transition-all ${
                                            serviceData.categories.includes(cat.id)
                                                ? 'border-primary-600 bg-primary-50'
                                                : 'border-neutral-200 hover:border-neutral-300'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{cat.icon}</span>
                                            <span className="font-medium text-neutral-900">{cat.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hourly Rate */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                {t('service.hourlyRate')}
                            </label>
                            <input
                                type="number"
                                value={serviceData.hourlyRate}
                                onChange={(e) => setServiceData({ ...serviceData, hourlyRate: parseInt(e.target.value) })}
                                min="0"
                                step="50"
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Availability */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-3">
                                {t('service.availability.title')}
                            </label>
                            <div className="space-y-2">
                                {Object.entries(serviceData.availability).map(([day, data]) => (
                                    <div key={day} className="flex items-center gap-4 p-3 bg-neutral-50 rounded-lg">
                                        <label className="flex items-center gap-2 flex-1">
                                            <input
                                                type="checkbox"
                                                checked={data.enabled}
                                                onChange={(e) => setServiceData({
                                                    ...serviceData,
                                                    availability: {
                                                        ...serviceData.availability,
                                                        [day]: { ...data, enabled: e.target.checked }
                                                    }
                                                })}
                                                className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                            />
                                            <span className="font-medium text-neutral-900 capitalize">{day}</span>
                                        </label>
                                        {data.enabled && (
                                            <input
                                                type="text"
                                                value={data.hours}
                                                onChange={(e) => setServiceData({
                                                    ...serviceData,
                                                    availability: {
                                                        ...serviceData.availability,
                                                        [day]: { ...data, hours: e.target.value }
                                                    }
                                                })}
                                                placeholder="09:00-17:00"
                                                className="px-3 py-1.5 border border-neutral-300 rounded-lg text-sm"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button
                            onClick={handleSaveService}
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? t('common.saving') : t('service.saveChanges')}
                        </Button>
                    </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('notifications.subtitle')}</h2>

                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors">
                                <div>
                                    <div className="font-medium text-neutral-900">{t('notifications.email.title')}</div>
                                    <div className="text-sm text-neutral-600">{t('notifications.email.enable')}</div>
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
                                    <div className="font-medium text-neutral-900">{t('notifications.newBookings')}</div>
                                    <div className="text-sm text-neutral-600">{t('notifications.newBookingsDesc')}</div>
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
                                    <div className="font-medium text-neutral-900">{t('notifications.messages')}</div>
                                    <div className="text-sm text-neutral-600">{t('notifications.messagesDesc')}</div>
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
                                    <div className="font-medium text-neutral-900">{t('notifications.reviews')}</div>
                                    <div className="text-sm text-neutral-600">{t('notifications.reviewsDesc')}</div>
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
                                    <div className="font-medium text-neutral-900">{t('notifications.promotions')}</div>
                                    <div className="text-sm text-neutral-600">{t('notifications.promotionsDesc')}</div>
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
                                    <div className="font-medium text-neutral-900">{t('notifications.sms.title')}</div>
                                    <div className="text-sm text-neutral-600">{t('notifications.sms.enable')}</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notificationData.smsNotifications}
                                    onChange={(e) => setNotificationData({ ...notificationData, smsNotifications: e.target.checked })}
                                    className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                />
                            </label>
                        </div>

                        <Button
                            onClick={handleSaveNotifications}
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? t('common.saving') : t('notifications.saveChanges')}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}