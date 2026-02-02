import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin } from '../api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('dashboardToken');
    const expiry = localStorage.getItem('dashboardExpiry');

    if (token && expiry && new Date(expiry) > new Date()) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('dashboardToken');
      localStorage.removeItem('dashboardExpiry');
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const login = async (password) => {
    try {
      const data = await apiLogin(password);

      if (data.success) {
        localStorage.setItem('dashboardToken', data.token);
        localStorage.setItem('dashboardExpiry', data.expiresAt);
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, message: data.message || 'Login failed' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Connection error'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('dashboardToken');
    localStorage.removeItem('dashboardExpiry');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
