// src/lib/validations/auth.schema.ts
import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'validation.emailRequired')
        .email('validation.emailInvalid'),
    password: z
        .string()
        .min(1, 'validation.passwordRequired')
        .min(6, 'validation.passwordTooShort'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register Customer Schema
export const registerCustomerSchema = z.object({
    email: z
        .string()
        .min(1, 'validation.emailRequired')
        .email('validation.emailInvalid'),
    password: z
        .string()
        .min(1, 'validation.passwordRequired')
        .min(6, 'validation.passwordTooShort')
        .regex(/[A-Z]/, 'validation.passwordUppercase')
        .regex(/[a-z]/, 'validation.passwordLowercase')
        .regex(/[0-9]/, 'validation.passwordNumber'),
    confirmPassword: z
        .string()
        .min(1, 'validation.confirmPasswordRequired'),
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
}).refine((data) => data.password === data.confirmPassword, {
    message: 'validation.passwordMismatch',
    path: ['confirmPassword'],
});

export type RegisterCustomerFormData = z.infer<typeof registerCustomerSchema>;

// Register Provider Schema
export const registerProviderSchema = z.object({
    // Step 1: Account Info
    email: z
        .string()
        .min(1, 'validation.emailRequired')
        .email('validation.emailInvalid'),
    password: z
        .string()
        .min(1, 'validation.passwordRequired')
        .min(6, 'validation.passwordTooShort')
        .regex(/[A-Z]/, 'validation.passwordUppercase')
        .regex(/[a-z]/, 'validation.passwordLowercase')
        .regex(/[0-9]/, 'validation.passwordNumber'),
    confirmPassword: z
        .string()
        .min(1, 'validation.confirmPasswordRequired'),
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

    // Step 2: Languages & Categories
    languages: z
        .array(z.string())
        .min(1, 'validation.languageRequired'),
    categories: z
        .array(z.string())
        .min(1, 'validation.categoryRequired'),

    // Step 3: Bio & Rate
    bio: z
        .string()
        .min(50, 'validation.bioTooShort')
        .max(500, 'validation.bioTooLong'),
    hourlyRate: z
        .number()
        .min(100, 'validation.hourlyRateTooLow')
        .max(10000, 'validation.hourlyRateTooHigh'),
    avatar: z
        .string()
        .url('validation.avatarInvalid')
        .optional()
        .or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'validation.passwordMismatch',
    path: ['confirmPassword'],
});

export type RegisterProviderFormData = z.infer<typeof registerProviderSchema>;

// Step 1 Schema (Partial validation)
export const registerProviderStep1Schema = registerProviderSchema.pick({
    email: true,
    password: true,
    confirmPassword: true,
    firstName: true,
    lastName: true,
    phone: true,
}).refine((data) => data.password === data.confirmPassword, {
    message: 'validation.passwordMismatch',
    path: ['confirmPassword'],
});

// Step 2 Schema
export const registerProviderStep2Schema = registerProviderSchema.pick({
    languages: true,
    categories: true,
});

// Step 3 Schema
export const registerProviderStep3Schema = registerProviderSchema.pick({
    bio: true,
    hourlyRate: true,
    avatar: true,
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, 'validation.emailRequired')
        .email('validation.emailInvalid'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset Password Schema
export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(1, 'validation.passwordRequired')
        .min(6, 'validation.passwordTooShort')
        .regex(/[A-Z]/, 'validation.passwordUppercase')
        .regex(/[a-z]/, 'validation.passwordLowercase')
        .regex(/[0-9]/, 'validation.passwordNumber'),
    confirmPassword: z
        .string()
        .min(1, 'validation.confirmPasswordRequired'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'validation.passwordMismatch',
    path: ['confirmPassword'],
});