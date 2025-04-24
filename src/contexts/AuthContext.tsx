
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole, AuthContextType } from '../types/auth';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '../integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Map Supabase user to our User type
          const userData: User = {
            id: currentSession.user.id,
            email: currentSession.user.email || '',
            name: currentSession.user.user_metadata.name || currentSession.user.email?.split('@')[0] || 'User',
            role: (currentSession.user.user_metadata.role as UserRole) || 'student',
            avatar: currentSession.user.user_metadata.avatar_url,
          };
          setUser(userData);
        } else {
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Got session:', currentSession);
      setSession(currentSession);
      
      if (currentSession?.user) {
        // Map Supabase user to our User type
        const userData: User = {
          id: currentSession.user.id,
          email: currentSession.user.email || '',
          name: currentSession.user.user_metadata.name || currentSession.user.email?.split('@')[0] || 'User',
          role: (currentSession.user.user_metadata.role as UserRole) || 'student',
          avatar: currentSession.user.user_metadata.avatar_url,
        };
        setUser(userData);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      // Session and user will be set by the onAuthStateChange listener
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      if (data.session) {
        // User is immediately signed in
        toast({
          title: "Account created",
          description: "Your account has been created successfully!",
        });
      } else {
        // Email confirmation is required
        toast({
          title: "Email confirmation required",
          description: "Please check your email to confirm your account",
        });
        // We redirect to login after signup with email confirmation
        navigate('/login');
        return data;
      }
      
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      // Session and user will be cleared by the onAuthStateChange listener
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
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
