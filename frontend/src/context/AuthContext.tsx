import { createContext, useState, useEffect, ReactNode } from 'react';

// Import real auth service for production
import * as authService from '../services/authService';

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

  const authServiceToUse = authService;

  const login = async (username: string, password: string) => {
    const response = await authServiceToUse.login(username, password);
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
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
    const checkToken = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const validatedUser = await authServiceToUse.validateToken(token);
          if (validatedUser) {
            setUser(validatedUser);
          } else {
            logout(); // Clear invalid token
          }
        } catch (error) {
          console.error('Token validation failed', error);
          logout();
        }
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
