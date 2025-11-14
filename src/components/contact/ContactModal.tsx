// src/components/contact/ContactModal.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';
import { useToast } from '@/hooks';

interface ContactModalProps {
    provider: {
        id: string;
        name: string;
        avatar: string;
        responseTime?: string;
        // Legacy prop for backward compatibility
        typicalResponseTime?: string;
    };
    onClose: () => void;
}

export default function ContactModal({ provider, onClose }: ContactModalProps) {
    const t = useTranslations('contact');
    const tCommon = useTranslations('common');
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const quickMessages = [
        t('quickMessage1'),
        t('quickMessage2'),
        t('quickMessage3'),
        t('quickMessage4')
    ];

    const handleQuickMessage = (message: string) => {
        setFormData(prev => ({ ...prev, message }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.subject.trim() || !formData.message.trim()) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        setLoading(true);

        try {
            // TODO: Backend integration
            await new Promise(resolve => setTimeout(resolve, 1000));

            showToast(t('messageSent'), 'success');
            onClose();
        } catch (error) {
            showToast('Failed to send message', 'error');
        } finally {
            setLoading(false);
        }
    };

    const responseTime = provider.responseTime || provider.typicalResponseTime;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/50 transition-opacity"
                    onClick={onClose}
                />

                {/* Modal */}
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 sm:px-8 py-4 flex items-center justify-between z-10">
                        <div className="flex items-center gap-4">
                            <img
                                src={provider.avatar}
                                alt={provider.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-xl font-bold text-neutral-900">
                                    {t('contactProvider')}
                                </h2>
                                <p className="text-sm text-neutral-600">
                                    {provider.name}
                                    {responseTime && (
                                        <span className="text-neutral-400"> • {t('typicallyResponds')} {responseTime}</span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

                        {/* Quick Messages */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-3">
                                {t('quickMessages')}
                            </label>
                            <div className="space-y-2">
                                {quickMessages.map((message, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleQuickMessage(message)}
                                        className="w-full text-left px-4 py-3 text-sm text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200"
                                    >
                                        {message}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">
                                {t('quickMessagesHint')}
                            </p>
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                {t('subject')}
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder={t('subjectPlaceholder')}
                                required
                                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                {t('message')}
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={6}
                                placeholder={t('messagePlaceholder')}
                                required
                                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            />
                            <p className="text-xs text-neutral-500 mt-1">
                                {t('messageHint')}
                            </p>
                        </div>

                        {/* Messaging Tips */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                {t('messagingTips')}
                            </h4>
                            <ul className="space-y-2 text-sm text-blue-800">
                                <li className="flex items-start gap-2">
                                    <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {t('tip1')}
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {t('tip2')}
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {t('tip3')}
                                </li>
                            </ul>
                        </div>

                        {/* Safety Notice */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h4 className="font-semibold text-yellow-900 mb-1">{t('safetyTitle')}</h4>
                                    <p className="text-sm text-yellow-800">{t('safetyMessage')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                fullWidth
                                onClick={onClose}
                                disabled={loading}
                            >
                                {tCommon('cancel')}
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? t('sending') : t('sendMessage')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}