import { User, UserRole } from '../types/auth';
import { supabase } from '@/integrations/supabase/client';

interface LoginResponse {
  user: User;
  token: string;
}

interface SignupResponse {
  user: User;
  token: string;
}

export const api = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw new Error(error.message || 'Login failed');
      }
      
      if (!data.user) {
        throw new Error('User data not found');
      }
      
      // Map Supabase user to our User type
      const userData: User = {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata.name || data.user.email?.split('@')[0] || 'User',
        role: (data.user.user_metadata.role as UserRole) || 'student',
        avatar: data.user.user_metadata.avatar_url,
      };
      
      return {
        user: userData,
        token: data.session.access_token,
      };
    } catch (error) {
      throw error;
    }
  },
  
  signup: async (name: string, email: string, password: string, role: UserRole): Promise<SignupResponse> => {
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
        throw new Error(error.message || 'Signup failed');
      }
      
      if (!data.user) {
        throw new Error('User data not found');
      }
      
      // Map Supabase user to our User type
      const userData: User = {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata.name || name,
        role: role,
        avatar: data.user.user_metadata.avatar_url,
      };
      
      return {
        user: userData,
        token: data.session?.access_token || '',
      };
    } catch (error) {
      throw error;
    }
  },
  
  getUserProfile: async (token: string): Promise<User> => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (error) {
        throw new Error(error.message || 'Failed to get user profile');
      }
      
      if (!user) {
        throw new Error('User data not found');
      }
      
      // Map Supabase user to our User type
      const userData: User = {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata.name || user.email?.split('@')[0] || 'User',
        role: (user.user_metadata.role as UserRole) || 'student',
        avatar: user.user_metadata.avatar_url,
      };
      
      return userData;
    } catch (error) {
      throw error;
    }
  },
};
