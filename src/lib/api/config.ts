// src/lib/api/config.ts

export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    VERSION: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
    TIMEOUT: 30000,

    TOKEN_KEY: process.env.NEXT_PUBLIC_TOKEN_KEY || 'minkompis_auth_token',
    REFRESH_TOKEN_KEY: process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'minkompis_refresh_token',

    MAX_FILE_SIZE: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '5242880'),
    ALLOWED_FILE_TYPES: (process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,application/pdf').split(','),

    ENABLE_BANKID: process.env.NEXT_PUBLIC_ENABLE_BANKID === 'true',
    ENABLE_STRIPE: process.env.NEXT_PUBLIC_ENABLE_STRIPE === 'true',
} as const;

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
        VERIFY_EMAIL: '/auth/verify-email',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        BANKID_INIT: '/auth/bankid/init',
        BANKID_COLLECT: '/auth/bankid/collect',
    },

    USERS: {
        PROFILE: '/users/profile',
        UPDATE_PROFILE: '/users/profile',
        CHANGE_PASSWORD: '/users/change-password',
        UPLOAD_AVATAR: '/users/avatar',
        DELETE_ACCOUNT: '/users/account',
    },

    PROVIDERS: {
        LIST: '/providers',
        GET: (id: string) => `/providers/${id}`,
        CREATE: '/providers',
        UPDATE: (id: string) => `/providers/${id}`,
        DELETE: (id: string) => `/providers/${id}`,
        FEATURED: '/providers/featured',
        SEARCH: '/providers/search',
        STATS: (id: string) => `/providers/${id}/stats`,
    },

    SERVICES: {
        LIST: '/services',
        GET: (id: string) => `/services/${id}`,
        CREATE: '/services',
        UPDATE: (id: string) => `/services/${id}`,
        DELETE: (id: string) => `/services/${id}`,
        BY_PROVIDER: (providerId: string) => `/providers/${providerId}/services`,
    },

    BOOKINGS: {
        LIST: '/bookings',
        GET: (id: string) => `/bookings/${id}`,
        CREATE: '/bookings',
        UPDATE: (id: string) => `/bookings/${id}`,
        CANCEL: (id: string) => `/bookings/${id}/cancel`,
        ACCEPT: (id: string) => `/bookings/${id}/accept`,
        REJECT: (id: string) => `/bookings/${id}/reject`,
        COMPLETE: (id: string) => `/bookings/${id}/complete`,
        CUSTOMER: '/bookings/customer',
        PROVIDER: '/bookings/provider',
    },

    MESSAGES: {
        CONVERSATIONS: '/messages/conversations',
        GET_CONVERSATION: (id: string) => `/messages/conversations/${id}`,
        SEND: '/messages/send',
        MARK_READ: (id: string) => `/messages/${id}/read`,
    },

    REVIEWS: {
        LIST: '/reviews',
        GET: (id: string) => `/reviews/${id}`,
        CREATE: '/reviews',
        UPDATE: (id: string) => `/reviews/${id}`,
        DELETE: (id: string) => `/reviews/${id}`,
        BY_PROVIDER: (providerId: string) => `/providers/${providerId}/reviews`,
        REPLY: (id: string) => `/reviews/${id}/reply`,
    },

    FAVORITES: {
        LIST: '/favorites',
        ADD: '/favorites',
        REMOVE: (providerId: string) => `/favorites/${providerId}`,
    },

    CATEGORIES: {
        LIST: '/categories',
        GET: (id: string) => `/categories/${id}`,
    },

    UPLOAD: {
        IMAGE: '/upload/image',
        DOCUMENT: '/upload/document',
        AVATAR: '/upload/avatar',
    },
} as const;