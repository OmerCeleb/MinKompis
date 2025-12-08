// src/hooks/useFormValidation.ts
import { useState, useCallback } from 'react';
import { z, ZodError } from 'zod'; // ← ZodError'ı import et
import { useTranslations } from 'next-intl';

type ValidationErrors<T> = {
    [K in keyof T]?: string;
};

interface UseFormValidationOptions<T extends z.ZodType> {
    schema: T;
    mode?: 'onSubmit' | 'onChange' | 'onBlur';
}

export function useFormValidation<T extends z.ZodType>({
                                                           schema,
                                                           mode = 'onSubmit',
                                                       }: UseFormValidationOptions<T>) {
    const t = useTranslations();
    const [errors, setErrors] = useState<ValidationErrors<z.infer<T>>>({});
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

    const translateError = useCallback((errorKey: string): string => {
        try {
            return t(errorKey);
        } catch {
            return errorKey;
        }
    }, [t]);

    const validate = useCallback((data: z.infer<T>): boolean => {
        try {
            schema.parse(data);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof ZodError) { // ← ZodError kullan
                const formattedErrors: ValidationErrors<z.infer<T>> = {};

                error.issues.forEach((issue) => { // ← errors değil issues
                    const field = issue.path[0] as keyof z.infer<T>;
                    if (field) {
                        formattedErrors[field] = translateError(issue.message);
                    }
                });

                setErrors(formattedErrors);
            }
            return false;
        }
    }, [schema, translateError]);

    const validateField = useCallback((
        fieldName: keyof z.infer<T>,
        value: any,
        formData?: z.infer<T>
    ): string | undefined => {
        try {
            if (formData) {
                schema.parse(formData);
            } else {
                const fieldSchema = (schema as any).shape?.[fieldName];
                if (fieldSchema) {
                    fieldSchema.parse(value);
                }
            }

            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });

            return undefined;
        } catch (error) {
            if (error instanceof ZodError) { // ← ZodError kullan
                const fieldError = error.issues.find( // ← errors değil issues
                    (issue) => issue.path[0] === fieldName
                );

                if (fieldError) {
                    const errorMessage = translateError(fieldError.message);

                    setErrors((prev) => ({
                        ...prev,
                        [fieldName]: errorMessage,
                    }));

                    return errorMessage;
                }
            }
            return undefined;
        }
    }, [schema, translateError]);

    const handleBlur = useCallback((fieldName: keyof z.infer<T>) => {
        setTouchedFields((prev) => new Set(prev).add(fieldName as string));
    }, []);

    const handleChange = useCallback((
        fieldName: keyof z.infer<T>,
        value: any,
        formData?: z.infer<T>
    ) => {
        if (mode === 'onChange' || touchedFields.has(fieldName as string)) {
            validateField(fieldName, value, formData);
        }
    }, [mode, touchedFields, validateField]);

    const clearErrors = useCallback(() => {
        setErrors({});
        setTouchedFields(new Set());
    }, []);

    const clearFieldError = useCallback((fieldName: keyof z.infer<T>) => {
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[fieldName];
            return newErrors;
        });
    }, []);

    const getFieldError = useCallback((fieldName: keyof z.infer<T>): string | undefined => {
        return errors[fieldName];
    }, [errors]);

    const hasFieldError = useCallback((fieldName: keyof z.infer<T>): boolean => {
        return !!errors[fieldName];
    }, [errors]);

    const hasErrors = Object.keys(errors).length > 0;

    return {
        errors,
        validate,
        validateField,
        handleBlur,
        handleChange,
        clearErrors,
        clearFieldError,
        getFieldError,
        hasFieldError,
        hasErrors,
    };
}