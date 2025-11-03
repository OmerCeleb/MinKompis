export type UserRole = 'customer' | 'provider';

export type Language = 'tr' | 'sv' | 'en' | 'ar';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  language: Language;
  createdAt: Date;
}

export interface Provider extends User {
  role: 'provider';
  skills: string[];
  languages: Language[];
  categories: JobCategory[];
  rating?: number;
  completedJobs?: number;
}

export interface Customer extends User {
  role: 'customer';
}

export type JobCategory = 'official' | 'home' | 'coaching';
