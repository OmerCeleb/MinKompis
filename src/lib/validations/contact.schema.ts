// src/lib/validations/contact.schema.ts
import { z } from 'zod';

// Contact Provider Schema
export const contactSchema = z.object({
    providerId: z
        .string()
        .min(1, 'validation.providerRequired'),
    subject: z
        .string()
        .min(1, 'validation.subjectRequired')
        .min(5, 'validation.subjectTooShort')
        .max(100, 'validation.subjectTooLong'),
    message: z
        .string()
        .min(1, 'validation.messageRequired')
        .min(20, 'validation.messageTooShort')
        .max(1000, 'validation.messageTooLong'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Message Send Schema
export const messageSendSchema = z.object({
    receiverId: z
        .string()
        .min(1, 'validation.receiverRequired'),
    text: z
        .string()
        .min(1, 'validation.messageRequired')
        .max(1000, 'validation.messageTooLong'),
});

export type MessageSendFormData = z.infer<typeof messageSendSchema>;