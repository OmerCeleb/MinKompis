// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
    avatar?: string;
    phone?: string;
    languages: string[];
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'CUSTOMER' | 'PROVIDER';
    phone?: string;
    languages?: string[];
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export function useAuth() {
    const router = useRouter();
    const [state, setState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null
    });

    // Check if user is logged in on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // TODO: Backend entegrasyonu - session kontrolü
            const token = localStorage.getItem('auth_token');

            if (!token) {
                setState({ user: null, loading: false, error: null });
                return;
            }

            // Mock user data - Backend'den gelecek
            const mockUser: User = {
                id: '1',
                email: 'user@example.com',
                firstName: 'Ayşe',
                lastName: 'Yılmaz',
                role: 'PROVIDER',
                avatar: 'https://i.pravatar.cc/150?img=1',
                languages: ['tr', 'sv']
            };

            setState({ user: mockUser, loading: false, error: null });
        } catch (error) {
            console.error('Auth check failed:', error);
            setState({ user: null, loading: false, error: 'Authentication failed' });
        }
    };

    const login = useCallback(async (credentials: LoginCredentials) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // TODO: Backend API call
            // const response = await fetch('/api/auth/login', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(credentials)
            // });
            // const data = await response.json();

            // Mock response
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockUser: User = {
                id: '1',
                email: credentials.email,
                firstName: 'Ayşe',
                lastName: 'Yılmaz',
                role: 'PROVIDER',
                avatar: 'https://i.pravatar.cc/150?img=1',
                languages: ['tr', 'sv']
            };

            // Save token
            localStorage.setItem('auth_token', 'mock_token_123');

            setState({ user: mockUser, loading: false, error: null });

            // Redirect based on role
            if (mockUser.role === 'PROVIDER') {
                router.push('/dashboard');
            } else {
                router.push('/');
            }

            return { success: true };
        } catch (error: any) {
            const errorMessage = error.message || 'Login failed';
            setState(prev => ({ ...prev, loading: false, error: errorMessage }));
            return { success: false, error: errorMessage };
        }
    }, [router]);

    const register = useCallback(async (data: RegisterData) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // TODO: Backend API call
            // const response = await fetch('/api/auth/register', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(data)
            // });

            // Mock response
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockUser: User = {
                id: Date.now().toString(),
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role,
                languages: data.languages || ['en']
            };

            localStorage.setItem('auth_token', 'mock_token_123');

            setState({ user: mockUser, loading: false, error: null });

            // Redirect based on role
            if (mockUser.role === 'PROVIDER') {
                router.push('/dashboard');
            } else {
                router.push('/');
            }

            return { success: true };
        } catch (error: any) {
            const errorMessage = error.message || 'Registration failed';
            setState(prev => ({ ...prev, loading: false, error: errorMessage }));
            return { success: false, error: errorMessage };
        }
    }, [router]);

    const logout = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true }));

            // TODO: Backend API call
            // await fetch('/api/auth/logout', { method: 'POST' });

            // Clear token
            localStorage.removeItem('auth_token');

            setState({ user: null, loading: false, error: null });
            router.push('/');

            return { success: true };
        } catch (error: any) {
            setState(prev => ({ ...prev, loading: false }));
            return { success: false, error: error.message };
        }
    }, [router]);

    const updateProfile = useCallback(async (updates: Partial<User>) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // TODO: Backend API call
            // const response = await fetch('/api/user/profile', {
            //   method: 'PATCH',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(updates)
            // });

            // Mock update
            await new Promise(resolve => setTimeout(resolve, 500));

            setState(prev => ({
                ...prev,
                user: prev.user ? { ...prev.user, ...updates } : null,
                loading: false
            }));

            return { success: true };
        } catch (error: any) {
            setState(prev => ({ ...prev, loading: false, error: error.message }));
            return { success: false, error: error.message };
        }
    }, []);

    const loginWithBankID = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // TODO: BankID integration
            alert('BankID integration coming soon!');

            setState(prev => ({ ...prev, loading: false }));
            return { success: false, error: 'Not implemented yet' };
        } catch (error: any) {
            setState(prev => ({ ...prev, loading: false, error: error.message }));
            return { success: false, error: error.message };
        }
    }, []);

    return {
        user: state.user,
        loading: state.loading,
        error: state.error,
        isAuthenticated: !!state.user,
        isProvider: state.user?.role === 'PROVIDER',
        isCustomer: state.user?.role === 'CUSTOMER',
        isAdmin: state.user?.role === 'ADMIN',
        login,
        register,
        logout,
        updateProfile,
        loginWithBankID,
        checkAuth
    };
}