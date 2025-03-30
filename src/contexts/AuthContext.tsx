
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole, AuthContextType } from '../types/auth';
import { toast } from '@/components/ui/use-toast';
import { api } from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved token in localStorage
    const savedToken = localStorage.getItem('eduTrackscapeToken');
    if (savedToken) {
      setToken(savedToken);
      loadUserProfile(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUserProfile = async (authToken: string) => {
    try {
      const userData = await api.getUserProfile(authToken);
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user profile:', error);
      // Token might be expired or invalid
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user: userData, token: authToken } = await api.login(email, password);
      
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('eduTrackscapeToken', authToken);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
      
      // Redirect based on role
      if (userData.role === 'student') {
        navigate('/dashboard');
      } else if (userData.role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/admin');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid email or password",
        variant: "destructive",
      });
      console.error('Login error:', error);
      throw error; // Re-throw to allow handling in the login component
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const { user: userData, token: authToken } = await api.signup(name, email, password, role);
      
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('eduTrackscapeToken', authToken);
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully!",
      });
      
      // Redirect based on role
      if (role === 'student') {
        navigate('/dashboard');
      } else if (role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/admin');
      }
    } catch (error) {
      toast({
        title: "Signup error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      console.error('Signup error:', error);
      throw error; // Re-throw to allow handling in the signup component
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('eduTrackscapeToken');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
