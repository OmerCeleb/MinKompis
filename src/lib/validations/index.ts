// src/lib/validations/index.ts

// Auth schemas
export {
    loginSchema,
    registerCustomerSchema,
    registerProviderSchema,
    registerProviderStep1Schema,
    registerProviderStep2Schema,
    registerProviderStep3Schema,
    forgotPasswordSchema,
    resetPasswordSchema,
    type LoginFormData,
    type RegisterCustomerFormData,
    type RegisterProviderFormData,
    type ForgotPasswordFormData,
} from './auth.schema';

// Booking schemas
export {
    bookingSchema,
    type BookingFormData,
} from './booking.schema';

// Contact schemas
export {
    contactSchema,
    messageSendSchema,
    type ContactFormData,
    type MessageSendFormData,
} from './contact.schema';

// Profile schemas
export {
    updateProfileSchema,
    changePasswordSchema,
    type UpdateProfileFormData,
    type ChangePasswordFormData,
} from './profile.schema';

// Service schemas
export {
    serviceSchema,
    reviewSchema,
    reviewReplySchema,
    type ServiceFormData,
    type ReviewFormData,
    type ReviewReplyFormData,
} from './service.schema';