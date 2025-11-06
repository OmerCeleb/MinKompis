// src/components/contact/ContactModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';
import { useRouter } from 'next/navigation';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    provider: {
        id: string;
        firstName: string;
        lastName: string;
        avatar: string;
        responseTime: string;
    };
}

export default function ContactModal({
                                         isOpen,
                                         onClose,
                                         provider
                                     }: ContactModalProps) {
    const t = useTranslations('contact');
    const tCommon = useTranslations('common');
    const router = useRouter();

    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                subject: '',
                message: ''
            });
        }
    }, [isOpen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        // TODO: Backend integration - Create new conversation
        console.log('Sending message to provider:', {
            providerId: provider.id,
            ...formData
        });

        setTimeout(() => {
            setLoading(false);
            onClose();

            // Redirect to messages page with this conversation
            router.push(`/customer/messages?provider=${provider.id}`);
        }, 1000);
    };

    const quickMessages = [
        t('quickMessage1'),
        t('quickMessage2'),
        t('quickMessage3'),
        t('quickMessage4')
    ];

    const handleQuickMessage = (message: string) => {
        setFormData(prev => ({
            ...prev,
            message: prev.message ? `${prev.message}\n\n${message}` : message
        }));
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                        <h2 className="text-2xl font-bold text-neutral-900">
                            {t('contactProvider')}
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors flex items-center justify-center"
                        >
                            <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Provider Info */}
                    <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200">
                        <div className="flex items-center gap-4">
                            <img
                                src={provider.avatar}
                                alt={`${provider.firstName} ${provider.lastName}`}
                                className="w-16 h-16 rounded-full object-cover ring-4 ring-white"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg text-neutral-900">
                                    {provider.firstName} {provider.lastName}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-neutral-600 mt-1">
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{t('typicallyResponds')} {provider.responseTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        {/* Quick Messages */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-3">
                                {t('quickMessages')}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {quickMessages.map((message, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleQuickMessage(message)}
                                        className="text-left px-4 py-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg text-sm text-neutral-700 transition-colors"
                                    >
                                        {message}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">{t('quickMessagesHint')}</p>
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-2">
                                {t('subject')} *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder={t('subjectPlaceholder')}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-2">
                                {t('message')} *
                            </label>
                            <textarea
                                required
                                rows={6}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder={t('messagePlaceholder')}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            />
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-neutral-500">
                                    {t('messageHint')}
                                </p>
                                <span className="text-xs text-neutral-500">
                  {formData.message.length}/1000
                </span>
                            </div>
                        </div>

                        {/* Info Notice */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div className="text-sm text-blue-800">
                                    <p className="font-semibold mb-1">{t('messagingTips')}</p>
                                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                                        <li>{t('tip1')}</li>
                                        <li>{t('tip2')}</li>
                                        <li>{t('tip3')}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Safety Notice */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <div className="text-sm text-yellow-800">
                                    <p className="font-semibold mb-1">{t('safetyTitle')}</p>
                                    <p className="text-yellow-700">{t('safetyMessage')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                fullWidth
                                size="lg"
                            >
                                {tCommon('cancel')}
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading || !formData.subject || !formData.message}
                                fullWidth
                                size="lg"
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