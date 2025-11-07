// src/components/booking/BookingModal.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';
import { useBooking, useToast } from '@/hooks';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    provider: {
        id: string;
        name: string;
        avatar: string;
        title: string;
        hourlyRate: number;
    };
    serviceId: string;
}

export default function BookingModal({
                                         isOpen,
                                         onClose,
                                         provider,
                                         serviceId
                                     }: BookingModalProps) {
    const t = useTranslations('booking');
    const tCommon = useTranslations('common');

    const { createBooking, loading } = useBooking();

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [duration, setDuration] = useState(60);
    const [message, setMessage] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Available time slots
    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
        '15:00', '16:00', '17:00', '18:00', '19:00'
    ];

    // Calculate total price
    const totalPrice = (provider.hourlyRate / 60) * duration;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!agreedToTerms) {
            alert(t('mustAgreeToTerms')); // TODO: Replace with toast
            return;
        }

        const result = await createBooking({
            serviceId,
            providerId: provider.id,
            date: selectedDate,
            time: selectedTime,
            duration,
            message,
            totalAmount: totalPrice
        });

        if (result.success) {
            setShowSuccess(true);
            setTimeout(() => {
                onClose();
                setShowSuccess(false);
                // Reset form
                setSelectedDate('');
                setSelectedTime('');
                setDuration(60);
                setMessage('');
                setAgreedToTerms(false);
            }, 2000);
        }
    };

    if (!isOpen) return null;

    // Success message
    if (showSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                        Success!
                    </h3>
                    <p className="text-neutral-600">
                        {t('bookingSuccess')}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full my-8">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                    <div className="flex items-center gap-4">
                        <img
                            src={provider.avatar}
                            alt={provider.name}
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <h2 className="text-xl font-bold text-neutral-900">
                                {t('bookAppointment')}
                            </h2>
                            <p className="text-sm text-neutral-600">
                                {provider.name} - {provider.title}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* Date Selection */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            {t('selectDate')}
                        </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    {/* Time Selection */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            {t('selectTime')}
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {timeSlots.map(time => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => setSelectedTime(time)}
                                    className={`px-4 py-2 rounded-lg border transition-all ${
                                        selectedTime === time
                                            ? 'bg-primary-600 text-white border-primary-600'
                                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary-500'
                                    }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            {t('sessionDuration')}
                        </label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500"
                        >
                            <option value={30}>30 {t('minutes')}</option>
                            <option value={60}>1 {t('hour')}</option>
                            <option value={90}>1.5 {t('hour')}</option>
                            <option value={120}>2 {t('hour')}</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            {t('message')} <span className="text-neutral-500">({tCommon('optional')})</span>
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t('messagePlaceholder')}
                            rows={4}
                            className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        />
                        <p className="mt-2 text-xs text-neutral-500">
                            {t('messageHint')}
                        </p>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-neutral-50 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-neutral-600">{t('hourlyRate')}</span>
                            <span className="font-semibold">{provider.hourlyRate} SEK/{t('hour')}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-neutral-600">{t('duration')}</span>
                            <span className="font-semibold">{duration} {t('minutes')}</span>
                        </div>
                        <div className="border-t border-neutral-200 pt-2 mt-2">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-lg">{t('totalPrice')}</span>
                                <span className="font-bold text-2xl text-primary-600">
                  {Math.round(totalPrice)} SEK
                </span>
                            </div>
                        </div>
                    </div>

                    {/* Terms Agreement */}
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="mt-1 w-4 h-4 text-primary-600 rounded"
                        />
                        <span className="text-sm text-neutral-600">
              {t('agreeToTerms')}{' '}
                            <a href="/terms" target="_blank" className="text-primary-600 hover:underline">
                {t('termsAndConditions')}
              </a>{' '}
                            {t('and')}{' '}
                            <a href="/privacy" target="_blank" className="text-primary-600 hover:underline">
                {t('privacyPolicy')}
              </a>
            </span>
                    </label>

                    {/* Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex gap-3">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="font-semibold text-blue-900 text-sm">
                                    {t('importantNotice')}
                                </p>
                                <p className="text-blue-800 text-sm mt-1">
                                    {t('bookingNotice')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            fullWidth
                            disabled={loading}
                        >
                            {tCommon('cancel')}
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            disabled={loading || !selectedDate || !selectedTime}
                        >
                            {loading ? t('sending') : t('sendRequest')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}