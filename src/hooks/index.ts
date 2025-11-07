// src/hooks/index.ts
// Central export file for all custom hooks

export { useAuth } from './useAuth';
export type { User, LoginCredentials, RegisterData } from './useAuth';

export { useProviders } from './useProviders';
export type { Provider, ProviderFilters, SortOption } from './useProviders';

export { useBooking } from './useBooking';
export type { Booking, CreateBookingData } from './useBooking';

export { usePagination } from './usePagination';
export { useDebouncedValue } from './useDebouncedValue';
export { useLocalStorage } from './useLocalStorage';
export { useModal } from './useModal';
export { useMediaQuery } from './useMediaQuery';

// Usage:
// import { useAuth, useProviders, useBooking, type Provider } from '@/hooks';