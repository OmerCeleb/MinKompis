// src/contexts/ToastContext.tsx
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
    position?: ToastPosition;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface ToastContextType {
    toasts: Toast[];
    showToast: (
        message: string,
        type?: ToastType,
        options?: {
            duration?: number;
            position?: ToastPosition;
            action?: { label: string; onClick: () => void };
        }
    ) => void;
    hideToast: (id: string) => void;
    clearAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback(
        (
            message: string,
            type: ToastType = 'info',
            options?: {
                duration?: number;
                position?: ToastPosition;
                action?: { label: string; onClick: () => void };
            }
        ) => {
            const id = `toast-${Date.now()}-${Math.random()}`;
            const duration = options?.duration ?? 5000;
            const position = options?.position ?? 'top-right';

            const newToast: Toast = {
                id,
                message,
                type,
                duration,
                position,
                action: options?.action
            };

            setToasts(prev => [...prev, newToast]);

            // Auto remove after duration (if duration > 0)
            if (duration > 0) {
                setTimeout(() => {
                    hideToast(id);
                }, duration);
            }
        },
        []
    );

    const hideToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        setToasts([]);
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, showToast, hideToast, clearAll }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}