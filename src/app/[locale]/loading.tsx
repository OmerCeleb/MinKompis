// src/app/[locale]/loading.tsx
export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-neutral-50 flex items-center justify-center">
            <div className="text-center">
                {/* Animated Logo/Spinner */}
                <div className="mb-8">
                    <div className="relative w-20 h-20 mx-auto">
                        {/* Outer Ring */}
                        <div className="absolute inset-0 border-4 border-primary-200 rounded-full animate-ping"></div>

                        {/* Middle Ring */}
                        <div className="absolute inset-2 border-4 border-primary-400 rounded-full animate-spin"></div>

                        {/* Inner Circle */}
                        <div className="absolute inset-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white animate-pulse"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-neutral-900">
                        Loading...
                    </h2>
                    <p className="text-sm text-neutral-500">
                        Please wait a moment
                    </p>
                </div>

                {/* Loading Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}