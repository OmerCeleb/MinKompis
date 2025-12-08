// src/lib/validations/booking.schema.ts
import { z } from 'zod';

// Booking Schema
export const bookingSchema = z.object({
    serviceId: z
        .string()
        .min(1, 'validation.serviceRequired'),
    providerId: z
        .string()
        .min(1, 'validation.providerRequired'),
    date: z
        .string()
        .min(1, 'validation.dateRequired')
        .refine((date) => {
            const bookingDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return bookingDate >= today;
        }, 'validation.dateInPast'),
    time: z
        .string()
        .min(1, 'validation.timeRequired')
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'validation.timeInvalid'),
    duration: z
        .number()
        .min(30, 'validation.durationTooShort')
        .max(480, 'validation.durationTooLong'),
    message: z
        .string()
        .max(500, 'validation.messageTooLong')
        .optional()
        .or(z.literal('')),
    agreeToTerms: z
        .boolean()
        .refine((val) => val === true, 'validation.mustAgreeToTerms'),
});

export type BookingFormData = z.infer<typeof bookingSchema>;