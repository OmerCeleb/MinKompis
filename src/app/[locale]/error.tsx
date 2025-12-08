// src/app/[locale]/error.tsx
'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations('error');

    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-neutral-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Error Illustration */}
                <div className="mb-8 relative">
                    <div className="text-[200px] font-bold text-red-100 leading-none select-none">
                        500
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                            <svg
                                className="w-16 h-16 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
                            {t('500.title')}
                        </h1>
                        <p className="text-lg text-neutral-600 max-w-md mx-auto">
                            {t('500.description')}
                        </p>
                    </div>

                    {/* Error Details (Development Only) */}
                    {process.env.NODE_ENV === 'development' && error.message && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-md mx-auto">
                            <p className="text-xs font-mono text-red-600 break-all">
                                {error.message}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 max-w-md mx-auto">
                        <h2 className="text-sm font-semibold text-neutral-900 mb-4">
                            {t('500.whatToDo')}
                        </h2>
                        <ul className="space-y-3 text-left">
                            {[
                                { icon: '🔄', text: t('500.tryAgain') },
                                { icon: '🏠', text: t('500.goHome') },
                                { icon: '📧', text: t('500.contactSupport') },
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="text-sm text-neutral-600 pt-1">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={reset}
                            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            {t('500.tryAgainButton')}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => window.location.href = '/'}
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            {t('500.goHomeButton')}
                        </Button>
                    </div>

                    {/* Error Code */}
                    {error.digest && (
                        <p className="text-xs text-neutral-400">
                            {t('500.errorCode')}: {error.digest}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}