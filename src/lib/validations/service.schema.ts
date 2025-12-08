// src/lib/validations/service.schema.ts
import { z } from 'zod';

// Create/Update Service Schema
export const serviceSchema = z.object({
    title: z
        .string()
        .min(1, 'validation.titleRequired')
        .min(10, 'validation.titleTooShort')
        .max(100, 'validation.titleTooLong'),
    description: z
        .string()
        .min(1, 'validation.descriptionRequired')
        .min(50, 'validation.descriptionTooShort')
        .max(1000, 'validation.descriptionTooLong'),
    category: z
        .string()
        .min(1, 'validation.categoryRequired'),
    price: z
        .number()
        .min(50, 'validation.priceTooLow')
        .max(10000, 'validation.priceTooHigh'),
    duration: z
        .number()
        .min(15, 'validation.durationTooShort')
        .max(480, 'validation.durationTooLong'),
    active: z
        .boolean()
        .optional(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

// Review Schema
export const reviewSchema = z.object({
    bookingId: z
        .string()
        .min(1, 'validation.bookingRequired'),
    providerId: z
        .string()
        .min(1, 'validation.providerRequired'),
    rating: z
        .number()
        .min(1, 'validation.ratingTooLow')
        .max(5, 'validation.ratingTooHigh'),
    comment: z
        .string()
        .min(1, 'validation.commentRequired')
        .min(20, 'validation.commentTooShort')
        .max(500, 'validation.commentTooLong'),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

// Review Reply Schema
export const reviewReplySchema = z.object({
    reply: z
        .string()
        .min(1, 'validation.replyRequired')
        .min(10, 'validation.replyTooShort')
        .max(500, 'validation.replyTooLong'),
});

export type ReviewReplyFormData = z.infer<typeof reviewReplySchema>;