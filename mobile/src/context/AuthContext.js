import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sprawdź początkową sesję
    checkUser();

    // Nasłuchuj zmian w autoryzacji
    const { data } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          setRole(authService.getUserRole(session.user));
        } else {
          setUser(null);
          setRole(null);
        }
        setLoading(false);
      }
    );

    return () => {
      data?.subscription?.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const result = await authService.getCurrentUser();
      if (result.success && result.user) {
        setUser(result.user);
        setRole(authService.getUserRole(result.user));
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
