// src/hooks/useNotification.ts
import { useState, useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message?: string;
    duration?: number;
}

interface NotificationOptions {
    title: string;
    message?: string;
    duration?: number;
}

export function useNotification() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = useCallback((type: NotificationType, options: NotificationOptions) => {
        const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
        const notification: Notification = {
            id,
            type,
            title: options.title,
            message: options.message,
            duration: options.duration || 5000
        };

        setNotifications(prev => [...prev, notification]);

        // Auto remove after duration
        if (notification.duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, notification.duration);
        }

        return id;
    }, []);

    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const success = useCallback((options: NotificationOptions) => {
        return addNotification('success', options);
    }, [addNotification]);

    const error = useCallback((options: NotificationOptions) => {
        return addNotification('error', options);
    }, [addNotification]);

    const warning = useCallback((options: NotificationOptions) => {
        return addNotification('warning', options);
    }, [addNotification]);

    const info = useCallback((options: NotificationOptions) => {
        return addNotification('info', options);
    }, [addNotification]);

    const clearAll = useCallback(() => {
        setNotifications([]);
    }, []);

    return {
        notifications,
        success,
        error,
        warning,
        info,
        removeNotification,
        clearAll
    };
}