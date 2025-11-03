export type UserRole = 'CUSTOMER' | 'PROVIDER' | 'ADMIN';

export type ServiceStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'INACTIVE';

export type BookingStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  languages: string[];
  createdAt: Date;
}

export interface ProviderProfile {
  id: string;
  userId: string;
  user?: User;
  bio: string;
  title: string;
  yearsExperience?: number;
  languages: string[];
  location: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  services?: Service[];
}

export interface Service {
  id: string;
  providerId: string;
  provider?: ProviderProfile;
  categoryId: string;
  category?: Category;
  title: string;
  description: string;
  languages: string[];
  pricePerHour?: number;
  priceFixed?: number;
  priceType: 'HOURLY' | 'FIXED' | 'NEGOTIABLE';
  status: ServiceStatus;
  images: string[];
  createdAt: Date;
}

export interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameSv: string;
  nameTr: string;
  descEn: string;
  descSv: string;
  descTr: string;
  icon: string;
  order: number;
}

export interface Review {
  id: string;
  reviewer: User;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  customer: User;
  provider: ProviderProfile;
  service: Service;
  message: string;
  scheduledAt?: Date;
  status: BookingStatus;
  totalAmount: number;
  commission: number;
  createdAt: Date;
}
