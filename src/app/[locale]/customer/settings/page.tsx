// src/app/[locale]/customer/settings/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';
import { useToast } from '@/hooks';

export default function CustomerSettingsPage() {
    const t = useTranslations('customer.settingss');
    const tCommon = useTranslations('common');
    const { showToast } = useToast();

    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);

    // Profile Settings State
    const [profileData, setProfileData] = useState({
        firstName: 'Sarah',
        lastName: 'Johnson',
        phone: '+46 70 123 4567',
        location: 'Stockholm, Sweden',
        preferredLanguage: 'en',
        profilePhoto: 'https://i.pravatar.cc/150?img=44'
    });

    // Account Settings State
    const [accountData, setAccountData] = useState({
        email: 'sarah.johnson@email.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: false
    });

    // Notification Settings State
    const [notificationData, setNotificationData] = useState({
        emailNotifications: true,
        bookingConfirmations: true,
        bookingReminders: true,
        messages: true,
        reviews: true,
        promotions: false,
        smsNotifications: false,
        pushNotifications: true
    });

    const availableLanguages = [
        { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
    ];

    const tabs = [
        { id: 'profile', label: t('tabs.profile'), icon: '👤' },
        { id: 'account', label: t('tabs.account'), icon: '🔒' },
        { id: 'notifications', label: t('tabs.notifications'), icon: '🔔' }
    ];

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast(t('messages.profileUpdated'), 'success');
        } catch (error) {
            showToast(t('messages.error'), 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAccount = async () => {
        if (accountData.newPassword && accountData.newPassword !== accountData.confirmPassword) {
            showToast(t('account.passwordMismatch'), 'error');
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast(t('messages.accountUpdated'), 'success');
            setAccountData({ ...accountData, currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            showToast(t('messages.error'), 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNotifications = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            showToast(t('messages.notificationsUpdated'), 'success');
        } catch (error) {
            showToast(t('messages.error'), 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = () => {
        if (confirm(t('confirmations.deleteAccount.message'))) {
            showToast(t('messages.accountDeleted'), 'success');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">{t('title')}</h1>
                <p className="text-neutral-600 mt-1">{t('subtitle')}</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <div className="flex border-b border-neutral-200 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-all ${
                                activeTab === tab.id
                                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50'
                                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                            }`}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    {/* Profile Settings */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-neutral-900 mb-1">{t('profile.title')}</h2>
                                <p className="text-sm text-neutral-600">{t('profile.subtitle')}</p>
                            </div>

                            {/* Profile Photo */}
                            <div className="flex items-center gap-6 pb-6 border-b border-neutral-200">
                                <img
                                    src={profileData.profilePhoto}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full border-4 border-neutral-100"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-neutral-900 mb-2">{t('profile.profilePhoto')}</h3>
                                    <div className="flex gap-3">
                                        <Button variant="outline" size="sm">
                                            {t('profile.changePhoto')}
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            {t('profile.removePhoto')}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Name Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        {t('profile.firstName')}
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        {t('profile.lastName')}
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        {t('profile.phone')}
                                    </label>
                                    <input
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        {t('profile.location')}
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.location}
                                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Preferred Language */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    {t('profile.preferredLanguage')}
                                </label>
                                <select
                                    value={profileData.preferredLanguage}
                                    onChange={(e) => setProfileData({ ...profileData, preferredLanguage: e.target.value })}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    {availableLanguages.map((lang) => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.flag} {lang.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-sm text-neutral-500 mt-1">{t('profile.languageHint')}</p>
                            </div>

                            <Button
                                onClick={handleSaveProfile}
                                disabled={loading}
                                fullWidth
                            >
                                {loading ? tCommon('saving') : t('profile.saveChanges')}
                            </Button>
                        </div>
                    )}

                    {/* Account Security */}
                    {activeTab === 'account' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-neutral-900 mb-1">{t('account.title')}</h2>
                                <p className="text-sm text-neutral-600">{t('account.subtitle')}</p>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    {t('account.email')}
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        type="email"
                                        value={accountData.email}
                                        disabled
                                        className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-50"
                                    />
                                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center">
                                        ✓ {t('account.verified')}
                                    </span>
                                </div>
                            </div>

                            {/* Change Password */}
                            <div className="border-t border-neutral-200 pt-6">
                                <h3 className="font-semibold text-neutral-900 mb-4">{t('account.changePassword')}</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            {t('account.currentPassword')}
                                        </label>
                                        <input
                                            type="password"
                                            value={accountData.currentPassword}
                                            onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            {t('account.newPassword')}
                                        </label>
                                        <input
                                            type="password"
                                            value={accountData.newPassword}
                                            onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            {t('account.confirmPassword')}
                                        </label>
                                        <input
                                            type="password"
                                            value={accountData.confirmPassword}
                                            onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>

                                    <p className="text-sm text-neutral-500">{t('account.passwordRequirements')}</p>
                                </div>
                            </div>

                            {/* Two-Factor Authentication */}
                            <div className="border-t border-neutral-200 pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-neutral-900">{t('account.twoFactor')}</h3>
                                        <p className="text-sm text-neutral-600 mt-1">{t('account.twoFactorDesc')}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={accountData.twoFactorEnabled}
                                            onChange={(e) => setAccountData({ ...accountData, twoFactorEnabled: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                    </label>
                                </div>
                            </div>

                            <Button
                                onClick={handleSaveAccount}
                                disabled={loading}
                                fullWidth
                            >
                                {loading ? tCommon('saving') : t('account.saveChanges')}
                            </Button>

                            {/* Delete Account */}
                            <div className="border-t border-neutral-200 pt-6">
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-red-900 mb-2">{t('account.deleteAccount')}</h3>
                                    <p className="text-sm text-red-700 mb-4">{t('account.deleteAccountDesc')}</p>
                                    <Button
                                        variant="outline"
                                        onClick={handleDeleteAccount}
                                        className="border-red-300 text-red-700 hover:bg-red-100"
                                    >
                                        {t('account.deleteAccountButton')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-neutral-900 mb-1">{t('notifications.title')}</h2>
                                <p className="text-sm text-neutral-600">{t('notifications.subtitle')}</p>
                            </div>

                            {/* Email Notifications */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                                    <div>
                                        <h3 className="font-medium text-neutral-900">{t('notifications.emailNotifications')}</h3>
                                        <p className="text-sm text-neutral-600">{t('notifications.emailDesc')}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notificationData.emailNotifications}
                                            onChange={(e) => setNotificationData({ ...notificationData, emailNotifications: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                                    <div>
                                        <h3 className="font-medium text-neutral-900">{t('notifications.bookingConfirmations')}</h3>
                                        <p className="text-sm text-neutral-600">{t('notifications.bookingConfirmationsDesc')}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notificationData.bookingConfirmations}
                                            onChange={(e) => setNotificationData({ ...notificationData, bookingConfirmations: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                                    <div>
                                        <h3 className="font-medium text-neutral-900">{t('notifications.bookingReminders')}</h3>
                                        <p className="text-sm text-neutral-600">{t('notifications.bookingRemindersDesc')}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notificationData.bookingReminders}
                                            onChange={(e) => setNotificationData({ ...notificationData, bookingReminders: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                                    <div>
                                        <h3 className="font-medium text-neutral-900">{t('notifications.messages')}</h3>
                                        <p className="text-sm text-neutral-600">{t('notifications.messagesDesc')}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notificationData.messages}
                                            onChange={(e) => setNotificationData({ ...notificationData, messages: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                                    <div>
                                        <h3 className="font-medium text-neutral-900">{t('notifications.reviews')}</h3>
                                        <p className="text-sm text-neutral-600">{t('notifications.reviewsDesc')}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notificationData.reviews}
                                            onChange={(e) => setNotificationData({ ...notificationData, reviews: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-neutral-200">
                                    <div>
                                        <h3 className="font-medium text-neutral-900">{t('notifications.promotions')}</h3>
                                        <p className="text-sm text-neutral-600">{t('notifications.promotionsDesc')}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notificationData.promotions}
                                            onChange={(e) => setNotificationData({ ...notificationData, promotions: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                    </label>
                                </div>
                            </div>

                            {/* SMS & Push */}
                            <div className="border-t border-neutral-200 pt-6">
                                <h3 className="font-semibold text-neutral-900 mb-4">{t('notifications.otherChannels')}</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-3">
                                        <div>
                                            <h3 className="font-medium text-neutral-900">{t('notifications.smsNotifications')}</h3>
                                            <p className="text-sm text-neutral-600">{t('notifications.smsDesc')}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={notificationData.smsNotifications}
                                                onChange={(e) => setNotificationData({ ...notificationData, smsNotifications: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between py-3">
                                        <div>
                                            <h3 className="font-medium text-neutral-900">{t('notifications.pushNotifications')}</h3>
                                            <p className="text-sm text-neutral-600">{t('notifications.pushDesc')}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={notificationData.pushNotifications}
                                                onChange={(e) => setNotificationData({ ...notificationData, pushNotifications: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleSaveNotifications}
                                disabled={loading}
                                fullWidth
                            >
                                {loading ? tCommon('saving') : t('notifications.saveChanges')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}