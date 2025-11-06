// src/components/booking/BookingModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    provider: {
        id: string;
        firstName: string;
        lastName: string;
        avatar: string;
        hourlyRate: number;
    };
    service?: {
        title: string;
        duration: number;
    };
}

export default function BookingModal({
                                         isOpen,
                                         onClose,
                                         provider,
                                         service
                                     }: BookingModalProps) {
    const t = useTranslations('booking');
    const tCommon = useTranslations('common');

    const [formData, setFormData] = useState({
        date: '',
        time: '',
        duration: service?.duration || 60,
        message: '',
        agreedToTerms: false
    });
    const [loading, setLoading] = useState(false);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                date: '',
                time: '',
                duration: service?.duration || 60,
                message: '',
                agreedToTerms: false
            });
        }
    }, [isOpen, service]);

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

    const calculateTotal = () => {
        return (provider.hourlyRate * formData.duration) / 60;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.agreedToTerms) {
            alert(t('mustAgreeToTerms'));
            return;
        }

        setLoading(true);

        // TODO: Backend integration
        console.log('Booking request:', {
            providerId: provider.id,
            ...formData,
            totalPrice: calculateTotal()
        });

        setTimeout(() => {
            setLoading(false);
            alert(t('bookingSuccess'));
            onClose();
        }, 1500);
    };

    // Generate time slots (09:00 - 20:00, every 30 min)
    const timeSlots = [];
    for (let hour = 9; hour <= 20; hour++) {
        for (let min = 0; min < 60; min += 30) {
            if (hour === 20 && min > 0) break;
            const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
            timeSlots.push(time);
        }
    }

    // Get min date (today)
    const today = new Date().toISOString().split('T')[0];

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
                            {t('bookAppointment')}
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
                                {service && (
                                    <p className="text-sm text-neutral-600">{service.title}</p>
                                )}
                                <p className="text-sm font-medium text-primary-600 mt-1">
                                    {provider.hourlyRate} SEK / {t('hour')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        {/* Date Selection */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-2">
                                {t('selectDate')} *
                            </label>
                            <input
                                type="date"
                                required
                                min={today}
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Time Selection */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-2">
                                {t('selectTime')} *
                            </label>
                            <select
                                required
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="">{t('chooseTime')}</option>
                                {timeSlots.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-2">
                                {t('duration')} *
                            </label>
                            <select
                                required
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value={30}>30 {t('minutes')}</option>
                                <option value={45}>45 {t('minutes')}</option>
                                <option value={60}>60 {t('minutes')}</option>
                                <option value={90}>90 {t('minutes')}</option>
                                <option value={120}>120 {t('minutes')}</option>
                            </select>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-2">
                                {t('message')} ({tCommon('optional')})
                            </label>
                            <textarea
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder={t('messagePlaceholder')}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            />
                            <p className="text-xs text-neutral-500 mt-1">
                                {t('messageHint')}
                            </p>
                        </div>

                        {/* Price Summary */}
                        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-neutral-700">{t('sessionDuration')}:</span>
                                <span className="font-medium text-neutral-900">{formData.duration} {t('minutes')}</span>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-neutral-700">{t('hourlyRate')}:</span>
                                <span className="font-medium text-neutral-900">{provider.hourlyRate} SEK</span>
                            </div>
                            <div className="h-px bg-primary-300 my-3"></div>
                            <div className="flex items-center justify-between">
                                <span className="text-base font-semibold text-neutral-900">{t('totalPrice')}:</span>
                                <span className="text-2xl font-bold text-primary-600">{calculateTotal()} SEK</span>
                            </div>
                        </div>

                        {/* Terms Agreement */}
                        <div className="bg-neutral-50 rounded-lg p-4">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.agreedToTerms}
                                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                                    className="mt-1 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                />
                                <span className="text-sm text-neutral-700">
                  {t('agreeToTerms')}{' '}
                                    <a href="/terms" target="_blank" className="text-primary-600 hover:text-primary-700 font-medium">
                    {t('termsAndConditions')}
                  </a>
                                    {' '}{t('and')}{' '}
                                    <a href="/privacy" target="_blank" className="text-primary-600 hover:text-primary-700 font-medium">
                    {t('privacyPolicy')}
                  </a>
                </span>
                            </label>
                        </div>

                        {/* Important Notice */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div className="text-sm text-blue-800">
                                    <p className="font-semibold mb-1">{t('importantNotice')}</p>
                                    <p>{t('bookingNotice')}</p>
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
                                disabled={loading || !formData.agreedToTerms}
                                fullWidth
                                size="lg"
                            >
                                {loading ? t('sending') : t('sendRequest')}
                            </Button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}