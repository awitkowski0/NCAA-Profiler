import { createContext, useState, useEffect, ReactNode } from 'react';

// Import real auth service for production
import * as authService from '../services/authService';

// Import dummy auth service for development
import * as dummyAuthService from '../services/dummyAuthService';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  username: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Use dummy service in development, real service in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  const authServiceToUse = isDevelopment ? dummyAuthService : authService;

  const login = async (username: string, password: string) => {
    await authServiceToUse.login(username, password);
    setUser({ username });
  };

  const register = async (username: string, password: string) => {
    await authServiceToUse.register(username, password);
  };

  const logout = () => {
    authServiceToUse.logout();
    setUser(null);
  };

  useEffect(() => {
    if (isDevelopment) {
      setUser(dummyAuthService.getDummyUser());
    } else {
      const token = localStorage.getItem('access_token');
      if (token) {
        // Normally you'd validate the token here
        setUser({ username: 'testuser2' });
      }
    }
  }, [isDevelopment]);

  return (
      <AuthContext.Provider value={{ user, login, register, logout }}>
        {children}
      </AuthContext.Provider>
  );
};