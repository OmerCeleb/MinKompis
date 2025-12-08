// src/lib/api/services/index.ts

import { authService } from './auth.service';
import { providerService } from './provider.service';
import { bookingService } from './booking.service';
import { userService } from './user.service';
import { serviceService } from './service.service';
import { messageService } from './message.service';
import { reviewService } from './review.service';
import { favoriteService } from './favorite.service';
import { uploadService } from './upload.service';

// Export individual services
export { authService } from './auth.service';
export { providerService } from './provider.service';
export { bookingService } from './booking.service';
export { userService } from './user.service';
export { serviceService } from './service.service';
export { messageService } from './message.service';
export { reviewService } from './review.service';
export { favoriteService } from './favorite.service';
export { uploadService } from './upload.service';

// Convenience export
export const api = {
    auth: authService,
    providers: providerService,
    bookings: bookingService,
    users: userService,
    services: serviceService,
    messages: messageService,
    reviews: reviewService,
    favorites: favoriteService,
    upload: uploadService,
} as const;