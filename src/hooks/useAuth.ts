// src/hooks/useAuth.ts - API İle Güncellenmiş Versiyon
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api, type User, type LoginRequest, type RegisterRequest } from '@/lib/api';

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

            // Real API call
            const response = await api.auth.getCurrentUser();

            if (response.success && response.data) {
                setState({ user: response.data, loading: false, error: null });
            } else {
                setState({ user: null, loading: false, error: null });
            }
        } catch (error: any) {
            console.error('Auth check failed:', error);
            setState({ user: null, loading: false, error: null });
        }
    };

    const login = useCallback(async (credentials: LoginRequest) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // Real API call
            const response = await api.auth.login(credentials);

            if (response.success && response.data) {
                setState({
                    user: response.data.user,
                    loading: false,
                    error: null
                });

                // Redirect based on role
                if (response.data.user.role === 'PROVIDER') {
                    router.push('/dashboard');
                } else {
                    router.push('/');
                }

                return { success: true };
            } else {
                throw new Error(response.error || 'Login failed');
            }
        } catch (error: any) {
            const errorMessage = error.message || 'Login failed';
            setState(prev => ({ ...prev, loading: false, error: errorMessage }));
            return { success: false, error: errorMessage };
        }
    }, [router]);

    const register = useCallback(async (data: RegisterRequest) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // Real API call
            const response = await api.auth.register(data);

            if (response.success && response.data) {
                setState({
                    user: response.data.user,
                    loading: false,
                    error: null
                });

                // Redirect based on role
                if (response.data.user.role === 'PROVIDER') {
                    router.push('/dashboard');
                } else {
                    router.push('/');
                }

                return { success: true };
            } else {
                throw new Error(response.error || 'Registration failed');
            }
        } catch (error: any) {
            const errorMessage = error.message || 'Registration failed';
            setState(prev => ({ ...prev, loading: false, error: errorMessage }));
            return { success: false, error: errorMessage };
        }
    }, [router]);

    const logout = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true }));

            // Real API call
            await api.auth.logout();

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

            // Real API call
            const response = await api.users.updateProfile(updates);

            if (response.success && response.data) {
                setState(prev => ({
                    ...prev,
                    user: response.data!,
                    loading: false
                }));

                return { success: true };
            } else {
                throw new Error(response.error || 'Update failed');
            }
        } catch (error: any) {
            setState(prev => ({ ...prev, loading: false, error: error.message }));
            return { success: false, error: error.message };
        }
    }, []);

    const loginWithBankID = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            // Real API call for BankID
            const response = await api.auth.initBankID();

            // BankID flow would continue here...

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

// Export types
export type { User, LoginRequest as LoginCredentials, RegisterRequest as RegisterData };