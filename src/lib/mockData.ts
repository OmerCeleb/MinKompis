// src/lib/mockData.ts

export interface Provider {
    id: string;
    firstName: string;
    lastName: string;
    businessName: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    languages: string[];
    categories: string[];
    hourlyRate: number;
    location: string;
    verified: boolean;
    description: string;
    experience: string;
    availability: 'available' | 'busy' | 'offline';
    responseTime: string;
    completedJobs: number;
}

export const mockProviders: Provider[] = [
    {
        id: '1',
        firstName: 'Ayşe',
        lastName: 'Yılmaz',
        businessName: 'Ayşe\'s Swedish Lessons',
        avatar: 'https://i.pravatar.cc/150?img=1',
        rating: 4.9,
        reviewCount: 127,
        languages: ['tr', 'sv', 'en'],
        categories: ['education'],
        hourlyRate: 350,
        location: 'Stockholm',
        verified: true,
        description: 'Experienced Swedish teacher specializing in helping Turkish speakers learn Swedish quickly.',
        experience: '8 years',
        availability: 'available',
        responseTime: '1 hour',
        completedJobs: 245
    },
    {
        id: '2',
        firstName: 'Mohamed',
        lastName: 'Hassan',
        businessName: 'Pro Cleaning Service',
        avatar: 'https://i.pravatar.cc/150?img=12',
        rating: 4.8,
        reviewCount: 89,
        languages: ['ar', 'sv', 'en'],
        categories: ['home'],
        hourlyRate: 280,
        location: 'Göteborg',
        verified: true,
        description: 'Professional cleaning services for homes and offices. Quality guaranteed!',
        experience: '5 years',
        availability: 'available',
        responseTime: '30 min',
        completedJobs: 178
    },
    {
        id: '3',
        firstName: 'Elena',
        lastName: 'Popov',
        businessName: 'Document Translation Pro',
        avatar: 'https://i.pravatar.cc/150?img=20',
        rating: 5.0,
        reviewCount: 156,
        languages: ['en', 'sv', 'tr'],
        categories: ['official'],
        hourlyRate: 450,
        location: 'Uppsala',
        verified: true,
        description: 'Certified translator for official documents. Fast and accurate translations.',
        experience: '10 years',
        availability: 'available',
        responseTime: '2 hours',
        completedJobs: 312
    },
    {
        id: '4',
        firstName: 'Ali',
        lastName: 'Demir',
        businessName: 'FitLife Personal Training',
        avatar: 'https://i.pravatar.cc/150?img=14',
        rating: 4.7,
        reviewCount: 73,
        languages: ['tr', 'sv'],
        categories: ['health'],
        hourlyRate: 400,
        location: 'Malmö',
        verified: true,
        description: 'Certified personal trainer. Transform your body and health with customized programs.',
        experience: '6 years',
        availability: 'busy',
        responseTime: '3 hours',
        completedJobs: 145
    },
    {
        id: '5',
        firstName: 'Sara',
        lastName: 'Andersson',
        businessName: 'Business Accounting Services',
        avatar: 'https://i.pravatar.cc/150?img=5',
        rating: 4.9,
        reviewCount: 92,
        languages: ['sv', 'en'],
        categories: ['business'],
        hourlyRate: 600,
        location: 'Stockholm',
        verified: true,
        description: 'Expert accountant for small businesses and startups. Clear communication guaranteed.',
        experience: '12 years',
        availability: 'available',
        responseTime: '1 hour',
        completedJobs: 234
    },
    {
        id: '6',
        firstName: 'Fatima',
        lastName: 'Ahmed',
        businessName: 'Creative Photography',
        avatar: 'https://i.pravatar.cc/150?img=9',
        rating: 4.8,
        reviewCount: 64,
        languages: ['ar', 'en', 'sv'],
        categories: ['creative'],
        hourlyRate: 500,
        location: 'Lund',
        verified: true,
        description: 'Professional photographer for events, portraits, and commercial projects.',
        experience: '7 years',
        availability: 'available',
        responseTime: '2 hours',
        completedJobs: 128
    },
    {
        id: '7',
        firstName: 'Mehmet',
        lastName: 'Kaya',
        businessName: 'Home Repair Expert',
        avatar: 'https://i.pravatar.cc/150?img=13',
        rating: 4.6,
        reviewCount: 48,
        languages: ['tr', 'sv'],
        categories: ['home'],
        hourlyRate: 320,
        location: 'Västerås',
        verified: false,
        description: 'Reliable handyman for all types of home repairs and maintenance.',
        experience: '4 years',
        availability: 'available',
        responseTime: '4 hours',
        completedJobs: 98
    },
    {
        id: '8',
        firstName: 'Anna',
        lastName: 'Larsson',
        businessName: 'Math Tutoring Excellence',
        avatar: 'https://i.pravatar.cc/150?img=16',
        rating: 5.0,
        reviewCount: 112,
        languages: ['sv', 'en'],
        categories: ['education'],
        hourlyRate: 380,
        location: 'Linköping',
        verified: true,
        description: 'Experienced math tutor for high school and university students. Proven results!',
        experience: '9 years',
        availability: 'available',
        responseTime: '1 hour',
        completedJobs: 267
    },
    {
        id: '9',
        firstName: 'Omar',
        lastName: 'Ibrahim',
        businessName: 'Legal Consultation Services',
        avatar: 'https://i.pravatar.cc/150?img=15',
        rating: 4.9,
        reviewCount: 81,
        languages: ['ar', 'sv', 'en'],
        categories: ['business'],
        hourlyRate: 700,
        location: 'Stockholm',
        verified: true,
        description: 'Immigration and business law specialist. Helping people navigate Swedish legal system.',
        experience: '11 years',
        availability: 'busy',
        responseTime: '5 hours',
        completedJobs: 189
    },
    {
        id: '10',
        firstName: 'Zeynep',
        lastName: 'Öztürk',
        businessName: 'Career Coaching & CV Help',
        avatar: 'https://i.pravatar.cc/150?img=10',
        rating: 4.8,
        reviewCount: 95,
        languages: ['tr', 'sv', 'en'],
        categories: ['education'],
        hourlyRate: 420,
        location: 'Göteborg',
        verified: true,
        description: 'Professional career coach. Help with CV, job search, and interview preparation.',
        experience: '7 years',
        availability: 'available',
        responseTime: '2 hours',
        completedJobs: 203
    },
    {
        id: '11',
        firstName: 'Hassan',
        lastName: 'Ali',
        businessName: 'Moving & Transport Services',
        avatar: 'https://i.pravatar.cc/150?img=11',
        rating: 4.5,
        reviewCount: 56,
        languages: ['ar', 'sv'],
        categories: ['home'],
        hourlyRate: 250,
        location: 'Örebro',
        verified: true,
        description: 'Reliable moving services for apartments and houses. Careful handling guaranteed.',
        experience: '3 years',
        availability: 'available',
        responseTime: '3 hours',
        completedJobs: 87
    },
    {
        id: '12',
        firstName: 'Maria',
        lastName: 'Silva',
        businessName: 'Nutrition & Wellness Coaching',
        avatar: 'https://i.pravatar.cc/150?img=24',
        rating: 4.9,
        reviewCount: 78,
        languages: ['es', 'sv', 'en'],
        categories: ['health'],
        hourlyRate: 380,
        location: 'Uppsala',
        verified: true,
        description: 'Certified nutritionist. Personalized meal plans and healthy lifestyle coaching.',
        experience: '8 years',
        availability: 'available',
        responseTime: '1 hour',
        completedJobs: 156
    },
    {
        id: '13',
        firstName: 'Emre',
        lastName: 'Şahin',
        businessName: 'Web Design & Development',
        avatar: 'https://i.pravatar.cc/150?img=17',
        rating: 4.8,
        reviewCount: 67,
        languages: ['tr', 'en'],
        categories: ['creative'],
        hourlyRate: 550,
        location: 'Stockholm',
        verified: true,
        description: 'Full-stack developer and designer. Modern websites and web applications.',
        experience: '6 years',
        availability: 'busy',
        responseTime: '4 hours',
        completedJobs: 134
    },
    {
        id: '14',
        firstName: 'Amina',
        lastName: 'Mohamed',
        businessName: 'Document Help & Translation',
        avatar: 'https://i.pravatar.cc/150?img=26',
        rating: 4.7,
        reviewCount: 52,
        languages: ['so', 'sv', 'en'],
        categories: ['official'],
        hourlyRate: 320,
        location: 'Malmö',
        verified: true,
        description: 'Help with official documents, forms, and applications in Sweden.',
        experience: '5 years',
        availability: 'available',
        responseTime: '2 hours',
        completedJobs: 98
    },
    {
        id: '15',
        firstName: 'Erik',
        lastName: 'Nilsson',
        businessName: 'Home Cleaning Pro',
        avatar: 'https://i.pravatar.cc/150?img=33',
        rating: 4.9,
        reviewCount: 124,
        languages: ['sv', 'en'],
        categories: ['home'],
        hourlyRate: 300,
        location: 'Stockholm',
        verified: true,
        description: 'Professional cleaning with eco-friendly products. Reliable and thorough service.',
        experience: '10 years',
        availability: 'available',
        responseTime: '1 hour',
        completedJobs: 289
    },
    {
        id: '16',
        firstName: 'Layla',
        lastName: 'Hussein',
        businessName: 'Children\'s Art Classes',
        avatar: 'https://i.pravatar.cc/150?img=23',
        rating: 5.0,
        reviewCount: 43,
        languages: ['ar', 'sv'],
        categories: ['creative'],
        hourlyRate: 280,
        location: 'Göteborg',
        verified: true,
        description: 'Fun and educational art classes for children aged 5-12. Creativity unleashed!',
        experience: '4 years',
        availability: 'available',
        responseTime: '3 hours',
        completedJobs: 76
    },
    {
        id: '17',
        firstName: 'Can',
        lastName: 'Yıldız',
        businessName: 'Business Consulting',
        avatar: 'https://i.pravatar.cc/150?img=18',
        rating: 4.8,
        reviewCount: 69,
        languages: ['tr', 'sv', 'en'],
        categories: ['business'],
        hourlyRate: 650,
        location: 'Stockholm',
        verified: true,
        description: 'Strategic business consulting for startups and growing companies.',
        experience: '9 years',
        availability: 'busy',
        responseTime: '6 hours',
        completedJobs: 145
    },
    {
        id: '18',
        firstName: 'Sofia',
        lastName: 'Berg',
        businessName: 'Piano & Music Lessons',
        avatar: 'https://i.pravatar.cc/150?img=25',
        rating: 4.9,
        reviewCount: 88,
        languages: ['sv', 'en'],
        categories: ['education'],
        hourlyRate: 400,
        location: 'Uppsala',
        verified: true,
        description: 'Experienced piano teacher for all ages and skill levels. Music is for everyone!',
        experience: '12 years',
        availability: 'available',
        responseTime: '2 hours',
        completedJobs: 198
    },
    {
        id: '19',
        firstName: 'Yusuf',
        lastName: 'Aydın',
        businessName: 'Permit & Visa Assistance',
        avatar: 'https://i.pravatar.cc/150?img=19',
        rating: 4.6,
        reviewCount: 37,
        languages: ['tr', 'sv'],
        categories: ['official'],
        hourlyRate: 380,
        location: 'Lund',
        verified: false,
        description: 'Expert help with residence permits, work permits, and visa applications.',
        experience: '4 years',
        availability: 'available',
        responseTime: '4 hours',
        completedJobs: 68
    },
    {
        id: '20',
        firstName: 'Linda',
        lastName: 'Johansson',
        businessName: 'Yoga & Meditation Classes',
        avatar: 'https://i.pravatar.cc/150?img=27',
        rating: 5.0,
        reviewCount: 102,
        languages: ['sv', 'en'],
        categories: ['health'],
        hourlyRate: 350,
        location: 'Malmö',
        verified: true,
        description: 'Certified yoga instructor. Private and group classes for all levels.',
        experience: '8 years',
        availability: 'available',
        responseTime: '1 hour',
        completedJobs: 234
    },
    {
        id: '21',
        firstName: 'Ahmed',
        lastName: 'Osman',
        businessName: 'Tech Support & IT Help',
        avatar: 'https://i.pravatar.cc/150?img=32',
        rating: 4.7,
        reviewCount: 58,
        languages: ['ar', 'sv', 'en'],
        categories: ['business'],
        hourlyRate: 450,
        location: 'Stockholm',
        verified: true,
        description: 'Computer repairs, setup, and IT support for individuals and small businesses.',
        experience: '6 years',
        availability: 'available',
        responseTime: '2 hours',
        completedJobs: 112
    },
    {
        id: '22',
        firstName: 'Deniz',
        lastName: 'Kurt',
        businessName: 'Garden & Landscaping',
        avatar: 'https://i.pravatar.cc/150?img=28',
        rating: 4.5,
        reviewCount: 41,
        languages: ['tr', 'sv'],
        categories: ['home'],
        hourlyRate: 290,
        location: 'Helsingborg',
        verified: true,
        description: 'Professional gardening and landscaping services. Make your garden beautiful!',
        experience: '5 years',
        availability: 'available',
        responseTime: '5 hours',
        completedJobs: 79
    },
    {
        id: '23',
        firstName: 'Khadija',
        lastName: 'Abdi',
        businessName: 'Childcare & Babysitting',
        avatar: 'https://i.pravatar.cc/150?img=21',
        rating: 4.9,
        reviewCount: 76,
        languages: ['so', 'sv', 'en'],
        categories: ['home'],
        hourlyRate: 220,
        location: 'Göteborg',
        verified: true,
        description: 'Experienced and caring babysitter. References available upon request.',
        experience: '7 years',
        availability: 'available',
        responseTime: '2 hours',
        completedJobs: 167
    },
    {
        id: '24',
        firstName: 'Marcus',
        lastName: 'Svensson',
        businessName: 'Graphic Design Studio',
        avatar: 'https://i.pravatar.cc/150?img=31',
        rating: 4.8,
        reviewCount: 63,
        languages: ['sv', 'en'],
        categories: ['creative'],
        hourlyRate: 480,
        location: 'Stockholm',
        verified: true,
        description: 'Creative graphic designer for logos, branding, and marketing materials.',
        experience: '8 years',
        availability: 'busy',
        responseTime: '3 hours',
        completedJobs: 141
    },
    {
        id: '25',
        firstName: 'Elif',
        lastName: 'Arslan',
        businessName: 'Turkish Language Lessons',
        avatar: 'https://i.pravatar.cc/150?img=29',
        rating: 5.0,
        reviewCount: 54,
        languages: ['tr', 'sv', 'en'],
        categories: ['education'],
        hourlyRate: 340,
        location: 'Uppsala',
        verified: true,
        description: 'Native Turkish speaker teaching Turkish to Swedish and English speakers.',
        experience: '5 years',
        availability: 'available',
        responseTime: '1 hour',
        completedJobs: 118
    }
];

