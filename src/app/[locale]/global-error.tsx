// src/app/[locale]/global-error.tsx
'use client';

import { useEffect } from 'react';
import '../globals.css'; // ← Tailwind CSS import et

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global Error:', error);
    }, [error]);

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Error - MinKompis</title>
        </head>
        <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-neutral-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-8 relative">
                    <div className="text-[200px] font-bold text-red-100 leading-none select-none">
                        ⚠️
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
                            Something went seriously wrong
                        </h1>
                        <p className="text-lg text-neutral-600 max-w-md mx-auto">
                            We're experiencing a critical error. Please try refreshing the page.
                        </p>
                    </div>

                    {process.env.NODE_ENV === 'development' && error.message && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-md mx-auto">
                            <p className="text-xs font-mono text-red-600 break-all">
                                {error.message}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={reset}
                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg shadow-lg transition-all"
                        >
                            Try Again
                        </button>

                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-6 py-3 bg-white border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-all"
                        >
                            Go to Homepage
                        </button>
                    </div>

                    {error.digest && (
                        <p className="text-xs text-neutral-400">
                            Error Code: {error.digest}
                        </p>
                    )}
                </div>
            </div>
        </div>
        </body>
        </html>
    );
}