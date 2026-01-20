import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import type { User, RegisterData, ApiResponse, AuthResponse } from '@/types/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = useCallback(async (): Promise<boolean> => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setUser(null);
      setLoading(false);
      return false;
    }

    try {
      const response = await api.get<ApiResponse<User>>('/api/auth/me');
      if (response.data.success && response.data.data) {
        setUser(response.data.data);
        return true;
      }
      return false;
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    await checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/login', {
      email,
      password,
    });

    if (response.data.success && response.data.data) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      setUser(response.data.data.user);
      navigate('/');
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  };

  const register = async (data: RegisterData) => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/register', data);

    if (response.data.success && response.data.data) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      setUser(response.data.data.user);
      navigate('/');
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      navigate('/auth/login');
    }
  };

  // Initial auth check
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Periodic auth check every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (localStorage.getItem('accessToken')) {
        checkAuth();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [checkAuth]);

  // Window focus listener
  useEffect(() => {
    const handleFocus = () => {
      if (localStorage.getItem('accessToken')) {
        checkAuth();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
