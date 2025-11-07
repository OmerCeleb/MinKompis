// src/hooks/useProviders.ts
import { useState, useEffect, useCallback } from 'react';
import { mockProviders, filterProviders, type Provider } from '@/lib/mockData';

// Re-export Provider type from mockData
export type { Provider } from '@/lib/mockData';

export interface ProviderFilters {
    category?: string;
    language?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    verifiedOnly?: boolean;
    availability?: string;
    searchTerm?: string;
}

export interface SortOption {
    field: 'rating' | 'price' | 'reviewCount' | 'recommended';
    order: 'asc' | 'desc';
}

interface ProvidersState {
    providers: Provider[];
    filteredProviders: Provider[];
    loading: boolean;
    error: string | null;
    total: number;
}

export function useProviders(initialFilters: ProviderFilters = {}) {
    const [state, setState] = useState<ProvidersState>({
        providers: [],
        filteredProviders: [],
        loading: true,
        error: null,
        total: 0
    });

    const [filters, setFilters] = useState<ProviderFilters>(initialFilters);
    const [sortBy, setSortBy] = useState<SortOption>({
        field: 'recommended',
        order: 'desc'
    });

    // Fetch providers (mock data for now)
    const fetchProviders = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // TODO: Backend API call
            // const response = await fetch('/api/providers?' + new URLSearchParams({
            //   category: filters.category || '',
            //   language: filters.language || '',
            //   ...
            // }));
            // const data = await response.json();

            // Mock delay
            await new Promise(resolve => setTimeout(resolve, 500));

            setState({
                providers: mockProviders,
                filteredProviders: mockProviders,
                loading: false,
                error: null,
                total: mockProviders.length
            });
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.message || 'Failed to fetch providers'
            }));
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchProviders();
    }, [fetchProviders]);

    // Apply filters and sorting
    useEffect(() => {
        let filtered = filterProviders(state.providers, {
            search: filters.searchTerm,
            category: filters.category && filters.category !== 'all' ? filters.category : undefined,
            language: filters.language && filters.language !== 'all' ? filters.language : undefined,
            location: filters.location && filters.location !== 'all' ? filters.location : undefined,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            verifiedOnly: filters.verifiedOnly
        });

        // Apply sorting
        filtered.sort((a, b) => {
            let comparison = 0;

            switch (sortBy.field) {
                case 'rating':
                    comparison = a.rating - b.rating;
                    break;
                case 'price':
                    comparison = a.hourlyRate - b.hourlyRate;
                    break;
                case 'reviewCount':
                    comparison = a.reviewCount - b.reviewCount;
                    break;
                case 'recommended':
                    // Custom recommendation algorithm
                    const scoreA = a.rating * 0.4 + (a.reviewCount / 10) * 0.3 + (a.verified ? 10 : 0);
                    const scoreB = b.rating * 0.4 + (b.reviewCount / 10) * 0.3 + (b.verified ? 10 : 0);
                    comparison = scoreA - scoreB;
                    break;
            }

            return sortBy.order === 'asc' ? comparison : -comparison;
        });

        setState(prev => ({
            ...prev,
            filteredProviders: filtered,
            total: filtered.length
        }));
    }, [state.providers, filters, sortBy]);

    // Update filters
    const updateFilters = useCallback((newFilters: Partial<ProviderFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    // Clear filters
    const clearFilters = useCallback(() => {
        setFilters({});
    }, []);

    // Get provider by ID
    const getProviderById = useCallback((id: string): Provider | undefined => {
        return state.providers.find(p => p.id === id);
    }, [state.providers]);

    // Get featured providers
    const getFeaturedProviders = useCallback((limit: number = 6): Provider[] => {
        return state.providers
            .filter(p => p.verified && p.rating >= 4.5)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }, [state.providers]);

    // Get providers by category
    const getProvidersByCategory = useCallback((category: string, limit?: number): Provider[] => {
        const filtered = state.providers.filter(p => p.categories.includes(category));
        return limit ? filtered.slice(0, limit) : filtered;
    }, [state.providers]);

    return {
        providers: state.filteredProviders,
        allProviders: state.providers,
        loading: state.loading,
        error: state.error,
        total: state.total,
        filters,
        sortBy,
        updateFilters,
        clearFilters,
        setSortBy,
        refetch: fetchProviders,
        getProviderById,
        getFeaturedProviders,
        getProvidersByCategory
    };
}