// Helper function to filter providers
export function filterProviders(
    providers: Provider[],
    filters: {
        search?: string;
        category?: string;
        language?: string;
        minPrice?: number;
        maxPrice?: number;
        location?: string;
        verifiedOnly?: boolean;
    }
): Provider[] {
    return providers.filter(provider => {
        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesSearch =
                provider.firstName.toLowerCase().includes(searchLower) ||
                provider.lastName.toLowerCase().includes(searchLower) ||
                provider.businessName.toLowerCase().includes(searchLower) ||
                provider.description.toLowerCase().includes(searchLower);
            if (!matchesSearch) return false;
        }

        // Category filter
        if (filters.category && filters.category !== 'all') {
            if (!provider.categories.includes(filters.category)) return false;
        }

        // Language filter
        if (filters.language && filters.language !== 'all') {
            if (!provider.languages.includes(filters.language)) return false;
        }

        // Price range filter
        if (filters.minPrice !== undefined && provider.hourlyRate < filters.minPrice) {
            return false;
        }
        if (filters.maxPrice !== undefined && provider.hourlyRate > filters.maxPrice) {
            return false;
        }

        // Location filter
        if (filters.location && filters.location !== 'all') {
            if (provider.location !== filters.location) return false;
        }

        // Verified only filter
        if (filters.verifiedOnly && !provider.verified) {
            return false;
        }

        return true;
    });
}