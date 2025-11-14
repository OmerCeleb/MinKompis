// src/components/booking/BookingModal.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';
import { useBooking, useToast } from '@/hooks';

interface Service {
    id: string;
    title: string;
    price: number;
    duration: number;
    category: string;
}

interface BookingModalProps {
    provider: {
        id: string;
        name: string;
        avatar: string;
        responseTime?: string;
        services?: Service[];
        // Legacy props for backward compatibility
        title?: string;
        hourlyRate?: number;
    };
    serviceId?: string;
    onClose: () => void;
}

export default function BookingModal({
                                         provider,
                                         serviceId,
                                         onClose
                                     }: BookingModalProps) {
    const t = useTranslations('booking');
    const tCommon = useTranslations('common');
    const tServices = useTranslations('services');

    const { createBooking, loading } = useBooking();
    const { showToast } = useToast();

    const [selectedService, setSelectedService] = useState<string>(
        serviceId || (provider.services?.[0]?.id || '')
    );
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [message, setMessage] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Available time slots
    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
        '15:00', '16:00', '17:00', '18:00', '19:00'
    ];

    // Get selected service details
    const currentService = provider.services?.find(s => s.id === selectedService);

    // Calculate total price
    const totalPrice = currentService?.price || provider.hourlyRate || 0;
    const duration = currentService?.duration || 60;

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDate || !selectedTime) {
            showToast('Please select date and time', 'error');
            return;
        }

        if (!agreedToTerms) {
            showToast(t('mustAgreeToTerms'), 'error');
            return;
        }

        const result = await createBooking({
            serviceId: selectedService,
            providerId: provider.id,
            date: selectedDate,
            time: selectedTime,
            duration,
            message,
            totalAmount: totalPrice
        });

        if (result.success) {
            showToast(t('bookingSuccess'), 'success');
            onClose();
        } else {
            showToast(result.error || 'Booking failed', 'error');
        }
    };

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
                                    {t('bookAppointment')}
                                </h2>
                                <p className="text-sm text-neutral-600">
                                    {provider.name}
                                    {provider.responseTime && (
                                        <span className="text-neutral-400"> • {provider.responseTime}</span>
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

                        {/* Service Selection (if multiple services) */}
                        {provider.services && provider.services.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-3">
                                    Select Service
                                </label>
                                <div className="space-y-2">
                                    {provider.services.map((service) => (
                                        <button
                                            key={service.id}
                                            type="button"
                                            onClick={() => setSelectedService(service.id)}
                                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                                selectedService === service.id
                                                    ? 'border-primary-600 bg-primary-50'
                                                    : 'border-neutral-200 hover:border-neutral-300'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-neutral-900 mb-1">
                                                        {service.title}
                                                    </h4>
                                                    <div className="flex items-center gap-3 text-sm text-neutral-500">
                                                        <span className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {service.duration} min
                                                        </span>
                                                        <span>•</span>
                                                        <span className="px-2 py-0.5 bg-neutral-100 rounded-full text-xs">
                                                            {service.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right ml-4">
                                                    <div className="text-xl font-bold text-primary-600">
                                                        {service.price} {tServices('sek')}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Date Selection */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                {t('selectDate')}
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={today}
                                required
                                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Time Selection */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                {t('selectTime')}
                            </label>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => setSelectedTime(time)}
                                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
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

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                {t('message')} <span className="text-neutral-400">({tCommon('optional')})</span>
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                placeholder={t('messagePlaceholder')}
                                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            />
                            <p className="text-xs text-neutral-500 mt-1">
                                {t('messageHint')}
                            </p>
                        </div>

                        {/* Price Summary */}
                        <div className="bg-neutral-50 rounded-xl p-4 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-neutral-600">{t('sessionDuration')}</span>
                                <span className="font-medium text-neutral-900">{duration} {t('minutes')}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-neutral-600">{currentService ? 'Service Price' : t('hourlyRate')}</span>
                                <span className="font-medium text-neutral-900">{totalPrice} {tServices('sek')}</span>
                            </div>
                            <div className="border-t border-neutral-200 pt-2 mt-2 flex items-center justify-between">
                                <span className="font-semibold text-neutral-900">{t('totalPrice')}</span>
                                <span className="text-2xl font-bold text-primary-600">{totalPrice} {tServices('sek')}</span>
                            </div>
                        </div>

                        {/* Terms Agreement */}
                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 mt-0.5"
                                />
                                <span className="text-sm text-neutral-600">
                                    {t('agreeToTerms')}{' '}
                                    <a href="/terms" target="_blank" className="text-primary-600 hover:text-primary-700 underline">
                                        {t('termsAndConditions')}
                                    </a>
                                    {' '}{t('and')}{' '}
                                    <a href="/privacy" target="_blank" className="text-primary-600 hover:text-primary-700 underline">
                                        {t('privacyPolicy')}
                                    </a>
                                </span>
                            </label>
                        </div>

                        {/* Important Notice */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h4 className="font-semibold text-blue-900 mb-1">{t('importantNotice')}</h4>
                                    <p className="text-sm text-blue-800">{t('bookingNotice')}</p>
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
                                disabled={loading || !agreedToTerms}
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