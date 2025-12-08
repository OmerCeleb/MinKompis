// src/lib/validations/profile.schema.ts
import { z } from 'zod';

// Update Profile Schema
export const updateProfileSchema = z.object({
    firstName: z
        .string()
        .min(1, 'validation.firstNameRequired')
        .min(2, 'validation.firstNameTooShort')
        .max(50, 'validation.firstNameTooLong'),
    lastName: z
        .string()
        .min(1, 'validation.lastNameRequired')
        .min(2, 'validation.lastNameTooShort')
        .max(50, 'validation.lastNameTooLong'),
    phone: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'validation.phoneInvalid')
        .optional()
        .or(z.literal('')),
    bio: z
        .string()
        .max(500, 'validation.bioTooLong')
        .optional()
        .or(z.literal('')),
    location: z
        .string()
        .max(100, 'validation.locationTooLong')
        .optional()
        .or(z.literal('')),
    languages: z
        .array(z.string())
        .min(1, 'validation.languageRequired')
        .optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

// Change Password Schema
export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, 'validation.currentPasswordRequired'),
    newPassword: z
        .string()
        .min(1, 'validation.passwordRequired')
        .min(6, 'validation.passwordTooShort')
        .regex(/[A-Z]/, 'validation.passwordUppercase')
        .regex(/[a-z]/, 'validation.passwordLowercase')
        .regex(/[0-9]/, 'validation.passwordNumber'),
    confirmPassword: z
        .string()
        .min(1, 'validation.confirmPasswordRequired'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'validation.passwordMismatch',
    path: ['confirmPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
    message: 'validation.passwordSameAsCurrent',
    path: ['newPassword'],
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;