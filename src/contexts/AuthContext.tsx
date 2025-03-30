
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole, AuthContextType } from '../types/auth';
import { toast } from '@/components/ui/use-toast';

// Sample users for demonstration
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'student@example.com',
    name: 'John Student',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    email: 'teacher@example.com',
    name: 'Emma Teacher',
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('eduTrackscapeUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user (in a real app, this would be a backend call)
      const foundUser = DEMO_USERS.find(u => u.email === email);
      
      if (foundUser && password === 'password') { // Simplistic check for demo
        setUser(foundUser);
        localStorage.setItem('eduTrackscapeUser', JSON.stringify(foundUser));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        
        // Redirect based on role
        if (foundUser.role === 'student') {
          navigate('/dashboard');
        } else if (foundUser.role === 'teacher') {
          navigate('/teacher');
        } else {
          navigate('/admin');
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (DEMO_USERS.some(u => u.email === email)) {
        toast({
          title: "Signup failed",
          description: "Email already in use",
          variant: "destructive",
        });
        return;
      }
      
      // Create new user (in a real app, this would be a backend call)
      const newUser: User = {
        id: `${DEMO_USERS.length + 1}`,
        email,
        name,
        role,
        avatar: `https://i.pravatar.cc/150?img=${DEMO_USERS.length + 4}`,
      };
      
      // In a real app, DEMO_USERS would be updated in a database
      // For this demo, we'll just simulate success
      
      setUser(newUser);
      localStorage.setItem('eduTrackscapeUser', JSON.stringify(newUser));
      
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
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eduTrackscapeUser');
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
