// src/components/services/SearchBar.tsx
'use client';

import { useTranslations } from 'next-intl';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onToggleFilters: () => void;
    showFilters: boolean;
    placeholder?: string;
}

export default function SearchBar({ value, onChange, onToggleFilters, showFilters }: SearchBarProps) {
    return (
        <div className="mb-8">
            <div className="flex gap-3">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Search by name, service, or keyword..."
                        className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg shadow-sm"
                    />
                    {value && (
                        <button
                            onClick={() => onChange('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Filter Toggle Button (Mobile) */}
                <button
                    onClick={onToggleFilters}
                    className={`lg:hidden px-6 py-4 rounded-xl font-medium transition-all shadow-sm ${
                        showFilters
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span className="hidden sm:inline">Filters</span>
                    </div>
                </button>
            </div>
        </div>
    );
}