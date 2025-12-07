// src/components/shared/PageLoader.tsx
'use client';

import LoadingSpinner from './LoadingSpinner';

interface PageLoaderProps {
    message?: string;
    fullScreen?: boolean;
}

export default function PageLoader({
                                       message = 'Loading...',
                                       fullScreen = true
                                   }: PageLoaderProps) {

    const containerClass = fullScreen
        ? 'min-h-screen bg-neutral-50 flex items-center justify-center'
        : 'min-h-[400px] flex items-center justify-center';

    return (
        <div className={containerClass}>
            <div className="text-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-neutral-600 text-lg">{message}</p>
            </div>
        </div>
    );
}