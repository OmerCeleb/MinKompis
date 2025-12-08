// src/lib/api/types.ts

// ============================================
// Auth Types
// ============================================

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
    refreshToken: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'CUSTOMER' | 'PROVIDER';
    phone?: string;
    languages?: string[];
}

export interface RegisterResponse {
    user: User;
    token: string;
    refreshToken: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    token: string;
}

// ============================================
// User Types
// ============================================

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
    avatar?: string;
    phone?: string;
    languages: string[];
    createdAt: string;
    updatedAt: string;
    emailVerified: boolean;
}

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
    languages?: string[];
    location?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

// ============================================
// Provider Types
// ============================================

export interface Provider {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    businessName: string;
    avatar: string;
    bio: string;
    rating: number;
    reviewCount: number;
    languages: string[];
    categories: string[];
    hourlyRate: number;
    location: string;
    verified: boolean;
    experience: string;
    availability: 'available' | 'busy' | 'offline';
    responseTime: string;
    completedJobs: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProviderListRequest {
    page?: number;
    limit?: number;
    category?: string;
    language?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    verifiedOnly?: boolean;
    search?: string;
    sortBy?: 'rating' | 'price' | 'reviewCount' | 'recommended';
    sortOrder?: 'asc' | 'desc';
}

export interface ProviderListResponse {
    providers: Provider[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// ============================================
// Service Types
// ============================================

export interface Service {
    id: string;
    providerId: string;
    title: string;
    description: string;
    category: string;
    price: number;
    duration: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateServiceRequest {
    title: string;
    description: string;
    category: string;
    price: number;
    duration: number;
    active?: boolean;
}

export interface UpdateServiceRequest {
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    duration?: number;
    active?: boolean;
}

// ============================================
// Booking Types
// ============================================

export interface Booking {
    id: string;
    serviceId: string;
    providerId: string;
    customerId: string;
    providerName: string;
    providerAvatar: string;
    customerName: string;
    customerAvatar: string;
    serviceName: string;
    date: string;
    time: string;
    duration: number;
    totalAmount: number;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
    message?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBookingRequest {
    serviceId: string;
    providerId: string;
    date: string;
    time: string;
    duration: number;
    message?: string;
}

export interface UpdateBookingStatusRequest {
    status: 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
}

export interface BookingListRequest {
    page?: number;
    limit?: number;
    status?: Booking['status'];
    type?: 'customer' | 'provider';
}

export interface BookingListResponse {
    bookings: Booking[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// ============================================
// Message Types
// ============================================

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    text: string;
    read: boolean;
    createdAt: string;
}

export interface Conversation {
    id: string;
    participantId: string;
    participantName: string;
    participantAvatar: string;
    lastMessage: string;
    lastMessageAt: string;
    unreadCount: number;
    messages: Message[];
}

export interface SendMessageRequest {
    receiverId: string;
    text: string;
}

// ============================================
// Review Types
// ============================================

export interface Review {
    id: string;
    bookingId: string;
    providerId: string;
    customerId: string;
    customerName: string;
    customerAvatar: string;
    rating: number;
    comment: string;
    reply?: string;
    repliedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateReviewRequest {
    bookingId: string;
    providerId: string;
    rating: number;
    comment: string;
}

export interface ReplyToReviewRequest {
    reply: string;
}

export interface ReviewListRequest {
    providerId?: string;
    page?: number;
    limit?: number;
    rating?: number;
}

export interface ReviewListResponse {
    reviews: Review[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    averageRating: number;
}

// ============================================
// Favorite Types
// ============================================

export interface Favorite {
    id: string;
    customerId: string;
    providerId: string;
    provider: Provider;
    createdAt: string;
}

export interface FavoriteListResponse {
    favorites: Favorite[];
    total: number;
}

// ============================================
// Category Types
// ============================================

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    active: boolean;
}

// ============================================
// File Upload Types
// ============================================

export interface UploadResponse {
    url: string;
    publicId?: string;
    filename: string;
    size: number;
    mimeType: string;
}

// ============================================
// Pagination & Filter Types
// ============================================

export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface SortParams {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}